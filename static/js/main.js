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

// Anti-spam for Formspree forms. Three layers on top of Formspree's _gotcha:
//
//   1. Bait honeypot fields (name="address_url", name="company_website").
//      Real users never see these (CSS hides them off-screen). Bots that
//      auto-fill every field will fill them, and we drop the submission.
//
//   2. Timing check. Bots submit forms within ~500ms of page load. Humans
//      need at least ~3 seconds to read and fill. We track when the form
//      was rendered and reject submissions that happen too fast.
//
//   3. Interaction check. Real users focus on a form field before
//      submitting. Many bots POST directly without firing focus events.
//      We track whether the user ever focused a real (non-bait) field.
//
// All three checks run before the submit event reaches Formspree, so blocked
// submissions never even leave the browser.
(function(){
  var forms = document.querySelectorAll('form[action*="formspree"]');
  forms.forEach(function(form){
    var startTime = Date.now();
    var humanInteracted = false;

    form.addEventListener('focusin', function(e){
      if (e.target && e.target.getAttribute('data-bait') === '1') return;
      humanInteracted = true;
    });

    form.addEventListener('submit', function(e){
      // Layer 1: bait honeypots
      var baits = form.querySelectorAll('[data-bait="1"]');
      for (var i = 0; i < baits.length; i++) {
        if (baits[i].value) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
      }
      // Layer 2: timing (under 3 seconds = bot)
      if (Date.now() - startTime < 3000) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
      // Layer 3: interaction (no field was ever focused = bot)
      if (!humanInteracted) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    }, true);
  });
})();

// Stash book-a-call form values so the thank-you page can personalise the note
// from Harry. Only triggers for forms with a _next pointing at the thank-you page.
// The native form submit + Formspree _next then handles the redirect.
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
}, true);

/* ---------------------------------------------------------------------------
   Lead attribution.

   Records where a visitor first arrived from, then carries it to whichever
   form they eventually submit. Without this every /book-a-call/ lead looks
   identical, because the source field on each form is hardcoded per page.

   First touch wins: the first page of the session is what gets stored, so a
   visitor who lands on a blog post from Google and reaches the booking form
   three clicks later is still attributed to Google and to that post, not to an
   internal navigation.

   This only ever writes to hidden inputs carrying data-attribution. It never
   touches the name, phone, year group or message fields, so if any of it fails
   the lead still arrives complete and only the attribution is missing. That
   ordering is deliberate.
   --------------------------------------------------------------------------- */
(function () {
  var KEY = 'tdg_attribution';
  // utm_content carries which placement on the partner's own site was clicked
  // (which banner, which article). The referrer field records their host and,
  // where their Referrer-Policy allows it, the path. utm_content is the only
  // one of the two that is reliable, because most sites now send origin only.
  var UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

  function capture() {
    try {
      if (sessionStorage.getItem(KEY)) return; // already captured this visit
      var q = new URLSearchParams(window.location.search);
      var data = { landing_page: window.location.pathname };

      UTMS.forEach(function (k) {
        var v = q.get(k);
        if (v) data[k] = String(v).slice(0, 120);
      });

      var ref = document.referrer || '';
      var out = '';
      if (ref) {
        try {
          var u = new URL(ref);
          // An internal referrer is not a source, so it is treated as direct.
          if (u.host !== window.location.host) out = u.host + u.pathname;
        } catch (e) {
          out = ref.slice(0, 180);
        }
      }
      data.referrer = out || 'direct';

      sessionStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) { /* private mode, storage disabled: attribution is optional */ }
  }

  function populate() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      var fields = document.querySelectorAll('input[data-attribution]');
      for (var i = 0; i < fields.length; i++) {
        var el = fields[i];
        var val = data[el.getAttribute('data-attribution')];
        if (val) {
          el.value = val;
          el.disabled = false;
        } else if (el.value) {
          // A page-level default, set in front matter and rendered by
          // attribution-fields.html. The partner referral pages use it so a
          // lead is still attributed when the partner links to the bare URL.
          // Nothing was captured this visit, so the default stands.
          el.disabled = false;
        } else {
          // Disabled inputs are not submitted, which keeps the email clean.
          el.disabled = true;
        }
      }
    } catch (e) { /* leave the fields as they are */ }
  }

  capture();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populate);
  } else {
    populate();
  }
})();

/* ---------------------------------------------------------------------------
   Callback modal.

   Opens the booking dialog on the locations and blog pages, once per visitor
   per fortnight, on whichever comes first: the reader passing a share of the
   page, or a dwell timer. A minimum dwell sits under both so someone who
   flicks to the bottom in two seconds is not interrupted before they have read
   anything.

   Phones wait longer and deeper than desktop. Google's intrusive interstitial
   rule is mobile-only and aimed at overlays that cover the content straight
   after a search click, and these pages live on search traffic. Later and
   deeper puts real distance between the click and the dialog.

   Because this one is modal, it takes focus, traps Tab inside itself, locks
   the page behind it and restores all three on close.

   Everything is optional: if any of it throws, the page is unchanged and the
   dialog simply never opens.
   --------------------------------------------------------------------------- */
(function () {
  var root = document.querySelector('[data-cbp]');
  if (!root) return;

  var card = root.querySelector('.cbp__card');
  var phone = window.matchMedia('(max-width: 720px)').matches;

  var KEY = 'tdg_cbp_until';
  var MIN_DWELL = phone ? 14000 : 6000;
  var MAX_WAIT = phone ? 34000 : 16000;
  var SCROLL_AT = phone ? 0.55 : 0.4;
  var DISMISS_DAYS = 14;
  var CLICKED_DAYS = 90;

  function suppressed() {
    try {
      var until = parseInt(localStorage.getItem(KEY) || '0', 10);
      return until && Date.now() < until;
    } catch (e) { return false; }
  }
  function suppress(days) {
    try { localStorage.setItem(KEY, String(Date.now() + days * 86400000)); } catch (e) {}
  }
  if (suppressed()) return;

  // No point interrupting someone already looking at a booking form.
  var FORMS = '.book-call__form, .lvls-hero__card, form[action*="formspree"]';
  function formInView() {
    var n = document.querySelectorAll(FORMS);
    for (var i = 0; i < n.length; i++) {
      var r = n[i].getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) return true;
    }
    return false;
  }

  var open = false, start = Date.now(), timer = null, lastFocus = null, scrollY = 0;

  function focusable() {
    return card.querySelectorAll('a[href], button:not([disabled])');
  }
  function onKey(e) {
    if (e.key === 'Escape') { close(DISMISS_DAYS); return; }
    if (e.key !== 'Tab') return;
    var f = focusable();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function show() {
    if (open) return;
    if (Date.now() - start < MIN_DWELL) return;
    if (formInView()) { window.setTimeout(show, 4000); return; }
    open = true;
    if (timer) { window.clearTimeout(timer); timer = null; }
    window.removeEventListener('scroll', onScroll);

    lastFocus = document.activeElement;
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
    // Lock the page without losing the reader's place.
    document.body.style.position = 'fixed';
    document.body.style.top = (-scrollY) + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';

    root.hidden = false;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        root.classList.add('is-open');
        if (card) card.focus();
      });
    });
    document.addEventListener('keydown', onKey);
  }

  function close(days) {
    if (!open) return;
    open = false;
    suppress(days);
    root.classList.remove('is-open');
    document.removeEventListener('keydown', onKey);

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    window.scrollTo(0, scrollY);

    window.setTimeout(function () { root.hidden = true; }, 320);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    if ((window.pageYOffset || document.documentElement.scrollTop) / h >= SCROLL_AT) show();
  }

  var closers = root.querySelectorAll('[data-cbp-close]');
  for (var i = 0; i < closers.length; i++) {
    closers[i].addEventListener('click', function () { close(DISMISS_DAYS); });
  }
  var cta = root.querySelector('[data-cbp-cta]');
  // Suppress before navigation, not after: the page is about to unload.
  if (cta) cta.addEventListener('click', function () { suppress(CLICKED_DAYS); });

  window.addEventListener('scroll', onScroll, { passive: true });
  timer = window.setTimeout(show, MAX_WAIT);
})();
