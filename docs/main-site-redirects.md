# Main site redirects into /study/

The main site (`thedegreegap.com`, a PHP app) and the study site (this repo, served
from `/var/www/html/study`) sit on the same Apache box, `ubuntu@18.134.153.45`.

Redirects **from** the main site cannot live in this repo. `static/.htaccess` ships
into `/study/` and only matches paths beneath it. They go in the main site's own
`.htaccess` at `/var/www/html/.htaccess`.

## Why not Cloudflare

The zone is on the free plan. Single Redirects are capped at 10 rules with no regex
support, and Bulk Redirects at 20 URLs. Neither covers 45 towns. Apache handles the
regex natively with no limit, so origin is the right place.

## The rule (added 2026-08-05)

Sits directly after the `RewriteRule ^sitemap.xml$ ...` line, before the
`<IfModule mod_rewrite.c>` front-controller block. Order matters: the front
controller ends in `RewriteRule (.*) public/$1 [L]`, which would swallow the
request before any later rule ran.

```apache
RewriteRule ^areas-we-cover/(town1|town2|...)-gcse-a-level-tutoring/?$ /study/locations/$1-tutors/ [L,R=301]
```

One rule, 45 towns, one hop, no chain. The town list is every location that has both
an `/areas-we-cover/{town}-gcse-a-level-tutoring` page on the main site and a
`content/locations/{town}-tutors/` page in this repo.

Verified after applying: all 45 return 301 to their study page and land on a live
200. The main site homepage, `/teachers`, `/Pricing`, `/aboutus`, `/areas-we-cover`
and `/apply-to-tutor` all still return 200.

### What it deliberately does not touch

- The 393 `-gcse-a-level-tutoring` towns with no study page yet. Redirecting those
  to a page that does not exist would turn 393 live pages into 404s.
- Every `-11-plus-tutoring` page. Those are a different search intent and there are
  no per-location 11+ pages on the study site. Note that several share a town name
  with a redirected page (`watford`, `st-albans`, `manchester`), so the rule is
  anchored on the full `-gcse-a-level-tutoring` suffix rather than the town alone.
- `lantau-island-igcse-hkdse-tutoring`.

## Adding more towns later

Build the study location page first, confirm `/study/locations/{town}-tutors/`
returns 200, then add the slug to the alternation. Never add a slug whose target
does not exist yet.

## To revert

Timestamped backups sit alongside the file as `/var/www/html/.htaccess.bak-<epoch>`.
Deleting the block restores the previous behaviour; no other file was touched.

## Landmine worth knowing about

The main site's `.htaccess` contains an unterminated quote inside its
`<IfModule mod_headers.c>` block:

```apache
Header set Cache-Control "max-age=31536000
```

`mod_headers` is not currently loaded, so the whole block is skipped and the syntax
error is inert. If anyone ever runs `a2enmod headers` on this server, that line will
throw a 500 across the main site. Fix the quote before enabling the module.
