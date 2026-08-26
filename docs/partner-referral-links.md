# Partner referral links

Every `/study/referred-by-*/` page now stamps a UTM source onto its form, so a
lead can be traced back to the partner that sent it.

## The links to send partners

Hand the partner the tagged URL, not the bare one. GA4 only reads the query
string, never the hidden form fields, so the tag is what puts them into session
reporting. Change `utm_medium` to match the placement: `banner`, `blog`,
`directory`, or `referral` for a plain text link.

| Partner | Tagged URL |
|---|---|
| FindMySchool | `https://thedegreegap.com/study/referred-by-find-my-school/?utm_source=findmyschool&utm_medium=referral&utm_campaign=findmyschool-2026` |
| Daily Info | `https://thedegreegap.com/study/referred-by-daily-info/?utm_source=dailyinfo&utm_medium=referral&utm_campaign=dailyinfo-2026` |
| Exam Essentials | `https://thedegreegap.com/study/referred-by-exam-essentials/?utm_source=examessentials&utm_medium=referral&utm_campaign=examessentials-2026` |
| My GCSE Maths | `https://thedegreegap.com/study/referred-by-my-gcse-maths/?utm_source=mygcsemaths&utm_medium=referral&utm_campaign=mygcsemaths-2026` |
| Oxford MT | `https://thedegreegap.com/study/referred-by-oxford-mt/?utm_source=oxfordmt&utm_medium=referral&utm_campaign=oxfordmt-2026` |
| Parent Guide to GCSE | `https://thedegreegap.com/study/referred-by-parent-guide-to-gcse/?utm_source=parentguidetogcse&utm_medium=referral&utm_campaign=parentguidetogcse-2026` |
| School Guide | `https://thedegreegap.com/study/referred-by-school-guide/?utm_source=schoolguide&utm_medium=referral&utm_campaign=schoolguide-2026` |
| SnapRevise | `https://thedegreegap.com/study/referred-by-snap-revise/?utm_source=snaprevise&utm_medium=referral&utm_campaign=snaprevise-2026` |
| Top School Guide | `https://thedegreegap.com/study/referred-by-top-school-guide/?utm_source=topschoolguide&utm_medium=referral&utm_campaign=topschoolguide-2026` |
| TutorWiz | `https://thedegreegap.com/study/referred-by-tutor-wiz/?utm_source=tutorwiz&utm_medium=referral&utm_campaign=tutorwiz-2026` |
| UKMM Education | `https://thedegreegap.com/study/referred-by-ukmm-education/?utm_source=ukmmeducation&utm_medium=referral&utm_campaign=ukmmeducation-2026` |

`utm_source` follows the squashed convention the banner links already use
(`findmyschool`, `schoolguide`). Do not hyphenate it: a partner tagged two ways
splits into two rows in every report. To tell two placements apart, vary
`utm_campaign` and `utm_content` instead.

## What arrives with a lead

| Field | Source | Example |
|---|---|---|
| `source` | Hardcoded per page in the layout | `referred-by-find-my-school` |
| `page_url` | The page the form sat on | `/study/referred-by-find-my-school/` |
| `utm_source` | Query string, else the page default | `findmyschool` |
| `utm_medium` | Query string, else the page default | `referral` |
| `utm_campaign` | Query string, else the page default | `untagged-link` |
| `referrer` | External site the visitor arrived from | `findmyschool.co.uk/...` |
| `landing_page` | First page of the visit | `/study/referred-by-find-my-school/` |

The defaults sit in each page's front matter:

```yaml
utm_source_default: "findmyschool"
utm_medium_default: "referral"
utm_campaign_default: "untagged-link"
```

They exist because partners paste bare URLs. Before this, a lead from a partner
who dropped the query string arrived with `utm_source` empty. A real
`?utm_source=` in the URL always wins, and first touch wins across the visit.

`utm_campaign: untagged-link` is the tell that a partner is using the bare URL.
If you see it, send them the tagged link from the table above.

Pages outside `referred-by-` set no defaults and behave exactly as before: the
field stays empty and is disabled before submit, so it never clutters the email.

## Known gap

The thank-you page fires a Meta Pixel `Lead` event and no GA4 event, so GA4
shows partner *traffic* but not partner *leads*. Counting leads by partner has
to come from the `utm_source` field on the Formspree and Zoho side until a
`generate_lead` event is added to `layouts/_default/book-a-call-thank-you.html`.

## Knowing which page on the partner's site they clicked from

Two fields answer this, and only one is reliable.

**`referrer`** records the partner's host and path, for example
`findmyschool.co.uk/schools/harrogate-grammar`. It costs nothing and is already
captured. The catch is that most sites now send `Referrer-Policy:
strict-origin-when-cross-origin`, which strips the path and leaves only
`findmyschool.co.uk`. So it tells you the partner reliably and the page only
sometimes.

**`utm_content`** is the reliable one, because it travels in the URL and no
browser policy strips it. Ask the partner to put the placement in it:

```
?utm_source=findmyschool&utm_medium=directory&utm_campaign=fms-2026&utm_content=harrogate-grammar
```

Whatever they put in `utm_content` arrives on the lead. The banner links in
`layouts/_default/banner-previews*.html` already set it per creative
(`leaderboard-728`, `skyscraper-160`), and until now it was being thrown away:
`static/js/main.js` captured only source, medium and campaign. It now captures
`utm_content` too.
