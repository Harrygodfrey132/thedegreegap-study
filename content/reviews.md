---
# Reviews page, rendered by layouts/_default/reviews.html.
#
# The reviews are the page. Every one comes from data/reviews.yaml (Google)
# and data/reviews-trustpilot.yaml (Trustpilot), word for word, so new
# reviews added there appear here on the next build. This file only holds
# the few lines of copy around them and the booking cards mixed into the
# wall.
title: "The Degree Gap Reviews: What Parents and Students Say"
description: "Read over 100 reviews of The Degree Gap from parents and students, word for word from Google and Trustpilot. Free consultation call, lessons from £37, no contract."
layout: "reviews"
robots: "index, follow"
callback_prompt: true

eyebrow: "REVIEWS"
heading: "What parents and students say"
lead: "Every review here is copied word for word from Google and Trustpilot."

# Booking cards dealt into the wall of reviews, one after the 6th review and
# one after every 12th after that, taking these in turn. icon is calendar,
# phone or video; phone: true makes the button ring us instead of booking.
ctas:
  - eyebrow: "FREE CONSULTATION"
    icon: "calendar"
    heading: "Sound like what your child needs?"
    body: "A free call, usually around 30 minutes, then profiles of two or three tutors within 24 hours."
    button: "Book a free consultation"
  - eyebrow: "PREFER TO TALK?"
    icon: "phone"
    heading: "Give us a ring"
    body: "You'll speak to a member of the team, who can answer your questions there and then."
    phone: true
  - eyebrow: "NO CONTRACT"
    icon: "video"
    heading: "Meet the tutor before you commit"
    body: "Your child meets their tutor on a free video call first. Lessons from £37 an hour."
    button: "Start the matching process"

closing_heading: "Ready to find your child's tutor?"
closing_body: "A free consultation call, usually around 30 minutes, then profiles of two or three tutors within 24 hours."
closing_assurance: "Free call · Lessons from £37 · No contract"

sitemap:
  priority: 0.8
  changefreq: monthly
---
