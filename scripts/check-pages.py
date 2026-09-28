#!/usr/bin/env python3
"""Check location pages for copied wording and for the house voice.

Run it on a page before saving it, and on every page you touched before
committing:

    python3 scripts/check-pages.py content/locations/leeds-tutors/gcse/maths/_index.md
    python3 scripts/check-pages.py content/locations/leeds-tutors/          (every page under it)
    python3 scripts/check-pages.py --all                                    (whole site, summary)
    python3 scripts/check-pages.py --all --list                             (every failing page)

Exit code 1 if any checked page FAILs, so it can gate a commit.

WHAT IT MEASURES

"Own writing" is the page's front-matter prose: intros, headings, FAQs,
steps, subject blurbs and so on. Titles, school names, reviews, links and
images are left out. Town names are swapped for a placeholder first, so a
sentence that only changes "Leeds" to "York" counts as the same sentence.

  overlap        Share of this page's 5-word phrases that also appear in the
                 own writing of the most alike page of the same type (town
                 page vs town page, GCSE Maths vs GCSE Maths). FAIL over
                 30%, the limit in the page builders.
  copied         Sentences of 8 or more words that appear word for word on
                 another location page of any type. A few stock lines are
                 fine (the price, the steps), so this only warns. When a page
                 is over the overlap limit, these are the first to rewrite.
  fields         Fields whose wording is mostly (over 50%) found on the most
                 alike page. Listed to show what to rewrite.

The voice rules come from .claude/reference/tone.md and vocabulary.md:

  FAIL  own writing over the 30% overlap limit, an em dash, a banned word
        or phrase, an exclamation mark, a grade promise, employer wording
        ("our employed tutors"), sales-call wording ("only pay if you
        continue"), or a page that never talks to the parent about "your
        child".
  WARN  sentences shared word for word with other pages, more "students"
        than "your child", few contractions ("you'll",
        "we'd", "it's"), or long average sentences. Read those pages aloud
        and ask the tone.md test: would Joe say this, word for word, on the
        phone to a worried parent?

Needs PyYAML: pip3 install pyyaml
"""
import argparse
import re
import sys
from collections import defaultdict
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("check-pages.py needs PyYAML. Install it with: pip3 install pyyaml")

ROOT = Path(__file__).resolve().parent.parent
LOCATIONS = ROOT / "content" / "locations"

OVERLAP_LIMIT = 0.30      # build-location-subject.md: no more than 30% shared language
FIELD_LIMIT = 0.50
COPIED_MIN_WORDS = 8
SHINGLE = 5

# Front-matter keys that are not the page's own prose.
NOT_PROSE = {
    "title", "description", "layout", "location", "level", "subject", "nav_title",
    "map_url", "sitemap", "robots", "grade_from", "grade_to", "angle_stat_from",
    "angle_stat_to", "content_angle", "area_links", "hero_heading_line2", "schools",
    "reviews", "tutors", "tutor_profiles", "first_lesson_quote", "first_lesson_quote_name",
    "first_lesson_quote_role", "first_lesson_quote_grade", "build", "_build", "weight",
    "draft", "aliases", "og_image", "hero_image", "date", "lastmod",
}
# Fields a parent reads as the page's heading.
H1_FIELDS = ("banner_heading", "hero_heading_line1", "hero_h1")

# vocabulary.md, "Words we don't use". Matched as whole words.
BANNED_WORDS = [
    "landscape", "foster", "navigate", "delve", "crucial", "realm", "testament", "pivotal",
    "seamless", "robust", "vibrant", "tapestry", "unlock", "embark", "leverage",
    "stakeholders", "furthermore", "moreover", "particularly", "specifically", "effectively",
    "consistently", "additionally", "successfully", "cutting-edge", "bespoke",
    "transformative", "world-class", "game-changer",
]
# vocabulary.md swap-outs: fine in some sentences, so a warning, not a fail.
SWAP_OUTS = ["educator", "mentor", "specialist"]
BANNED_PHRASES = [
    "in conclusion", "it is worth noting", "it is important to note", "a range of",
    "a variety of", "unlock potential", "embark on a journey", "real difference",
    "take their learning to the next level", "the right approach", "comprehensive solution",
    # tone.md, sales-call wording and false openers. "15-minute call" is
    # deliberately not here: Harry okayed that wording for now (28 Sep 2026).
    "only pay if you continue", "matching specialist",
    "we'll be honest", "we'll level with you", "we understand how", "we know how hard",
    "don't miss out", "transform your child",
    # vocabulary.md, agency language
    "our employed tutors", "we employ", "our staff tutors", "our tutor team",
    "our in-house tutors", "we provide tutors", "join our team",
]
# beliefs.md: we never promise grades. "Nobody can guarantee a grade" is fine,
# so a promise only counts when no negation comes shortly before it.
PROMISES = ["guaranteed grade", "guaranteed result", "guarantee a grade", "guarantee grades",
            "guarantee results", "guarantee a pass", "guaranteed pass"]
NEGATION = re.compile(r"\b(can't|cannot|can not|won't|never|nobody|no one|don't|do not|not)\b")
CONTRACTION = re.compile(r"\b\w+'(ll|re|ve|d|s|t|m)\b")
CHILD = re.compile(r"\byour (child|son|daughter|teen|teenager|children|kids?)\b")
STUDENTS = re.compile(r"\bstudents?\b")


def load(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n?", text, re.S)
    if not m:
        raise ValueError("no YAML front matter")
    return yaml.load(m.group(1), Loader=getattr(yaml, "CSafeLoader", yaml.SafeLoader)) or {}


def page_type(path):
    parts = path.relative_to(LOCATIONS).parts[:-1]
    if len(parts) == 1:
        return "town page"
    if len(parts) == 2:
        return f"{parts[1]} hub"
    return f"{parts[1]} {parts[2]}"


def prose(fm):
    """Yield (field, text) for the page's own writing."""
    def walk(v):
        if isinstance(v, str):
            yield v
        elif isinstance(v, list):
            for x in v:
                yield from walk(x)
        elif isinstance(v, dict):
            for x in v.values():
                yield from walk(x)
    for key, value in fm.items():
        if key in NOT_PROSE or key.endswith("_image") or key.endswith("_alt"):
            continue
        for s in walk(value):
            if "|" in s:  # "Subject|blurb|/url" entries: the blurb is the prose
                bits = s.split("|")
                s = bits[1] if len(bits) >= 2 else ""
            if s.startswith("/") or s.startswith("http") or len(s.split()) < 3:
                continue
            yield key, s


def towns(loc):
    base = (loc or "").lower()
    if not base:
        return []
    variants = {base, base.replace("-", " "), base.replace(" ", "-"), base.replace("st ", "st. ")}
    return sorted(variants, key=len, reverse=True)


def norm(text, town_names):
    t = text.lower().replace("’", "'").replace("‘", "'")
    for v in town_names:
        t = t.replace(v, " town ")
    return re.sub(r"[^a-z0-9£' ]+", " ", t).split()


def shingles(words):
    return {" ".join(words[i:i + SHINGLE]) for i in range(len(words) - SHINGLE + 1)}


def sentences(text):
    return [s for s in re.split(r"(?<=[.?!])\s+|\n+", text) if s.strip()]


class Page:
    def __init__(self, path):
        self.path = path
        self.rel = path.relative_to(ROOT).as_posix()
        self.fm = load(path)
        self.type = page_type(path)
        self.town = self.fm.get("location", "")
        tn = towns(self.town)
        self.fields = defaultdict(list)
        for k, s in prose(self.fm):
            self.fields[k].append(s)
        self.field_sh = {k: shingles(norm(" ".join(v), tn)) for k, v in self.fields.items()}
        self.own_text = " ".join(" ".join(v) for v in self.fields.values())
        self.own_sh = set().union(*self.field_sh.values()) if self.field_sh else set()
        self.sents = {}
        for k, v in self.fields.items():
            for s in sentences(" ".join(v)):
                w = norm(s, tn)
                if len(w) >= COPIED_MIN_WORDS:
                    self.sents[" ".join(w)] = (k, s.strip())


def load_all():
    files = sorted(LOCATIONS.glob("*/_index.md")) + sorted(LOCATIONS.glob("*/*/_index.md")) + \
        sorted(LOCATIONS.glob("*/*/*/_index.md"))
    pages, errors = [], []
    for f in files:
        try:
            pages.append(Page(f))
        except Exception as e:  # noqa: BLE001
            errors.append((f.relative_to(ROOT).as_posix(), str(e)))
    return pages, errors


def voice(page):
    fails, warns = [], []
    own = page.own_text
    head = " ".join(str(page.fm.get(k, "")) for k in ("title", "description"))
    low = own.lower().replace("’", "'")
    if "—" in own or "—" in head:
        fails.append("em dash (use a comma, colon or full stop)")
    for w in BANNED_WORDS:
        if re.search(rf"\b{re.escape(w)}\b", low):
            fails.append(f'banned word "{w}"')
    for p in BANNED_PHRASES:
        if p in low:
            fails.append(f'banned phrase "{p}"')
    for p in PROMISES:
        for m in re.finditer(re.escape(p), low):
            if not NEGATION.search(low[max(0, m.start() - 40):m.start()]):
                fails.append(f'grade promise "{p}"')
                break
    for w in SWAP_OUTS:
        if re.search(rf"\b{w}s?\b", low):
            warns.append(f'"{w}": would "tutor" be the plainer word?')
    if "!" in own:
        fails.append("exclamation mark outside a review")
    words = max(1, len(re.findall(r"[A-Za-z']+", own)))
    child = len(CHILD.findall(low))
    students = len(STUDENTS.findall(low))
    if child == 0:
        fails.append('never says "your child" (talk to the parent about their child)')
    elif students > child:
        warns.append(f'"students" {students} times, "your child" {child} (talk to the parent)')
    contractions = len(CONTRACTION.findall(low))
    if contractions * 100 / words < 1.0:
        warns.append(f"few contractions ({contractions} in {words} words): write it the way you'd say it")
    sl = [len(s.split()) for s in sentences(own) if len(s.split()) > 2]
    if sl and sum(sl) / len(sl) > 22:
        warns.append(f"long sentences (average {sum(sl) / len(sl):.0f} words): split some")
    # Mirrors partials/seo.html: a trailing " | The Degree Gap" is dropped when
    # the title would run past 65, so only the words before it have to fit.
    title = str(page.fm.get("title", ""))
    base = title[:-len(" | The Degree Gap")] if title.endswith(" | The Degree Gap") else title
    if len(base) > 65:
        fails.append(f"title is {len(base)} characters without the brand (limit 65)")
    desc = str(page.fm.get("description", ""))
    if desc and not 145 <= len(desc) <= 160:
        warns.append(f"description is {len(desc)} characters (aim for 145 to 160)")
    h1 = next((str(page.fm[k]) for k in H1_FIELDS if page.fm.get(k)), "")
    if h1 and "online" not in h1.lower():
        warns.append('H1 does not say "Online"')
    return fails, warns


def check(page, pages, by_type, sent_index, detail=True):
    fails, warns = voice(page)
    best, best_page = 0.0, None
    for other in by_type[page.type]:
        if other is page or not page.own_sh:
            continue
        c = len(page.own_sh & other.own_sh) / len(page.own_sh)
        if c > best:
            best, best_page = c, other
    if best > OVERLAP_LIMIT:
        fails.append(f"{best:.0%} of the own writing is also on {best_page.rel} (limit {OVERLAP_LIMIT:.0%})")
    copied = []
    for key, (field, original) in page.sents.items():
        others = [p for p in sent_index.get(key, ()) if p is not page]
        if others:
            copied.append((field, original, others[0]))
    if copied:
        # Some shared sentences are fine (Harry, 28 Sep 2026), so this is a
        # prompt, not a fail. The 30% overlap limit above is the gate.
        warns.append(f"{len(copied)} sentence(s) also word for word on other pages (fine for a few stock lines)")
    fields = []
    if detail and best_page is not None and best > OVERLAP_LIMIT:
        for k, s in page.field_sh.items():
            if s and len(s & best_page.own_sh) / len(s) > FIELD_LIMIT:
                fields.append(k)
    return {"best": best, "best_page": best_page, "fails": fails, "warns": warns,
            "copied": copied, "fields": fields}


def report(page, r):
    status = "FAIL" if r["fails"] else ("WARN" if r["warns"] else "PASS")
    print(f"\n{status}  {page.rel}")
    near = f" (closest: {r['best_page'].rel})" if r["best_page"] else ""
    print(f"      own writing shared with the closest page: {r['best']:.0%}{near}")
    for f in r["fails"]:
        print(f"      FAIL  {f}")
    for w in r["warns"]:
        print(f"      warn  {w}")
    if r["fields"]:
        print(f"      rewrite these fields, mostly found on the closest page: {', '.join(r['fields'])}")
    for field, original, other in r["copied"][:12]:
        print(f'      copied [{field}] "{original[:110]}" (also on {other.rel})')
    if len(r["copied"]) > 12:
        print(f"      ... and {len(r['copied']) - 12} more copied sentences")
    return status


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="*", help="page files or folders under content/locations/")
    ap.add_argument("--all", action="store_true", help="check every location page")
    ap.add_argument("--list", action="store_true", help="with --all, print every failing page")
    args = ap.parse_args()
    if not args.paths and not args.all:
        ap.print_help()
        return 2

    pages, errors = load_all()
    for rel, err in errors:
        print(f"FAIL  {rel}: front matter does not parse ({err})")
    by_type = defaultdict(list)
    sent_index = defaultdict(list)
    for p in pages:
        by_type[p.type].append(p)
        for key in p.sents:
            sent_index[key].append(p)
    by_path = {p.path.resolve(): p for p in pages}

    if args.all:
        targets = pages
    else:
        targets = []
        for raw in args.paths:
            path = Path(raw).resolve()
            if path.is_dir():
                targets += [by_path[f.resolve()] for f in sorted(path.rglob("_index.md")) if f.resolve() in by_path]
            elif path in by_path:
                targets.append(by_path[path])
            else:
                print(f"skip  {raw}: not a location page")
    results = {p: check(p, pages, by_type, sent_index, detail=not args.all or args.list) for p in targets}

    if args.all and not args.list:
        counts = defaultdict(lambda: [0, 0, 0])
        for p, r in results.items():
            counts[p.type][0 if r["fails"] else (1 if r["warns"] else 2)] += 1
        print(f"{'page type':18s} {'FAIL':>5s} {'WARN':>5s} {'PASS':>5s}")
        for t in sorted(counts):
            f, w, ok = counts[t]
            print(f"{t:18s} {f:5d} {w:5d} {ok:5d}")
        reasons = defaultdict(int)
        for r in results.values():
            for f in r["fails"]:
                if "own writing is also on" in f:
                    f = f"own writing over {OVERLAP_LIMIT:.0%} shared with another page"
                elif "copied word for word" in f:
                    f = "sentences copied word for word from other pages"
                elif f.startswith("title is"):
                    f = "title over 65 characters even without the brand"
                reasons[f] += 1
        print("\nMost common reasons for FAIL:")
        for k, n in sorted(reasons.items(), key=lambda x: -x[1])[:12]:
            print(f"  {n:4d}  {k}")
        print("\nRun with --list for every failing page, or pass a page's file to see what to fix.")
    else:
        statuses = [report(p, r) for p, r in results.items() if not (args.list and not r["fails"])]
        print(f"\n{statuses.count('FAIL')} fail, {statuses.count('WARN')} warn, {statuses.count('PASS')} pass")
    return 1 if errors or any(r["fails"] for r in results.values()) else 0


if __name__ == "__main__":
    sys.exit(main())
