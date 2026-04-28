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

