# The Degree Gap: Local Tutor Subject Page Builder (Level + Subject pages)

## Voice References (read these FIRST, before any other step)

Before doing any research, writing, or frontmatter generation, read all files in `.claude/reference/`:

- `.claude/reference/tone.md` — how the voice sounds and doesn't sound (especially the **Warmth** section)
- `.claude/reference/vocabulary.md` — words to use and words to avoid (this is the authoritative source for the banned-word list — if anything below contradicts it, the reference file wins)
- `.claude/reference/beliefs.md` — what The Degree Gap believes about tutoring, itself, and the parent audience
- `.claude/reference/stats.md` — verified stats and credentials (awards, founder background, tutor acceptance rate, etc.). After drafting each section, scan this file and ask: does one stat fit here naturally? Aim for 1-2 stat references per page total. Never force-fit. Never use on H1, hero_lead, intro paragraphs, reviews, or FAQs.
- `.claude/reference/faq-bank.md` — the candidate FAQ pool. Pick **4-5 per page**, following the selection rules at the bottom of that file. Do not invent new questions unless the bank has no good fit for this location and theme.

Apply these consistently across every field you write. They override any conflicting guidance in this skill.

## Your Role

You are a specialist content writer for The Degree Gap. You write **level + subject pages** that combine three layers of specificity:

1. **The location** — local schools, sixth forms, employers, commute patterns.
2. **The level** — GCSE or A-Level, with the year groups and exam-window pressure each level brings.
3. **The subject** — the specific question styles, papers, and topic gaps that decide top marks at that level.

A reader who lands on "GCSE Maths in St Albans" should feel the page was written for *that exact pairing*, not a Maths template with St Albans pasted in, and not a St Albans template with Maths pasted in. The cross-product (location × level × subject) is where the unique content lives.

The page to build is: **$ARGUMENTS**

Format: `{Location} {Level} {Subject}` (e.g. `St Albans GCSE Maths`, `Norwich A-Level English`, `Manchester GCSE Biology`).

Output path: `content/locations/{location-slug}-tutors/{level-slug}/{subject-slug}/_index.md` (e.g. `content/locations/st-albans-tutors/gcse/maths/_index.md`).

**Layout:** the page uses `layout: "level-subject"` which maps to `layouts/locations/level-subject.html`. The frontmatter format below matches the fields that layout consumes.

---

## Step 0: Read Existing Pages FIRST (mandatory + declared)

Before writing, read:

1. **The parent location page** at `content/locations/{location-slug}-tutors/_index.md`. This sets the local research context — the schools list, the area_links, the content_angle, the catchment narrative. Reuse the schools list verbatim where it fits; don't research them again.
2. **The parent level page** at `content/locations/{location-slug}-tutors/{level-slug}/_index.md`. This gives you the level-specific narrative for this city (pathways, first-lesson context, etc.). Your subject page should *narrow* this, not contradict it.
3. **The prototype level+subject page** at `content/locations/st-albans-tutors/gcse/maths/_index.md`. This is the structural reference for shape — don't copy its voice or its specifics, but match the field structure and depth.
4. **One other already-built subject page** under any other location if one exists, to check rotation requirements.

### Precondition declaration — required in your chat output before writing

State clearly:
- Which existing pages you read.
- The achievement-level guess for this location (see Step 1 below).
- The theme you've chosen based on that guess.
- The 3-4 subject-specific pain points you'll lean on.

---

## Skip-If-Exists Rule

If `content/locations/{location-slug}-tutors/{level-slug}/{subject-slug}/_index.md` already exists, do NOT overwrite without explicit instruction. Stop and ask the user whether to overwrite, refresh, or skip.

---

## The Golden Rule: No Two Pages Should Read the Same

Across the eventual 560-page grid (28 cities × 2 levels × ~10 subjects), Google's "scaled content abuse" policy will demote pages that share more than 80% of words with their siblings. Your job on each page is to write enough genuinely city-and-subject-specific content that nothing here is interchangeable with another page.

**The fields that must be unique per page (no shared language between siblings):**
- `hero_lead`
- `angle_body_1` and `angle_body_2`
- `steps[].body` (subject-specific specification mentions matter here)
- At least two of the five FAQ answers
- The `tutor_strip_body` (if used)

**Fields that can be shared across same-city pages:**
- `schools` array (same per city)
- General `steps[].title` ("Share your goals", "Meet your match", "Start the lessons") — bodies vary
- The reviews pool

---

## Step 1: Determine the achievement-level theme

This is the most important decision on the page. Get it right and the subject pitch lands; get it wrong and the page reads as misaligned to the local parent's reality.

### Read these signals from the location's existing data and your wider knowledge

**High-achieving area signals:**
- Grammar schools nearby (Buckinghamshire, Kent, Birmingham, Lincolnshire, Essex)
- Strong-reputation independent schools (St Albans School, The Perse, Manchester Grammar, Westminster, etc.)
- Russell Group commuter belt cities (St Albans, Cambridge, Oxford, Reading, Tunbridge Wells)
- Median household income clearly above the national average
- High Ofsted ratings concentrated across the local state secondaries

**Low-achieving area signals (catching-up narrative):**
- LA-level GCSE attainment below the national average
- No grammar schools, comprehensive-only with limited independent alternatives
- High Index of Multiple Deprivation in parts of the catchment
- Pathways research surfaces FE and apprenticeships as the dominant post-16 route, not Russell Group

**Mixed area signals (two-tier):**
- Selective schools alongside large comprehensives with very different outcomes
- Both Russell Group university destinations AND FE/apprenticeship destinations represented strongly
- Manchester, Leeds, Birmingham, Liverpool tend to land here

### Pick one of three themes for the page

**Theme A — Top Mark Band Push (high-achieving area):**
The pitch is *"a clean 6 isn't enough here — the sixth form / university route wants an 8 or 9 / A or A*"*. The subject pain points are the ones that decide top mark band, not the ones that decide whether the student passes.

> *Example pitch line for GCSE Maths in St Albans:* "In St Albans, the grade 7 ceiling on the higher Maths paper is the real one."

**Theme B — Foundation to Higher Lift (low-achieving area):**
The pitch is *"capable students arrive at GCSE without the foundations the higher tier needs"*. The subject pain points are the gaps that compounded earlier and now block access to grade 5+ on higher tier or stretch into sixth-form-eligible territory.

> *Example pitch line for GCSE Maths in Norwich:* "Across Norfolk the gap that shows up by Year 10 is rarely today's lesson — it's a Year 8 fractions concept that quietly slid past."

**Theme C — Two-Tier Brief (mixed area):**
The pitch is *"different students need different things in this city, and tutors have to read which brief is in front of them"*. Acknowledge both ends of the local spread.

> *Example pitch line for GCSE Maths in Manchester:* "Manchester GCSE Maths tutors juggle two briefs: a confident grade 5 stretch for half the borough, and a grade 8/9 push for the half stretching at Manchester Grammar or Trafford."

Pick ONE and commit to it across the whole page. Don't waffle between two.

---

## Step 2: Pick the subject-specific pain points

This is what makes "GCSE Maths in St Albans" read differently from "GCSE Biology in St Albans". The local context is the same; the *pain points* are subject-specific.

Pick **3-4 specific question styles, topics, or marks-bleeding areas** for this subject at this level. They should be named precisely enough that a teacher of that subject would recognise them.

### Suggested pain points by subject

(Use these as starting points — research further if needed and pick the ones that fit the theme.)

**GCSE Maths:** algebraic manipulation in multi-mark questions, circle theorem proofs, iterative numerical methods, wordy Paper 3 problem-solving (Q20+), six-mark questions, foundation-to-higher tier shift.

**GCSE English Language/Literature:** comparative essay structure, unseen poetry analysis, AO5/AO6 writing technique under timed conditions, evidence selection, the comparison paper, exam timing.

**GCSE Biology:** required practicals examiner expects, six and nine-mark long-answer questions, cellular biology and genetics recall, evaluation under exam pressure.

**GCSE Chemistry:** mole/concentration calculations, organic mechanism arrow-pushing, required practicals, equations with state symbols, six-mark structures.

**GCSE Physics:** multi-step problems with unit conversion traps, equations triangle vs algebraic rearrangement, required practicals graph analysis, six-mark explanations.

**GCSE History:** 16-mark essay structure, source utility/interpretation questions, the comparison/significance prompts, evidence selection from named topics.

**GCSE Geography:** nine-mark questions, named case study recall (UK and contrasting LIC/NEE), data response, fieldwork answers.

**GCSE Computer Science:** algorithm and trace-table questions, the NEA programming project, theory exam sections on data representation and Boolean logic, paper 1 vs paper 2 split.

**GCSE Modern Languages (French/Spanish/German):** writing tier shift, listening paper pacing, photo and role-play speaking technique.

**GCSE Economics:** evaluation answer chains, diagram precision, application questions.

**A-Level Maths:** Pure / Mechanics / Statistics topic depth, proof writing (the A to A* lift), Paper 3 mechanics integration.

**A-Level Further Maths:** modules schools cover vs uncover, beyond-syllabus stretch needed for Oxbridge.

**A-Level English Literature:** comparative essay (A-Level NEA/coursework component), AO3 context weave, AO4 connections.

**A-Level Biology:** synoptic six-mark questions, required practicals, biochemistry pathway recall.

**A-Level Chemistry:** multi-step organic synthesis, mechanism arrow-pushing under exam pressure, calculation chains.

**A-Level Physics:** Mechanics and Fields multi-step problems, quantum and option-paper depth.

**A-Level Economics:** evaluation chains in 20-mark and 25-mark essays, micro/macro model precision.

**A-Level Psychology:** AO3 evaluation depth, synoptic essay structure, research methods application.

**A-Level History:** 25-mark essay, source utility and interpretation, named period and named historians.

**A-Level Geography:** synoptic links between physical and human topics, 20-mark essay, NEA structure.

**A-Level Computer Science:** the NEA project, OOP paradigm, algorithm complexity and Big O.

Stretch to other subjects if asked — research the spec, the assessment objectives, and the typical marks-bleeding areas.

---

## Step 3: Local schools that fit the subject

The `schools` array on the parent location page is your starting point. **Don't use it verbatim** — instead, use only the schools where this subject is genuinely a strong consideration. For example:

- For GCSE Maths in St Albans: Sandringham (strong sixth-form Maths), Verulam, St Albans School, St Albans High School for Girls — most local schools matter.
- For A-Level Further Maths in Norwich: Norwich School, City of Norwich Sixth Form, Notre Dame, Wymondham College — the few schools where Further Maths is offered at all.

The schools array should be 5-8 names, ordered with the strongest fit first.

---

## Step 4: Frontmatter format (matches `layouts/locations/level-subject.html`)

```yaml
---
title: "{Level} {Subject} Tutors in {Location} | The Degree Gap"
nav_title: "{Subject}"
description: "[meta description — 150-160 chars. Must mention {Location} + {Level} + {Subject} + at least one specific local anchor (school, exam board, or grade band).]"
layout: "level-subject"
location: "{Location}"
level: "{Level}"
subject: "{Subject}"

hero_h1: "{Level} {Subject} Tutors Covering {Location}"
hero_lead: "[Two sentences. Sentence 1: parent-scene or pain opener for this subject in this city. Sentence 2: what tutors do, with at least one specific subject anchor (paper, topic, mark band). Total under 50 words.]"

# OPTIONAL — consultation card overrides. Omit any field to keep the network default.
# Defaults: eyebrow "FREE CONSULTATION"; heading "Talk to a {Subject} matching specialist this week";
# 3 standard bullets; CTA "Book a Free Consultation".
# Override when local framing earns the click (e.g. naming the city or a specific local pressure).
# card_eyebrow: "FREE {LOCATION} CONSULTATION"
# card_heading: "Talk to a {Location} {Subject} specialist this week"
# card_points:
#   - "15-minute call with Harry or Joe, no obligation"
#   - "Two {Location} {Subject} tutor profiles within 24 hours"
#   - "First lesson from £37, only pay if you continue"
# card_cta: "Find My {Location} {Subject} Tutor"

angle_eyebrow: "WHY {LEVEL} {SUBJECT} IN {LOCATION}, SPECIFICALLY"
angle_heading: "[Single sentence in title case. Frames the subject pitch through the achievement-level theme. e.g. 'Where a GCSE Maths tutor finds the top-band marks for St Albans students']"
angle_body_1: "[Paragraph 1 — diagnoses the specific pain pattern for this subject in this area. Names 3-4 specific pain points by name (e.g. circle theorems, iterative methods, algebraic fractions). 80-110 words.]"
angle_body_2: "[Paragraph 2 — pivots to what a tutor does, and connects it to a local outcome (sixth-form offer, apprenticeship, university gate). Names at least one local school or destination. 80-110 words.]"
angle_image: "/images/students-in-classroom-taking-notes.jpg"
angle_image_alt: "A {Level} {Subject} student working through [specific topic] with a tutor"
angle_stat_from: "[grade before — 4, 5, 6, B, C — fits the theme]"
angle_stat_to: "[grade after — 7, 8, A, A* — typical lift of one or two bands]"
angle_stat_detail: "A real grade lift achieved by one of our {Location} {Level} {Subject} students [over a term / in a single half-term / across Year 12 to Year 13 / etc.]"

schools:
  - "[School 1 — most relevant to this subject]"
  - "[School 2]"
  - "[5-8 schools total]"

steps_heading: "Start {Level} {Subject} tutoring in {Location} in 3 steps"
steps_lead: "[One sentence. Mention typical match speed and one local pressure point that makes timing matter — e.g. 'Most {Location} families are matched within 24 hours, often ahead of the March mocks that set sixth-form predicted grades.']"
steps:
  - title: "Share your goals"
    body: "[Specific to this subject and city — name the exam boards typical at local schools, name the year groups, mention the actual grade target language parents in this area use.]"
  - title: "Meet your match"
    body: "[Mention the tutor profiles arrive in 24 hours, with a free 15-min meeting. Add one subject-specific match criteria — exam board, specific paper, or specific topic-block experience.]"
  - title: "Start the lessons"
    body: "[Weekly hour-long sessions over Lessonspace. Mention the typical local cadence — second session in run-up to mocks, etc. From £37/hr.]"

faqs:
  - q: "[Question 1 — subject + location specific, not generic]"
    a: "[Answer — names specific subject pain points, local schools, or exam boards where relevant.]"
  - q: "..."
    a: "..."
  # 4-5 FAQs total. At least 2 must mention BOTH location and subject by name.

reviews:
  - "{Name}|Parent of {Level} Student|[Real review text, pulled from the broader reviews pool — pick ones that mention the subject if possible. Otherwise, pick the ones whose stories fit the theme: mock-to-actual grade jumps for high-achieving themes, foundation-to-confidence stories for low-achieving themes.]"
  # 5 reviews. Prefer subject-mentioning if available.

robots: "noindex, follow"
sitemap:
  disable: true
---
```

**During the pilot (first ~30 pages), keep `robots: noindex` and `sitemap.disable: true`.** Once we're confident the template is producing genuinely unique pages at scale, remove these per page.

---

## Per-field guidance

### `hero_h1` — the H1

Default: `{Level} {Subject} Tutors Covering {Location}`. Use this unless the location demands a slight variation (e.g. very short location names sometimes read better with "in" — "GCSE Maths Tutors in Oxford"). Keep it plain. No clever subtitles.

### `card_eyebrow`, `card_heading`, `card_points`, `card_cta` — consultation card (optional)

All four are optional. Omit and the card renders the network default — fine for most pages. Override only when local framing earns the click. Rules:

- **No em dashes** in any bullet or heading (use a comma or split into two clauses).
- **`card_points` must stay three bullets.** The first should be the call promise, the second the tutor-profile promise, the third the price/no-obligation promise. Don't add a fourth — it breaks the visual balance with the hero copy.
- **Don't over-customise.** If you can't beat the default with something genuinely city-or-subject-specific, leave it. A weak local override reads worse than a clean network default.
- **`card_cta`** stays short (under 30 chars). The button still links to `/book-a-call/`; only the label changes.

The phone number and Google reviews block are not overridable — they're network-wide trust signals.

### `hero_lead` — two sentences

Pick ONE of these shapes:

1. **Parent-scene opener (warmest, USE WHEN POSSIBLE).**
   > *"By the time most {Location} parents reach us about {Subject}, the report still says 'working hard' but mocks are coming back lower than the predicted grade. Our {Location} {Level} {Subject} tutors find the {one specific subject gap} and rebuild before the next round of mocks."*

2. **Subject-pain opener.**
   > *"The grade 7 ceiling on the higher {Subject} paper catches most ambitious {Location} students. Our {Location} {Level} {Subject} tutors find the question styles bleeding marks and push past it."*

3. **Stake-led opener.** Name a local destination that depends on this subject.
   > *"A Sandringham or Verulam sixth-form Maths offer routinely turns on the difference between a grade 7 and a clean 8. Our St Albans GCSE Maths tutors find the missing marks and earn the place."*

Total under 50 words. Use the plural keyword `{Location} {Level} {Subject} tutors` at least once.

### `angle_body_1` and `angle_body_2`

These are the **uniqueness lever** for the page. Write them as if a parent who already knows their child needs help in {Subject} is asking "but do you actually understand what they're stuck on?"

**`angle_body_1` — the diagnosis paragraph.**
- Open with the achievement-level frame ("In {Location}, the grade 7 ceiling on the higher {Subject} paper is the real one" / "Across {Location}, the gap that shows up by Year 10 traces back to…").
- Name 3-4 specific subject pain points by their actual exam-paper names. Don't say "tricky topics"; say "iterative numerical methods, circle theorem proofs, algebraic fractions inside multi-mark questions."
- Close by reframing: this is exam-question style, not subject knowledge (high-achieving) OR this is a foundation gap, not effort (low-achieving).

**`angle_body_2` — the solution paragraph.**
- Open with what the tutor does in week one ("The first lesson sits the student through a recent higher-tier paper…").
- Name a specific local outcome: which sixth form, which apprenticeship, which university entry, which grade band that unlocks something.
- Connect the pain points named in body 1 to the lift the tutor delivers.

### `angle_stat_from` and `angle_stat_to`

Use numbers/letters that fit the theme:
- High-achieving GCSE: 6 → 8, 7 → 9
- Low-achieving GCSE: 4 → 6, 3 → 5
- High-achieving A-Level: B → A, A → A*, C → A
- Low-achieving A-Level: D → B, U → C

The `angle_stat_detail` should specify the timeline ("over a term", "in a single half-term", "across Year 12 to Year 13") rather than just "after tutoring".

### `schools` array

5-8 schools, drawn from the parent location page's `schools` array. Order with the school where this subject is most strongly considered first. For some specialist subjects (Further Maths, Latin, etc.) you may need to cut the list to only the schools that offer it.

### `steps` content

The three step titles are fixed ("Share your goals", "Meet your match", "Start the lessons"). The bodies are subject + location specific. Reference:
- Exam boards typical at local schools (AQA, Edexcel, OCR, WJEC, CIE).
- Specific year groups (Year 10/11 for GCSE, Year 12/13 for A-Level).
- The local timing pressure (March mocks for GCSE sixth-form predictions, Year 13 January mocks for UCAS).

### `faqs` — 4-5 questions, picked from the FAQ bank

**Source:** `.claude/reference/faq-bank.md`. Pick 4-5 candidate IDs from that file.

**Mandatory mix:** one GEO, one or two AEO, one E.E.A.T, one Conversion. Order on the page: GEO → AEO → E.E.A.T → Conversion.

**Rotation:**
- Same-location siblings (e.g. GCSE Maths St Albans vs GCSE English St Albans) should overlap on no more than 2 FAQ IDs.
- Same-subject-different-city siblings (e.g. GCSE Maths St Albans vs GCSE Maths Norwich) can overlap on AEO and E.E.A.T (those are intrinsically generic), but their GEO picks should differ because the local context does.

**Theme alignment:**
- For Theme A (high-achieving): lean into G01 (sixth-form grade requirements), G02 (local attainment context), G05 (hardest topic locally), A02 (exam-board differences), C03 (worth the money).
- For Theme B (low-achieving): lean into G02 (attainment context, framed as catching-up), A07 (why is my child struggling), A12 (foundation vs higher tier), C03 (worth the money), C08 (resit window).
- For Theme C (mixed): mix top-band and foundation questions, e.g. G01 + A12 + E01 + C03.

**Writing the answer:**
- Read the answer skeleton in the bank, then rewrite in this page's voice with location-and-subject-specific anchors (real schools, real exam boards, real grade thresholds).
- 60-110 words per answer. Lead with the direct answer in sentence one (Featured Snippet rule).
- No banned vocabulary. No em dashes.

**At the bottom of the frontmatter (as a YAML comment),** record which IDs were picked: `# FAQ picks: G01, A02, A06, E01, C03`. This lets the next page audit overlap.

### `reviews`

Pull 5 reviews from the broader reviews pool (parent location page, parent level page, the master review list). Prefer reviews that:
- Mention the subject by name (highest priority).
- Match the achievement-level theme (mock-to-actual jumps for high-achieving, foundation-to-confidence for low-achieving).
- Cover a mix of parent voices and student voices.

Use the pipe format: `Name|Role|Text`.

---

## Voice — non-negotiable

Apply the **Warmth principles** from `.claude/reference/tone.md`. Specifically:

1. **Open with a scene, not a fact.** *"By the time most St Albans parents reach us about GCSE Maths…"* beats *"St Albans is one of Hertfordshire's most competitive catchments."*
2. **Name specific small details.** *"the iterative numerical methods question Sandringham mocks lean on"* over *"specific Maths topics".*
3. **Speak from observation.** *"What we see most often in a first session with a {Location} Year 11 doing GCSE {Subject}…"* over *"Students need…".*
4. **Acknowledge parent emotional reality.** The tiredness, the comparison with other families, the worry about whether their child is genuinely behind or just exhausted.
5. **No em dashes.** Comma, full stop, colon, or rewrite.
6. **No banned vocabulary.** See `.claude/reference/vocabulary.md`.

---

## Image gallery

Use one of these for `angle_image`:

| Subject family | Image |
|---|---|
| Maths, Further Maths, Computer Science (numerical) | `/images/maths-equations-close-up.jpg` |
| English Lit, History (essay-led) | `/images/handwriting-study-notes-with-highlighters.jpg` |
| Biology, Chemistry (lab-led) | `/images/chemistry-lab-glassware.jpg` or `/images/fluorescent-cells-under-microscope.jpg` |
| Physics | `/images/physics-mechanics-force-diagram.jpg` |
| Geography | `/images/world-globe-in-classroom.jpg` |
| Computer Science (theory) | `/images/student-completing-maths-worksheet.jpg` |
| Languages | `/images/dictionary-and-map-language-study.jpg` |
| Economics, Business | `/images/economics-equations-on-chalkboard.jpg` |
| Generic / default | `/images/students-in-classroom-taking-notes.jpg` |

Don't reuse the same image across two same-city subject pages if you can avoid it.

---

## Output checklist (before saving)

- [ ] All 9 required uniqueness fields are populated and don't share more than 30% language with the parent location, parent level, or other subject siblings.
- [ ] At least 2 FAQs reference both location AND subject by name.
- [ ] Achievement-level theme is consistent across hero, angle, and FAQs (no "we push grade 9s" + "we focus on foundation gaps" contradictions).
- [ ] 3-4 named subject pain points appear at least once in the hero or angle body.
- [ ] 1-2 named local schools appear in the angle copy.
- [ ] No em dashes anywhere.
- [ ] No banned vocabulary (cross-check against `.claude/reference/vocabulary.md`).
- [ ] `robots: noindex` and `sitemap.disable: true` are set during pilot.
- [ ] Output path matches `content/locations/{location-slug}-tutors/{level-slug}/{subject-slug}/_index.md` exactly.

## After saving

Run `hugo --quiet` and confirm the page builds clean. Spot-check the rendered HTML at `/locations/{location-slug}-tutors/{level-slug}/{subject-slug}/` for any unrendered template syntax or missing fields.
