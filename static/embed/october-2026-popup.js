/* The Degree Gap: October 2026 Discount pop-up, as one embeddable script.

   For pages not built from this repo, such as the main site's homepage.
   Add this one line to the page, just before </body>:

     <script src="https://thedegreegap.com/study/embed/october-2026-popup.js" defer></script>

   It adds its own markup and styles, then runs the same three steps as the
   pop-up on the /study/ location pages: the 50% offer, name and number (sent
   to Zoho with Lead Source "October 2026 Discount"), then the OCT50 code.
   It shares the tdg_oct26_popup key with those pages, so a visitor who
   closes it anywhere never sees it again. Add ?popup=1 to a page address to
   open it straight away for testing.

   Kept in step with docs/october-2026-discount-popup.html, the paste-in
   version of the same thing. Served with a short cache (see static/_headers)
   so a fix reaches visitors within minutes. */
(function () {
  if (window.__tdgOct26Popup) return;
  window.__tdgOct26Popup = true;
  // The /study/ pages already carry this pop-up in their own template.
  if (document.querySelector('[data-cbp]')) return;

  var CSS = `
  .tdgo, .tdgo * { box-sizing: border-box; }
  .tdgo {
    position: fixed; inset: 0; z-index: 2147483000;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .tdgo[hidden], .tdgo [hidden] { display: none !important; }
  .tdgo__scrim {
    position: absolute; inset: 0;
    background: rgba(28, 18, 16, 0.62);
    -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px);
    opacity: 0; transition: opacity 0.28s ease;
  }
  .tdgo.is-open .tdgo__scrim { opacity: 1; }
  .tdgo__card {
    position: relative; display: flex;
    width: min(760px, 100%); max-height: calc(100vh - 48px);
    background: #FFFFFF; border-radius: 20px; overflow: hidden;
    box-shadow: 0 32px 80px rgba(28, 18, 16, 0.42);
    transform: translateY(14px) scale(0.985); opacity: 0;
    transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease;
  }
  .tdgo.is-open .tdgo__card { transform: none; opacity: 1; }
  .tdgo__card:focus, .tdgo__title:focus { outline: none; }

  /* The photo is out of flow so the text, not the photo, sets the card height. */
  .tdgo__media { position: relative; flex: 0 0 264px; margin: 0; background: #F9EFEE; }
  .tdgo__media img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: 50% 30%; display: block;
  }
  .tdgo__media figcaption {
    position: absolute; left: 0; right: 0; bottom: 0;
    padding: 26px 16px 12px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: #FFFFFF;
    background: linear-gradient(to top, rgba(28, 18, 16, 0.78), rgba(28, 18, 16, 0));
  }

  /* Tall enough for the longest step, so the card does not jump between steps. */
  .tdgo__body {
    flex: 1 1 auto; min-width: 0; min-height: 446px;
    display: flex; flex-direction: column; justify-content: center;
    padding: 44px 40px 36px; overflow-y: auto;
  }
  .tdgo__eyebrow {
    display: inline-block; margin: 0 0 14px; padding: 6px 12px;
    border-radius: 999px; background: #F9EFEE;
    font-size: 10.5px; font-weight: 800;
    letter-spacing: 0.16em; text-transform: uppercase; color: #800020;
  }
  .tdgo__title {
    margin: 0 0 12px; font-size: 30px; font-weight: 800; line-height: 1.12;
    letter-spacing: -0.025em; color: #2B2321; text-wrap: balance;
  }
  .tdgo__title em { font-style: normal; color: #800020; white-space: nowrap; }
  .tdgo__lead { margin: 0 0 18px; font-size: 15px; line-height: 1.6; color: #5C4A47; text-wrap: pretty; }
  .tdgo__note { margin: 0 0 22px; font-size: 12px; line-height: 1.5; color: #5C4A47; }
  .tdgo__stars { color: #FBBC05; letter-spacing: 0.06em; font-size: 12px; }

  .tdgo__cta {
    display: flex; align-items: center; justify-content: center;
    width: 100%; height: 50px; padding: 0 20px; margin: 0;
    border: 0; border-radius: 999px; cursor: pointer;
    background: #800020; color: #FDF6F5;
    font: inherit; font-size: 15px; font-weight: 800;
    box-shadow: 0 8px 20px rgba(128, 0, 32, 0.28);
    transition: background 0.15s ease, transform 0.15s ease;
  }
  .tdgo__cta:hover { background: #5A001F; transform: translateY(-1px); }
  .tdgo__cta:focus-visible { outline: 3px solid #800020; outline-offset: 3px; }
  .tdgo__cta:disabled { opacity: 0.7; cursor: default; transform: none; }

  .tdgo__dismiss {
    display: block; width: 100%; margin: 12px 0 0; padding: 4px;
    border: 0; background: none; cursor: pointer;
    font: inherit; font-size: 12.5px; color: #8A7B78;
    text-decoration: underline; text-underline-offset: 3px;
  }
  .tdgo__dismiss:hover { color: #5C4A47; }

  .tdgo__close {
    position: absolute; top: 12px; right: 12px; z-index: 2;
    display: inline-flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; padding: 0;
    border: 0; border-radius: 50%; cursor: pointer;
    background: #FFFFFF; color: #2B2321;
    box-shadow: 0 2px 10px rgba(28, 18, 16, 0.24);
  }
  .tdgo__close:hover { background: #F3ECE9; }
  .tdgo__close:focus-visible { outline: 3px solid #800020; outline-offset: 2px; }

  .tdgo__label { display: block; margin: 0 0 6px; font-size: 12.5px; font-weight: 700; color: #2B2321; }
  .tdgo__input {
    display: block; width: 100%; height: 50px; margin: 0 0 14px; padding: 0 16px;
    border: 1.5px solid #E2D5CF; border-radius: 12px; background: #FAF6F2;
    font: inherit; font-size: 16px; color: #2B2321;
  }
  .tdgo__input:focus {
    outline: none; border-color: #800020; background: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(128, 0, 32, 0.14);
  }
  .tdgo__error { margin: -4px 0 12px; font-size: 12.5px; font-weight: 600; color: #B00020; }

  .tdgo__code {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    margin: 4px 0 16px; padding: 14px 14px 14px 20px;
    border: 2px dashed #800020; border-radius: 14px; background: #F9EFEE;
    opacity: 0; transform: translateY(-18px);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
  }
  .tdgo__code.is-in { opacity: 1; transform: none; }
  .tdgo__code-value { font-size: 30px; font-weight: 800; letter-spacing: 0.12em; color: #800020; }
  .tdgo__code-copy {
    flex: 0 0 auto; height: 38px; padding: 0 16px;
    border: 0; border-radius: 999px; cursor: pointer;
    background: #800020; color: #FDF6F5;
    font: inherit; font-size: 13px; font-weight: 700;
  }
  .tdgo__code-copy:hover { background: #5A001F; }

  @media (max-width: 720px) {
    .tdgo { padding: 16px; }
    .tdgo__card { flex-direction: column; max-height: calc(100vh - 32px); border-radius: 18px; }
    .tdgo__media { display: none; }
    .tdgo__body { min-height: 0; padding: 28px 22px 20px; }
    .tdgo__title { font-size: 24px; }
    .tdgo__lead { font-size: 13.5px; margin-bottom: 15px; }
    .tdgo__cta { height: 48px; font-size: 14.5px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .tdgo__scrim, .tdgo__card, .tdgo__code { transition: none; }
    .tdgo__card { transform: none; }
  }
`;

  var HTML = `
<div class="tdgo" id="tdgo" hidden>
  <div class="tdgo__scrim" data-tdgo-close></div>
  <div class="tdgo__card" role="dialog" aria-modal="true" aria-labelledby="tdgo-title" tabindex="-1">
    <button type="button" class="tdgo__close" data-tdgo-close aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>

    <figure class="tdgo__media">
      <img src="https://thedegreegap.com/study/images/co-founders-panel.jpg"
           alt="Harry Godfrey and Joe Clark, co-founders of The Degree Gap"
           width="580" height="1076" loading="lazy" decoding="async">
      <figcaption>Harry &amp; Joe, co-founders</figcaption>
    </figure>

    <div class="tdgo__body">
      <!-- Step 1: the offer -->
      <div class="tdgo__step" data-tdgo-step="offer">
        <p class="tdgo__eyebrow">October 2026 Discount</p>
        <h2 class="tdgo__title" id="tdgo-title">Would you like <em>50% off</em> your sessions?</h2>
        <p class="tdgo__lead">School is well underway. This October, get 50% off your first session with a Degree Gap tutor. Pop in your name and number and your code appears straight away.</p>
        <p class="tdgo__note">Ends 31 October <span aria-hidden="true">&middot;</span> <span class="tdgo__stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span> 5.0 on Google</p>
        <button type="button" class="tdgo__cta" data-tdgo-yes>Yes please</button>
        <button type="button" class="tdgo__dismiss" data-tdgo-close>No thanks</button>
      </div>

      <!-- Step 2: name and number -->
      <form class="tdgo__step" data-tdgo-step="details" data-tdgo-form hidden novalidate>
        <p class="tdgo__eyebrow">October 2026 Discount</p>
        <h2 class="tdgo__title" id="tdgo-title-details">Put your name and number in</h2>
        <p class="tdgo__lead">Fill these in and your 50% off code appears straight away.</p>
        <label class="tdgo__label" for="tdgo-name">Name</label>
        <input class="tdgo__input" id="tdgo-name" name="name" type="text" autocomplete="name" placeholder="Your name" required>
        <label class="tdgo__label" for="tdgo-phone">Mobile number</label>
        <input class="tdgo__input" id="tdgo-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="07123 456789" required>
        <p class="tdgo__error" data-tdgo-error hidden></p>
        <button type="submit" class="tdgo__cta">Submit</button>
      </form>

      <!-- Step 3: the code drops down -->
      <div class="tdgo__step" data-tdgo-step="code" hidden>
        <p class="tdgo__eyebrow">October 2026 Discount</p>
        <h2 class="tdgo__title" id="tdgo-title-code" tabindex="-1">Here is your <em>50% off</em> code</h2>
        <div class="tdgo__code" data-tdgo-code>
          <span class="tdgo__code-value">OCT50</span>
          <button type="button" class="tdgo__code-copy" data-tdgo-copy>Copy</button>
        </div>
        <p class="tdgo__lead">Don't worry, we will also text it to you so you can keep it safe.</p>
        <button type="button" class="tdgo__cta" data-tdgo-close>Done</button>
      </div>
    </div>
  </div>
</div>
`;

  function run() {
  (function () {
    var root = document.getElementById('tdgo');
    if (!root) return;

    var LEAD_SOURCE = 'October 2026 Discount';
    var CODE = 'OCT50';
    var ENDS = Date.parse('2026-11-01T00:00:00Z');
    // Remembers for good whether this visitor has closed the offer ("dismissed")
    // or given their details ("claimed"), and never shows it to them again.
    // Same key as the /study/ pages, so closing it on one closes it on both.
    var KEY = 'tdg_oct26_popup';

    var forced = /[?&]popup=1\b/.test(window.location.search);
    if (!forced && Date.now() >= ENDS) return;

    function suppressed() {
      try { return !!localStorage.getItem(KEY); } catch (e) { return false; }
    }
    function suppress(state) {
      try { localStorage.setItem(KEY, state); } catch (e) {}
    }
    if (!forced && suppressed()) return;

    var phoneScreen = window.matchMedia('(max-width: 720px)').matches;
    var MIN_DWELL = phoneScreen ? 7000 : 5000;
    var MAX_WAIT = phoneScreen ? 20000 : 12000;
    var card = root.querySelector('.tdgo__card');
    var form = root.querySelector('[data-tdgo-form]');
    var errorBox = root.querySelector('[data-tdgo-error]');
    var start = Date.now(), open = false, done = false, timer = null, lastFocus = null, scrollY = 0;

    function track(name) {
      try { if (typeof window.gtag === 'function') window.gtag('event', name, { device: phoneScreen ? 'mobile' : 'desktop' }); } catch (e) {}
    }

    function step(name) {
      var steps = root.querySelectorAll('[data-tdgo-step]');
      for (var i = 0; i < steps.length; i++) steps[i].hidden = steps[i].getAttribute('data-tdgo-step') !== name;
      var shown = root.querySelector('[data-tdgo-step="' + name + '"]');
      var title = shown && shown.querySelector('.tdgo__title');
      if (title) card.setAttribute('aria-labelledby', title.id);
      return shown;
    }

    function focusable() {
      var all = card.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]');
      var out = [];
      for (var i = 0; i < all.length; i++) if (!all[i].closest('[hidden]')) out.push(all[i]);
      return out;
    }
    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusable(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function show() {
      if (open) return;
      if (!forced && Date.now() - start < MIN_DWELL) return;
      open = true;
      if (timer) { clearTimeout(timer); timer = null; }
      window.removeEventListener('scroll', onScroll);
      lastFocus = document.activeElement;
      scrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = (-scrollY) + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      root.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        root.classList.add('is-open'); card.focus();
      }); });
      document.addEventListener('keydown', onKey);
      track('oct26_popup_shown');
    }

    function close() {
      if (!open) return;
      open = false;
      suppress(done ? 'claimed' : 'dismissed');
      root.classList.remove('is-open');
      document.removeEventListener('keydown', onKey);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
      setTimeout(function () { root.hidden = true; }, 320);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      if (!done) track('oct26_popup_dismissed');
    }

    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (y >= window.innerHeight) show();
    }

    var closers = root.querySelectorAll('[data-tdgo-close]');
    for (var i = 0; i < closers.length; i++) closers[i].addEventListener('click', close);

    root.querySelector('[data-tdgo-yes]').addEventListener('click', function () {
      track('oct26_popup_yes');
      step('details');
      root.querySelector('#tdgo-name').focus();
    });

    function normaliseUkPhone(raw) {
      var digits = String(raw || '').replace(/\D/g, '');
      if (!digits) return '';
      if (digits.indexOf('44') === 0) digits = digits.substring(2);
      if (digits.charAt(0) === '0') digits = digits.substring(1);
      return '+44' + digits;
    }

    // Zoho CRM web-to-lead. Zoho sends no CORS headers, so it posts through a
    // hidden iframe, fire and forget.
    function submitZohoLead(name, phone) {
      var iframe = document.getElementById('tdgo-zoho');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.name = 'tdgo-zoho'; iframe.id = 'tdgo-zoho';
        iframe.setAttribute('aria-hidden', 'true');
        iframe.setAttribute('tabindex', '-1');
        iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden;left:-9999px;top:-9999px';
        document.body.appendChild(iframe);
      }
      var f = document.createElement('form');
      f.method = 'POST';
      f.action = 'https://crm.zoho.eu/crm/WebToLeadForm';
      f.target = 'tdgo-zoho';
      f.acceptCharset = 'UTF-8';
      f.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden';
      function add(n, v) { var el = document.createElement('input'); el.type = 'hidden'; el.name = n; el.value = v; f.appendChild(el); }
      add('xnQsjsdp', '3ed466c7b35b7fc5362fd2a7dbc59aa25c93856390bacc86da6dc4324a09f032');
      add('xmIwtLD', '62912caa86f3a8312df41b466a952aff81aaa83cceed69b9167a4d99f0bbc1ca33d4ec974b07f5420e4b7ad2af7fbc48');
      add('actionType', 'TGVhZHM=');
      add('returnURL', 'null');
      add('aG9uZXlwb3Q', '');
      add('Last Name', name || 'Parent');
      add('Phone', phone);
      add('LEADCF3', 'Unsure');
      add('Description', 'October 2026 Discount: shown code ' + CODE + ' (50% off first session) on the website pop-up at ' + window.location.pathname + '. Text them the code.');
      add('Lead Source', LEAD_SOURCE);
      document.body.appendChild(f);
      f.submit();
    }

    function showError(msg, field) {
      errorBox.textContent = msg;
      errorBox.hidden = false;
      if (field) field.focus();
    }

    form.addEventListener('input', function () { errorBox.hidden = true; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var nameField = form.querySelector('#tdgo-name');
      var phoneField = form.querySelector('#tdgo-phone');
      var name = nameField.value.trim();
      var digits = (phoneField.value.match(/\d/g) || []).length;
      if (!name) return showError('Please enter your name.', nameField);
      if (digits < 7) return showError('Enter a phone number we can text the code to.', phoneField);

      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending...';
      try { submitZohoLead(name, normaliseUkPhone(phoneField.value)); } catch (err) {}
      done = true;
      suppress('claimed');
      track('oct26_popup_lead');
      if (typeof window.fbq === 'function') { try { window.fbq('track', 'Lead'); } catch (err) {} }

      var shown = step('code');
      shown.querySelector('.tdgo__title').focus();
      var code = shown.querySelector('[data-tdgo-code]');
      requestAnimationFrame(function () { requestAnimationFrame(function () { code.classList.add('is-in'); }); });
    });

    var copy = root.querySelector('[data-tdgo-copy]');
    copy.addEventListener('click', function () {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(CODE).then(function () { copy.textContent = 'Copied'; }, function () {});
        }
      } catch (err) {}
    });

    if (forced) { show(); return; }
    window.addEventListener('scroll', onScroll, { passive: true });
    timer = setTimeout(show, MAX_WAIT);
  })();
  }

  function mount() {
    if (document.getElementById('tdgo')) return;
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    var holder = document.createElement('div');
    holder.innerHTML = HTML;
    while (holder.firstChild) document.body.appendChild(holder.firstChild);
    run();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
