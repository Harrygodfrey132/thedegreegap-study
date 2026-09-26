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

## Exam-board pages: write for the parent, not the examiner

A parent on an exam-board page (e.g. /subjects/gcse-physics-tutor/ocr/)
wants to know we cover their child's board, not how the board builds its
papers. So no spec codes (J249, 8463, 1MA1), paper numbers, marks, topic
codes or acronyms like PAGs. Say plainly that the tutor already knows the
board, then talk about the child: what's going wrong, the mocks, the tier,
cost, fit. Name course variants (OCR Gateway or Twenty First Century,
Edexcel International GCSE, OCR B (MEI), triple or Combined Science) only
to reassure the parent we cover them. The tone rules in
`.claude/reference/tone.md` still apply, as does its reference page,
`content/subjects/gcse-maths-tutor/_index.md`.
