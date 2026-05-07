// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const cta = document.querySelector('.header-cta');

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (cta) cta.classList.toggle('open');
  });
}

document.querySelectorAll('[data-ps-tutor-strip]').forEach((gallery) => {
  const tutors = Array.from(gallery.children);

  tutors
    .sort(() => Math.random() - 0.5)
    .forEach((tutor, index) => {
      tutor.hidden = index >= 5;
      gallery.appendChild(tutor);
    });
});

// Location page — subject tabs
document.querySelectorAll('.loc-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const panel = tab.dataset.tab;
    document.querySelectorAll('.loc-tab').forEach(t => {
      t.classList.remove('loc-tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.loc-subjects__panel').forEach(p => p.classList.add('loc-subjects__panel--hidden'));
    tab.classList.add('loc-tab--active');
    tab.setAttribute('aria-selected', 'true');
    const target = document.getElementById('tab-' + panel);
    if (target) target.classList.remove('loc-subjects__panel--hidden');
  });
});

// Location page — show more reviews
const reviewsToggle = document.getElementById('loc-reviews-toggle');
const reviewsMore = document.getElementById('loc-reviews-more');
if (reviewsToggle && reviewsMore) {
  reviewsToggle.addEventListener('click', () => {
    const expanded = reviewsToggle.getAttribute('aria-expanded') === 'true';
    reviewsMore.hidden = expanded;
    reviewsToggle.setAttribute('aria-expanded', String(!expanded));
    reviewsToggle.childNodes[0].textContent = expanded ? 'Show more reviews ' : 'Show fewer reviews ';
  });
}
