# The Degree Gap: Local Tutor Subject Page Builder (Level pages — GCSE / A-Level)

## Voice References (read these FIRST, before any other step)

Before doing any research, writing, or frontmatter generation, read all files in `.claude/reference/`:

- `.claude/reference/tone.md` — how the voice sounds and doesn't sound
- `.claude/reference/vocabulary.md` — words to use and words to avoid (authoritative source for the banned-word list — if anything below contradicts it, the reference file wins)
- `.claude/reference/beliefs.md` — what The Degree Gap believes about tutoring, itself, and the parent audience
- `.claude/reference/stats.md` — verified stats and credentials (awards, founder background, tutor acceptance rate, etc.). After drafting each section on each page, scan this file and ask: does one stat fit here naturally? Aim for 1-2 stat references per page total (so 2-4 across both pages, not duplicated). Never force-fit. Never use on H1, hero_lead, first_lesson_quote, reviews, or FAQs.

Apply these consistently across every field you write on both pages. They override any conflicting guidance in this skill. The skill below describes structure and rotation; the reference files define voice.

## Your Role

You are a specialist content writer for The Degree Gap. You build **per-level deep-dive pages** for a UK location: one focused on GCSE tutoring and one focused on A-Level tutoring. Both pages live under the existing parent location page (e.g. `/locations/derby-tutors/`) and use the shared `subject.html` template.

The location to build is: **$ARGUMENTS**

When given a location name (e.g. `Birmingham`), produce **TWO** Hugo `_index.md` files in a single run:

1. `content/locations/{location-slug}-tutors/gcse/_index.md`
2. `content/locations/{location-slug}-tutors/a-level/_index.md`

Both use the same `subject.html` layout but have **fully distinctive content** appropriate to their level.

**Page URL patterns:**
- GCSE: `/locations/{location}-tutors/gcse/`
- A-Level: `/locations/{location}-tutors/a-level/`

---

## Step 0: Read Existing Level Pages FIRST (mandatory + declared)

Before writing a single word of frontmatter, list every existing level page and read at least two of each level:

```bash
find content/locations -name "_index.md" -path "*gcse*" -o -path "*a-level*" -name "_index.md"
```

Read at least **two GCSE pages** and **two A-Level pages** that already exist. Note their `hero_heading_line1` (H1), `first_lesson_heading`, `first_lesson_eyebrow`, `tutor_strip_heading`, `pathways_heading`, `pathways_lead`, and all 4 FAQ questions.

### Precondition declaration — required in your chat output before writing

You MUST output a short precondition block in your assistant response **before saving any file**. If this block is missing, the user knows you skipped Step 0 and will reject the work. Format:

```
PRECONDITION CHECK ({Level} page for {Location})
Read: <path/to/existing/page-1>
Read: <path/to/existing/page-2>
Used by those pages — avoid duplicating:
  H1 (hero_heading_line1): "<from page 1>", "<from page 2>"
  first_lesson_heading: "<from page 1>", "<from page 2>"
  eyebrow: "<from page 1>", "<from page 2>"
  tutor_strip_heading: "<from page 1>", "<from page 2>"
  pathways_heading: "<from page 1>", "<from page 2>"
  FAQ questions: "<from page 1>", "<from page 2>"
My choices for this page (different from above):
  H1: "<new>"
  first_lesson_heading: "<new>"
  eyebrow: "<new>"
  tutor_strip_heading: "<new>"
  pathways_heading: "<new>"
  4 FAQ questions: "<new>", "<new>", "<new>", "<new>"
```

This declaration is the single most important rule in the skill. If you cannot fill it in, you have not done Step 0 — stop and re-read. Do not write any frontmatter until this block is in your response.

**Your new page must not duplicate any of those phrasings.** If you can't think of a phrasing that isn't already on another page, **invent a new option in the spirit of the existing inspiration examples rather than reuse one**.

---

## Skip-If-Exists Rule

**Before doing any research or writing**, check whether the target files already exist:

```bash
ls content/locations/{location-slug}-tutors/gcse/_index.md 2>/dev/null
ls content/locations/{location-slug}-tutors/a-level/_index.md 2>/dev/null
```

If a file exists, **skip it** — do not overwrite. The user has hand-written content there. Report which files you skipped at the end. If both already exist, exit early with a note saying both pages exist and no work is needed.

If neither exists, proceed with both. If only one exists, build only the missing one.

You must also check the parent location page exists at `content/locations/{location-slug}-tutors/_index.md`. If the parent does not exist, **stop and inform the user** that they need to run `/build-location {Location}` first to create the parent location page. Subject pages can only be added after the parent exists.

---

## The Golden Rule: No Two Pages Should Read the Same

Every section produced by this skill must be written fresh. You are not filling in a template. You are writing new copy every time, guided by the structural banks below.

If a parent in Birmingham and a parent in Derby both visit their GCSE pages, the pages should feel like different pieces of writing — different sentence openings, different headings, different angles, different FAQ phrasings. Not the same paragraph with the city name swapped.

Equally important: the **GCSE page and the A-Level page for the same city** must read as separately authored documents. Different angle, different pain points, different structural choices for headings and FAQs. Do not write one and then mirror it for the other level.

**If a sentence on the page you're writing could appear word-for-word on another city's page just by swapping the location name, rewrite it.**

---

## Keyword Strategy: Read This Before Writing

These pages must rank for level-specific tutoring searches. Google needs to see the right keywords in the right places. Follow these rules without exception.

**Target keyword patterns:**
- For GCSE pages: `[Location] GCSE tutor` / `GCSE tutoring [Location]` / `GCSE tutor [Location]`
- For A-Level pages: `[Location] A-Level tutor` / `A-Level tutoring [Location]` / `A-Level tutor [Location]`

**The principle:** modern Google reads topical relevance, not exact-match keyword density. A page with `[Location] {Level} Tutors` in the title, H1 and description is already strongly anchored on the target keyword. Stuffing the same phrase into every paragraph produces *worse* SEO outcomes (helpful-content penalties) and a worse reader experience. Use the keyword where it naturally belongs. No quotas.

**Hard SEO anchors (must contain the keyword):**

1. **`title`** — must contain `[Location] {Level} Tutors` or `{Level} Tutor [Location]`.
2. **`description`** — must contain `[Location] {Level} tutor` or `{Level} tutoring in [Location]` naturally (single mention is enough).
3. **`hero_heading_line1`** — the H1. Must contain `{Location}` AND `{Level}` AND `Tutors`, plus a pain-point continuation. The whole H1 sits in this field (8-14 words). `hero_heading_line2` is deprecated and must be left as `""`.
4. **`hero_lead`** — should use the plural phrase `{Location} GCSE tutors` or `{Location} A-Level tutors` once (it's the natural anchor right under the H1). One mention is enough.
5. **`first_lesson_heading`** — must contain `{Level} Tutor` or `{Level} Tutoring`.

**Soft guidance for body sections (no quotas, just natural use):**

6. **`first_lesson_context`** — use `{Level} tutor` or `{Level} tutoring` where it fits the sentence. **One natural mention is enough.** Do not repeat the same prefix in adjacent sentences — that's stuffing.
7. **`tutor_strip_heading` + `tutor_strip_body`** — the heading typically carries the keyword. The body can reference "the tutor" or "tutors" without the level prefix if that reads better.
8. **`pathways_heading` + `pathways_lead`** — one mention of `{Level} tutor/tutoring/tuition` across the heading and lead is fine. If it doesn't fit, skip it — the pathways section is about destinations, not tutoring.
9. **`pathways` accordion bodies** — these should be about the destination (sixth form, university, employer), not the tutoring. **Do not force a tutor/tutoring/tuition mention into every body.** If one of the three bodies naturally references how tutoring helps reach that destination, fine. If none do, also fine. Editorial fit beats density.
10. **FAQs** — answer the question. If the question is about Maths or online sessions or cost, the answer naturally uses the relevant keyword. Don't bolt the location-plus-level phrase into every answer.
11. **Subject mentions across the page** — at some point the page should reference real subject pain (Maths foundation gaps, English essay structure, Sciences required practicals). When you do, the phrase "{Level} Maths tutor" or "A-Level Chemistry tutor" should sit inside that natural editorial context — not be listed as "the most-requested subjects" or "leading subject demand". **Quota: zero.** Mention what the page is actually about. If a page leans into the Maths angle, Maths gets named multiple times. If it leans into UCAS essay work, English Literature gets named. Topic-led writing beats checklist-led writing every time.

**Banned phrasings (these came out of past audit and read as template-fill):**

- "leading subject demand"
- "lead the demand here"
- "the most-requested tutors are X and Y"
- Same bare prefix (`GCSE tutor`, then `GCSE tutoring`) in two adjacent sentences

**If you're tempted to write any of those, you've reached for a list to satisfy a rule. Delete the list and write what the section is actually about.**

**Keyword variations to weave in naturally:**
- GCSE tutor / GCSE tutoring / GCSE tuition
- A-Level tutor / A-Level tutoring / A-Level tuition
- private tutor / private tutoring / one-to-one tutoring / one-to-one tuition
- online tutor / online tutoring
- [Location] tutor / [Location] tutoring / GCSE tutor [Location] / A-Level tutor [Location]

**What NOT to do:**
- Do NOT replace "tutor" with "educator", "mentor", "specialist", or "expert" when "tutor" is the natural word.
- Do NOT pad with generic copy. Each sentence should either deliver information or earn keyword value.
- Do NOT use the same phrasings across GCSE and A-Level pages for the same city.
- **The Degree Gap is online-only.** Never write "in person", "in-person", "face-to-face", "at-home visits" or any phrase implying physical visits. All sessions run through Lessonspace. FAQs about delivery format should ask "How does online tutoring work?" or "Is tutoring online?" — never "online or in person?".

---

## Local Research: Do This Before Writing

You need different research per level. **Do both rounds.** Cite findings to a source domain in your working notes — final copy never includes raw citations.

### GCSE Research (for the GCSE page)

**Search 1 — Local GCSE attainment context (direction only, no numbers on the page)**
Query: `[Location] GCSE results area level`
Look for:
- Whether the LA sits above, around, or below the England average — direction only
- Direction of travel — improving, declining, flat
- **Use this qualitatively in your writing. Do NOT publish specific Attainment 8, % 9-4, or % 9-5 figures on the page** — parents don't care about the numbers and unverified figures hurt trust. Stick to "close to the national picture", "above the England average", "below the national figure" etc.
- **Use LA / borough level only, never attribute to a named school.**

**Search 2 — Local sixth forms and post-16 destinations**
Query: `[Location] sixth form colleges grade requirements entry`
Look for:
- Popular school sixth forms for {Location} students
- Stand-alone sixth form colleges in the area
- Typical grade requirements (most ask grade 5 minimum, grade 6 in the subject for A Level)
- Main FE colleges and their campuses

**Search 3 — Local apprenticeship landscape**
Query: `[Location] apprenticeships major employers engineering manufacturing`
Look for:
- Largest local employers running apprenticeship schemes
- Any specific industry concentration
- Degree apprenticeships at local universities or employers

**Search 4 — Local schools (for the parent quote context)**
Query: `[Location] secondary schools Ofsted Outstanding selective`
Look for:
- 1-2 named higher-performing schools you can reference
- Whether the area has grammar schools or is comprehensive-only

### A-Level Research (for the A-Level page)

**Search 1 — Local A-Level attainment context (direction only, no numbers on the page)**
Query: `[Location] A-Level results area level`
Look for:
- Whether the LA sits above, around, or below the national picture — direction only
- Direction of travel
- **Use qualitatively. Do NOT publish specific % A*-A, % A*-B, or Value Added scores on the page.** Parents don't care about the numbers and unverified figures hurt trust. Stick to directional language.
- **LA / borough level only.**

**Search 2 — University destinations**
Query: `[Location] university destinations UCAS Russell Group acceptance rates`
Look for:
- Most-applied-to institutions from {Location}
- Russell Group / Oxbridge acceptance rates (LA level only)
- Local universities and typical entry standards

**Search 3 — Local degree apprenticeships and graduate employers**
Query: `[Location] degree apprenticeships graduate schemes major employers`
Look for:
- Degree apprenticeship schemes with local employers
- Major graduate-route employers
- Any commuter dynamic to a bigger nearby city

**Minimum bar test:** Before writing, you must be able to complete both:
- *"The thing that makes {Location}'s GCSE situation meaningfully different is..."*
- *"The thing that makes {Location}'s A-Level situation meaningfully different is..."*

If you can't, keep researching.

---

## Tutor Scraping (Both Pages)

Visit `https://thedegreegap.com/teachers/languages/GCSE-Maths` (and A-Level equivalents) using WebFetch to find the current tutor roster.

For each page, pull 8-10 tutors whose profiles indicate they teach that level. Cast a reasonable mix across the main subjects. Bias A-Level selection slightly towards subjects the city is known for (Economics in a finance hub, Engineering in a manufacturing city, etc.).

For each tutor extract:
- `name` — first name + last initial (or full name)
- `url` — the profile URL on thedegreegap.com
- `image` — the profile image URL

```yaml
tutors:
  - name: "Avery Goldie"
    url: "https://thedegreegap.com/teachers/view/averygoldie"
    image: "https://thedegreegap.com/cache/bd/9b400d603fa3eed019a026bd303ed4.jpg"
```

---

## Review Filtering (Both Pages)

**CRITICAL: Reviews are real customer testimonials. The canonical Reviews Bank lives in `.claude/commands/build-location.md` under "Reviews Bank (use first names only, do not use full surnames)". 40 reviews are stored there. Open that file, find the bank, and copy each chosen review character-for-character.**

Do NOT:
- Re-word any sentence, replace em dashes/apostrophes/punctuation, add or remove text
- Combine two reviews
- Invent a city-themed review
- Use any review not in the bank

Use first names only.

**Reviews are the ONE exception to the no-em-dash rule.** If a bank review contains an em dash, it stays. Your own copy must still be em-dash-free.

**For the GCSE page**, include only reviews that:
- Mention GCSE, iGCSE, or a clearly GCSE-aged outcome
- Reference a GCSE grade jump
- Are from "Parent of GCSE Student" or "GCSE Student"

**For the A-Level page**, include only reviews that:
- Mention A-Level, A2, AS, or "Year 13"
- Reference an A-Level grade outcome
- Mention university admission
- Are from "Parent of A-Level Student", "A-Level Student", or "University Student/Applicant"

Aim for **15-25 reviews per page**. Quality over quantity.

**Vary review order across pages.** Do not always put Omo first on every GCSE page or Nick first on every A-Level page. Pick a different anchor and re-shuffle the rest.

Pick one review per page to be the **anchor for the hero grade card AND the first-lesson quote**. The grade card and the quote section must reference the same person. The card's grade_from / grade_to / grade_stat must come from EXPLICIT grades stated in that review.

**No fabrication.** If the review says "improved his latest grades" or "real grip of complicated areas", that's a qualitative review and does NOT support a numerical grade card. Either pick a different anchor whose review states explicit grades, or rewrite the section. Never invent grades, never round, never interpolate. Parents notice and Google's quality raters penalise unverified specific claims.

**Reviews with explicit grade jumps you can legitimately use as anchors:**

GCSE anchors:
- **Omo** — "improved from a grade 5 to a 6/7" in GCSE English → grade_from: "5", grade_to: "7"
- **Keira** — "increase my grades from an E to a B" → grade_from: "E", grade_to: "B"
- (limited bank — most GCSE reviews are qualitative)

A-Level anchors:
- **Daljit** — "two grades higher than his year 13 mock paper" → grade_from: "C", grade_to: "A" (interpretable two-letter jump)
- **Joanna** — "turn E and U grades into 3 C grades" → grade_from: "E", grade_to: "C"
- **Alexander** — "from Cs to As" → grade_from: "C", grade_to: "A"

**Reviews that are NOT legitimate anchors (qualitative only — do not put numbers in the card):**

- Nick (Psychology, "improve his latest grades") — vague
- Mahir (Economics, "real grip of complicated areas") — vague
- Sarom (Economics, "patience, motivator, subject matter expertise") — no grades
- Alison (History + Sociology, "tremendous support, teaching content as well as exam technique") — no grades

These reviews can still appear in the reviews carousel. They just can't anchor the grade card.

**Acceptable: the same anchor on multiple cities.** Daljit/Joanna/Alexander each anchoring 2-3 A-Level pages is fine. Real testimonials repeating is more honest than fabricated variety.

---

## Rotation Banks (this is what makes pages distinct)

For each of the fields below, the skill provides a bank of structural shapes or phrasings. **Pick a different option from each bank than the one the last page in the repo used.** Do not default to option 1 every time. If the last GCSE page used heading option 3, your new GCSE page picks 1, 2, 4, 5, 6 or 7 — never 3.

### Title Format (`title`)

Pick one **slot A** opener and one **slot B** suffix. Final string must be **65 characters or fewer**.

**Slot A (rotate):**
- `GCSE Tutors in {Location}` / `A-Level Tutors in {Location}`
- `{Location} GCSE Tutors` / `{Location} A-Level Tutors`
- `Private GCSE Tutors in {Location}` / `Private A-Level Tutors in {Location}`
- `Online GCSE Tutors in {Location}` / `Online A-Level Tutors in {Location}`
- `Expert GCSE Tutors in {Location}` / `Expert A-Level Tutors in {Location}`
- `{Location} GCSE Tuition` / `{Location} A-Level Tuition`

**Slot B (rotate):**
- `| The Degree Gap`
- `| One-to-One Support | The Degree Gap`
- `| Expert Tutors | The Degree Gap`
- `| Online One-to-One | The Degree Gap`
- `| Built Around Your Child | The Degree Gap`

Count the characters. If the combination runs long, pick a shorter slot A.

### Hero Heading — ONE H1, not two lines

**Template behaviour:** the `<h1>` renders `hero_heading_line1` followed by an optional `<br>` and `hero_heading_line2`. **For these pages we use line 1 only. Leave `hero_heading_line2` blank (empty string `""`).**

The H1 must be one coherent phrase that contains both:
1. The SEO keyword (`{Location} {Level} Tutors` or `{Level} Tutors in {Location}`)
2. The pain point or differentiator the page is anchored on

**Length:** 8-14 words total. Long enough to carry a pain point, short enough to read as a heading at H1 size.

**Structure (pick one shape):**

1. `{Location} {Level} Tutors Who [verb pain]`
   - `Manchester A-Level Tutors Who Lift Predicted Grades Before UCAS`
   - `Bristol GCSE Tutors Who Close the Gap Before Mocks`
2. `{Location} {Level} Tutors For [pain context]`
   - `Liverpool GCSE Tutors For the Year 11 Mock Window`
   - `Birmingham A-Level Tutors For the GCSE-to-A-Level Jump`
3. `{Location} {Level} Tutors Built for [outcome]`
   - `Derby GCSE Tutors Built for the Year 11 Sprint`
4. `{Level} Tutors in {Location} Who [verb pain]`
   - `A-Level Tutors in Manchester Who Push Predicted Grades Up`
   - `GCSE Tutors in Bristol Who Fix Exam Technique Fast`

**Required:**
- Contains `{Location}` AND `{Level}` AND `Tutors` (SEO H1 anchor)
- Names a broadly-felt pain point (not a niche route like Oxbridge or HSBC)
- One coherent phrase, not two stacked sentences
- 8-14 words

**Banned:**
- Splitting into two lines via `hero_heading_line2`. Leave it empty.
- Niche local anchors (`Built for Clifton and Bristol Grammar`, `For Medicine and Oxbridge`).
- Full sentences with main verb + period — this is a heading, not a sentence.
- Repeating `Tutors` twice in the phrase.

### Hero Line 2 — DEPRECATED, leave empty

```yaml
hero_heading_line2: ""
```

The previous design split the H1 across two lines. That produced visual stacking issues. Use line 1 only; leave line 2 as empty string.

### Pain-Point Hook Bank (level-specific) — use as inspiration for the H1 + Hero Lead

These hooks are written in pain→solution Q+A shape. Each is anchored to a Year-group, mock-cycle or UCAS milestone that applies only at that level. Use them as inspiration when writing:

- **The H1 (`hero_heading_line1`)** — extract the pain phrase, fit it into the 8-14 word H1 structure (`{Location} {Level} Tutors Who [verb the pain]`). E.g. hook #4 ("Stuck on a Year 8 topic that never clicked") → H1: `Birmingham GCSE Tutors Who Find the Year 8 Gap`.
- **The hero_lead paragraph** — use the hook as a starting point for sentence 1, then write a fresh solution in sentence 2 with the plural keyword.

**Key rule:** for both H1 and lead, you want the **widest possible parent recognition**. The high-achievement hooks (#20-23, #41-45) are for niche segments and should usually NOT anchor the hero — most parents searching don't have a child applying to Oxbridge or HSBC. Save those niche framings for body sections (pathways, FAQ #1, tutor_strip).

For the hero, default to academic-struggles, exam-pressure, or confidence hooks (#1-19, #24-40). Those describe pain that any GCSE or A-Level parent recognises.

Never paste verbatim. The bank is inspiration, not copy-paste source.

#### GCSE Pain-Point Hooks

**Academic struggles (Year 9–11 specific):**
1. *Falling behind in Year 10 in {loc}?* / Our {loc} GCSE tutors trace the gap back to where it started and close it before mocks.
2. *Grades slipping in Year 11 mocks in {loc}?* / Our {loc} GCSE tutors find the topics losing marks and fix exam technique in weeks, not terms.
3. *GCSE Maths feels overwhelming in {loc}?* / Our {loc} GCSE tutors break algebra, geometry and problem-solving into steps your child can hold onto.
4. *Stuck on a Year 8 topic that never clicked in {loc}?* / Our {loc} GCSE tutors find foundational gaps fast and rebuild from there.
5. *GCSE Sciences calculations losing marks in {loc}?* / Our {loc} GCSE tutors drill the six-mark questions and required practicals examiners actually weight.
6. *GCSE English essays falling short in {loc}?* / Our {loc} GCSE tutors tighten essay structure and unseen poetry analysis under timed conditions.
7. *Not improving despite revision in {loc}?* / Our {loc} GCSE tutors teach exam-day strategy, not just more content.

**Exam pressure & results (mock cycles, sixth-form bar):**
8. *November mocks landed harder than expected in {loc}?* / Our {loc} GCSE tutors run past papers and rebuild technique before March.
9. *March mocks setting the predicted grade in {loc}?* / Our {loc} GCSE tutors lift predicted grades into the band sixth forms ask for.
10. *Need grade 7+ for selective sixth forms in {loc}?* / Our {loc} GCSE tutors push grade 6 students into clean grade 7 and grade 8 territory.
11. *Need a confident grade 5 in English and Maths in {loc}?* / Our {loc} GCSE tutors close the basics-pass gap before exam day.
12. *Mock predicted grade below the sixth-form offer in {loc}?* / Our {loc} GCSE tutors lift the predicted grade in time for conditional offers.
13. *Retaking GCSE Maths or English in {loc}?* / Our {loc} GCSE tutors focus on what went wrong, not racing through the textbook.

**Confidence & motivation (GCSE-aged):**
14. *Bright student who's "just not good at Maths" in {loc}?* / Our {loc} GCSE tutors rebuild belief alongside grade movement.
15. *Stopped putting their hand up in Year 10 in {loc}?* / Our {loc} GCSE tutors create a one-to-one space where questions don't cost anything.
16. *Anxious about Year 11 in {loc}?* / Our {loc} GCSE tutors split the year into manageable half-term plans.

**School environment (GCSE-stage):**
17. *Class of 32 limiting one-to-one in {loc}?* / Our {loc} GCSE tutors give students the time the classroom can't.
18. *Supply teaching covering core GCSE topics in {loc}?* / Our {loc} GCSE tutors plug gaps from inconsistent teaching fast.
19. *Exam board different to siblings' in {loc}?* / Our {loc} GCSE tutors match by spec (AQA, Edexcel, OCR, WJEC), not just subject.

**High-achievement & selective routes:**
20. *Aiming for grade 9 across the board in {loc}?* / Our {loc} GCSE tutors stretch students past grade 7 with examiner-mindset work.
21. *Preparing for grammar or independent sixth-form entry in {loc}?* / Our {loc} GCSE tutors coach the selective-school bar specifically.
22. *Want stretch beyond classroom pace in {loc}?* / Our {loc} GCSE tutors push high-achievers into A-Level content early.
23. *iGCSE pace at an independent school in {loc}?* / Our {loc} GCSE tutors match the iGCSE spec and pace (CIE, Edexcel International).

#### A-Level Pain-Point Hooks

**Academic struggles (Year 12/13 specific):**
24. *A-Level Maths feels like a different subject from GCSE in {loc}?* / Our {loc} A-Level tutors rebuild the pure, mechanics and statistics gap school doesn't have time for.
25. *Grade 8/9 at GCSE Maths but struggling at A-Level in {loc}?* / Our {loc} A-Level tutors close the GCSE-to-A-Level jump fast.
26. *Essays summarising instead of evaluating in {loc}?* / Our {loc} A-Level tutors drill AO3 evaluation chains examiners actually mark.
27. *Chemistry calculations landing but explanation marks slipping in {loc}?* / Our {loc} A-Level tutors fix the explain-evaluate split.
28. *A-Level Economics 25-mark essay losing structure in {loc}?* / Our {loc} A-Level tutors teach evaluation depth and diagram weighting.
29. *A-Level Psychology research-methods marks slipping in {loc}?* / Our {loc} A-Level tutors drill AO3 evaluation and applied scenarios.
30. *Two-hour-thirty paper running out of time in {loc}?* / Our {loc} A-Level tutors fix the endurance gap before exam day.

**Exam pressure & UCAS:**
31. *Year 12 end-of-year exams below predicted in {loc}?* / Our {loc} A-Level tutors lift grades before predictions go to UCAS.
32. *Year 13 January mocks deciding UCAS predicted grades in {loc}?* / Our {loc} A-Level tutors close the predicted-grade gap before mocks.
33. *Predicted grade below the Russell Group offer in {loc}?* / Our {loc} A-Level tutors push ABB into AAB and AAB into AAA.
34. *A* required for Medicine or Oxbridge in {loc}?* / Our {loc} A-Level tutors run the A*-grade examiner-mindset work schools rarely have time for.
35. *Retaking an A-Level in {loc}?* / Our {loc} A-Level tutors fix specific exam-day patterns, not the whole specification again.

**Confidence & motivation (Year 12/13):**
36. *High-achiever who's never had to work hard until A-Level in {loc}?* / Our {loc} A-Level tutors meet the imposter feeling head-on and rebuild study habits.
37. *Confidence dropping after Year 12 mocks in {loc}?* / Our {loc} A-Level tutors restart from where the gap is, not where the syllabus says.
38. *Considering dropping a subject in {loc}?* / Our {loc} A-Level tutors find the recoverable gap before the drop deadline.

**Sixth-form environment:**
39. *Sixth form moving fast through specification in {loc}?* / Our {loc} A-Level tutors reinforce A-Level depth the classroom doesn't have time for.
40. *Limited one-to-one feedback on essays in {loc}?* / Our {loc} A-Level tutors mark and re-mark essays the way examiners would.

**High-achievement & post-18 routes:**
41. *Targeting Oxbridge or Medicine in {loc}?* / Our {loc} A-Level tutors run interview prep, UCAT/BMAT coaching, and the A*-grade gap work.
42. *Personal statement feeling generic in {loc}?* / Our {loc} A-Level tutors help shape personal statements admissions tutors actually read.
43. *Aiming at a degree apprenticeship asking AAB in {loc}?* / Our {loc} A-Level tutors push predicted grades into the AAB band the scheme needs.
44. *Russell Group conditional offer requiring a specific A grade in {loc}?* / Our {loc} A-Level tutors target the subject and grade specifically.
45. *Want EPQ to lift UCAS in {loc}?* / Our {loc} A-Level tutors help structure the EPQ and the research it sits on.

**How to use the hook bank:**
- Pick **one** hook that matches the city's strongest pain (the angle you identified in research).
- For the H1 (`hero_heading_line1`): extract the pain phrase and fit it into the 8-14 word H1 structure (see the four H1 shapes above). E.g. hook #4 ("Stuck on a Year 8 topic that never clicked") → `Birmingham GCSE Tutors Who Find the Year 8 Gap`.
- For Hero Lead: use the hook's Q+A shape as a starting point, then rewrite both sentences with city-specific anchors (named school, employer, sixth-form).
- Never paste the hook verbatim. The bank is inspiration, not copy-paste source. Pages need fresh wording.
- Cross-check: if the last city's page used hook #N, your page picks a different one.
- **Reminder:** `hero_heading_line2` is deprecated. The whole H1 sits in `hero_heading_line1`. Leave line 2 as an empty string.

---

### Hero Lead (`hero_lead`) — broad pain in one sentence, solution in one sentence

This is the banner subline. It is **two sentences. Maximum three.** Pain or context first, solution second. Concise, parent-facing, no slogans.

**The hero lead is where the broadest set of GCSE/A-Level parents need to feel "yes, this is for me."** A parent whose child isn't applying to Clifton or HSBC should still nod at line 1. **Save the named-school/named-employer detail for the body sections** (first_lesson_context, tutor_strip_body, pathways) — those are read after the parent has decided the hero applies to them.

**Required:**
- Sentence 1 must reference a **broad GCSE or A-Level pain** that applies to a wide slice of parents in the city — predicted grades, mocks, the GCSE-to-A-Level jump, exam pressure, foundation gaps. NOT a niche route only the top 5% care about.
- Sentence 2 must use the **plural keyword** `{Location} GCSE tutors` or `{Location} A-Level tutors` at least once. The plural matters — it's what parents type into Google.
- Total under 50 words. Aim for 30-40.
- **No specific named schools, employers or universities in the hero lead.** That detail is earned in the body.

**Four structural shapes — pick one, rotate across pages:**

1. **Pain → solution.** Sentence 1 names a broadly-felt pain. Sentence 2 names what the tutor does.
   > *"Mock results just came back and the predicted grade isn't where it needs to be. Our Bristol GCSE tutors trace the gap back to where it started and rebuild before the next round of mocks."*

2. **Question → answer.** Sentence 1 is the parent's actual question. Sentence 2 is the direct answer using the plural keyword.
   > *"Year 11 mocks landed harder than expected? Our Bristol GCSE tutors find the topics losing the most marks and fix exam technique in weeks, not terms."*

3. **Stake → fix.** Sentence 1 names what's at risk (the predicted grade, the sixth-form offer, the UCAS submission). Sentence 2 names how tutoring changes it.
   > *"By March, mock grades become the predicted grade your sixth form sees. Our Bristol GCSE tutors lift students out of borderline-5 territory into a confident grade 6 or 7."*

4. **Bold claim → proof.** Sentence 1 is a confident, plain statement. Sentence 2 grounds it in a moment in the year.
   > *"Our Bristol A-Level tutors lift predicted grades by a band, sometimes two. Most start in Year 12, ahead of the January mocks that decide UCAS offers."*

5. **Foundation-gap opener (GCSE only).** Sentence 1 names a broadly-felt early-years gap that compounds into Year 11. Sentence 2 names the trace-and-rebuild.
   > *"By Year 11 most GCSE struggles trace back to a Year 8 or 9 topic nobody re-explained. Our Bristol GCSE tutors find that root gap in week one and rebuild from there."*

6. **Comparison opener.** Sentence 1 names a broad contrast inside the parent reader's mind (grade 5 vs grade 8 trajectories, Year 12 vs Year 13 needs). Sentence 2 names what tutoring does in both halves. No named local schools.
   > *"Some Year 11s arrive needing a confident grade 5 in English and Maths; others are stretching for grade 8 and 9. Our Manchester GCSE tutors handle both briefs."*
   (3 sentences allowed for this shape only.)

7. **Time-pressure opener.** Sentence 1 names a deadline window every parent at this level knows (March mocks, Year 13 January mocks, UCAS prediction submission). Sentence 2 names what one-to-one work fixes inside that window.
   > *"Year 13 January mocks decide UCAS predicted grades. Our Liverpool A-Level tutors lift students out of borderline territory into the offer band universities actually ask for."*

8. **Parent-scene opener (USE THIS WARMER VOICE WHEN POSSIBLE).** Sentence 1 names a specific moment in the parent's actual evening, not an abstract pain. Sentence 2 brings the tutor solution in.
   > *"By the time most Liverpool parents reach us, they have spent a few weeks quietly worried, the homework getting harder, the answers shorter, the conversations smaller. Our Liverpool GCSE tutors step into that quiet hour a few times a week and find the gap that nobody has had time to name."*

**Warmth principles for the hero_lead (read before writing):**

The hero lead should sound like a knowledgeable friend who works in education, not a tutoring agency selling a service. Three concrete moves:

1. **Open with a scene, not a fact.** *"By the time most parents reach us…"* beats *"GCSE attainment in {Location} sits below the national average."* The fact can come in line 2.
2. **Name a specific small detail when you can.** *"the homework getting harder, the answers shorter"* is texture that signals real experience. Generic pressures (the strain, the stress, the worry) do not.
3. **Speak from observation, not assertion.** *"What we see most often"*, *"the same conversation keeps coming up"*. First-person plural observation creates intimacy.

At least one sentence across the H1, hero lead and first_lesson_context combined should explicitly acknowledge a parent's emotional reality (their tiredness, their anxiety, the comparison with other families). Don't pity it. Just name it.

**Banned in hero_lead:**
- Three-item parallel lists ("AO3 evaluation marks, timed-paper habits, and personal statement strategy") — the parent skill flags these as AI tells.
- Slogans and abstract pivots ("turns near-misses into firm offers", "where ambition meets technique").
- Multiple local details stacked in one sentence — pick the strongest one and drop the rest.
- "Whether your child is at..." opener. That was the most over-used shape on existing pages. Rotate.
- Leading with "Our tutors..." every time. Vary the opener.

**Hard rule (applies to EVERY field on the page, not just the hero): do not anchor copy to a specific grade band that excludes lower-attaining students.** Phrases like "for the grade 8 push", "stretch into grade 9 territory", "for students aiming at the top mark band", "push grade 7 students into a clean grade 8" exclude every parent whose child is at grade 3 or 4. A meaningful share of real leads come from students working at lower bands — if ANY sentence on the page reads "for students aiming at grade 7+", those parents bounce. The rule applies to: `hero_heading_line1`, `hero_lead`, `first_lesson_context`, `tutor_strip_body`, every `pathways` body, every FAQ answer, every subject mention in body copy.

**Hooks affected:** several entries in the GCSE/A-Level pain-point hook bank are grade-band-anchored (#10, #20, #21, #22, #33, #34, #41 etc.). Do NOT use these as the H1 or hero lead source. They may inspire body section work IF paired with a foundation/catch-up counterweight in the same paragraph.

**Use these broader framings instead:**
- "move past wherever they're stuck", "the GCSE and A-Level grades families are aiming at", "predicted grades below where they need to be"
- "from rebuilding foundations to pushing past a comfortable grade"
- "whether the student is catching up or stretching ahead"
- Name the subject pain (algebra method, AO3 evaluation, six-mark questions) without naming a grade band

**Allowed (in body sections only):** if a passage genuinely needs stretch-into-top-band language, pair it with foundation/catch-up framing in the SAME paragraph so a lower-band parent still sees themselves. Example: "Whether a student is rebuilding shaky algebra from Year 8 or pushing past a comfortable 7 into grade 8 and 9 territory, the work starts with a diagnostic." Single-sided "for the grade 8 push" framings are banned.

**Hard rule: no school-rank snobbery.** Never write copy that implies one school's grade or cohort is "worth more" than another's. Parents at every kind of school read these pages — grammars, comprehensives, independents, academies — and every one of them has to feel the page was written for their child. Banned framings:

- *"a grade 7 there is a different kind of grade 7 to the same number at a non-selective school"* — false (same paper, same grade) AND insulting to comprehensive parents.
- *"the cohort is already cut for the top of the national distribution"* / *"the cohort is dense"* — implies the student is only valuable because their school filtered them.
- *"this kind of school"* / *"at independent-school pace"* — categorical labels that rank schools implicitly.
- *"the median student is on the Russell Group track and the top quartile is on the Oxbridge track"* — ranks both schools and students.
- *"making sure ambition isn't capped by a class working towards a different ceiling"* — phrased as if the school sets a lower ceiling. Insults school AND students.
- *"non-selective schools"* as a category label, even neutrally. Naming a group of schools by what they ARE NOT others a chunk of the audience. Use *"other secondaries"* / *"the comprehensives"* if a label is needed, never the negative form.

**The brand belief (per `.claude/reference/beliefs.md`):** "The classroom isn't the problem; the class size is." Tutoring fills the gap a class of thirty can't, regardless of school type. NEVER frame the page as "your school is letting you down" or "your school is on a different level". Frame it as "a class of thirty doesn't have time to drill the specific thing your child needs" — true at every school.

When a location has selective schools in the mix, name them factually (e.g. "Royal Grammar School, John Hampden Grammar and the comprehensives across town") without implying a hierarchy. For first_lesson_context and tutor_strip_body, prefer the universal pain ("a B in a mock, nobody can say why") over school-specific framings.

**Self-check before saving the hero:** Read line 1 + line 2 + lead aloud. If it takes more than 10 seconds to read or a parent would skim past it, cut it.

### First Lesson Eyebrow (`first_lesson_eyebrow`) — write fresh, inspired by these

**Do not pick verbatim.** Use as inspiration. Short uppercase tag, 3-6 words.

Inspiration:
- `A {LOCATION} PARENT'S STORY`
- `YOUR FIRST {LEVEL} LESSON`
- `WHAT THE FIRST SESSION LOOKS LIKE`
- `A REAL {LEVEL} TURNAROUND`
- `INSIDE A {LOCATION} {LEVEL} SESSION`
- `ONE {LOCATION} FAMILY'S STORY`

For a Birmingham A-Level page leaning finance you might write: `FROM ABB TO AAB IN BIRMINGHAM`. Write something city-specific where you can.

### First Lesson Heading (`first_lesson_heading`) — write fresh, inspired by these

**Do not pick verbatim.** Use as inspiration. Must contain `{Level} Tutor` or `{Level} Tutoring`.

Inspiration:
- `The Difference the Right {Location} {Level} Tutor Can Make`
- `What Happens in Your First Lesson with a {Location} {Level} Tutor`
- `How a {Location} {Level} Tutor Changes the Picture`
- `Why the Right {Level} Tutor in {Location} Matters`
- `What Your First {Location} {Level} Tutoring Session Looks Like`
- `The First Few Sessions with a {Location} {Level} Tutor`
- `How {Location} {Level} Tutoring Actually Works`

Write a fresh one. e.g. for Birmingham GCSE: `What a Birmingham GCSE Tutor Spots in Week One`. For A-Level finance angle: `Why Birmingham A-Level Tutors Start with Past Papers`.

### First Lesson Context (`first_lesson_context`) — pick a structural opener

Four shapes. Pick one different from the last page in the repo. **Hard length cap: 2-3 sentences. Prefer 2.** Use the level-specific tutor keyword where it fits the sentence — one natural mention is enough. Do not force a second.

**Why short:** The hero area at the top of the page already does the heavy lifting. The grade-jump card, the parent quote, and the eyebrow/heading all sit right here too. This paragraph is a short bridge between the hero and the quote — not an essay. Two tight sentences beats five polished ones. AI detectors penalise length AND parents skim past long top-of-page blocks.

**Do NOT include specific attainment numbers, percentages, or scores** (Attainment 8 figures, % A*/A, Progress 8 scores, etc.). Parents don't care, and unverified numbers on a public page hurt trust if they turn out to be wrong. Use directional language only ("close to the national average", "above the England figure", "below the national picture") — no exact values. If you genuinely need to name a figure, it has to be verified live from gov.uk and the source URL stored in frontmatter; otherwise stay qualitative.

1. **Two-tier opener.** Describe the split between high-performing and catching-up parts of the local picture. Anchor each side with a concrete pain point. Pivot to what a tutor traces and fixes.
2. **Directional-context opener.** Open with where the area sits qualitatively ("Results across Birmingham sit close to the national picture, but the spread inside the city is wider than the headline suggests…"). Pivot to what that hides at the individual-student level. Then the tutor pivot. No specific numbers.
3. **Pain-point opener.** Open with a specific topic or year-group gap typical for the area ("In Year 10 across {Location} the pattern is the same: algebra never properly drilled, fractions still wobbly…"). Pivot to attainment-level context. Then tutor.
4. **Stakes opener.** Open with what the GCSE/A-Level outcome unlocks locally (a specific sixth form, a Rolls-Royce apprenticeship, a Russell Group offer). Pivot to the attainment picture. Then tutor.

5. **Parent-observation opener (warmest variant).** Open with what the same conversation between parents sounds like in this city. *"In a first session with a {Location} Year 11 we usually find the same thing,"* or *"The conversation we hear most often from {Location} parents is…"* Pivot to the concrete topic gap, then the tutor. No specific numbers, no school names, just the recognisable scene. Use this when you want the section to read warmly rather than analytically.

**Do not always lead with "{Location}'s GCSE picture splits in two" or "{Location}'s GCSE results sit below the national average".** Both of those exist in the repo already. Pick a different shape.

### Tutor Strip Heading (`tutor_strip_heading`) — write fresh, inspired by these

**Do not pick from this list verbatim.** Use the examples as inspiration for shape and tone, then write a fresh one for this city. Picking from a fixed list across 36 pages is itself a template signal.

Constraints:
- Must contain `tutor` or `tutors`.
- Should contain `{Location}` and `{Level}` (or imply both clearly).
- Short — 6-10 words.
- One specific anchor (a paper, a school type, a destination) rather than a generic claim.

Inspiration examples (do not copy verbatim — write your own in this shape):
- `{Location} {Level} tutors who know what your child's school expects`
- `{Location} {Level} tutors who know the local school pace`
- `Meet the {Level} tutors helping {Location} families`
- `The {Location} {Level} tutors families ask for`
- `{Level} tutors who've done this in {Location} before`
- `{Location} {Level} tutors matched to your child's subject and exam board`

For Birmingham GCSE you might write: `Birmingham GCSE tutors who've sat the King Edward VI papers`. For an A-Level finance angle: `Birmingham A-Level tutors who've coached AAB into HSBC offers`. Each city should have its own line, not a chosen one from a list.

### Tutor Strip Body (`tutor_strip_body`) — short

**Hard cap: 2-3 sentences.** The heading already carries the plural keyword. The body should reference one specific local thing (a school, a subject paper, a geography). If "tutors" or "the tutor" fits a sentence naturally, use it. If the body reads better without a level-prefixed mention, leave it out. End with a one-line CTA ("Browse profiles, or let us match your child."). Total length under 50 words.

Don't try to do everything in this slot. The tutor cards underneath are the substance. This body is just a frame.

### Pathways Heading (`pathways_heading`) — write fresh, inspired by these

**Do not pick verbatim.** GCSE versions reference post-16 routes; A-Level versions reference post-18 routes.

GCSE inspiration:
- `What Could Be Next After Your {Location} GCSEs`
- `Where {Location} GCSE Students Go Next`
- `Post-16 Routes for {Location} Year 11s`
- `After GCSEs in {Location}: Sixth Forms, Apprenticeships, FE`
- `The Next Step After {Location} GCSEs`

A-Level inspiration:
- `Where {Location} A-Level Students End Up`
- `What Comes After {Location} A-Levels`
- `Beyond A-Levels: Universities, Degree Apprenticeships, Careers`
- `Post-18 Routes for {Location} A-Level Students`
- `The Step After {Location} A-Levels`

### Pathways Lead (`pathways_lead`) — write fresh, inspired by these structural shapes

**Do not pick verbatim.** Use the shape, write a new sentence.

1. **Coverage statement** — A few of the post-16/18 destinations our students move on to.
2. **Range statement** — Our students go down a range of routes after results day.
3. **Question lead** — Wondering what's next? The three routes most families consider.
4. **Stakes lead** — Results day decides the next step. Here's what that step looks like.
5. **Tutor-anchored** — A good tutor keeps these routes in mind from session one.

Pick a shape, write one fresh sentence for this city.

### Pathways Accordion Titles

Use these per level (do not change wording):

**GCSE:** `Sixth Forms`, `Apprenticeships`, `Further Education`
**A-Level:** `Universities`, `Degree Apprenticeships`, `Career Pathways`

### Pathways Body Length (hard cap)

**2 sentences max per category.** Not 3. Not 5. Not 6.

The old skill let pathways bodies run 4-6 sentences. That length is the single highest-AI-detection-risk section on the page because the model has too much room to fall into rhythm. Hard cap: 2 sentences.

Each body must:
- Name at least 2 specific local entities (schools, universities, employers — real names).
- Stop after 2 sentences. If it feels incomplete, that's fine. Incomplete reads more human than thorough.

Each body **may** use `tutor`, `tutoring`, or `tuition` once if it fits the sentence — but **don't force it.** Pathway bodies are about the destination (the sixth form, the university, the apprenticeship), not about tutoring. One of the three bodies naturally referencing how tutoring helps reach that destination is fine. Three of three forcing the word in is a checklist, not editorial writing.

Example (good, GCSE Apprenticeships, Birmingham):
> "HSBC's Birmingham HQ runs degree apprenticeships in finance and tech, and HS2 hires engineering apprentices from Curzon Street. Most need grade 5 in Maths and English, with GCSE Sciences tutoring often what gets students through the technical-route gate."

Example (bad — too long, AI rhythm, the old default):
> "Birmingham has one of the strongest apprenticeship markets outside London. HSBC's UK headquarters sits in the city and runs intermediate, advanced and degree apprenticeships across finance, technology and operations. HS2 recruits engineering and business apprentices from Curzon Street. Lloyds Banking Group and the BBC at the Mailbox also run schemes drawing from local school leavers. Most need grade 4 to 5 in Maths and English. Some routes ask higher. GCSE Sciences tutoring in Year 10 and 11 is often what gets a student into the more competitive technical engineering schemes."

### About Heading — N/A for level pages

The level template does not use `about_heading`. Skip.

---

## FAQ Bank (pick 4, rotate selection AND phrasing across pages)

The previous version of this skill dictated the same 4 questions in the same phrasing for every page. Stop doing that. Pick 4 questions from the bank below that fit the page's angle, and use the phrasings as a starting point — vary the wording.

**No keyword quotas on FAQ answers.** Each answer addresses the question. If the question is about Maths or online sessions or cost, the answer naturally uses the relevant keyword. Don't bolt `{Location} {Level} tutor` into every answer to satisfy a count.

### GCSE FAQ Bank (pick 4, never the same 4 as the last GCSE page)

1. Q: `What GCSE subjects can my child get tutoring in across {Location}?` / A: Cover the curriculum, name the most-requested subjects in that order, reference the local angle (apprenticeship subjects, sixth-form prerequisites, etc.), confirm exam board matching.
2. Q: `When is the right time to start GCSE tutoring in {Location}?` / A: Year 9 / Year 10 / Year 11 framing with concrete reasoning per year, including a named local school or selective context if relevant.
3. Q: `Do your tutors cover the exam boards used in {Location} schools?` / A: AQA, Edexcel, OCR, WJEC. How we match on board not just subject.
4. Q: `How quickly will my child see results from GCSE tutoring?` / A: Concrete timing on confidence shift and grade shift. Avoid the "three or four sessions" exact wording on every page — vary it.
5. Q: `Can a GCSE tutor in {Location} help with mock preparation?` / A: Specific mock cycle for the area, past papers, what tutors focus on in the weeks before mocks.
6. Q: `My child is struggling with GCSE Maths in {Location}. What can a tutor actually do?` / A: Concrete diagnostic-first approach. Name real topics (algebra, geometry, problem-solving).
7. Q: `What if my child needs grade 9 for a sixth form in {Location}?` / A: Stretch tutoring, harder papers, examiner-mindset work, the gap between grade 7 and grade 9.
8. Q: `Do you offer GCSE tutoring online for {Location} families?` / A: Most sessions are online, why it works, Lessonspace mention.
9. Q: `How does a GCSE tutor in {Location} work with my child's school work?` / A: Diagnostic-first, then either complement classroom or fill specific gaps. Past paper integration.
10. Q: `Can a GCSE tutor help with iGCSE in {Location}?` / A: Yes, common at independent schools, slightly different board mix.
11. Q: `What if my child has fallen significantly behind in their GCSEs?` / A: Gap-tracing, structured rebuild rather than racing to current content.
12. Q: `Do you offer GCSE Sciences tutoring with separate Biology/Chemistry/Physics specialists?` / A: Yes, especially relevant for triple science students. Reference local apprenticeship/sixth-form science routes.
13. Q: `Can a GCSE tutor help with English Language and English Literature in {Location}?` / A: Yes, the two are different beasts. How tutoring approaches each.
14. Q: `How much does GCSE tutoring cost in {Location}?` / A: From £37 per hour, depends on tutor, agreed before booking.
15. Q: `What if the tutor isn't right for my child?` / A: We re-match without friction.

### A-Level FAQ Bank (pick 4, never the same 4 as the last A-Level page)

1. Q: `What A-Level subjects can my child get tutoring in across {Location}?` / A: Cover the curriculum, name the most-requested A-Level subjects, anchor to local university/employer patterns.
2. Q: `When is the right time to start A-Level tutoring in {Location}?` / A: Year 12 vs Year 13 framing with concrete reasoning, mention the AS-to-A2 jump or end-of-Y12 mocks.
3. Q: `Do your tutors know the specific A-Level exam boards used in {Location} sixth forms?` / A: AQA, Edexcel, OCR, WJEC, OCR MEI etc. Specification-level matching.
4. Q: `How does A-Level tutoring help with UCAS predicted grades?` / A: Concrete on the predicted-grade timeline (Y13 mock window), how to lift a predicted grade, conditional offer pressure.
5. Q: `Can an A-Level tutor in {Location} help with Oxbridge or Medicine applications?` / A: Yes, interview prep, BMAT/UCAT context, personal statement work.
6. Q: `My child is struggling with A-Level Maths in {Location}. What can a tutor actually do?` / A: Pure/mechanics/statistics balance, specific multi-step pain points.
7. Q: `What if my child got a grade 8 or 9 at GCSE but is struggling at A-Level?` / A: The GCSE-to-A-Level jump as a distinct subject change, not an effort failure.
8. Q: `Can an A-Level tutor help with the EPQ or coursework in {Location}?` / A: Yes, with the caveat that final work stays the student's own.
9. Q: `Do you offer A-Level tutoring online for {Location} students?` / A: Most sessions online, why it works for A-Level depth work, Lessonspace mention.
10. Q: `How does A-Level tutoring help with Russell Group offers?` / A: Concrete on the AAB/AAA/A*AA pressure points, evaluation-level work, AO3 marks.
11. Q: `Can an A-Level tutor help with A-Level Sciences in {Location}?` / A: Yes, name the specific A2 content compounding A1 gaps, required practicals, mathematical demand.
12. Q: `What if my child is retaking an A-Level?` / A: Different approach from first-attempt tutoring, focus on what went wrong and rapid technique work.
13. Q: `Can A-Level tutoring help with degree apprenticeship applications in {Location}?` / A: Yes, name local employers, UCAS-points threshold work, application-window prep.
14. Q: `How much does A-Level tutoring cost in {Location}?` / A: From £37 per hour, depends on tutor.
15. Q: `What if the A-Level tutor isn't right for my child?` / A: We re-match.

**Phrasing rule:** Don't copy the question wording verbatim from this bank. Use it as a starting point and rephrase. The bank is structural, not literal. For example, Q2 ("When is the right time to start GCSE tutoring in {Location}?") could equally read "Should I start GCSE tutoring in Year 10 or wait?" or "Year 9, Year 10 or Year 11 — when does GCSE tutoring make sense in {Location}?". Vary opener, length, and word choice.

**Answer rule:** Don't open every answer with "Year 10 is the most common starting point" or "Most {Location} families notice..." or "Tutors are experienced across AQA, Edexcel, OCR and WJEC, the four boards...". Read the existing pages first. Whatever opener they used, use a different one.

---

## Pain Points Vocabulary (level-specific, use as a bank — not all on every page)

Pick 2-4 per page that match the city's character. A page that touches every pain point reads like a checklist.

### GCSE Pain Points

- **Foundation gaps:** A topic from Year 8 or 9 nobody re-explained, an algebra method missed during illness, a fractions concept that never clicked, a Bunsen-burner Chemistry lesson missed, an English Literature text introduced when the class was already past it.
- **Year 10 to Year 11 trajectory:** Predicted grades stuck below target, mock results dropping despite revision, grade boundaries pulling away in Maths and Sciences, parents not understanding why effort and grades don't match.
- **Mock exam pain:** First November mocks landing harder than expected, January resits, March mocks setting the predicted grade for sixth-form applications, the difference between knowing content and writing it in 1h 30, students who can do practice papers calmly but freeze in the hall.
- **Sixth-form entry pressure:** Conditional grade 6 in English and Maths for a chosen sixth form, grade 5 minimum for Level 3 college courses, grammar-school federations pushing for grade 7-9.
- **Subject pain:** GCSE Maths: algebra, geometry, 9-mark problem-solving, paper 3 calculator timing. GCSE English: Language paper 1 source-based writing, Literature essay under timed conditions, unseen poetry. GCSE Sciences: required practicals, six-mark questions, calculations under pressure. GCSE History: source analysis, 16-mark essay. GCSE Geography: case studies, long-answer questions.
- **Confidence and identity:** Bright students who've decided they're "just not good at Maths", students who've stopped putting their hand up, students who think a grade 4 is a personal verdict.
- **Practical / pace:** Class of 32, teacher dealing with disruption, supply teaching covering core topics, students embarrassed to ask the same question for the third time.

### A-Level Pain Points

- **Step up from GCSE:** Students who got grade 8/9 at GCSE Maths but find A-Level Maths a different subject, jump in content volume, heavier independent study expectation.
- **Depth and evaluation:** Knowing content but not landing AO3 marks, essays that summarise rather than evaluate, getting the calculation right but missing explanation marks, treating an A-Level paper like a GCSE paper.
- **Timed exam performance:** Students who finish practice papers calmly at home but run out of time in the exam, the 2h 30 endurance gap.
- **UCAS pressure:** Predicted grades arriving below offers, Russell Group conditional offers requiring an A in a specific subject, Oxbridge and Medicine needing A* across the board, BBB vs AAB making the difference.
- **Personal statement and interviews:** Generic Year 12 personal statements, Oxbridge interview prep, Medicine UCAT/BMAT pressure.
- **Subject-specific A-Level pain:** A-Level Maths: pure/mechanics/statistics balance, Further Maths workload. A-Level Sciences: A2 content compounding A1 gaps, required practicals, organic chemistry mechanisms, mathematical demand in Physics. A-Level Economics: the 25-mark essay, evaluation depth, diagrams. A-Level Psychology: research methods, AO3 evaluation chains. A-Level History: 25-mark essay, source-based question.
- **Confidence at the top end:** High-achieving students who've never had to work hard until A-Level, students whose teachers told them they'd be fine and now they're not.

### How to use the vocabulary
- Pick 2-4 per page. A different selection from the last page in the repo.
- Engineering apprenticeship city → weight foundation gaps + practical/pace higher.
- Russell Group hub → weight depth and evaluation + UCAS pressure higher.
- Comprehensive-heavy below-average area → weight confidence + foundation gaps higher.

---

## Dead Fields on Level Pages (don't waste effort)

Two frontmatter arrays are no longer rendered by `subject.html`:

- **`schools`** — never rendered on level pages. Skip it entirely on new pages.
- **`area_links`** — the "Areas We Cover" section was removed from the level template because it duplicated the auto-generated "same-level in other cities" grid further down (with weaker intent). Skip `area_links` on new level pages too.

Older pages still have these fields filled in; harmless to leave, but new pages should omit both. Saves effort on differentiation rules that no longer matter.

**What IS rendered at the bottom of level pages** (no frontmatter needed):
1. Sibling-level link (auto-generated, e.g. on Liverpool A-Level it shows "GCSE Tutors in Liverpool")
2. Same-level cross-city grid (auto-generated, capped at 12 cities)

---

## Template Field Reference (what each frontmatter field actually renders into)

**This section exists because earlier skill versions specified rules for fields the template doesn't render. Audit each field against `layouts/locations/subject.html` before writing.**

| Field | Renders as | Visual style | Notes |
|---|---|---|---|
| `title` | `<title>` tag (head) | n/a | SEO only, not on-page |
| `description` | `<meta description>` (head) | n/a | SEO + sitelink snippet |
| `location` | substituted into every field that uses `{{ $loc }}` | n/a | data field |
| `level` | substituted into every field that uses `{{ $level }}` | n/a | must be exactly "GCSE" or "A-Level" |
| `hero_heading_line1` | `<h1>` text | H1 large bold | the whole H1 sits here |
| `hero_heading_line2` | `<h1>` after `<br>` | H1 large bold | **DEPRECATED — set to `""`** |
| `hero_lead` | `<p class="loc-hero__lead">` | body paragraph under H1 | supporting copy |
| `grade_from` / `grade_to` / `grade_stat` | grade card on hero right | display numbers + small caption | "Predicted grade" → "Achieved grade" |
| `first_lesson_eyebrow` | `<p class="loc-eyebrow">` | small uppercase tag | sits above the H2 |
| `first_lesson_heading` | `<h2>` | H2 large | section heading |
| `first_lesson_context` | `<p>` | body paragraph | sits above the quote |
| `first_lesson_quote` | `<blockquote><p>"..."</p>` | pull-quote | **template adds quote marks — don't include them in the value** |
| `first_lesson_quote_name` / `_role` / `_grade` | `<figcaption>` | small attribution | format: `— Name, Role · Grade` |
| `tutor_strip_heading` / `_body` | partial `gcse-tutor-strip.html` | section above the carousel | |
| `tutors` | tutor cards in strip | from site data by default | usually omitted, defaults work |
| `tutors_browse_url` | CTA link | | usually omitted |
| `reviews` | review carousel cards | format: `Name|Role|Text` | 15-25 entries |
| `pathways_heading` | `<h2>` in pathways section | H2 large | |
| `pathways_lead` | `<p class="gs-pathways__lead">` | body lead paragraph | |
| `pathways[].title` | `<summary>` text | accordion label | "Sixth Forms" / "Apprenticeships" / "Further Education" (GCSE); "Universities" / "Degree Apprenticeships" / "Career Pathways" (A-Level) |
| `pathways[].body` | accordion body (markdownified) | body paragraph | 2 sentences max |
| `pathways_cta` | text above the CTA button | small line | optional |
| `pathways_image` | hero-style image | sidebar image | optional, sensible defaults |
| `faq_1_q` through `faq_4_q` / `_a` | FAQ accordion + JSON-LD schema | accordion text + Google rich result | also feeds structured data |
| `area_links` | **NOT RENDERED** on level pages | — | dead field on level pages (still used on parent location pages) |
| `schools` | **NOT RENDERED** | — | dead field, don't bother |
| (auto) sibling level card | rendered below FAQ | small card | template auto-discovers from other pages with same `location` |
| (auto) same-level cross-city grid | rendered below FAQ, capped at 12 | tile grid | template auto-discovers from other pages with same `level` |
| `hero_review_*` | **NOT RENDERED** | — | dead defaults, ignore |
| `sitemap.priority`, `sitemap.changefreq` | sitemap.xml | n/a | SEO |

---

## Frontmatter Contract

Both pages share this structure. Every field present unless marked optional.

```yaml
---
title: "[Slot A + Slot B — 65 chars or fewer]"
description: "[Meta description — 145-160 chars, location + level + tutor/tutoring keyword]"
layout: "subject"
location: "[Location]"
level: "[GCSE or A-Level]"   # case-sensitive

hero_heading_line1: "[Full H1, 8-14 words: Location + Level + Tutors + pain-point continuation. e.g. 'Birmingham GCSE Tutors Who Find the Year 8 Gap']"
hero_heading_line2: ""   # DEPRECATED, always empty
hero_lead: "[2-3 sentences, under 50 words. MUST use plural keyword '{Location} GCSE tutors' or '{Location} A-Level tutors' at least once. Broad GCSE/A-Level pain (NOT a niche local anchor). Pick a structural shape from Hero Lead section]"

grade_from: "[lower grade — must come from an EXPLICIT grade stated in the anchor review]"
grade_to: "[higher grade — must come from an EXPLICIT grade stated in the anchor review]"
grade_stat: "[1 sentence quoting/paraphrasing the explicit grade jump from the anchor review. NO fabrication. If the review doesn't state grades, pick a different anchor]"

first_lesson_eyebrow: "[Fresh, inspired by eyebrow examples — short uppercase tag 3-6 words, prefer city-specific]"
first_lesson_heading: "[Fresh, inspired by heading examples — must contain {Level} Tutor or {Level} Tutoring]"
first_lesson_context: "[2-3 sentences max, prefer 2. NO specific attainment numbers/percentages. Qualitative context only. Use the level tutor keyword where it fits — one natural mention is enough. Pick a structural shape]"
first_lesson_quote: "[Real review verbatim — must match level (GCSE/A-Level) of this page]"
first_lesson_quote_name: "[First name + initial]"
first_lesson_quote_role: "[Parent of GCSE Student / Parent of A-Level Student / etc.]"
first_lesson_quote_grade: "[Grade X → Grade Y in [Subject]]"

tutor_strip_heading: "[Fresh, inspired by tutor strip examples — 6-10 words, one specific anchor, never picked verbatim]"
tutor_strip_body: "[2-3 sentences, under 50 words. The heading already carries the keyword. Body references one specific local thing (a school, a paper, a geography). Use 'tutors' / 'the tutor' if it fits a sentence naturally; don't force a level-prefixed mention. End with short CTA]"

# NOTE: `schools` and `area_links` arrays are NOT rendered by the subject.html template. Skip both on new level pages.

pathways_heading: "[Fresh, inspired by pathways heading examples — never picked verbatim]"
pathways_lead: "[One fresh sentence, picked structural shape — never copied verbatim from skill]"
pathways:
  - title: "[Sixth Forms / Universities]"
    body: >
      [2 sentences max. Names ≥2 specific local entities. Body is about the destination, not about tutoring. Use a tutor/tutoring/tuition mention only if the sentence naturally calls for one. Stop after 2 sentences.]
  - title: "[Apprenticeships / Degree Apprenticeships]"
    body: >
      [Same — 2 sentences max, ≥2 named entities. No keyword quota — write what the section is about.]
  - title: "[Further Education / Career Pathways]"
    body: >
      [Same — 2 sentences max, ≥2 named entities. No keyword quota.]

reviews:
  - "Name|Role|Review text"   # 15-25 entries, level-filtered, varied order

tutors:
  - name: "..."
    url: "..."
    image: "..."

tutors_browse_url: "https://thedegreegap.com/teachers/languages/[Level]-Maths"   # optional

faq_1_q: "[Picked + rephrased from bank]"
faq_1_a: "[Original answer, varied opener]"
faq_2_q: "..."
faq_2_a: "..."
faq_3_q: "..."
faq_3_a: "..."
faq_4_q: "..."
faq_4_a: "..."

sitemap:
  priority: 0.7
  changefreq: monthly
---
```

The file body must be empty after the closing `---`.

---

## Anti-AI Writing Rules (CRITICAL — read before writing a single word)

These pages must read like a person wrote them. Google's classifiers and parents both notice the difference.

### Positive roughness mandates (do these, don't just avoid)

The negative banned-list rules below catch surface tells. They don't fix rhythm. The mandates here add *positive* structural roughness so the page doesn't read as "carefully constructed AI prose":

1. **One paragraph on the page must be a single sentence.** Anywhere. Hero lead, tutor strip body, a pathway body, the first_lesson_context. Pick one section and let it be one sentence and stop.
2. **One paragraph must start mid-thought.** Open with `And`, `But`, or `So` — not as a stylistic flourish but as a structural break. e.g. "And the harder part is the personal statement, not the predicted grade."
3. **Length is itself a rhythm risk.** Hard caps applied to first_lesson_context (2-3 sentences), tutor_strip_body (2-3 sentences), pathways bodies (2 sentences each). Long sections are where the model falls into AI flow. Short sections force scrappy.
4. **Inconsistency is human.** Don't make every paragraph the same shape. If three paragraphs in a row have a fragment, an `And` opener, and a named topic, that's "carefully constructed", not human. Let one paragraph be plain. Let another be scrappier than the rule strictly requires.
5. **Stop before the page feels finished.** If you've covered the point in 2 sentences and a third sentence "rounds it out", cut the third. Round-feeling prose is AI prose. End on an incomplete-feeling beat.

### Banned characters

**No em dashes anywhere** (U+2014). Use comma, colon, full stop, or rewrite. Applies to every field except verbatim reviews. **Before saving, scan every field for em dashes and replace any you find.**

### Banned words

> landscape, foster, navigate, delve, crucial, realm, testament, pivotal, seamless, robust, comprehensive (as adjective), vibrant, tapestry, unlock, embark, journey (metaphorical), leverage, stakeholders, furthermore, moreover, in conclusion, it is worth noting, it is important to note, a range of, a variety of, particularly, specifically, effectively, consistently, additionally, successfully.

### Banned phrases

> cutting-edge, bespoke, transformative, unlock potential, embark on a journey, world-class, real difference, game-changer, the right approach, take their learning to the next level.

### Factual-accuracy guards (common verb mistakes)

When writing about schools, universities, exam boards and tutoring, the wrong verb makes a sentence read as ChatGPT did it. These mistakes recur across pages:

- **Schools do not set exam papers. Exam boards do.** Schools deliver curriculum, teach the specification, and run internal mocks. Do NOT write "the papers Knights Templar and Hitchin set" or "the mark schemes the school sets". Write "the mark schemes those schools teach to" or "the specifications taught at [school]". Exam boards (AQA, Edexcel, OCR, WJEC) are the only entities that set papers.
- **Universities admit students. They do not hire them.** Hiring is for employees. Write "Nottingham admits", "Cambridge takes", "Loughborough offers places to" — never "Nottingham hires Year 13 students". Employers hire; universities admit.
- **Tutoring shapes student work; it does not shape predicted grades directly.** Write "tutoring lifts students into the AAB band", "tutoring helps students reach the predicted grade their offer needs". Do NOT write "tutoring shapes predicted grades" or "tuition shapes the grades these schemes screen on". Predicted grades are produced by teachers based on performance; tutoring affects the performance, not the grade itself.
- **A school is in a place, not a region.** If the page is about Baldock (in North Hertfordshire), do not write "not the nearest tutor to North Herts" — Baldock IS in North Herts, so the sentence contradicts itself. Use "not just the closest one geographically" or "not just whoever lives nearby". Always check: am I drawing a contrast between the location and itself?

### Phrasing slips (specific banned constructions surfaced by audit)

These have shown up across past pages and read as template-fill, not editorial writing:

- **"leading subject demand"** / **"lead the demand here"** / **"the most-requested tutors are X and Y"** — corporate filler. No parent talks like this. If you find yourself reaching for it, you're trying to satisfy the subject-keyword rule without an editorial home. Move the subject mention to a FAQ or pathway that's actually about that subject.
- **"the gap between a borderline X and a clean one"** — overused. Fine once across the whole page; never as a default close.
- **Same-prefix keyword repetition within a paragraph** ("GCSE tutor traces… GCSE tutoring closes…"). If you've written `{Level} tutor` once in a paragraph, the second mention must be either subject-prefixed (`A-Level Chemistry tutor`) or just "the tutor" / "tutoring" with no level prefix.

### Sentence-level rules

- **Burstiness — vary sentence length dramatically.** AI writes in uniformly medium sentences. Mix very short with longer. A two-word sentence after a long one is fine. Use fragments. A paragraph that goes long, short, long, long, short reads human. A paragraph where every sentence is the same length reads AI.
- **Burstiness in paragraphs.** Make one paragraph two sentences. Make the next five.
- **Break structural symmetry.** Do not open three paragraphs the same way. Do not make every sentence in a list the same length.
- **Use contractions naturally.** `it's`, `don't`, `can't`, `we'd`, `they're`.
- **Start with And or But when it fits.** "But that's the problem." "And most families find it straightforward." Use them.
- **Use active voice.** "Tutors structure sessions around the student" not "Sessions are structured around the student."
- **Cut unnecessary `that`.** "We know students need support" beats "We know that students need support."
- **No `-ing` sentence openers.** "Building confidence...", "Understanding the brief...", "Working through problems..." are AI starters. Rewrite.
- **Specific over general.** Every sentence that could apply to any UK city is wasted. A sentence that could only be about this city — names a real school, employer, fact — is worth ten generic ones.
- **Do not open every sentence with the subject.** Vary opener: time phrase, condition, observation, question.
- **Avoid 3-item parallel lists.** "calculation steps, essay structure, and the small technical things" is a tell. If you write three, cut one.
- **Avoid "isn't X, it's Y" framings more than once per page.** Fine once. Twice is pattern noise.
- **No soft closing platitudes.** Do not end paragraphs with "the change they see first isn't the grades, it's the attitude" or "the difference shows up faster than parents expect". End on a concrete detail or an unresolved observation.
- **Concrete beats abstract.** Name a real topic, a real year group, a real type of question. "A fractions concept from Year 8" beats "what each student actually needs".
- **Polished prose is the AI default.** Leave a rougher edge: a fragment, a question, a sentence starting with And or But.
- **Be direct, not aggressive.** State plainly, don't hedge. But never attack schools, criticise teachers, or make quality claims. Angle is always class size and pace, not quality.
- **Never name a school alongside a negative result.** Attainment data at LA/borough level only.

---

## Pre-Save Scan (run on every field before saving)

1. **Em dash scan.** Search for `—`. Zero instances allowed (except in verbatim reviews).
2. **Banned word scan.** Zero instances of any banned word.
3. **Banned phrase scan.** Zero instances of any banned phrase.
4. **Cross-page duplication scan.** Open the most recently built level page of the same level. Read your `hero_heading_line1` (H1), `first_lesson_heading`, `first_lesson_eyebrow`, `tutor_strip_heading`, `pathways_heading`, `pathways_lead` and all four FAQ questions. **If any one is identical to the other page's, change it.**
5. **GCSE-vs-A-Level scan (within this run).** Compare your two pages. If a sentence appears on both with only "GCSE"/"A-Level" swapped, rewrite one.
6. **Burstiness check.** Read three paragraphs in your head. If they sound like a corporate brochure or any two consecutive sentences mirror each other, rewrite.
7. **Page-level roughness check (not per-paragraph).** Confirm the page as a whole contains: at least one fragment somewhere, at least one sentence opening with And/But/So, and named local detail in at least 2 sections. Do NOT force these into every paragraph — that produces "carefully constructed AI" rhythm. Let some paragraphs be plain. Some sections rougher than others. Inconsistency is human; uniform roughness is AI.
8. **Factual-accuracy scan** (catches what AI-trained habits get wrong about education):
   - Search for `school[s]? set[s]? .* paper` — schools don't set exam papers. Rewrite.
   - Search for `universit(y|ies) hir(e|ing|es)` — universities admit, they don't hire. Rewrite.
   - Search for `tutoring shapes? .* grades?` or `tuition shapes? .* grades?` — tutoring shapes student work, not grades themselves. Rewrite to "lifts into the X band" or "helps students reach".
   - Search for the page's region name in `not the` or `not just` constructions — make sure you're not contrasting the page's location with itself ("not the nearest tutor to North Herts" on a page about a town IN North Herts).
9. **3-item list scan.** Search every body field for sentences containing "X, Y, and Z" patterns where the three items are parallel (e.g. "predicted grades, application essays, and STEM aptitude"). Cut one.
10. **Stuffing scan.** Read each paragraph aloud in your head. If any sentence repeats `{Level} tutor` / `{Level} tutoring` from the previous sentence, rewrite one. If any sentence lists subjects with "tutor" appended ("Maths tutors and English tutors and Sciences tutors"), rewrite the section to be about a topic, not a list. **There are no keyword quotas. If the writing reads forced, the keyword was forced. Cut it.**
11. **Readability scan.** Run the helper script against the just-written file:
   ```bash
   ./scripts/check-readability.sh content/locations/{slug}-tutors/{level}/_index.md
   ```
   - Computes Flesch Reading Ease + Flesch-Kincaid Grade Level + SMOG Index on the LLM-written body fields (verbatim reviews excluded).
   - Level-aware thresholds (auto-detected from `level:` frontmatter):
     - **GCSE pages**: Flesch ≥ 50 AND Grade ≤ 11 (parent-of-Year-11 audience, Grade 9-10 sweet spot)
     - **A-Level pages**: Flesch ≥ 45 AND Grade ≤ 12 (unavoidably higher-grade vocab like UCAS, specification, evaluation)
   - Exit 0 = pass or skipped (textstat not installed). Save the page.
   - Exit 1 = fail. **Do not save.** Identify the most academic paragraphs (usually first_lesson_context, pathway bodies) and simplify: cut long sentences, replace multi-syllable words with shorter ones, add contractions, cut "that". Re-run.
   - Exit 2 = parse error.
   - Iterate up to 2 rewrites. If still failing, save with manual-review note.
   - Threshold override: `MAX_GRADE=13 ./scripts/check-readability.sh ...` (use only when justified, e.g. an Oxbridge-focused A-Level angle).
   - One-time setup: `pip3 install textstat` (free).

---

## Quality Gates — Run These Before Finishing

For **each page** built:

**Structural:**
- [ ] File created at the right path
- [ ] `layout: "subject"` set
- [ ] `level` is exactly `"GCSE"` or `"A-Level"`
- [ ] `location` matches the parent page spelling

**SEO (hard anchors only — no body-section quotas):**
- [ ] Title 65 chars or fewer, contains location + level
- [ ] Description 145-160 chars, contains level + tutor/tutoring + location (one natural mention)
- [ ] `hero_heading_line1` is the full H1 (8-14 words) containing location + level + Tutors + pain-point continuation
- [ ] `hero_heading_line2` is `""` (empty)
- [ ] `hero_lead` uses the plural phrase `{Location} {Level} tutors` once (natural anchor under the H1)
- [ ] `first_lesson_heading` contains `{Level} Tutor` or `{Level} Tutoring`
- [ ] Body sections (`first_lesson_context`, `tutor_strip_body`, pathway bodies, FAQ answers) use the keyword where it fits the sentence. **Do not count.** If a section reads better without a level-prefixed mention, leave it out. The title, H1, and description already anchor the page.
- [ ] Page-level smell test: read each body field aloud. If any sentence repeats `{Level} tutor` / `{Level} tutoring` from the previous sentence, rewrite. If subject mentions are listed in one sentence ("Maths tutors and English tutors"), rewrite the section to be about a topic.

**Content quality:**
- [ ] `first_lesson_context` contains zero specific attainment numbers, percentages, or scores. Qualitative context only.
- [ ] `pathways` names ≥ 8 specific local entities across the three categories
- [ ] `first_lesson_quote` is a REAL review — verbatim
- [ ] `grade_from`/`grade_to`/`grade_stat` anchored to that same real review
- [ ] `reviews` has 15-25 entries, all level-relevant, order varied from last page
- [ ] `tutors` has 8-10 entries with valid URLs and image paths

**Uniqueness — the big one:**
- [ ] Read the most recent built level page of the same level. Confirm your `hero_heading_line1` (H1), `first_lesson_heading`, `first_lesson_eyebrow`, `tutor_strip_heading`, `pathways_heading`, `pathways_lead`, and all 4 FAQ Qs are DIFFERENT from that page's.
- [ ] GCSE and A-Level pages for this city read as separately authored. No sentence appears on both with only the level swapped.
- [ ] At least 3 of these choices differ from the last page: title slot A, H1 shape, eyebrow (fresh-written), first_lesson_heading (fresh-written), tutor_strip_heading (fresh-written), pathways_heading (fresh-written), pathways_lead (fresh-written), hero_lead structural shape, first_lesson_context structural shape.
- [ ] Pain points selected (2-4) are not the same selection the last page used.
- [ ] Pathways categories appropriate per level (Sixth Forms on GCSE only; Universities on A-Level only).
- [ ] Parent quote matches the level.

**Anti-AI:**
- [ ] Zero em-dashes anywhere outside verbatim reviews
- [ ] Zero banned words
- [ ] Zero banned phrases
- [ ] Contractions used naturally
- [ ] Page-level (not per-paragraph): at least one And/But opener somewhere, at least one fragment somewhere. Not in every paragraph — uniform roughness is itself an AI tell.
- [ ] Active voice throughout
- [ ] No 3-item parallel lists
- [ ] No `-ing` sentence openers
- [ ] Burstiness present — short sentences, fragments, paragraph length variation

**Cross-page consistency:**
- [ ] Both pages reference the same `location` value spelled identically
- [ ] Both pages exist under the same parent

**Build:**
- [ ] `hugo --quiet` builds without errors

---

## Output Reporting

After running, report:
- Files created (full paths)
- Files skipped (with reason)
- A 1-line summary of the local angle for each page
- **Choices you made (so the user can see they differ from the last page):**
  - Title slot A + slot B (which options from the title bank)
  - H1 (the actual phrase — the whole 8-14 word H1)
  - Eyebrow, first_lesson_heading, tutor_strip_heading, pathways_heading, pathways_lead (the actual phrases you wrote — these are inspiration-libraries, not pick-lists)
  - first_lesson_context shape (which of the 4 structural shapes)
  - Hero lead shape (which of the 7 structural shapes)
  - FAQ selection (which 4 from the bank, with the rephrased Q wording)
- Whether you found enough local research to feel confident

---

## What To Do When You're Stuck

- **Can't find local attainment data:** use the LA/borough name in your search, not the city name. Fall back to "the [Region] region".
- **Can't find named sixth forms / universities:** the parent location `_index.md` has a `schools` list. Use those as a starting point.
- **Can't find a level-relevant tutor:** pick tutors with broadest subject coverage.
- **Can't find a clean review for the parent quote:** choose the closest-fit real review verbatim. Never invent.
- **Running out of rotation options:** if every option in a bank has been used by an existing page, invent a new option in the same shape rather than reuse.

---

## Files Touched

- **Created:** `content/locations/{slug}-tutors/gcse/_index.md` (if missing)
- **Created:** `content/locations/{slug}-tutors/a-level/_index.md` (if missing)
- **Read-only:** the parent `content/locations/{slug}-tutors/_index.md`, `layouts/locations/subject.html`, and every existing level page in `content/locations/*/gcse/` and `content/locations/*/a-level/` (to avoid duplication)
- **Do NOT modify:** `layouts/`, `static/`, or any existing content files
