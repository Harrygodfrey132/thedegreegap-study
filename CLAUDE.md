# The Degree Gap study site

## Lists of links: 10 at most

Any selection of links to other pages (chips, pills and card grids such as
"Keep exploring", "Areas we cover", "Other GCSE subjects", exam boards,
related posts, homepage teasers) shows at most 10 items. Enforce it in the
template with `first 10` rather than trusting the content to stay small.
For lists of areas use `partials/pick-areas.html`, which leads with the
cities in `featuredAreas` in `hugo.toml`, so the pick is the biggest
cities rather than the first ten alphabetically.

The only exceptions are the directory pages whose job is to list everything:
/locations/, /subjects/, /jobs/, /blog/ and /personal-statement-tutor/.
