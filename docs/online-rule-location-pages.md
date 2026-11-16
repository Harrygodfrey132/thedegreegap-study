# Location pages: Tutorful's rule for "online" (16 November 2026)

The location pages now follow the pattern Tutorful uses for "tutors in
[town]" pages. Lessons are online only, and that is said clearly and early,
but it is not the headline, and nothing suggests the tutor is local.

A 20-town pilot ran first (same day). It was rolled out to every town before
any results came in, so there is no control group: read the results as
before/after instead (see below).

## The rule

| Where | What it says |
|---|---|
| H1 | What the parent searched for, nothing else: "GCSE and A-Level Tutors for Ampthill Families" (town), "GCSE Tutors for Ampthill Students" (level), "GCSE Maths Tutors for Ampthill Students" (subject). Never "Online", never "[Town] tutors". |
| Title tag | No "Online". Otherwise unchanged ("Ampthill GCSE Maths Tutors \| The Degree Gap"). |
| Meta description | Always says "online", under 160 characters. |
| First screen | Chips straight under the H1: "Live online lessons · A replay of every lesson · Tutors chosen from across the UK" (`layouts/partials/online-chips.html`). In the first screen on every location page down to a 320×568 phone. |
| Price line | "Live one-to-one lessons online, from £37 an hour". |
| Forms | A note under every submit button that lessons are live and online. |
| Body copy | "tutors for [Town] students", never "our [Town] tutors", "a [Town] GCSE tutor" or "tutors in/covering [Town]". |

Deliberately left as they are:

- "Online [Town] … tutors" in 66 meta descriptions: they say online in the
  same breath, which is the point of the rule.
- 18 FAQ questions such as "Is there a GCSE English tutor in Redhill who can
  come to the house, or is it all online?". They are the parent's question,
  and the answer is the disclosure.
- "Tutoring in [Town]": says where the student is, not the tutor.

The old hook that used to follow the H1 ("…Who Stall on the Wordy
Questions") is gone from the H1. The lead paragraph straight underneath
already makes the same point.

## What changed, in numbers

- H1: 1,689 location pages
- Title: 617 titles lost "Online"
- Meta description: 693 rewritten (74 didn't mention online; 619 said
  "Our [Town] … tutors"). 47 of them lost "From £37" to stay under 160
  characters.
- Body headings, FAQs and copy: 1,438 lines on 804 pages
- No URL, canonical or robots tag changed.

One side effect, fixed on purpose: the "tutors covering other areas" links on
level-subject pages used to fall back to pages in title order, so the first
towns alphabetically (Ampthill, Luton) got most of the links and every title
edit reshuffled them. They now rotate by town name, so they stay put when
titles change and spread evenly (the most links any one page gets fell from 49
to 20).

## How to read it (from about 4 weeks after deploy)

In Search Console, use the `sc-domain:thedegreegap.com` property (the `www`
one doesn't see `/study/`) and filter pages to `/study/locations/`.

1. **Search:** compare clicks, impressions, CTR and average position for the
   4 weeks after the deploy with the 4 weeks before. Allow for the season:
   tutoring searches dip over Christmas, so also compare with the same weeks
   last year if the data is there, or with the blog and subject pages over
   the same period.
2. **Enquiries:** form fills and calls from location pages, before and after.
3. **Lead quality:** of those, how many book. A rise in enquiries that don't
   book could mean the new H1 is drawing in people who wanted someone local.

A short dip in the first week or two after a headline change is normal while
Google recrawls. Look at the trend from week 3.

## How to undo it

The H1, title, description and body changes are in one commit
("Location pages: Tutorful's rule for online on every town"). Reverting it
puts them back exactly. The pilot commit before it and the chips, price line
and form notes (commit "Location templates: online shown in the first
screen…") can stay either way.
