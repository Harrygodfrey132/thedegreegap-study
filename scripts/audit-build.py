#!/usr/bin/env python3
"""Run Semrush's site-audit checks over every page of a build, before deploying.

Semrush's Site Audit only crawls as many pages as the project's limit allows, so a
problem on a page it never reached stays invisible until it does. This checks all
of them, in about 30 seconds, from the files Hugo writes:

    hugo --cleanDestinationDir
    python3 scripts/audit-build.py public/

Exit code 1 if anything in the ERRORS group turns up, so it can gate a deploy.

ERRORS (Semrush counts these against the health score as errors or warnings that
are always worth fixing)
  broken_internal_link          a /study/ link to a page or file the build lacks
  title_missing, title_too_long over 70 characters, Semrush's limit
  duplicate_title, duplicate_description
  h1_missing, h1_multiple
  h1_equals_title               the <title> repeats the H1 word for word. Give the
                                page a seo_title (see partials/seo.html).
  img_missing_alt               no alt attribute at all (alt="" is fine)
  http_link                     a link to http:// rather than https://
  legacy_host_link              a link to study.thedegreegap.com or www., which
                                both redirect
  sitemap_lists_noindex         a URL in sitemap.xml that is noindexed
WARNINGS (worth a look, not always wrong)
  internal_link_to_redirect     a link that static/.htaccess redirects
  low_text_to_html_ratio        visible text under 10% of the HTML, Semrush's bar
  low_word_count                under 200 words
  orphan                        indexable, but no other page links to it
  nofollow_external, link_no_anchor_text

Pages marked noindex, or whose canonical points elsewhere, are skipped for the
page-level checks, as they are for Google.

Needs BeautifulSoup and lxml: pip3 install beautifulsoup4 lxml
"""
import re
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlparse

try:
    from bs4 import BeautifulSoup
except ImportError:
    sys.exit("audit-build.py needs BeautifulSoup and lxml: pip3 install beautifulsoup4 lxml")

BASE = "https://thedegreegap.com/study/"
SKIP_SCHEMES = ("mailto", "tel", "javascript", "sms", "whatsapp")

# Paths static/.htaccess redirects, relative to /study/. Keep in step with it.
REDIRECTS = [
    r"^personal-statements(/.*)?$",
    r"^personal-statement-tutor/(chemistry|physics)/?$",
    r"^locations/(wimbledon|richmond|beckenham|purley|dulwich|clapham|kingston|wallington)-tutors(/.*)?$",
    r"^locations/derby-tutors/gcse/physics-tutoring/?$",
    r"^past-papers(/.*)?$",
    r"^webinars/november-2026/?$",
]
ERRORS = ["broken_internal_link", "title_missing", "title_too_long", "duplicate_title",
          "duplicate_description", "h1_missing", "h1_multiple", "h1_equals_title",
          "img_missing_alt", "http_link", "legacy_host_link", "sitemap_lists_noindex"]


def study_path(href, page):
    """The /study/-relative path a link points at, or None if it leaves the site."""
    if urlparse(href).scheme in SKIP_SCHEMES:
        return None
    if not href.startswith(("http://", "https://", "/")):
        href = "/study/" + page + href
    parsed = urlparse(href)
    if parsed.netloc and parsed.netloc.lower() not in ("thedegreegap.com", "www.thedegreegap.com"):
        return None
    if parsed.path == "/study":
        return ""
    if not parsed.path.startswith("/study/"):
        return None
    return unquote(parsed.path[len("/study/"):])


def link_status(build, rel):
    if any(re.match(rule, rel) for rule in REDIRECTS):
        return "redirect"
    if rel == "" or rel.endswith("/"):
        return "ok" if (build / rel / "index.html").exists() else "broken"
    if (build / rel).is_file():
        return "ok"
    return "redirect" if (build / rel / "index.html").exists() else "broken"


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    build = Path(sys.argv[1])
    if not (build / "sitemap.xml").exists():
        sys.exit(f"{build} has no sitemap.xml. Run hugo first and pass its output folder.")

    pages = {}
    for html in sorted(build.rglob("*.html")):
        rel = html.relative_to(build).as_posix()
        if rel.startswith("admin/"):
            continue
        page = rel[: -len("index.html")] if rel.endswith("index.html") else rel
        raw = html.read_text(encoding="utf-8", errors="replace")
        soup = BeautifulSoup(raw, "lxml")
        robots = soup.find("meta", attrs={"name": "robots"})
        title = soup.find("title")
        desc = soup.find("meta", attrs={"name": "description"})
        canonical = soup.find("link", rel="canonical")
        links = [(a.get("href", "").strip(),
                  (a.get_text(" ", strip=True) or a.get("aria-label", "")
                   or " ".join(i.get("alt", "") for i in a.find_all("img"))).strip(),
                  " ".join(a.get("rel", [])))
                 for a in soup.find_all("a")]
        info = {
            "noindex": bool(robots and "noindex" in robots.get("content", "").lower()),
            "canonical": canonical.get("href") if canonical else None,
            "title": title.get_text(strip=True) if title else "",
            "desc": desc.get("content", "").strip() if desc else "",
            "h1": [h.get_text(" ", strip=True) for h in soup.find_all("h1")],
            "no_alt": [i.get("src", "") for i in soup.find_all("img") if not i.has_attr("alt")],
            "links": links,
        }
        for tag in soup(["script", "style", "noscript", "svg", "template"]):
            tag.decompose()
        text = soup.get_text(" ", strip=True)
        info["ratio"] = len(text) / max(len(raw), 1)
        info["words"] = len(re.findall(r"\w+", text))
        pages[page] = info

    indexable = {p for p, i in pages.items()
                 if not i["noindex"] and i["canonical"] in (None, BASE + p)}
    found = defaultdict(list)
    linked_to = defaultdict(set)

    for page in sorted(indexable):
        i = pages[page]
        if not i["title"]:
            found["title_missing"].append(page)
        elif len(i["title"]) > 70:
            found["title_too_long"].append(f"{page} ({len(i['title'])}) {i['title']}")
        if not i["h1"]:
            found["h1_missing"].append(page)
        elif len(i["h1"]) > 1:
            found["h1_multiple"].append(f"{page} {i['h1']}")
        elif i["h1"][0].strip().lower() == i["title"].strip().lower():
            found["h1_equals_title"].append(f"{page} {i['title']}")
        found["img_missing_alt"] += [f"{page} {src}" for src in i["no_alt"]]
        if i["ratio"] < 0.10:
            found["low_text_to_html_ratio"].append(f"{page} {i['ratio']:.1%}")
        if i["words"] < 200:
            found["low_word_count"].append(f"{page} {i['words']} words")
        for href, anchor, rel in i["links"]:
            if not href or href.startswith("#"):
                continue
            if href.startswith("http://"):
                found["http_link"].append(f"{page} -> {href}")
            if re.search(r"//(study|www)\.thedegreegap\.com", href):
                found["legacy_host_link"].append(f"{page} -> {href}")
            target = study_path(href, page)
            if target is None:
                if href.startswith("http") and "nofollow" in rel:
                    found["nofollow_external"].append(f"{page} -> {href}")
                continue
            status = link_status(build, target)
            if status == "broken":
                found["broken_internal_link"].append(f"{page} -> {href}")
            elif status == "redirect":
                found["internal_link_to_redirect"].append(f"{page} -> {href}")
            else:
                linked_to[target].add(page)
            if not anchor:
                found["link_no_anchor_text"].append(f"{page} -> {href}")

    by_title, by_desc = defaultdict(list), defaultdict(list)
    for page in indexable:
        by_title[pages[page]["title"]].append(page)
        if pages[page]["desc"]:
            by_desc[pages[page]["desc"]].append(page)
    found["duplicate_title"] = [f"{t} {sorted(p)}" for t, p in by_title.items() if len(p) > 1]
    found["duplicate_description"] = [f"{d[:60]}... {sorted(p)}" for d, p in by_desc.items() if len(p) > 1]

    sitemap = set(re.findall(r"<loc>([^<]+)</loc>", (build / "sitemap.xml").read_text()))
    found["sitemap_lists_noindex"] = sorted(
        u for u in sitemap if u.startswith(BASE) and u[len(BASE):] in pages
        and u[len(BASE):] not in indexable)
    found["orphan"] = sorted(p for p in indexable if p and not (linked_to.get(p, set()) - {p}))

    print(f"{len(pages)} pages, {len(indexable)} indexable, {len(sitemap)} in sitemap.xml\n")
    failed = False
    for group, names in (("ERRORS", ERRORS), ("WARNINGS", sorted(set(found) - set(ERRORS)))):
        print(group)
        for name in names:
            items = found.get(name, [])
            if group == "ERRORS" and items:
                failed = True
            print(f"  {len(items):>4}  {name}")
            for item in items[:10]:
                print(f"          {item}")
            if len(items) > 10:
                print(f"          ...and {len(items) - 10} more")
        print()
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
