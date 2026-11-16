# "Online" headline pilot (started 16 November 2026)

The conversion audit of the location pages against Tutorful suggested taking
"Online" out of the H1 and the title tag, as Tutorful does, and saying it
straight underneath instead. That is the change most likely to move rankings,
so it starts on 20 towns rather than all 187.

## What changed, on the pilot towns only

- **H1:** "Online" taken out of all 178 H1s. Where that left the town at the
  front ("Aldershot GCSE Tutors Who…"), or the H1 said "tutors in / covering
  [Town]", it was rewritten to "… for [Town] Students" so it doesn't read as
  if the tutors are local (56 written by hand).
- **Title:** "Online" taken out of the 51 titles that had it
  ("Havant GCSE Maths Tutors | Online | The Degree Gap" became
  "Havant GCSE Maths Tutors | The Degree Gap").
- **Meta description:** unchanged, except on the 12 pages whose description
  didn't already say "online". Those now do, so the search result still tells
  people the lessons are online before they click.

Nothing else differs between pilot and control pages: URLs, canonicals, body
copy, internal links and the online chips under the H1 are the same everywhere.

## Pilot towns (20, chosen at random, seed 20261116)

Aldershot, Amersham, Clapham, Crawley, Croydon, Dulwich, Harpenden, Havant,
Hounslow, Leicester, Luton, Plymouth, Portsmouth, Putney, Salford, Slough,
Surbiton, Sutton, Taunton, Weybridge.

Every page under `/locations/<town>-tutors/` for those towns (178 pages).
The other 167 towns are the control and still say "Online" in the H1.

## Online disclosure stays in the first screen

The chips under the H1 ("Live online lessons · A replay of every lesson ·
Tutors chosen from across the UK", `layouts/partials/online-chips.html`) are
in the first screen on all 178 pilot pages on a 375×667 phone (iPhone SE 2nd
and 3rd generation, iPhone 8) and anything larger. On the original 320px
iPhone SE, 55 of them sit just below it.

## How to read it (after 4 weeks, from mid-December)

Compare the pilot towns with the control towns over the 4 weeks before and
the 4 weeks after the change goes live. Use the `sc-domain:thedegreegap.com`
Search Console property: the `www` one doesn't see `/study/locations/`.

1. **Search:** clicks, impressions, CTR and average position for pages
   containing each pilot town's `/locations/<town>-tutors/` path, against the
   same for the control towns. Look at the change in each group, not the raw
   numbers, since late December is quiet for tutoring.
2. **Enquiries:** form fills and calls from pilot-town pages against control
   towns. The town page forms send a hidden `location` field.
3. **Lead quality:** of those enquiries, how many book a lesson. A drop here
   would mean the H1 now attracts people expecting someone local.

Roll it out to every town if pilot clicks and enquiries hold up or improve.
Undo it if pilot pages lose clearly more position or clicks than the control.

## How to undo it

Revert the pilot commit ("Pilot: drop "Online" from H1s and titles on 20
towns"). The H1, title and 12 descriptions go back exactly as they were.
