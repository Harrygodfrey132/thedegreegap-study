# Old location pages: redirects to the new town pages

The old site's town pages (`thedegreegap.com/areas-we-cover/...`) compete with the
town pages on the new site (`thedegreegap.com/study/locations/...`) for the same
searches, such as "tutors Manchester". Google sees two Degree Gap pages for one
town and splits the credit between them, so neither ranks as well as one page
would.

25 old town pages have a page for exactly the same town on the new site. Each
gets a permanent (301) redirect to that town's tutors page. Google then moves the
old page's ranking and links across and drops the old page from its results.
Luton's new page was built for this, so the old Luton page and its council
directory links go there too.

Exact matches only: an old page is redirected only when the new site has a page
for that same town. The old Manchester neighbourhood pages (Chorlton, Rusholme,
the Northern Quarter) stay where they are rather than going to the Manchester
page.

Only these 25 exact addresses are redirected. No subject page is touched, on
either site: not the old site's `/subjects/...`, `/teachers/languages/...` or
`/Pricing/...` pages, and not the new site's subject pages or the town subject
pages such as `/study/locations/manchester-tutors/gcse/maths/`.

The other 54 old town pages have no page for their town on the new site, so they compete with
nothing. Leave them where they are for now (see the end of this file).

**Applied 2026-10-09 with Option 2.** The block is in the main site's
`/var/www/html/.htaccess`, straight after the first `RewriteEngine on` line. The
file before the change is `/var/www/html/.htaccess.bak-1791543061`. All 50
addresses in the CSV answered one 301 to their town page, every target answered
200, and the main site's homepage, `/teachers`, `/Pricing`, `/aboutus`,
`/areas-we-cover` and `/apply-to-tutor` still answered 200. Do not also set up
Option 1.

Pick one of the two ways below to switch the redirects on, not both.

## Option 1: Cloudflare (no server access needed)

`old-location-redirects.csv` in this folder is already in Cloudflare's Bulk
Redirects format. Each old address is listed twice, with and without a trailing
slash, and matched exactly: subpath matching is off, so nothing below an old
address is caught. Every line is a 301 that keeps the query string (so a council
directory's tracking tags survive) and covers `www.` too.

1. In the Cloudflare dashboard, open **Bulk Redirects** and create a list, for
   example `old_location_pages`.
2. Import `old-location-redirects.csv` into the list.
3. Create a Bulk Redirect rule that uses the list, and deploy it.

Cloudflare's own steps: https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/

## Option 2: the old site's .htaccess

Paste the block in `old-location-redirects.htaccess` into the main site's root
`.htaccess` (the one that sends every request to `public/`), straight after its
first `RewriteEngine on` line. It must sit above the `public/` rule, or the old
pages are served before the redirect runs. Each rule matches one exact address,
with or without a trailing slash, and nothing else.

## How it was tested

In Apache 2.4, against a copy of the old site's root `.htaccess` (from the
`the-degree-gap-speed-test` repo, the site's Yo!Coach code), with the study site
served from `/study/` beside it:

- each of the 25 old addresses answered one 301 to the right town page, with and
  without a trailing slash, in capitals and with a query string, and every
  target answered 200;
- the old site's subject, tutor-listing and pricing pages, its other town pages
  (the Manchester neighbourhood pages included) and anything below a redirected
  address were not redirected;
- the new site's subject pages and town subject pages all answered 200.

## Check it afterwards

From any terminal, in this repo:

```
while IFS=, read -r src dst rest; do
  printf '%s -> ' "$src"
  curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "https://$src"
done < docs/old-location-redirects.csv
```

Every line should say `301` and the new town page. Then, when convenient, take
the 25 old addresses out of the old site's sitemap and its "areas we cover" links,
so Google is not sent to redirects.

Semrush already saw Canterbury, Epsom, Royal Leamington Spa, Stratford-upon-Avon,
Warwick and Manchester answering 301 in the summer, so some of these may already
redirect somewhere. These rules make sure each goes straight to its new town page
in one step.

## The 25 redirects

Impressions are from Search Console's `www.thedegreegap.com` property, June 2025
to October 2026, so they undercount.

| Old page | Goes to | Notes |
|---|---|---|
| `/areas-we-cover/aldershot-gcse-a-level-tutoring` | `/study/locations/aldershot-tutors/` | 219 impressions |
| `/areas-we-cover/bicester-gcse-a-level-tutoring` | `/study/locations/bicester-tutors/` |  |
| `/areas-we-cover/birmingham-gcse-a-level-tutoring` | `/study/locations/birmingham-tutors/` | 115 impressions |
| `/areas-we-cover/cambridge-gcse-a-level-tutoring` | `/study/locations/cambridge-tutors/` | 6 impressions |
| `/areas-we-cover/canterbury-gcse-a-level-tutoring` | `/study/locations/canterbury-tutors/` | 35 impressions |
| `/areas-we-cover/chelmsford-gcse-a-level-tutoring` | `/study/locations/chelmsford-tutors/` | 34 impressions |
| `/areas-we-cover/cobham-gcse-a-level-tutoring` | `/study/locations/cobham-tutors/` | 12 impressions |
| `/areas-we-cover/didsbury-gcse-a-level-tutoring` | `/study/locations/didsbury-tutors/` | 4 impressions; Manchester City Council directory links here |
| `/areas-we-cover/epsom-gcse-a-level-tutoring` | `/study/locations/epsom-tutors/` |  |
| `/areas-we-cover/henley-on-thames-gcse-a-level-tutoring` | `/study/locations/henley-on-thames-tutors/` |  |
| `/areas-we-cover/kenilworth-gcse-a-level-tutoring` | `/study/locations/kenilworth-tutors/` |  |
| `/areas-we-cover/letchworth-gcse-a-level-tutoring` | `/study/locations/letchworth-tutors/` | 1 impression |
| `/areas-we-cover/loughborough-gcse-a-level-tutoring` | `/study/locations/loughborough-tutors/` | 127 impressions |
| `/areas-we-cover/luton-gcse-a-level-tutoring` | `/study/locations/luton-tutors/` | 283 impressions; Luton Borough Council directory links here (about 1,500 links); new page built October 2026 |
| `/areas-we-cover/manchester-gcse-a-level-tutoring` | `/study/locations/manchester-tutors/` | 77 impressions; Manchester City Council directory links here |
| `/areas-we-cover/marlow-gcse-a-level-tutoring` | `/study/locations/marlow-tutors/` | 53 impressions |
| `/areas-we-cover/royal-leamington-spa-gcse-a-level-tutoring` | `/study/locations/royal-leamington-spa-tutors/` |  |
| `/areas-we-cover/stockport-gcse-a-level-tutoring` | `/study/locations/stockport-tutors/` | 128 impressions; council directory links here |
| `/areas-we-cover/stratford-upon-avon-gcse-a-level-tutoring` | `/study/locations/stratford-upon-avon-tutors/` | 259 impressions |
| `/areas-we-cover/sunbury-on-thames-gcse-a-level-tutoring` | `/study/locations/sunbury-on-thames-tutors/` | 7 impressions |
| `/areas-we-cover/sutton-gcse-a-level-tutoring` | `/study/locations/sutton-tutors/` |  |
| `/areas-we-cover/tamworth-gcse-a-level-tutoring` | `/study/locations/tamworth-tutors/` | 131 impressions |
| `/areas-we-cover/warwick-gcse-a-level-tutoring` | `/study/locations/warwick-tutors/` |  |
| `/areas-we-cover/watford-gcse-a-level-tutoring` | `/study/locations/watford-tutors/` | 70 impressions |
| `/areas-we-cover/york-gcse-a-level-tutoring` | `/study/locations/york-tutors/` | 87 impressions |

## Old town pages left alone (54)

There is no page for these towns on the new site, so they compete with nothing.
That includes the Manchester neighbourhood pages for Chorlton, Rusholme and the
Northern Quarter: the new Manchester page covers the city, but not those exact
places, so they stay as they are.
Redirecting them to another town would throw away whatever they rank for. When a
town gets a new page, add a line for it to both files (two lines in the CSV, with
and without the trailing slash).

Worth building next, by what the old pages still bring in:

- **Doncaster** (226 impressions), **Skipton** (173), **Dudley** (132),
  **Ellesmere Port** (88), **Wokingham** (69), **Lowestoft** (57).
- **Ashton-under-Lyne**: no impressions, but about 830 links from the Manchester
  City Council directory. The same directory links Bolton, Bury, Oldham,
  Rochdale, Worsley and Monton.

The rest: Chorlton, Rusholme, Northern Quarter, Wellingborough, Holmes Chapel,
Chigwell, Eastleigh, Morden, Coleford, Thame, Tewkesbury, Evesham, Northwich,
Rayleigh, Horsforth, Bewdley, Farsley, Buckingham, Canvey Island, Huntingdon,
Arnold, Shinfield, Wisbech, Earl Shilton, Newmarket, Ashwell, West Bromwich,
Oldbury, Atherstone, Bedworth, Nuneaton, Polesworth, Rugby, Burton upon Trent,
Harwich, the three 11+ pages (Bolton, Faversham, Kent) and the three Hong Kong
pages (Admiralty, Choi Hung, Wan Chai).