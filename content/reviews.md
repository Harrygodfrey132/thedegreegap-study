---
# Reviews page, rendered by layouts/_default/reviews.html: a wall of every
# written review, drawn as the same testimonial card the subject and
# location pages use in their reviews carousel.
#
# The reviews come from data/reviews.yaml (Google) and
# data/reviews-trustpilot.yaml (Trustpilot), word for word, so new reviews
# added there appear here on the next build. This file only holds the
# heading and the booking cards mixed into the wall.
title: "The Degree Gap Reviews: What Parents and Students Say"
description: "Read over 100 reviews of The Degree Gap from parents and students, word for word from Google and Trustpilot. Free consultation call, lessons from £37, no contract."
layout: "reviews"
robots: "index, follow"
callback_prompt: true

heading: "What parents and students say"

# Booking cards, drawn like the review cards, dealt into the wall after the
# 6th review and after every 12th after that, taking these in turn.
# phone: true makes the button ring us instead of opening the booking form.
ctas:
  - title: "Sound familiar?"
    label: "Free consultation"
    text: "Tell us about your child on a free call, usually around 30 minutes, and within 24 hours you'll have profiles of two or three tutors to choose from."
    button: "Book a free consultation"
  - title: "Rather talk it through?"
    label: "Call the team"
    text: "You'll speak to a member of the team, who can answer your questions there and then."
    phone: true
  - title: "Meet the tutor first"
    label: "No contract"
    text: "Your child meets their tutor on a free video call before any lessons start. Lessons from £37 an hour."
    button: "Start the matching process"

sitemap:
  priority: 0.8
  changefreq: monthly
---
