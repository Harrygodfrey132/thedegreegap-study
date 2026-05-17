# The Degree Gap: Local Tutor Subject Page Builder (Level pages — GCSE / A-Level)

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

## Skip-If-Exists Rule (read this first)

**Before doing any research or writing**, check whether the target files already exist:

```bash
ls content/locations/{location-slug}-tutors/gcse/_index.md 2>/dev/null
ls content/locations/{location-slug}-tutors/a-level/_index.md 2>/dev/null
```

If a file exists, **skip it** — do not overwrite. The user has hand-written content there. Report which files you skipped at the end. If both already exist, exit early with a note saying both pages exist and no work is needed.

If neither exists, proceed with both. If only one exists, build only the missing one.

You must also check the parent location page exists at `content/locations/{location-slug}-tutors/_index.md`. If the parent does not exist, **stop and inform the user** that they need to run `/build-location {Location}` first to create the parent location page. Subject pages can only be added after the parent exists.

---

## Keyword Strategy: Read This Before Writing

These pages must rank for level-specific tutoring searches. Google needs to see the right keywords in the right places. Follow these rules without exception.

**Target keyword patterns:**
- For GCSE pages: `[Location] GCSE tutor` / `GCSE tutoring [Location]` / `GCSE tutor [Location]`
- For A-Level pages: `[Location] A-Level tutor` / `A-Level tutoring [Location]` / `A-Level tutor [Location]`

**Where keywords must appear:**

1. **`title`** (SEO title) — must contain `[Location] {Level} Tutors` or `{Level} Tutor [Location]`. Example: `"GCSE Tutors in Birmingham | The Degree Gap"`.
2. **`description`** (meta description) — must contain `[Location] {Level} tutor` or `{Level} tutoring in [Location]` naturally.
3. **`first_lesson_heading`** — template auto-includes `{Level} Tutor`; if you override it, keep `{Level} tutor`, `{Level} tutoring`, or `{Level} tuition` in it.
4. **`first_lesson_context`** (the local-attainment paragraph) — must use `{Level} tutor`, `{Level} tutoring`, or `{Level} tuition` at least 2 times across the paragraph naturally.
5. **`pathways_heading`** + **`pathways_lead`** — together must use `{Level} tutor`, `{Level} tutoring`, or `{Level} tuition` at least once.
6. **`pathways` accordion bodies** — each of the three accordion entries must use `tutor`, `tutoring`, or `tuition` at least once.
7. **All four FAQs together** — must use `[Location]` and `{Level} tutor`/`{Level} tutoring` at least twice across the four answers combined.
8. **Subject-specific keyword phrases must appear in body copy.** Across the page (`first_lesson_context`, `pathways` bodies, `tutor_strip_body`, FAQs) you MUST include at least one explicit mention of each of:
   - `{Level} Maths tutor` / `{Level} Maths tutoring` (parents searching for "GCSE Maths tutor Birmingham" need to find you)
   - `{Level} English tutor` / `{Level} English tutoring` (or `{Level} English Literature tutor` for A-Level)
   - `{Level} Sciences tutor` / `{Level} Sciences tutoring` (or one of Biology / Chemistry / Physics named)
   These are the highest-volume subject searches parents make. Pages that rank for the bare `{Level} tutor` term but miss these subject queries are leaving most of the SEO traffic on the table. Weave them in naturally inside descriptions of what tutors do or which subject most families call us about. Do not stack them in a single sentence; spread them across at least two different sections of the page.

**Keyword variations to weave in naturally:**
- GCSE tutor / GCSE tutoring / GCSE tuition
- A-Level tutor / A-Level tutoring / A-Level tuition
- private tutor / private tutoring / one-to-one tutoring / one-to-one tuition
- online tutor / online tutoring
- [Location] tutor / [Location] tutoring / GCSE tutor [Location] / A-Level tutor [Location]

**What NOT to do:**
- Do NOT replace "tutor" with "educator", "mentor", "specialist", or "expert" when "tutor" is the natural word.
- Do NOT pad with generic copy. Each sentence should either deliver information or earn keyword value.
- Do NOT use the same phrasings across GCSE and A-Level pages for the same city. The two pages must read as separately authored.

---

## Local Research: Do This Before Writing

You need different research per level. **Do both rounds.** Cite findings to a source domain (gov.uk, the city/borough council, school websites, university destination data) in your working notes — though final copy never includes raw citations.

### GCSE Research (for the GCSE page)

**Search 1 — Local GCSE attainment**
Query: `[Location] GCSE results Progress 8 Attainment 8 attainment area level`
Look for:
- The latest Attainment 8 score for the local authority area vs the England average (e.g. England average is around 46.0)
- % of students achieving grade 9-4 in English and Maths (the "standard pass" benchmark)
- % of students achieving grade 9-5 in English and Maths (the "strong pass" benchmark)
- Direction of travel — improving, declining, or flat
- **Use these at LA / borough level only, never attribute attainment data to a named school.**

**Search 2 — Local sixth forms and post-16 destinations**
Query: `[Location] sixth form colleges grade requirements entry`
Look for:
- The most popular school sixth forms for {Location} students (typically the higher-performing local secondaries with sixth forms attached)
- Stand-alone sixth form colleges in the area
- Typical grade requirements for those sixth forms (most ask for grade 5 minimum, with grade 6 in the subject for A Level study)
- The main FE colleges (e.g. "{Location} College" or similar) and their main campuses

**Search 3 — Local apprenticeship landscape**
Query: `[Location] apprenticeships major employers engineering manufacturing`
Look for:
- The largest local employers running apprenticeship schemes (engineering, automotive, rail, manufacturing, healthcare)
- Whether the area is known for any specific industry concentration
- Degree apprenticeships at local universities or with local employers

**Search 4 — Local schools (for the parent quote)**
Query: `[Location] secondary schools Ofsted Outstanding selective`
Look for:
- 1-2 named higher-performing schools you can reference in the parent quote testimonial (e.g. "a student at {NamedSchool} who…")
- Whether the area has grammar schools or is comprehensive-only
- This research feeds the named-school detail in `first_lesson_quote` and `hero_review_text`

### A-Level Research (for the A-Level page)

**Search 1 — Local A-Level attainment**
Query: `[Location] A-Level results average grade Progress 8 16-18`
Look for:
- The average A-Level grade for the local authority area
- % of A-Level entries graded A*-A and A*-B
- 16-18 Value Added or Progress score
- Direction of travel
- **Again, LA / borough level only.**

**Search 2 — University destinations**
Query: `[Location] university destinations UCAS Russell Group acceptance rates`
Look for:
- Where {Location} students typically go to university — the most-applied-to institutions
- Russell Group / Oxbridge acceptance rates from local sixth forms (high-level figures only, not per-school)
- Local universities (e.g. University of {Location}) and their typical entry standards

**Search 3 — Local degree apprenticeships and graduate employers**
Query: `[Location] degree apprenticeships graduate schemes major employers`
Look for:
- Degree apprenticeship schemes available with local employers
- Major graduate-route employers (banking, tech, engineering)
- Whether there's a notable commuter dynamic to a bigger nearby city (London, Manchester, Birmingham)

**Search 4 — Sixth forms (carry over from GCSE research)**
You should already have this from the GCSE round. The A-Level page references the local sixth forms as the *origin* of A-Level students, not as a future destination.

**Minimum bar test:** Before writing, you must be able to complete both:
- *"The thing that makes {Location}'s GCSE situation meaningfully different is..."*
- *"The thing that makes {Location}'s A-Level situation meaningfully different is..."*

If you can't complete either, keep researching.

---

## Tutor Scraping (Both Pages)

Visit `https://thedegreegap.com/teachers/languages/GCSE-Maths` (and A-Level equivalents) to find the current roster of tutors. Use WebFetch.

For each page:
- **GCSE page:** pull 8-10 tutors whose profiles indicate they teach GCSE-level subjects. Cast a reasonable mix across the main GCSE subjects (Maths, English, Sciences, Humanities).
- **A-Level page:** pull 8-10 tutors whose profiles indicate they teach A-Level subjects. Bias slightly towards subjects the city's universities are known for (Economics if it's a financial hub, Engineering subjects if it's an engineering city, etc.).

For each tutor extract:
- `name` — first name + last initial (or full name)
- `url` — the profile URL on thedegreegap.com
- `image` — the profile image URL (typically `https://thedegreegap.com/cache/...`)

If you can't find clear evidence of subject specialism on the profile, exclude them and pick another.

Write the tutors to frontmatter as a YAML list of dicts:

```yaml
tutors:
  - name: "Avery Goldie"
    url: "https://thedegreegap.com/teachers/view/averygoldie"
    image: "https://thedegreegap.com/cache/bd/9b400d603fa3eed019a026bd303ed4.jpg"
```

---

## Review Filtering (Both Pages)

**CRITICAL: Reviews are real customer testimonials. The canonical Reviews Bank lives in `.claude/commands/build-location.md` (the parent location-page skill) under the section titled "Reviews Bank (use first names only, do not use full surnames)". 40 reviews are stored there. Open that file, find the bank, and copy each chosen review character-for-character into this page's `reviews` field.**

Do NOT:
- Re-word any sentence
- Replace em dashes, apostrophes, or any punctuation
- Add or remove text
- Combine two reviews
- Invent a city-themed review (no "Sarah from Birmingham" style fabrications)
- Use any review that is not in the bank

Use first names only (the bank format), not surname + initial. The bank already removes tutor names and surnames for privacy.

**Reviews are the ONE exception to the no-em-dash rule.** If a review in the bank contains an em dash, it stays in your `reviews` field. Your own copy everywhere else on the page must still be em-dash-free.

The `reviews` field accepts a list of pipe-delimited strings: `Name|Role|Text`.

**For the GCSE page**, include only reviews that:
- Mention GCSE, iGCSE, or a clearly GCSE-aged outcome
- Reference a GCSE grade jump (e.g. "from a 4 to a 7", "grade 5 to 7")
- Are from "Parent of GCSE Student" or "GCSE Student"

**For the A-Level page**, include only reviews that:
- Mention A-Level, A2, AS, or "Year 13"
- Reference an A-Level grade outcome
- Mention university admission (those are A-Level outcomes)
- Are from "Parent of A-Level Student", "A-Level Student", or "University Student/Applicant"

Aim for **15-25 reviews per page** from the master list (defined in `subject.html`). Quality over quantity — better to have 18 clearly-relevant reviews than 35 with weak fit.

Pick one review per page to be the **anchor for the hero / first-lesson section**:
- GCSE page: a review with a clear grade jump on a named subject (e.g. Sarah K.'s 4→7 Maths is the canonical example)
- A-Level page: a review with a clear A-Level outcome on a named subject (Nick W.'s Psychology review is a strong fit)

Use the real review's actual text — do not invent or paraphrase. Attribute correctly: name, role, level/subject/grade.

---

## Frontmatter Contract

Both pages share this structure. Every field below must be present unless marked "optional".

### Shared fields (both GCSE and A-Level)

```yaml
---
title: "[SEO title — 50-65 chars, must include 'Location' + 'Level' + 'Tutors']"
description: "[Meta description — 145-160 chars, must include location + level + tutor/tutoring keyword]"
layout: "subject"
location: "[Location]"   # e.g. "Birmingham"
level: "[GCSE or A-Level]"   # exactly "GCSE" or "A-Level" — case-sensitive

# Hero H1 + lead — pick a theme-driven angle per page. NEVER reuse "Who Find the Gap" generic across cities.
hero_heading_line1: "[First line of H1 — must contain Location + Level + Tutors]"
hero_heading_line2: "[Second line of H1 — short, theme-driven, picks up the local angle]"
hero_lead: "[2-3 sentence lead paragraph that opens the page. Must name at least one specific local detail (a school federation, a destination university, a major employer). Must contain [Level] tutor / [Level] tutoring at least once.]"

# Hero grade card — anchored to a real review
grade_from: "[lower grade]"   # GCSE: "4" / A-Level: "C" or "D"
grade_to: "[higher grade]"    # GCSE: "7" / A-Level: "A"
grade_stat: "[real attributed review summary — 1 sentence naming the parent and the jump]"

# First lesson section — local attainment + parent quote
first_lesson_eyebrow: "YOUR FIRST [LEVEL] LESSON"
first_lesson_heading: "What Happens in Your First Lesson with a [Location] [Level] Tutor"
first_lesson_context: "[3-5 sentence paragraph on local attainment — must include level + tutor keyword 2x]"
first_lesson_quote: "[Real review verbatim — pick one with clear grade improvement]"
first_lesson_quote_name: "[First name + initial]"
first_lesson_quote_role: "[Parent of GCSE Student / Parent of A-Level Student]"
first_lesson_quote_grade: "[Grade X → Grade Y in [Subject]]"

# Schools (used in the first-lesson context narrative, not a separate section)
schools: ["School One", "School Two", "School Three", "School Four", "School Five", "School Six"]

# Nearby area links (sibling location pages, for cross-linking)
area_links:
  - "Nearby Town 1 Tutors|/locations/nearby-town-1-tutors/"
  - "Nearby Town 2 Tutors|/locations/nearby-town-2-tutors/"
  # 4-6 links total

# Pathways accordion (3 categories, prose body per category)
pathways_heading: "[What Could Be Next After Your [Location] [Level]s]"
pathways_lead: "[1 sentence intro, level-appropriate]"
pathways:
  - title: "[Category 1]"
    body: >
      [Paragraph of 4-6 sentences naming specific local destinations.
       Must include "tutor", "tutoring", or "tuition" at least once.]
  - title: "[Category 2]"
    body: >
      [Same.]
  - title: "[Category 3]"
    body: >
      [Same.]

# Reviews — level-filtered subset of master list (15-25 entries)
reviews:
  - "Name|Role|Review text"
  - "..."

# Tutors — 8-10 scraped from thedegreegap.com/teachers, level-relevant
tutors:
  - name: "..."
    url: "..."
    image: "..."

# Optional: override default tutor browse URL
tutors_browse_url: "https://thedegreegap.com/teachers/languages/[Level]-Maths"

# FAQs — level-specific (4 Q+A pairs)
faq_1_q: "[Level-appropriate question 1]"
faq_1_a: "[Level-appropriate answer 1]"
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

### Hero H1 + lead — must vary per city (NEVER reuse "Who Find the Gap")

This is the most-seen line on the page. A generic H1 like "GCSE Tutors in {Location} Who Find the Gap" duplicated across every city looks templated. Worse, Google deduplicates near-identical H1s across pages. Each page must have a **theme-driven H1 line 2** that picks up the local angle from the research.

**Process to pick the H1:**

1. From your local research, identify the page's single strongest local angle. Examples:
   - **Selective-school competition** (grammar federation, oversubscribed sixth forms) — e.g. Birmingham's King Edward VI grammar federation
   - **Russell Group university hub** — e.g. Manchester, Bristol, Sheffield
   - **Engineering / manufacturing apprenticeships** — e.g. Derby (Rolls-Royce, Toyota), Coventry (JLR)
   - **Financial-services hub** — e.g. Birmingham (HSBC UK HQ), Edinburgh
   - **Post-Covid attainment recovery** — e.g. comprehensive-heavy areas catching up
   - **Commuter belt to a bigger city** — e.g. Reading, Brighton (London commuter pressure)
   - **Healthcare / NHS Trust catchment** — e.g. cities with major teaching hospitals

2. Use that angle to write **line 2 of the H1**. Examples that have worked:

| Angle | Possible line 2 |
|---|---|
| Selective school competition (GCSE) | `Who Get Your Child Into Sixth Form` / `Built for the Grammar-School Standard` |
| Russell Group hub (A-Level) | `Who Open Russell Group Offers` / `Built for the UCAS Offer You Want` |
| Engineering apprenticeships (GCSE) | `For the Rolls-Royce Apprenticeship Route` (Derby) |
| Comprehensive catch-up (GCSE) | `Who Close the Gap Before Year 11 Mocks` |
| Financial-services hub (A-Level) | `For Birmingham's HSBC and PwC Pathways` |

3. **Line 1** stays close to the SEO-anchor format: `[Location] [Level] Tutors` or `[Level] Tutors in [Location]`. This guarantees the keyword is in the H1.

4. **Lead paragraph** must name at least one specific local detail by name (a school federation, a sixth-form college, a destination university, a major local employer). A lead that could appear unchanged on a Manchester page if you swapped "Birmingham" for "Manchester" is a wasted lead. The local detail anchors the page's relevance signal for Google and recognition signal for parents.

5. **Lead must use `[Level] tutor` or `[Level] tutoring` at least once** within the paragraph.

### GCSE-specific guidance

- **`first_lesson_context`** — Describe the local GCSE attainment picture. Use real numbers (Attainment 8 score, % achieving 9-4 in English and Maths). Frame the "right tutor finds the gap" thesis. Must include "GCSE tutor", "GCSE tutoring", or "GCSE tuition" at least twice.

- **`pathways` categories for GCSE pages:**
  1. **Sixth Forms** — Name 3-4 popular local school sixth forms with brief context on which is strong for what.
  2. **Apprenticeships** — Name 3-4 major local employers running apprenticeship schemes. Include grade requirements.
  3. **Further Education** — Name the main local FE colleges, campuses, what they specialise in (BTECs, T Levels).

- **FAQs to write:**
  - Q1: What GCSE subjects can my child get tutoring in?
  - Q2: When is the right time to start GCSE tutoring? (Year 9/10/11 reasoning)
  - Q3: Do your tutors cover the exam boards used in {Location} schools? (name actual boards — AQA, Edexcel, OCR, WJEC)
  - Q4: How quickly will my child see results?

### A-Level-specific guidance

- **`first_lesson_context`** — Describe the local A-Level attainment picture. Frame around the stakes — university decisions, Russell Group offers, apprenticeship degree schemes. Use real numbers if you can find them (% A*-A, % A*-B at LA level). Must include "A-Level tutor", "A-Level tutoring", or "A-Level tuition" at least twice.

- **`pathways` categories for A-Level pages:**
  1. **Universities** — Name 3-4 universities {Location} students typically apply to, with a note on which courses they're known for. Mention Russell Group / Oxbridge if relevant.
  2. **Degree Apprenticeships** — Name 3-4 employers offering degree apprenticeships locally or regionally. Include typical UCAS-point or grade requirements.
  3. **Career Pathways** — Name 2-3 specific career routes A-Level students go into locally (sectors, not specific employers necessarily). E.g. "Finance via London commute", "Engineering at Rolls-Royce or Toyota", "Healthcare via medicine/nursing degrees".

- **FAQs to write:**
  - Q1: What A-Level subjects can my child get tutoring in?
  - Q2: When is the right time to start A-Level tutoring? (Year 12 vs Year 13)
  - Q3: Do your tutors know the specific A-Level exam boards used in {Location} sixth forms?
  - Q4: How quickly will my child see results / impact on UCAS applications?

---

## Pain Points Vocabulary (level-specific)

Use as a vocabulary bank to draw from when writing `first_lesson_context`, the `pathways` accordion bodies, `tutor_strip_body` and the FAQ answers. Weave concepts into natural, original sentences. **Never copy verbatim.** Different pages should emphasise different points to keep the page reading like a separately authored document.

### GCSE Pain Points

**Foundation gaps:** A topic from Year 8 or 9 that nobody re-explained, an algebra method missed during illness, a fractions concept that never properly clicked, a Bunsen-burner Chemistry lesson the student missed, an English Literature text introduced when the class was already past it.

**Year 10 to Year 11 trajectory:** Predicted grades stuck below target, mock results dropping despite revision, grade boundaries pulling away in Maths and the Sciences, parents not understanding why effort and grades don't match, last-minute realisation that Year 11 has weeks not terms left.

**Mock exam pain:** First November mocks landing harder than expected, January resits, March mocks setting the predicted grade for sixth-form applications, the difference between knowing content and writing it in 1 hour 30, students who can do practice papers calmly but freeze in the exam hall.

**Sixth-form entry pressure:** Conditional grade 6 in English and Maths for a chosen sixth form, grade 5 minimum for Level 3 college courses, grammar-school federations pushing for grade 7 to 9, students seeing friends offered sixth-form places while their own offer letters haven't arrived.

**Specific subject pain:** GCSE Maths: algebra, geometry, the 9-mark problem-solving question, paper 3 calculator timing. GCSE English: Language paper 1 source-based writing, Literature essay structure under timed conditions, unseen poetry analysis. GCSE Sciences: required practicals, six-mark questions, calculations under pressure. GCSE History: source analysis, the 16-mark essay. GCSE Geography: case studies, the long-answer questions where most marks are lost.

**Confidence and identity:** Bright students who've decided they're "just not good at Maths", students who've stopped putting their hand up, students avoiding the subject altogether, students who think a grade 4 is a personal verdict rather than a snapshot.

**Practical / pace problems:** Class of 32, teacher dealing with disruption, supply teaching covering core topics, students embarrassed to ask the same question for the third time, large class size preventing one-to-one explanation at the moment it's needed.

### A-Level Pain Points

**The step up from GCSE:** Students who got a grade 8 or 9 at GCSE Maths but find A-Level Maths a different subject, the jump in volume of content per topic, longer reading lists, fewer scheduled lessons per subject than at GCSE, much heavier independent study expectation.

**Depth and evaluation:** Knowing the content but not landing the AO3 marks, essays that summarise rather than evaluate, the difference between describing a study and analysing its methodology, getting the calculation right but missing the explanation marks, treating an A-Level paper like a GCSE paper.

**Timed exam performance:** Students who finish all the practice papers calmly at home but run out of time in the exam, the 2-hour 30 endurance gap, knowing what to do but not in the time available, the gap between mock marks and actual marks.

**UCAS pressure:** Predicted grades arriving below target university offers, conditional Russell Group offers requiring an A in a specific subject, Oxbridge and Medicine applications needing A* across the board, BBB versus AAB making the difference between firm and insurance, students realising the predicted grade decides everything.

**Personal statement and interviews:** Year 12 personal statements feeling generic, Cambridge or Oxford interview preparation, Medicine UCAT/BMAT pressure, students unable to articulate why they want a specific course, supervisors not having time for the 1:1 coaching that admissions tutors expect.

**Subject-specific A-Level pain:** A-Level Maths: pure / mechanics / statistics balance, multi-step problems, A-Level Further Maths workload. A-Level Sciences: A2 content compounding A1 gaps, required practicals, organic chemistry mechanisms, mathematical demand inside Physics. A-Level Economics: the 25-mark essay, evaluation depth, drawing the diagrams that examiners reward. A-Level Psychology: research methods, AO3 evaluation chains, applied questions. A-Level History: the 25-mark essay, the source-based question, balancing breadth and depth.

**Confidence at the top end:** High-achieving students who've never had to work hard for a grade until A-Level, students whose teachers told them they'd be fine and now they're not fine, students at strong sixth forms feeling outclassed by peers, the imposter pattern in Year 13.

**Practical / pace problems:** Sixth forms moving fast through the specification, teachers without time for individual feedback on essays, fewer chances to ask in class, students who didn't realise A2 content depended on A1 foundations.

### How to use the vocabulary

- Pick 2 to 4 pain points per page that genuinely match the city's character and the page's local angle.
- A page focused on an engineering apprenticeship city should weight foundation gaps + practical / pace problems higher.
- A page focused on a Russell Group hub should weight depth and evaluation + UCAS pressure higher.
- A page focused on a comprehensive-heavy area with below-average attainment should weight confidence and identity + foundation gaps higher.
- Don't try to use all of them. A page that touches every pain point reads like a checklist.

---

## Anti-AI Writing Rules (CRITICAL — read this before writing a single word)

These pages must read like they were written by a person, not by an AI. Google's classifiers and parents both notice the difference. Follow every rule below without exception.

### Banned characters

**No em dashes anywhere.** Do not use the em-dash character (the long dash, U+2014, the long horizontal dash) in any field. Em-dashes are a strong AI tell. Use a comma, a colon, a full stop, or rewrite the sentence instead. This applies to every single field: title, description, `first_lesson_*`, `pathways_*`, `tutor_strip_*`, reviews, FAQs, accordion bodies, everything. **Before saving, scan every field once for em-dashes and replace any you find.**

### Banned words and phrases

Do not use any of these words:

> landscape, foster, navigate, delve, crucial, realm, testament, pivotal, seamless, robust, comprehensive (as an adjective), vibrant, tapestry, unlock, embark, journey (metaphorical), leverage, stakeholders, furthermore, moreover, in conclusion, it is worth noting, it is important to note, a range of, a variety of, particularly, specifically, effectively, consistently, additionally, successfully.

Do not use any of these phrases:

> cutting-edge, bespoke, transformative, unlock potential, embark on a journey, world-class, real difference, game-changer, the right approach, take their learning to the next level.

### Sentence-level rules

**Use contractions naturally.** Write `it's`, `don't`, `can't`, `we'd`, `they're`, `that's`. AI avoids contractions or uses them awkwardly. Humans don't think about it.

**Start sentences with `And` or `But` when it fits.** "But that's the problem." "And most families find it straightforward." These read human. AI was trained to avoid them. Use them.

**Use active voice.** "Tutors structure sessions around the student" not "Sessions are structured around the student." Passive voice is a consistent AI tell. Default to active throughout.

**Cut unnecessary `that`.** "We know students need support" not "We know that students need support." Read every sentence and remove `that` where the sentence still works without it.

**No `-ing` sentence openers.** "Building confidence..." / "Understanding the brief..." / "Working through problems..." are AI sentence starters. Do not open a sentence with a gerund.

**Specific over general.** Every sentence that could apply to any city in the UK is a wasted sentence. A sentence that could only be about Birmingham because it names a real school or a real Birmingham fact is worth ten generic ones.

**Do not open every sentence with the subject.** Vary it. Time phrase, condition, short observation, question. Mix it up.

**Avoid 3-item parallel lists.** AI loves triplets: "calculation steps, essay structure, and the small technical things". One or two specific examples reads more human than three balanced ones. If you write three, cut one.

**Avoid `isn't X, it's Y` framings more than once per page.** The structure "Not a content gap. It's an exam technique gap" is a strong AI tell. Fine to use once for emphasis. Used twice in one section, it becomes pattern noise.

**No soft closing platitudes.** AI ends paragraphs with neat summary lines like "the change they see first isn't the grades, it's the attitude" or "the difference shows up faster than parents expect". Humans tend to end paragraphs on an unresolved observation or a concrete detail, not a wrapped-up moral. If your closing sentence feels like a bow on the paragraph, cut it or replace it with something specific.

**Concrete beats abstract every time.** "What each student actually needs" is abstract and AI-typical. "A fractions concept from Year 8, an algebra method that never got drilled" is concrete and human. Name a real topic, a real year group, a real type of question.

**Polished, balanced prose is the AI default.** All-medium-length sentences, all-grammatical, all-flowing reads like an AI even when the content is correct. Leave a rougher edge: a fragment, a question, a sentence that starts with `And` or `But`. If a paragraph reads like a corporate brochure, it's too smooth.

**Break structural symmetry.** AI builds balanced parallel structures. Humans don't. Do not open three paragraphs in a row the same way. Do not make every sentence in a list the same length.

**Be direct, not aggressive.** State things plainly rather than hedging, but never attack schools, criticise teachers, or make claims about teaching quality. The angle is always that students need more individual attention than any classroom can provide, not that schools are bad. Keep it about class size and pace, not about quality.

**Never name a school alongside a negative result.** Do not publish a specific school's Progress 8 score, Ofsted rating, or attainment data by name. Attainment data only at area or borough level.

### Pre-save scan

Before saving each file, run this self-check by reading the entire frontmatter top to bottom:

1. Search for `—` (em dash). Zero instances allowed. Rewrite any sentence containing one.
2. Search for each banned word. Zero instances allowed.
3. Search for each banned phrase. Zero instances allowed.
4. Read three paragraphs aloud (in your head). If any sound like a corporate brochure or any two sentences mirror each other in structure, rewrite.
5. Confirm at least one fragment, one sentence starting with `And` or `But`, and one specific named topic/year-group/exam-board detail per major paragraph.

---

## Quality Gates — Run These Before Finishing

For **each page** built:

**Structural checks:**
- [ ] File created at the right path (`gcse/_index.md` or `a-level/_index.md`)
- [ ] `layout: "subject"` set correctly
- [ ] `level` field is exactly `"GCSE"` or `"A-Level"` (case-sensitive)
- [ ] `location` field matches the city name as it appears in the parent location page

**SEO checks:**
- [ ] Title contains both location and level
- [ ] Description (145-160 chars) contains level + tutor/tutoring + location
- [ ] `first_lesson_context` uses level-specific tutor keyword at least 2 times
- [ ] `pathways_heading` and `pathways_lead` together use the level-specific tutor keyword
- [ ] Each `pathways` accordion body uses `tutor`/`tutoring`/`tuition` at least once
- [ ] FAQs collectively use level + location + tutor keyword at least twice

**Content quality checks:**
- [ ] `first_lesson_context` includes a REAL local attainment data point (number, %, score)
- [ ] `pathways` names at least 8 specific local entities (schools, colleges, universities, employers) across the three categories combined
- [ ] `first_lesson_quote` is a REAL review taken from the master reviews list — verbatim, not invented
- [ ] `grade_from`/`grade_to`/`grade_stat` are anchored to that same real review
- [ ] `reviews` list has 15-25 entries, all clearly level-relevant
- [ ] `tutors` list has 8-10 entries with valid URLs and image paths

**Uniqueness check (the big one):**
- [ ] The GCSE and A-Level pages for the same city read as distinctly different documents — not the same copy with words swapped.
- [ ] `first_lesson_context` on the GCSE page does NOT appear on the A-Level page even rephrased.
- [ ] `pathways` categories are appropriate per level (Sixth Forms not on A-Level page; Universities not on GCSE page).
- [ ] Parent quotes match the level (GCSE grade jump on GCSE page; A-Level outcome on A-Level page).

**Cross-page consistency:**
- [ ] Both pages reference the same `location` value spelled identically
- [ ] Both pages exist under the same parent (`locations/{slug}-tutors/`)

**Anti-AI writing check:**
- [ ] Zero em-dash characters anywhere in either file
- [ ] Zero banned words (landscape, foster, navigate, delve, crucial, realm, testament, pivotal, seamless, robust, comprehensive [adj], vibrant, tapestry, unlock, embark, journey [metaphorical], leverage, stakeholders, furthermore, moreover, particularly, specifically, effectively, consistently, additionally, successfully)
- [ ] Zero banned phrases (cutting-edge, bespoke, transformative, unlock potential, embark on a journey, world-class, real difference, game-changer)
- [ ] Contractions used naturally (it's, don't, we'd)
- [ ] At least one sentence per major paragraph opens with `And` or `But` or a fragment
- [ ] Active voice throughout
- [ ] No 3-item parallel lists in any paragraph
- [ ] No `-ing` sentence openers

**Build check (run yourself):**
- [ ] `hugo --quiet` builds without errors
- [ ] Visit the rendered page locally to confirm it looks right

---

## Output Reporting

After running, report:
- Files created (full paths)
- Files skipped (with reason — already exists)
- A 1-line summary of the local angle for each page
- Whether you found enough local research to feel confident, or whether the user should refine

---

## What To Do When You're Stuck

- **Can't find local attainment data**: use the LA/borough name in your search, not the city name. Most data is published at LA level. Fall back to "the [Region] region" if the LA-level data is unclear.
- **Can't find named sixth forms / universities**: the parent location page (`/_index.md` for that city) likely has a `schools` list. Use those as your starting point.
- **Can't find a level-relevant tutor on thedegreegap.com**: pick the tutors with broadest subject coverage. The page works fine with a mixed-level tutor roster as long as they all teach the level.
- **Can't find a clean review for the parent quote**: choose the closest-fit real review and use it verbatim. Never invent reviews.

---

## Files Touched

- **Created:** `content/locations/{slug}-tutors/gcse/_index.md` (if missing)
- **Created:** `content/locations/{slug}-tutors/a-level/_index.md` (if missing)
- **Read-only:** the parent `content/locations/{slug}-tutors/_index.md` (for inheriting location data) and `layouts/locations/subject.html` (the template you're targeting)
- **Do NOT modify:** `layouts/`, `static/`, or any existing content files

