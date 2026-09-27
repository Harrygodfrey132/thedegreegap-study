---
# Reviews page, rendered by layouts/_default/reviews.html.
#
# Every review on the page comes from data/reviews.yaml (Google) and
# data/reviews-trustpilot.yaml (Trustpilot), word for word. This file only
# says which ones to feature and holds the page's own copy. The quotes on
# the results cards are checked against those files when the site builds,
# so if a review changes or goes, the build stops rather than misquoting.
#
# Numbers in the FAQ answers are filled in at build time from hugo.toml and
# data/review_stats.yaml: {gCount} {gRating} {gRatingOnly} {tpScore} {tpCount}
title: "The Degree Gap Reviews: What Parents and Students Say"
description: "Read over 100 reviews of The Degree Gap from parents and students, word for word from Google and Trustpilot. Free consultation call, lessons from £37, no contract."
layout: "reviews"
robots: "index, follow"
callback_prompt: true

hero:
  eyebrow: "REVIEWS"
  heading: "What parents and students say about us"
  lead: "Picking a tutor means trusting someone you haven't met with something that matters a lot. So here's what families who've already done it wrote on Google and Trustpilot, copied word for word, typos and all."
  featured:
    name: "Lisa James"
    source: "google"

results:
  eyebrow: "RESULTS, IN THEIR WORDS"
  heading: "Grades that moved, straight from the reviews"
  intro: "Every child is different and we'd never promise a grade. But these are the kind of results parents tell us about, quoted exactly as they wrote them."
  cta_lead: "Want to talk through where your child is now?"
  cta: "Book a free consultation call"
  items:
    - name: "Chamarika"
      source: "trustpilot"
      label: "GCSE Physics"
      from: "4-5"
      to: "8"
      note: "Predicted, then achieved, in about two months"
      quote:
        - "My son had a predicted 4-5 in Physics and he managed to turn this around and made it an 8 within roughly two months of tutoring."
    - name: "Omo"
      source: "google"
      label: "GCSE English"
      from: "5"
      to: "6/7"
      note: "Over six months, starting in Year 10"
      quote:
        - "after six months of working with Malvina, he has improved from a grade 5 to a 6/7."
    - name: "Joanna tweed"
      source: "google"
      label: "A-Level"
      from: "E and U"
      to: "3 Cs"
      note: "After leaving it until the final hour"
      quote:
        - "The A level tutoring made such a difference to my son, who had left studying until the final hour, managing to turn E and U grades into 3 C grades."
    - name: "Keira Lei"
      source: "google"
      label: "GCSE"
      from: "E"
      to: "B"
      note: "In the student's own words"
      quote:
        - "Has definitely helped me increase my grades from an E to a B!!"

themes:
  eyebrow: "WHAT COMES UP AGAIN AND AGAIN"
  heading: "Three things families keep mentioning"
  cta: "Talk to a member of the team"
  items:
    - title: "Taking the time to find the right match"
      name: "Dawn Lattimer"
      source: "google"
    - title: "Meeting the tutor before you commit"
      name: "nikola"
      source: "trustpilot"
    - title: "Children who start to enjoy it"
      name: "Sorland Pinnacle"
      source: "google"

wall:
  eyebrow: "EVERY WRITTEN REVIEW"
  heading: "All {count} reviews, word for word"
  intro: "The newest Google reviews come first, with Trustpilot reviews mixed in. Use the filters to find families like yours."
  ctas:
    - style: "burgundy"
      heading: "Sound like what your child needs?"
      body: "Book a free consultation call, usually around 30 minutes, and you'll have profiles of two or three tutors within 24 hours."
      button: "Book a free consultation"
    - style: "phone"
      heading: "Rather just talk it through?"
      body: "Give us a ring and you'll speak to a member of the team, who can answer your questions there and then."
      button: "Or book a time to talk"
    - style: "ink"
      heading: "Meet the tutor before you commit"
      body: "Your child meets their tutor on a free video call first. Lessons from £37 an hour, with no contract."
      button: "Start the matching process"

band:
  heading: "Ready to find your child's tutor?"
  body: "A free consultation call, usually around 30 minutes, then profiles of two or three tutors within 24 hours of it."
  button: "Book a free consultation"

founders:
  heading: "{count} of these reviews mention Harry or Joe. That's us."
  paragraphs:
    - "We started The Degree Gap after being tutored ourselves. We each had one tutor who was brilliant and one who was only okay, and it taught us early on that the match is everything."
    - "So we meet every tutor on the platform ourselves, and only around 3% of the people who apply get through. After your call we pick the two or three we think will suit your child, and you choose."
  cta: "Speak to one of us about your child"

steps_heading: "Getting started takes 3 steps"
steps_lead: "Most families have their first lesson booked within a week. And you don't pay anything until your child has found a tutor they like."
steps:
  - title: "A free consultation call"
    body: "A relaxed chat with a member of the team, usually around 30 minutes, so we can get to know you and your child: what's going on, what you've tried and how your child likes to learn. No pressure and no sales pitch."
  - title: "Meet 2 or 3 tutors"
    body: "Within 24 hours of the call you'll get profiles of two or three tutors we've picked for your child, so you can see who they are before choosing. Your child can then meet your favourite on a free video call."
  - title: "Start weekly lessons"
    body: "Lessons are one-to-one and online, using the platform Lessonspace, with a replay of every lesson to look back on. From £37 an hour, no contract, and you can stop whenever you like."
steps_cta: "Book a free consultation"

faq_heading: "A few honest answers"
faq_items:
  - q: "Are these reviews real?"
    a: "Yes. Every one is copied word for word from our Google and Trustpilot pages, typos and all, and you can read them on both sites yourself. We haven't edited any of them, and we haven't left out the ones with fewer than five stars."
  - q: "Why does Trustpilot show {tpScore} when every review there is five stars?"
    a: "Trustpilot doesn't use a straight average. Its score allows for how many reviews a business has, so a profile with fewer reviews sits a little lower until more come in. Ours has {tpCount}, all five stars, and that works out at {tpScore}."
  - q: "Why are there fewer reviews here than on Google?"
    a: "Some people leave a star rating without writing anything. {gRatingOnly} of our {gCount} Google reviews are like that, and as there are no words to show, they're not on this page. You can see all of them on Google."
  - q: "We're already with you. How do we leave a review?"
    a: "Thank you, it really helps other parents decide. You can leave one on [Google](https://share.google/Oq5KJu7wswxBZKspk) or on [Trustpilot](https://www.trustpilot.com/evaluate/thedegreegap.com), whichever you prefer. It only takes a minute."

final_heading: "Book your free<br>consultation"
final_body: "A friendly consultation call, usually around 30 minutes, so we can get to know your child: what's going on, what they're aiming for and what they're like as a learner. Within 24 hours you'll have profiles of two or three tutors to choose from."
final_assurance: "Free call · Lessons from £37 · No contract"

sitemap:
  priority: 0.8
  changefreq: monthly
---
