# Site audit fixes outside this repo

From the Semrush Site Audit of thedegreegap.com finished on 6 October 2026
(project 21710747): health 76, 62 errors, 236 warnings, 176 notices.

**Update, 8 October 2026.** The crawl limit is now raised and the full crawl
(mega export, 2,151 pages) confirms everything below. It adds three things:

- 1,057 of the 2,151 pages are `www.thedegreegap.com/study/...` copies of study
  pages. The www redirect on the branch (item 13) removes them, along with all
  196 "page crawl depth" notices, which are only on those copies. After the
  deploy, expect the next crawl to find about 1,100 pages.
- The main site now shows 29 pages with the shared-template problems in items 1,
  2, 5, 7, 8 and 15, and "redirect chains" (29) joins item 5.
- `/guest-user/forgot-password`, `/Pricing/gcse-tutoring` and an orphaned
  sitemap file are new; see items 3, 4 and 17.

Every study-site item in the full crawl is either fixed on the branch (see the end
of this file) or expected: the WhatsApp button (item 12) and the noindexed booking
and terms pages (item 17).

Read this first: the 6 October audit only checked 100 pages, which is the crawl limit set
on the project. All 62 errors and 108 of the 236 warnings are on the main PHP site
or come from Cloudflare. Another 59 warnings are the WhatsApp button, which only
Semrush's own settings can silence. None of that can be changed from this repo, so
each one is listed here with the exact fix. The study site's own 69 warnings were
code issues in this repo; 64 are fixed on the branch `claude/dazzling-cray-32o4ao`
(see the end of this file) and the www redirect turns four of the last five into
redirects.

Work top to bottom: the list is in order of how much each fix moves the score.

## Errors (62)

### 1. "Broken internal links" (29) and "4xx errors" (1)

Every main-site page links to `https://thedegreegap.com/cdn-cgi/l/email-protection`,
which returns 404 to crawlers. Cloudflare's Email Address Obfuscation rewrites every
`mailto:` link into that address.

Fix, either one:

- Cloudflare dashboard, thedegreegap.com, **Scrape Shield**, turn **Email Address
  Obfuscation** off. This clears it for the whole domain in one switch.
- Or wrap the address in the main-site footer in `<!--email_off-->` and
  `<!--/email_off-->`, which is what the study site does in `baseof.html`.

### 2. "Broken internal JavaScript and CSS files" (29)

Every main-site page loads `https://thedegreegap.com/path/0ee7992.js`, which does not
exist. It looks like a placeholder `<script src="/path/0ee7992.js">` left in the
shared main-site layout. Delete the tag, or point it at the real file if something
depends on it.

### 3. "Duplicate title tag" (5) and "Duplicate meta descriptions" (5)

`/`, `/guest-user/login-form`, `/guest-user/forgot-password` and `/apply-to-tutor`
all carry the homepage's title and description.

- `/apply-to-tutor`: give it its own, for example
  `<title>Apply to Tutor GCSE and A-Level Online | The Degree Gap</title>`.
- `/guest-user/login-form` and `/guest-user/forgot-password`: add
  `<meta name="robots" content="noindex">` to both. Account pages should not be in
  Google at all. This also clears their "missing H1", "low word count" and "only
  one internal link" warnings.

`https://thedegreegap.com` and `https://thedegreegap.com/` show up as two rows. They
are the same homepage; the pair stops counting once the duplicates above are fixed.

### 4. "Invalid sitemap.xml format" (1) and "Orphaned sitemap pages" (1)

`https://thedegreegap.com/sitemap/list_1.xml` does not validate. Regenerate it as a
standard `<urlset>`, listing only pages that return 200 and are indexable, then check
it with any XML sitemap validator before resubmitting in Search Console.

The full crawl also calls it orphaned: nothing points crawlers to it. Once it
validates, add `Sitemap: https://thedegreegap.com/sitemap/list_1.xml` to
`https://thedegreegap.com/robots.txt`, next to the study sitemap line in the Search
Console section.

## Warnings

### 5. "Links lead to HTTP pages" (29), "redirect chains" (29) and "permanent redirects" (29)

The main-site header and footer link to old study addresses, each of which costs one
or two redirects. Where it is two, Semrush counts a redirect chain. Swap them for the
final URLs in the shared template:

| Now | Should be |
|---|---|
| `http://study.thedegreegap.com/personal-statement-tutor` | `https://thedegreegap.com/study/personal-statement-tutor/` |
| `https://study.thedegreegap.com` | `https://thedegreegap.com/study/` |
| `https://study.thedegreegap.com/locations/` | `https://thedegreegap.com/study/locations/` |
| `https://www.thedegreegap.com/study` | `https://thedegreegap.com/study/` |
| `https://www.thedegreegap.com` (on `/subjects`) | `https://thedegreegap.com/` |

### 6. Typo link on /Collaborations

`/Collaborations` links to `https://study.thedgereegap.com/personal-statement-tutor`
(note "thedgereegap"). Change it to
`https://thedegreegap.com/study/personal-statement-tutor/`.

### 7. "Missing ALT attributes" (29)

The main-site header logo `/images/final-logo.svg` has no `alt`. Add
`alt="The Degree Gap"`.

### 8. "Missing hreflang and lang attributes" (29)

The main-site `<html>` tag has no language. Make it `<html lang="en-GB">`.

### 9. "Low text to HTML ratio" (23 main-site pages) and "Low word count" (5)

Main-site pages: `/`, `/teachers` and 12 of the `/teachers/languages/...` pages,
`/faq`, `/aboutus`, `/apply-to-tutor`, `/Troubleshooting`, `/Collaborations`,
`/gcse-and-a-level-tutoring-reviews` and the two account pages. Low word count:
the two account pages (fixed by item 3's noindex),
`/gcse-and-a-level-tutoring-reviews`, `/faq`, `/aboutus`.
Move inline CSS and JS into files, and give `/faq`, `/aboutus` and the reviews page
real copy (200 words or more each).

### 10. "Multiple H1 tags" (2 notices)

`/terms-and-conditions` and `/subjects` have more than one H1. Keep one, make the
rest H2. `/subjects` is also marked "content not optimized", Semrush's check for
headings out of order and long, dense paragraphs, so the single H1 should clear
that too.

### 11. "Unminified JavaScript and CSS files" (2 left)

`https://thedegreegap.com/cache/45/7f6b6a9b3d9a5ba5cb58372ab02851.js` on the
homepage. Minify it in the main site's asset build. The other 60 were the study
site's `main.js`, now fixed.

### 12. "Broken external links": nearly all WhatsApp

In the 6 October audit, 59 of 60 were the `wa.me` WhatsApp button on study pages.
The full crawl flags 2,023 pages for the same reason, because the button is on
every study page. WhatsApp refuses automated
crawlers, so Semrush reports an error, but the link works for people. The URL is
correctly encoded. Do not remove the button: it is an enquiry route. In Semrush,
open the issue and hide the `wa.me` rows so they stop counting, and tap the button
once on a phone to be sure. The 60th is the typo in item 6.

The full crawl also found three real broken links in blog source lists (the Sutton
Trust, AQA and UCAS had moved pages). Those are fixed on the branch.

## Notices

### 13. Only the study section answers on www

The main site already redirects www: Semrush's backlink data shows
`https://www.thedegreegap.com/` and `http://www.thedegreegap.com/` answering 301.
The study section did not, because it is served as static files: Semrush crawled
`www.thedegreegap.com/study/...` and got normal pages. The study site's `.htaccess`
on the branch now redirects www under `/study/`, so no Cloudflare rule is needed.
One is still harmless as a backstop: **Rules, Redirect Rules**, template "Redirect
from WWW to root".

### 14. "No HSTS support" (1)

Cloudflare, **SSL/TLS, Edge Certificates, HTTP Strict Transport Security**. Start
with a max-age of 6 months and leave preload off until every subdomain is on HTTPS.

### 15. "Links with no anchor text" (29 pages) and "non-descriptive anchor text" (3)

Main-site "back to top" links (`#top`) and the homepage's subject cards
(`/teachers/languages/...`) have no text. Add `aria-label="Back to top"` and, on
each card, `aria-label="GCSE Maths tutors"` and so on. The "Website" style anchors
on `/Collaborations` and the homepage link should say where they go.

### 16. "llms.txt not found" (1)

Optional. A short plain-text `/llms.txt` at the main-site root that says who you are
and lists the key pages (study home, locations, subjects, personal statements,
booking) clears it.

### 17. Expected, no action needed

- "Blocked from crawling" (84): `/study/book-a-call/`, the 39
  `/study/book-a-call/?subject=...` links from subject pages and the two webinar
  terms pages, each on both hosts. All are `noindex, follow` on purpose: a booking
  form and a terms page do not need to rank. Semrush skips its other checks on
  these pages, which is also why item 3's noindex clears the account pages.
- "Disallowed external resources" (1): the Canva embed on `/Collaborations` is
  blocked by Canva's own robots.txt.
- "Pages with only one internal link" (3): `/Pricing/gcse-tutoring` is the one
  worth fixing. A pricing page with a single link is hard for Google to find, so
  link it from the main-site footer or the homepage's pricing section. The
  forgot-password page is covered by item 3, and the third (the March webinar)
  is fixed on the branch.

### 18. The http homepage errors (from the backlink check)

Semrush's backlink data shows `http://thedegreegap.com/` answering with a
Cloudflare 520 error. 66 linking sites use that address, School Guide's tutor
directory among them, so those links hit an error instead of a redirect. In
Cloudflare: **SSL/TLS, Edge Certificates, Always Use HTTPS: on**. That redirects at
Cloudflare without touching the server. Check with `curl -sI http://thedegreegap.com/`:
expect a 301 to `https://thedegreegap.com/`.

### 19. Old addresses with links that return 404 (from the backlink check)

Each of these has links from other websites and answers 404. Add them to the main
site's `.htaccess` as 301s:

| Old address | Redirect to |
|---|---|
| `/subjects/UCAS-personal-statement-help` | `/study/personal-statement-tutor/` |
| `/subjects/gcse-geography-tutoring` | `/study/subjects/gcse-geography-tutor/` |
| `/electrophiles-in-organic-chemistry/` | `/understanding-electrophiles-in-organic-chemistry` |
| `/electrophiles/` | `/understanding-electrophiles-in-organic-chemistry` |

Also keep the short webinar addresses schools link to (`/gcse-summit`,
`/gcse-exams-webinar`, `/gcse-mocks-webinar`) answering for good: each should
redirect in one hop to the current edition or its replay page, never to a 404.

## Semrush settings

- **Raise the crawl limit.** Done: the 8 October crawl checked 2,151 pages. Keep
  it at 2,000 or more; after the www redirect is live the site is about 1,100.
- **Crawl source:** add `https://thedegreegap.com/study/sitemap.xml` and the main
  sitemap, so pages are found that the 100-page crawl never reached.
- **Position Tracking:** the tool is switched on for the project but has no
  campaign, so nothing tracks the location keywords. Create one for the United
  Kingdom (desktop and mobile) with the town keywords (`tutors {town}`,
  `maths tutor {town}`, `gcse tutor {town}`) and the national subject terms.

## Search Console

- Verify a **Domain property** (`sc-domain:thedegreegap.com`). The only property
  connected to OpenSEO is the `https://www.thedegreegap.com/` URL-prefix one, which
  only sees www URLs, so it cannot show what the site really gets.
- Add `Sitemap: https://thedegreegap.com/study/sitemap.xml` to
  `https://thedegreegap.com/robots.txt` and submit it in Search Console. Crawlers
  only read `robots.txt` at the root of a host, so the copy at `/study/robots.txt`
  is never used.
- Check **Security and Manual Actions, Manual actions**. Expect none. If there is
  one, that changes the backlink plan.

## Fixed in this repo (branch `claude/dazzling-cray-32o4ao`, not deployed)

1. `main.js` minified (clears 60 "unminified JavaScript" warnings).
2. 14 blog posts get a shorter `seo_title`, so the `<title>` no longer repeats the
   H1 and none runs past 70 characters (clears "duplicate H1 and title" and "title
   too long").
3. Webinar review badges link to the Google Business Profile and Trustpilot
   without `nofollow` (clears 6 "nofollow external links").
4. `www.thedegreegap.com/study/...` 301s to `thedegreegap.com/study/...`.
5. Markdown links no longer leave a space before a following comma or full stop
   (41 links on 18 pages, mostly blog source lists).
6. New page `/study/revision-timetable/`: the revision timetable maker, its three
   printable templates (in `static/downloads/`, built by
   `scripts/make-revision-sheets.py`) and a footer link to it. The template form
   sends leads to Zoho with Lead Source "Web Download".

7. Three moved source links fixed on eight blog posts: the Sutton Trust's Private
   Tutoring 2026 report, AQA's 2027 timetable and UCAS's 2027 deadlines.
8. Low text to HTML ratio cleared on every study page Semrush flagged. The webinar
   pages and the subjects and jobs hubs load their CSS from cached files instead
   of carrying it inline (screenshots match the old pages pixel for pixel), and
   the hubs, the January webinar and the results day replay get a short section
   of real text. The only study page left under the bar is `/study/gcse-summit/`,
   which nothing links to, so crawlers never see it.
9. The Slough GCSE Science page's 163-word paragraph is down to 142 words ("content
   not optimized"), and the March webinar is linked from the subject-by-subject
   revision post ("only one internal link").
10. The CMS now lists every field on the partner pages, the results day replay and
    the subjects and locations hubs, so saving one of them there no longer
    strips its tracking, sitemap settings or text.

Deploy with `./scripts/deploy.sh` as usual after reviewing the branch. To check the
redirect afterwards: `curl -sI https://www.thedegreegap.com/study/locations/` should
answer `301` with `location: https://thedegreegap.com/study/locations/`. Then open
`/study/revision-timetable/`, make a plan, and fill in the template form once with
your own email: a lead with Lead Source "Web Download" should appear in Zoho.
