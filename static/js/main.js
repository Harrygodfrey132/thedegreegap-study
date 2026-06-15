// WhatsApp nudge — show once, 3 seconds after page load, then never again per browser.
(function () {
  const nudge = document.querySelector('[data-wa-nudge]');
  if (!nudge) return;
  const STORAGE_KEY = 'tdg-wa-nudge-dismissed';
  let dismissed = false;
  try { dismissed = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}
  if (dismissed) return;

  const dismiss = () => {
    nudge.removeAttribute('data-wa-nudge-visible');
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    setTimeout(() => { nudge.hidden = true; }, 360);
    clearTimeout(revealTimer);
  };

  const reveal = () => {
    nudge.hidden = false;
    requestAnimationFrame(() => nudge.setAttribute('data-wa-nudge-visible', ''));
  };

  const revealTimer = setTimeout(reveal, 3000);

  const closeBtn = nudge.querySelector('[data-wa-nudge-close]');
  if (closeBtn) closeBtn.addEventListener('click', dismiss);
  const link = nudge.querySelector('[data-wa-nudge-link]');
  if (link) link.addEventListener('click', () => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  });
})();

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

// Parents Guide page — webinar countdown
document.querySelectorAll('[data-pg-countdown]').forEach((el) => {
  const target = new Date(el.dataset.target).getTime();
  if (Number.isNaN(target)) { el.textContent = ''; return; }
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.textContent = 'Starting soon — check your inbox for the link';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    el.textContent = `Starts in ${days}d ${hours}h ${mins}m`;
  };
  tick();
  setInterval(tick, 60000);
});

// Parents Guide page — async submit + post-submission phone nudge.
// Lead is captured first (name + email). Phone nudge only shows after success,
// so closing the tab on the nudge never loses the lead.
document.querySelectorAll('[data-pg-form]').forEach((form) => {
  const card = form.closest('.book-call__form-card');
  const thanks = card && card.querySelector('[data-pg-thanks]');
  const withPhone = thanks && thanks.querySelector('[data-pg-thanks-with-phone]');
  const noPhone = thanks && thanks.querySelector('[data-pg-thanks-no-phone]');
  if (!thanks || !withPhone || !noPhone) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const hadPhone = (fd.get('phone') || '').toString().trim().length > 0;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Saving…'; }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error('Form submission failed');

      // Stash context for the optional phone add-on
      thanks.dataset.email = (fd.get('email') || '').toString();
      thanks.dataset.firstName = (fd.get('first_name') || '').toString();
      thanks.dataset.lastName = (fd.get('last_name') || '').toString();
      thanks.dataset.action = form.action;

      form.hidden = true;
      thanks.hidden = false;
      (hadPhone ? withPhone : noPhone).hidden = false;
      thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      // Fallback: re-enable button and do a native submit so the lead is never lost
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Save my seat'; }
      form.submit();
    }
  });

  // Phone add-on: separate submission tagged so admin can link it
  const addonForm = thanks.querySelector('[data-pg-addon-form]');
  const addonPhone = thanks.querySelector('[data-pg-addon-phone]');
  const addonBtn = thanks.querySelector('[data-pg-addon-submit]');
  const addonConfirmed = thanks.querySelector('[data-pg-addon-confirmed]');
  if (!addonBtn || !addonPhone) return;

  addonBtn.addEventListener('click', async () => {
    const phone = addonPhone.value.trim();
    if (!phone) { addonPhone.focus(); return; }
    addonBtn.disabled = true;
    addonBtn.textContent = 'Adding…';

    const fd = new FormData();
    fd.append('_subject', 'Phone add-on — parents-guide-to-gcses');
    fd.append('source', 'parents-guide-to-gcses-phone-addon');
    fd.append('first_name', thanks.dataset.firstName || '');
    fd.append('last_name', thanks.dataset.lastName || '');
    fd.append('email', thanks.dataset.email || '');
    fd.append('phone', phone);

    try {
      const res = await fetch(thanks.dataset.action, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error('Add-on submission failed');
      if (addonForm) addonForm.hidden = true;
      if (addonConfirmed) addonConfirmed.hidden = false;
    } catch (err) {
      addonBtn.disabled = false;
      addonBtn.textContent = 'Try again';
    }
  });
});

// Book-a-call forms: submit via fetch so we bypass Formspree's redirect/captcha
// flow, then redirect manually to the personal thank-you page. The "this is a
// book-a-call form" marker is a hidden _next field pointing at our thank-you URL.
document.addEventListener('submit', function(e){
  var form = e.target;
  if (!form || !form.querySelector) return;
  var nextEl = form.querySelector('input[name="_next"]');
  if (!nextEl || !/book-a-call-thank-you/.test(nextEl.value)) return;

  var nameVal = '';
  var nameEl = form.querySelector('[name="name"]');
  if (nameEl && nameEl.value) {
    nameVal = nameEl.value;
  } else {
    var firstEl = form.querySelector('[name="first_name"]');
    if (firstEl && firstEl.value) nameVal = firstEl.value;
  }
  var subjEl = form.querySelector('[name="subject"]');
  try {
    sessionStorage.setItem('tdg_thanks_name', nameVal);
    sessionStorage.setItem('tdg_thanks_subject', (subjEl && subjEl.value) || '');
    sessionStorage.setItem('tdg_thanks_ts', Date.now().toString());
  } catch (_) {}

  if (!window.fetch || !window.FormData) return; // fall back to native submit

  e.preventDefault();
  var btn = form.querySelector('button[type="submit"], input[type="submit"]');
  var originalLabel = '';
  if (btn) {
    originalLabel = btn.tagName === 'BUTTON' ? btn.textContent : btn.value;
    btn.disabled = true;
    if (btn.tagName === 'BUTTON') btn.textContent = 'Sending…'; else btn.value = 'Sending…';
  }

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(function(res){
    if (!res.ok) throw new Error('Submit failed');
    window.location.href = nextEl.value;
  }).catch(function(){
    if (btn) {
      btn.disabled = false;
      if (btn.tagName === 'BUTTON') btn.textContent = originalLabel; else btn.value = originalLabel;
    }
    alert('Something went wrong sending that. Please try again, or call 07859 965776 and we will pick it up.');
  });
}, true);
