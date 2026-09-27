# Design

The look every page on the study site shares. It comes from the subject and location pages, the "location design": `layouts/partials/ads-subject-body.html` and `layouts/locations/level-subject.html`, with the styles in `static/css/main.css` (the `lvls-*` classes). The reference page is `/subjects/gcse-maths-tutor/`, the same page `tone.md` uses for the voice.

Build new pages from these pieces. Don't invent new colours, fonts, card styles or section layouts, and don't restyle a component for one page. If a page needs something that isn't here, make it out of the same tokens and card shapes, and add it to this file.

## The feel

- Cream paper, burgundy ink, lots of space. Warm and calm, never flashy.
- Big, heavy headings (weight 900) with short, muted paragraphs under them.
- One job per section, and most sections end with one clear burgundy button.
- Real people and real words: tutor photos, Harry and Joe, reviews word for word.
- Reviews always look like the testimonial card below. That card is the house style for reviews, on every page.

## Colours

Tokens live in `:root` in `main.css`. Use the variables, not the hex values.

| Token | Value | Used for |
|---|---|---|
| `--burgundy` | `#800020` | Brand colour: eyebrows, buttons, links, icons, card labels |
| `--burgundy-dark` | `#5A001F` | Button hover |
| `--cream` | `#fbf7ef` | Page and hero background, review cards |
| `--cream-dark` | `#efe5d5` | Step cards, photo placeholders, decorative discs |
| (no token) | `#fdfbf8` | The lighter sections: reviews, who we are, steps, FAQ |
| `--white` | `#ffffff` | Consultation card, tutor cards, FAQ items |
| `--text` | `#171717` | Headings, names, strong text |
| `--text-muted` | `#5f5a54` | Body copy and leads |
| `--border` | `#e6ded4` | Card borders and dividers |
| (no token) | `#F4B400` | Star ratings, and the gold eyebrow on burgundy panels |
| (no token) | `#f3e7d6` | Body text on burgundy panels |

Google's and Trustpilot's own colours appear only in their logos. The WhatsApp green belongs to the site-wide chat button.

## Type

- **One font family:** the system stack in `--font-body`. No web fonts.
- **Georgia**, in exactly two places: the initial in a testimonial card's circle, and the italic gold "Get started today" line in the closing CTA.
- **Case:** Title Case for H1s ("Online GCSE Maths Tutors, Matched to Your Child"), sentence case for everything else (`vocabulary.md`).

| Element | Style |
|---|---|
| Eyebrow (`.loc-eyebrow`) | 0.72rem, weight 700 to 800, letter-spacing 0.12 to 0.14em, uppercase, burgundy |
| Page title (`.lvls-hero__title`) | clamp(2.2rem, 4.4vw, 3.4rem), weight 900, line-height 1.05, letter-spacing -0.022em |
| Section heading (h2) | clamp(1.8 to 2rem, 3vw, 2.4 to 2.6rem), weight 900, letter-spacing -0.02em |
| Card title or name | 1.2 to 1.5rem, weight 900 |
| Lead paragraph | 1.02 to 1.12rem, line-height 1.65 to 1.7, `--text-muted` |
| Card label (role, "Five-star Google review") | 0.85 to 0.88rem, weight 700, uppercase, letter-spacing 0.04em, burgundy |
| Quotes (reviews, tutor blurbs) | italic, 0.95 to 0.98rem, line-height 1.65 |

## Shape, depth and space

- **Corners:** buttons `--radius` (5px), or 8px for the founder button. Cards 14 to 18px. Pills 999px. Photos 14px.
- **Shadows:**
  - resting cards: `0 6px 22px rgba(35,23,17,.07)`
  - the consultation card: `0 18px 48px rgba(35,23,17,.10)`
  - panels: `--shadow`
- **Container:** `.container`, max 1180px, 24px side padding (16px on phones).
- **Section padding:** 88 to 96px top and bottom (hero 72/80, founder card 56). On phones, 40 to 56px.
- **Spacing:** grids use 24px gaps. A centred section heading block is max 720px wide with 48px below it.
- **Breakpoints:**
  - 980px: the hero, the steps and the closing CTA stack; the tutor grid goes to two columns
  - 720px: the founder card stacks
  - 560px: phone spacing; one tutor per row; smaller review cards

## Backgrounds and decoration

Sections alternate:

- hero on `--cream`, with a 1px `--border` line under it
- tutors on `--cream`
- reviews, who we are, steps and FAQ on `#fdfbf8`
- the closing CTA section on `--cream`, holding a burgundy panel

Each section may carry one piece of decoration in a corner (the `lvls-*__deco` divs): a dashed burgundy circle (`stroke-dasharray` 3 7 or 2 6, opacity 0.18 to 0.35), sometimes with a soft `--cream-dark` disc. Absolutely positioned, `aria-hidden`, never covering text.

## Components

Copy the markup from where it's already used rather than rewriting it.

### Hero with the consultation card (`.lvls-hero`)

Copy it from `ads-subject-body.html`, section 1.

**Copy on the left:**
- eyebrow, e.g. "GCSE MATHS TUTORING · ONLINE, ACROSS THE UK"
- the H1
- a lead of about 75 words: the parent's situation, then what happens next
- the meta row: **From £37/hr** · Online using the platform Lessonspace, plus replay available · the award line

**The white consultation card on the right (`.lvls-hero__card`), in this order:**
1. "FREE CONSULTATION"
2. "Talk to a member of the team to start the matching process"
3. three burgundy tick points
4. a full-width "Book a Free Consultation" button
5. "or call 07859 965776"
6. a divider, then the Google rating line

### Section heading

A centred `p.loc-eyebrow`, an `h2` and one muted `p`, as in `.lvls-tutors__head` and `.lvls-steps__head`. The reviews section puts its h2 on the left instead, with its controls on the right (`.lvls-reviews__head`).

### Tutor cards (`.lvls-tutor-card`)

White card with a square photo on top. Then:
- the name, weight 900
- "GCSE MATHS TUTOR" in burgundy caps
- the blurb in italics, cut at 120 characters
- "BOOK A FREE CALL →" in burgundy caps

Four in a row. An "Ask us to match you" button sits centred underneath.

### Testimonial card (`.lvls-review-card`): how reviews look, everywhere

- **The card:** `--cream` background, 1px `--border`, 18px corners, padding 36/32/32 (28/24 on phones).
- **The contents, in this order:**
  1. **Circle initial:** 64px, white Georgia letter. The circle colours rotate in this order: `#F4B400`, `#B07A6F`, `#5A8A8B`, `#9D6E72`, `#8B7E66`, `#C28A4A`.
  2. **First name:** 1.5rem, weight 900.
  3. **Label:** burgundy caps. "Verified five-star review" in the carousel; "Five-star Google review" or "Five-star Trustpilot review" on the reviews page, where both platforms mix.
  4. **The review:** in italics and quote marks, word for word.
  5. **Who wrote it:** the role, muted, e.g. "Parent of GCSE Student".
  6. **The stars:** gold, letter-spacing 2px.
- **The rules:**
  - Text comes from `data/reviews.yaml` (Google) or `data/reviews-trustpilot.yaml` (Trustpilot), untouched. Shorten only on screen, with a line clamp.
  - First names only.
  - Never type a review into a template.

**Where it's used:**

- **As a carousel** on subject and location pages: `.lvls-reviews`, one card 360px wide, arrow buttons top right, and a "Read all 109 Google reviews in full" outline button opening the reviews drawer.
- **As a wall** on `/reviews/`: `layouts/_default/reviews.html` with `partials/review-card.html`. A masonry of three, two or one columns, 24 at a time, with "Show more reviews" underneath.
- **As a booking card** in the wall: the same card on white, with a burgundy circle holding an icon, a burgundy button, and "or call 07859 965776".

### Founder card (`.lvls-about`)

- Harry and Joe's photo on the left: white 4px border, with the italic caption "Harry & Joe, co-founders".
- On the right: a "WHO WE ARE" eyebrow, a heading, two short paragraphs, and the burgundy button "Speak to one of us about your child →".

### Three steps (`.lvls-steps`)

- Three `--cream-dark` cards, each with a white 124px circle holding a burgundy line icon.
- A burgundy number pill (01, 02, 03) on the circle, then a heading and a paragraph.
- The steps are always:
  1. A free consultation call
  2. Meet 2 or 3 tutors
  3. Start weekly lessons

### FAQ (`.lvls-faq`)

- A large left-aligned heading.
- White accordion items (`details`), 14px corners. The question is in burgundy, weight 800, with a chevron.
- The first item starts open.
- It ends with "Still have a question? Ask us on the consultation call →".

### Mid-page CTA band (`.lvls-midcta`)

Styled in `main.css` and ready to use between long sections:
- a burgundy strip with 14px corners
- on the left, a gold caps eyebrow and a white heading
- on the right, a cream button with "or call 07859 965776" under it

### Closing CTA (`.lvls-cta`)

- A burgundy panel, 18px corners, with the classroom photo filling the right half.
- In the panel:
  - "Get started today" in gold Georgia italics
  - a white heading, e.g. "Book your free GCSE Maths consultation"
  - a paragraph
  - a cream "Book Consultation" button
  - "Free call · Lessons from £37 · No contract"

### Pills and buttons

- **Google pill (`.lvls-gpill`):** white pill with the G logo, **5.0**, gold stars and the review count.
- **Link pills (`.ads-more__pill`):** white pills for related pages, 10 at most (see `CLAUDE.md`).
- **Buttons:** `btn btn-primary` (burgundy, white text) for the main action, `btn-lg` for hero-sized ones. `btn btn-outline` (burgundy text, faint burgundy border) for secondary actions like "Show more reviews". On a burgundy panel the button turns cream with burgundy text.
- **Text links:** burgundy, weight 800. Phone numbers are always bold burgundy links.

## Calls to action

Every page gives the parent a way to book at each natural pause, without banners or pressure. The standard set:

| Where | Wording |
|---|---|
| Hero card | "Book a Free Consultation", "or call 07859 965776" |
| Under tutor cards | "Ask us to match you" |
| On each tutor card | "Book a free call →" |
| Mid-page band | cream button plus phone line |
| Founder card | "Speak to one of us about your child →" |
| End of FAQ | "Ask us on the consultation call →" |
| Closing panel | "Book Consultation" |

- **Where they go:**
  - booking buttons go to `/book-a-call/`; subject pages add `?subject=` so the form arrives filled in
  - phone links go to `tel:+447859965776`, built with `safeURL` when the number comes from a variable, or Go's escaping breaks the link
- **Tracking:**
  - every booking link carries `data-track="book_call_click"`, and every phone link `data-track="click_to_call"`
  - both add `data-track-place` naming the section
  - include `partials/ads-tracking.html` so the clicks reach GA4
- **What not to add:**
  - No sticky booking bar: `main.css` hides it site-wide on purpose.
  - The WhatsApp button always sits bottom right, so don't put a button there on phones.
  - The booking pop-up (`callback_prompt: true` in front matter) is the only overlay.

## Page recipes

- **Subject, level or exam-board landing page:**
  1. hero with the consultation card
  2. tutor cards
  3. reviews carousel
  4. the page's own section (e.g. the exam board)
  5. who we are
  6. three steps
  7. FAQ
  8. closing CTA
  9. related-page pills
- **Reviews page:**
  1. a heading row: eyebrow, H1 and the two ratings on the left; "Book a free consultation" and the phone line on the right
  2. the wall of testimonial cards, with a booking card after the 6th review and every 12th after that
  3. "Show more reviews"
- **Anything else:** start with the hero or a heading row, build the body from the cards above, give each section one call to action, and end with the closing CTA.

## Before it ships

- Built from the classes above, with nothing new in colour, font, shadow or corner radius.
- Page-specific CSS, where needed, stays in the layout's own `<style>` block under a page prefix, using the tokens.
- Checked at 1280, 820 and 390px wide: no sideways scrolling, and nothing covered by the WhatsApp button.
- Copy follows `tone.md` and `vocabulary.md`: parent-chat voice, no em dashes, no grade promises.
