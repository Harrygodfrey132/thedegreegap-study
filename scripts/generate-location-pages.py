#!/usr/bin/env python3
"""Generate Hugo location pages from shared place and subject data."""

from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "locations"
CONTENT_DIR = ROOT / "content" / "locations"
GENERATED_DIR = CONTENT_DIR / "generated"

INTRO_TEMPLATES = [
    (
        "Families in {loc} come to The Degree Gap when a student needs clearer teaching, stronger routines, and a tutor who can make difficult work feel manageable again.",
        "We connect students with experienced independent tutors across GCSE and A-Level, matching subject knowledge, exam board experience, and teaching style to the student's goals."
    ),
    (
        "Finding the right tutor in {loc} should feel simple, not like another job for an already busy family.",
        "The Degree Gap helps by understanding what the student needs first, then introducing a carefully vetted tutor who can support confidence, subject knowledge, and exam technique."
    ),
    (
        "Students in {loc} are often balancing demanding schoolwork, revision, mock exams, and decisions about what comes next.",
        "Our role is to make high-quality academic support easier to access, whether your child needs steady weekly tuition or focused help before an important exam window."
    ),
]

BANNER_TEMPLATES = [
    (
        "Worried your child is falling behind at school in {loc}?",
        "We help families in {loc} find carefully vetted GCSE and A-Level tutors who can rebuild confidence, explain difficult topics clearly, and create a plan for steady academic progress."
    ),
    (
        "Looking for a tutor in {loc} who can actually build confidence?",
        "The Degree Gap connects students with experienced independent tutors who understand the pressure of exams and provide focused one-to-one support across GCSE and A-Level subjects."
    ),
    (
        "Need clearer GCSE or A-Level support in {loc}?",
        "We introduce families to tutors who can identify gaps quickly, strengthen exam technique, and help students feel more in control of their learning."
    ),
    (
        "Is exam pressure starting to affect confidence at home?",
        "Our tutor matching service helps students in {loc} get calm, structured support from experienced GCSE and A-Level tutors who know how to turn uncertainty into progress."
    ),
]

ONLINE_TEMPLATES = [
    (
        "How Online Tuition Can Support Students in {loc}",
        "Online tuition gives students in {loc} access to the right tutor without adding travel time to an already full week.",
        "Sessions can use shared whiteboards, live problem solving, document review, and targeted past paper practice, so support remains personal and interactive from home."
    ),
    (
        "Flexible Online Tuition for {loc} Families",
        "For many families in {loc}, online tutoring is the most practical way to keep lessons consistent around school, clubs, commuting, and family commitments.",
        "Tutors can adapt each session to the student's current work, using screen sharing and digital resources to explain ideas clearly and keep revision moving."
    ),
    (
        "Expert Tutors Available Online Across {loc}",
        "The best tutor for a student is not always the closest one geographically, which is why online tuition can be so useful for families in {loc}.",
        "We can introduce tutors with the right subject expertise and exam board knowledge, while students learn from a familiar, focused environment at home."
    ),
    (
        "Online Lessons Built Around {loc} Students",
        "Online lessons work especially well when students need regular structure, fast feedback, and support that fits around school deadlines.",
        "Through The Degree Gap, families in {loc} can access one-to-one tuition that focuses on gaps in understanding, exam confidence, and practical next steps."
    ),
    (
        "High-Quality Tuition Without the {loc} Commute",
        "Removing travel time makes it easier for students in {loc} to keep momentum, especially during busy revision periods.",
        "The tutors in our network use interactive tools, worked examples, and tailored resources so online lessons feel focused, responsive, and productive."
    ),
]

# One image per INTRO_TEMPLATES entry — chosen to match the copy's tone
# [0] clearer teaching / stronger routines → classroom feel
# [1] finding the right tutor / busy family → approachable group study
# [2] balancing demanding schoolwork / exam decisions → aspirational achievement
INTRO_TO_ABOUT_IMAGE = [
    "/images/students-in-classroom-taking-notes.jpg",
    "/images/group-study-discussion-with-laptop.jpg",
    "/images/graduation-ceremony-caps.jpg",
]

# One image per ONLINE_TEMPLATES entry — chosen to match the copy's angle
# [0] access right tutor without travel time → child at laptop, practical
# [1] keep lessons consistent around busy schedule → tidy workspace with coffee
# [2] best tutor not always closest geographically → focused late-night study
# [3] regular structure / fast feedback from home → relaxed home environment
# [4] removing travel keeps momentum → student celebrating progress
ONLINE_TO_IMAGE = [
    "/images/child-using-online-learning-laptop.jpg",
    "/images/online-study-workspace-with-coffee.jpg",
    "/images/student-studying-at-night-with-laptop.jpg",
    "/images/student-studying-on-bed-with-laptop.jpg",
    "/images/student-celebrating-online-learning.jpg",
]

SUBJECT_DESCRIPTION_TEMPLATES = {
    "gcse_maths": [
        "Build confidence with number, algebra, geometry, and statistics through targeted GCSE Maths tuition shaped around the student's exam board.",
        "Close gaps in core Maths skills with patient one-to-one support, regular practice, and clear methods students can use under exam conditions.",
        "Strengthen problem solving, calculation fluency, and exam technique with GCSE Maths sessions focused on the topics causing the most stress."
    ],
    "gcse_english": [
        "Improve reading, writing, analysis, and confidence across English Language and Literature with structured GCSE support.",
        "Develop clearer written answers, stronger textual analysis, and more confident essay planning for GCSE English papers.",
        "Help students move from vague ideas to precise written responses with focused English tuition and practical feedback."
    ],
    "gcse_science": [
        "Support Biology, Chemistry, and Physics revision with clear explanations, retrieval practice, and exam-style questions.",
        "Make difficult GCSE Science topics easier to understand with a tutor who can connect theory, practical skills, and mark scheme language.",
        "Build confidence across the sciences with targeted help on knowledge gaps, required practicals, and calculation questions."
    ],
    "gcse_history": [
        "Master source analysis, essay structure, chronology, and knowledge recall with GCSE History tuition tailored to the specification.",
        "Turn detailed History content into clear, well-argued answers with support on planning, evidence, and timed writing.",
        "Improve GCSE History confidence through focused revision, stronger arguments, and better use of sources and interpretations."
    ],
    "gcse_geography": [
        "Strengthen physical and human geography knowledge with targeted support on case studies, data response, and extended writing.",
        "Build GCSE Geography confidence by connecting key processes, examples, and exam technique in a structured way.",
        "Help students organise case studies, improve geographical explanation, and answer command words more precisely."
    ],
    "gcse_languages": [
        "Improve vocabulary, grammar, listening, reading, writing, and speaking confidence with GCSE language tuition.",
        "Support language learners with regular practice, clearer grammar, and exam preparation across the four assessed skills.",
        "Build fluency and accuracy through focused GCSE language sessions tailored to the student's confidence and exam board."
    ],
    "alevel_maths": [
        "Work through pure maths, mechanics, and statistics with a tutor who can make methods clear and exam-ready.",
        "Strengthen A-Level Maths confidence with support on calculus, algebra, modelling, and multi-step exam questions.",
        "Tackle demanding A-Level Maths topics through structured explanations, worked examples, and targeted past paper practice."
    ],
    "alevel_biology": [
        "Develop deeper understanding of cells, genetics, physiology, ecology, and practical skills with focused A-Level Biology support.",
        "Improve A-Level Biology answers by linking knowledge, application, data analysis, and precise mark scheme language.",
        "Make Biology revision more manageable with structured support across content-heavy topics and exam technique."
    ],
    "alevel_chemistry": [
        "Master organic, inorganic, and physical chemistry with clear explanations and exam-focused practice.",
        "Build confidence with calculations, mechanisms, bonding, energetics, and practical questions in A-Level Chemistry.",
        "Turn complex Chemistry topics into manageable steps with one-to-one support tailored to the student's exam board."
    ],
    "alevel_economics": [
        "Sharpen micro and macroeconomic analysis with support on diagrams, real-world application, and evaluation.",
        "Improve A-Level Economics essays by learning how to structure arguments, apply theory, and write balanced evaluation.",
        "Build confidence with economic models, policy questions, and exam timing through focused one-to-one tuition."
    ],
    "alevel_history": [
        "Build stronger essays, source analysis, and interpretation skills for high-level A-Level History answers.",
        "Support A-Level History students with content recall, argument structure, evidence, and timed writing.",
        "Turn detailed historical knowledge into precise, analytical essays with targeted feedback and planning support."
    ],
    "alevel_psychology": [
        "Understand theories, studies, research methods, and evaluation points with structured A-Level Psychology tuition.",
        "Improve Psychology essays by organising knowledge clearly and applying evaluation with confidence.",
        "Build a practical revision system for A-Level Psychology across approaches, biopsychology, research methods, and options."
    ],
    "other_11_plus": [
        "Prepare for 11+ exams with structured support across verbal reasoning, non-verbal reasoning, maths, and English.",
        "Give younger students a calmer preparation route with regular practice, clear feedback, and confidence-building support.",
        "Support selective school preparation through focused 11+ lessons adapted to each child's strengths and gaps."
    ],
    "other_personal_statement": [
        "Get expert one-to-one support on UCAS personal statements, from idea selection to final polish.",
        "Help students shape a clearer, more compelling personal statement with guidance from academically experienced mentors.",
        "Support university applicants with structure, subject motivation, reflection, and concise personal statement writing."
    ],
    "other_common_entrance": [
        "Target Common Entrance preparation with steady support across core subjects, revision habits, and exam confidence.",
        "Help students prepare for independent school entry with structured lessons and clear next steps.",
        "Build confidence for Common Entrance through targeted practice, feedback, and calm academic support."
    ],
}


def pick_idx(options: list, seed: str) -> int:
    return sum(ord(char) for char in seed) % len(options)


def pick(options: list, seed: str):
    return options[pick_idx(options, seed)]


def load_table(name: str, key: str) -> list[dict]:
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))[key]


def quote(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def toml_array(values: list[str]) -> str:
    return "[" + ", ".join(quote(value) for value in values) + "]"


def front_matter(entries: list[tuple[str, str | list[str] | float]]) -> str:
    lines = ["---"]
    for key, value in entries:
        if isinstance(value, list):
            lines.append(f"{key}: {toml_array(value)}")
        elif isinstance(value, float):
            lines.append(f"{key}: {value:.2f}")
        else:
            lines.append(f"{key}: {quote(value)}")
    lines.extend(["---", ""])
    return "\n".join(lines)


def tutor_url(area_slug: str) -> str:
    return f"/locations/{area_slug}-tutors/"


def alevel_url(area_slug: str) -> str:
    return f"/locations/{area_slug}-tutors/a-level/"


def subject_url(area_slug: str, subject_slug: str) -> str:
    return f"/locations/{area_slug}-tutors/a-level/a-level-{subject_slug}-tutor-{area_slug}/"


def subject_cards(seed: str) -> list[str]:
    labels = [
        ("GCSE Maths Tutoring", "gcse_maths"),
        ("GCSE English Tutoring", "gcse_english"),
        ("GCSE Science Tutoring", "gcse_science"),
        ("GCSE History Tutoring", "gcse_history"),
        ("GCSE Geography Tutoring", "gcse_geography"),
        ("GCSE Language Tutoring", "gcse_languages"),
        ("A-Level Maths Tutoring", "alevel_maths"),
        ("A-Level Biology Tutoring", "alevel_biology"),
        ("A-Level Chemistry Tutoring", "alevel_chemistry"),
        ("A-Level Economics Tutoring", "alevel_economics"),
        ("A-Level History Tutoring", "alevel_history"),
        ("A-Level Psychology Tutoring", "alevel_psychology"),
        ("11+ Preparation", "other_11_plus"),
        ("University Personal Statement", "other_personal_statement"),
        ("Common Entrance Preparation", "other_common_entrance"),
    ]
    return [
        f"{label}|{pick(SUBJECT_DESCRIPTION_TEMPLATES[key], f'{seed}:{key}')}"
        for label, key in labels
    ]


def location_copy(area: dict, seed: str) -> list[tuple[str, str | list[str]]]:
    loc = area["name"]
    banner_heading, banner_lead = pick(BANNER_TEMPLATES, seed)
    intro_1, intro_2 = pick(INTRO_TEMPLATES, seed)
    about_image = INTRO_TO_ABOUT_IMAGE[pick_idx(INTRO_TEMPLATES, seed)]
    online_heading, online_1, online_2 = pick(ONLINE_TEMPLATES, seed)
    online_image = ONLINE_TO_IMAGE[pick_idx(ONLINE_TEMPLATES, seed)]
    school_names = area["schools"][:3]
    school_list = ", ".join(school_names[:-1]) + f", and {school_names[-1]}" if len(school_names) > 1 else school_names[0]

    return [
        ("banner_heading", banner_heading.format(loc=loc)),
        ("banner_lead", banner_lead.format(loc=loc)),
        ("intro_1", intro_1.format(loc=loc)),
        ("intro_2", intro_2.format(loc=loc)),
        ("about_image", about_image),
        ("online_image", online_image),
        ("subject_cards", subject_cards(seed)),
        ("schools_intro", f"We support students from schools across the {loc} area, including {school_list}. Whether your child attends a selective, independent, grammar, or local state school, we can help you find a tutor who understands the level expected."),
        ("online_heading", online_heading.format(loc=loc)),
        ("online_1", online_1.format(loc=loc)),
        ("online_2", online_2.format(loc=loc)),
        ("faq_1_q", f"How do I find a tutor in {loc}?"),
        ("faq_1_a", f"Start by telling us what the student needs help with, their current level, and their goals. We then recommend a vetted tutor covering {loc} who fits the subject, exam board, and learning style."),
        ("faq_2_q", f"Do you offer GCSE and A-Level tutoring in {loc}?"),
        ("faq_2_a", f"Yes. We introduce families in {loc} to experienced independent tutors who can provide support across Maths, English, Sciences, Humanities, Languages, and exam technique, with lessons available online for flexible scheduling."),
        ("faq_3_q", f"Can tutors support students from {loc} schools?"),
        ("faq_3_a", f"Yes. Our tutors work with students from schools across the {loc} area, including selective, independent, grammar, and local state schools."),
        ("faq_4_q", "How quickly can tuition start?"),
        ("faq_4_a", "Timings depend on the student's needs and tutor availability, but we aim to make suitable introductions quickly once we understand the subject, level, goals, and preferred schedule."),
    ]


def common_copy(area: dict, seed: str, subject: dict | None = None) -> list[tuple[str, str]]:
    loc = area["name"]
    intro_1, intro_2 = pick(INTRO_TEMPLATES, seed)
    about_image = INTRO_TO_ABOUT_IMAGE[pick_idx(INTRO_TEMPLATES, seed)]
    online_heading, online_1, online_2 = pick(ONLINE_TEMPLATES, seed)
    online_image = ONLINE_TO_IMAGE[pick_idx(ONLINE_TEMPLATES, seed)]

    if subject:
        banner_heading = f"{subject['name']} Tutor in {loc}"
        banner_lead = f"Find an expert {subject['short']} tutor covering the {loc} area, with one-to-one support shaped around your exam board, current level, and target grades."
        faq_prefix = subject["name"]
        faq_need = f"support with {subject['concepts']}"
    else:
        banner_heading = f"GCSE & A-Level Tutors in {loc}"
        banner_lead = f"Find carefully vetted GCSE and A-Level tutors covering {loc}, with personalised support across core subjects, exam boards, and university preparation."
        faq_prefix = "GCSE and A-Level tutoring"
        faq_need = "support across Maths, English, Sciences, Humanities, Languages, and exam technique"

    return [
        ("banner_heading", banner_heading),
        ("banner_lead", banner_lead),
        ("intro_1", intro_1.format(loc=loc)),
        ("intro_2", intro_2.format(loc=loc)),
        ("about_image", about_image),
        ("online_image", online_image),
        ("online_heading", online_heading.format(loc=loc)),
        ("online_1", online_1.format(loc=loc)),
        ("online_2", online_2.format(loc=loc)),
        ("faq_1_q", f"How do I find a tutor in {loc}?"),
        ("faq_1_a", f"Start by telling us what the student needs help with, their current level, and their goals. We then recommend a vetted tutor covering {loc} who fits the subject, exam board, and learning style."),
        ("faq_2_q", f"Do you offer {faq_prefix} in {loc}?"),
        ("faq_2_a", f"Yes. We introduce families in {loc} to experienced independent tutors who can provide {faq_need}, with lessons available online for flexible scheduling."),
        ("faq_3_q", f"Can tutors support students from {loc} schools?"),
        ("faq_3_a", f"Yes. Our tutors work with students from schools across the {loc} area, including selective, independent, grammar, and local state schools."),
        ("faq_4_q", "How quickly can tuition start?"),
        ("faq_4_a", "Timings depend on the student's needs and tutor availability, but we aim to make suitable introductions quickly once we understand the subject, level, goals, and preferred schedule."),
    ]


def write_page(path: Path, content: str, dry_run: bool) -> None:
    if dry_run:
        print(path.relative_to(ROOT))
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def build_area_links(areas: list[dict], area: dict) -> list[str]:
    names = [area["name"], *area.get("nearby", [])]
    lookup = {item["name"]: item for item in areas}
    links: list[str] = []
    for name in names:
        target = lookup.get(name)
        if target:
            links.append(f"{target['name']} Tutors|{tutor_url(target['slug'])}")
    for target in areas:
        link = f"{target['name']} Tutors|{tutor_url(target['slug'])}"
        if target["name"] != area["name"] and link not in links:
            links.append(link)
        if len(links) >= 9:
            break
    return links


def generate(dry_run: bool = False, include_alevel: bool = False) -> int:
    areas = load_table("areas.json", "areas")
    subjects = load_table("subjects.json", "subjects") if include_alevel else []

    if GENERATED_DIR.exists() and include_alevel and not dry_run:
        shutil.rmtree(GENERATED_DIR)

    count = 0
    for area in areas:
        area_slug = area["slug"]
        area_links = build_area_links(areas, area)

        write_page(
            GENERATED_DIR / area_slug / "_index.md",
            front_matter(
                [
                    ("title", f"GCSE & A-Level Tutors in {area['name']} | The Degree Gap"),
                    ("description", f"Top-rated GCSE and A-Level tutors in {area['name']}. Connect with expert tutors from prestigious universities and start improving your grades today."),
                    ("location", area["name"]),
                    ("url", tutor_url(area_slug)),
                    ("layout", "single"),
                    ("schools", area["schools"]),
                    ("area_links", area_links),
                    *location_copy(area, f"{area_slug}:main"),
                    ("sitemap_priority", 0.80),
                ]
            ),
            dry_run,
        )
        count += 1

        if not include_alevel:
            continue

        write_page(
            GENERATED_DIR / area_slug / "a-level" / "_index.md",
            front_matter(
                [
                    ("title", f"A-Level Tutors in {area['name']} | GCSE & A-Level Tuition | The Degree Gap"),
                    ("description", f"Find expert A-Level tutors covering the {area['name']} area. The Degree Gap connects you with experienced, vetted tutors across all A-Level subjects and exam boards."),
                    ("location", area["name"]),
                    ("url", alevel_url(area_slug)),
                    ("layout", "alevel"),
                    ("schools", area["schools"]),
                    ("area_links", area_links),
                    *common_copy(area, f"{area_slug}:alevel"),
                    ("sitemap_priority", 0.85),
                ]
            ),
            dry_run,
        )
        count += 1

        for subject in subjects:
            write_page(
                GENERATED_DIR / area_slug / "a-level" / f"{subject['slug']}.md",
                front_matter(
                    [
                        ("title", f"{subject['name']} Tutor {area['name']} | Expert {subject['short']} Tuition | The Degree Gap"),
                        ("description", f"Find an expert {subject['name']} tutor covering the {area['name']} area. One-to-one support across {subject['boards']} from vetted, experienced tutors."),
                        ("location", area["name"]),
                        ("subject", subject["name"]),
                        ("subject_short", subject["short"]),
                        ("subject_slug", subject["slug"]),
                        ("exam_boards", subject["boards"]),
                        ("subject_challenge", subject["challenge"]),
                        ("subject_concepts", subject["concepts"]),
                        ("topics", subject["topics"]),
                        ("url", subject_url(area_slug, subject["slug"])),
                        ("layout", "subject-alevel"),
                        ("schools", area["schools"]),
                        ("area_links", area_links),
                        *common_copy(area, f"{area_slug}:{subject['slug']}", subject),
                        ("sitemap_priority", 0.90),
                    ]
                ),
                dry_run,
            )
            count += 1

    return count


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="List files that would be generated.")
    parser.add_argument("--include-alevel", action="store_true", help="Also regenerate A-Level hub and subject pages.")
    args = parser.parse_args()
    count = generate(dry_run=args.dry_run, include_alevel=args.include_alevel)
    print(f"{'Would generate' if args.dry_run else 'Generated'} {count} location pages.")


if __name__ == "__main__":
    main()
