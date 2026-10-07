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

## Update proposed 2026-10-07: the 54 towns built since August

Not applied yet. It needs someone with SSH access to the main site.

The rule above went in when the study site had 56 towns. It has 110 now, and the
54 built since 5 August were never added: abingdon, aldershot, altrincham, amersham, barnet, basingstoke, bath, beaconsfield, berkhamsted, beverley, bicester, bishops-stortford, bournemouth, bromley, bushey, camberley, cirencester, cobham, croydon, didcot, didsbury, esher, fareham, farnborough, farnham, fleet, gerrards-cross, godalming, harrow, havant, henley-on-thames, hitchin, kenilworth, kingston-upon-thames, knutsford, letchworth, maidstone, marlow, newcastle-upon-tyne, northampton, potters-bar, reigate, rickmansworth, royston, slough, st-neots, stamford, stockport, sutton, tamworth, tonbridge, weybridge, wilmslow, woking.

For each of those towns the main site still serves its own
`/areas-we-cover/{town}-gcse-a-level-tutoring` page beside the study page. Two
pages on one domain compete for the same "tutor in {town}" searches, and the
older, thinner one keeps the links and the history. Semrush shows the old pages
still taking impressions, for example Aldershot, Stockport, Marlow, Tamworth and
Bicester.

Replace the alternation in the existing rule with every study town. It is a
superset of today's list, so the original 45 behave exactly as before:

```apache
RewriteRule ^areas-we-cover/(abingdon|aldershot|altrincham|amersham|aylesbury|baldock|banbury|barnet|basingstoke|bath|beaconsfield|berkhamsted|beverley|bicester|birmingham|bishops-stortford|bournemouth|brighton|bristol|bromley|bushey|camberley|cambridge|canterbury|chelmsford|cheltenham|chesham|chester|cirencester|cobham|colchester|coventry|croydon|derby|didcot|didsbury|epsom|esher|exeter|fareham|farnborough|farnham|fleet|gerrards-cross|godalming|guildford|harpenden|harrogate|harrow|hatfield|havant|hemel-hempstead|henley-on-thames|high-wycombe|hitchin|kenilworth|kingston-upon-thames|knutsford|leeds|leicester|letchworth|liverpool|london|loughborough|maidstone|manchester|marlow|milton-keynes|newcastle-upon-tyne|northampton|norwich|nottingham|oxford|peterborough|portsmouth|potters-bar|reading|reigate|rickmansworth|royal-leamington-spa|royston|sevenoaks|sheffield|slough|solihull|southampton|st-albans|st-neots|stamford|stevenage|stockport|stratford-upon-avon|sunbury-on-thames|sutton|sutton-coldfield|swindon|tamworth|tonbridge|tunbridge-wells|warwick|watford|welwyn-garden-city|weybridge|wigan|wilmslow|winchester|woking|wolverhampton|worcester|york)-gcse-a-level-tutoring/?$ /study/locations/$1-tutors/ [L,R=301]
```

Every slug in it has a live `/study/locations/{slug}-tutors/` page today, so no
redirect can land on a 404. A slug with no matching area page on the main site
never matches anything, so it does no harm. The opposite case does: where the
main site spells a town differently (for example `newcastle` for
`newcastle-upon-tyne`, or `bishop-s-stortford`), that town will not match and
needs its own one-line rule. Check those against the main site's sitemap before
applying.

The same steps as before apply. Back up the file, add the rule in the same
place, then check a handful with `curl -sI`: a 301 to the study page, which
returns 200. The main site homepage, `/teachers`, `/Pricing`, `/aboutus`,
`/areas-we-cover` and `/apply-to-tutor` should all still return 200.

When the next town is built, add its slug here and on the server in the same
sitting.

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
