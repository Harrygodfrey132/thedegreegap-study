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

// Location page — load more areas
const areasToggle = document.getElementById('loc-areas-toggle');
const areasMore = document.getElementById('loc-areas-more');
if (areasToggle && areasMore) {
  areasToggle.addEventListener('click', () => {
    const expanded = areasToggle.getAttribute('aria-expanded') === 'true';
    areasMore.hidden = expanded;
    areasToggle.setAttribute('aria-expanded', String(!expanded));
    areasToggle.childNodes[0].textContent = expanded ? 'Load more locations ' : 'Show fewer locations ';
  });
}

// Subject page — results carousel arrows
document.querySelectorAll('[data-results-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-results-track]');
  const prev = carousel.querySelector('[data-results-prev]');
  const next = carousel.querySelector('[data-results-next]');
  if (!track || !prev || !next) return;

  const step = () => {
    const card = track.querySelector('.gs-results__card');
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '20');
    return card.getBoundingClientRect().width + gap;
  };

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= maxScroll;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

document.querySelectorAll('.loc-lite-video').forEach((video) => {
  const trigger = video.querySelector('.loc-lite-video__button');
  if (!trigger) return;

  trigger.addEventListener('click', (event) => {
    event.preventDefault();

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${video.dataset.youtubeId}?autoplay=1&rel=0`;
    iframe.title = video.dataset.youtubeTitle || 'The Degree Gap video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    video.replaceChildren(iframe);
  });
});
