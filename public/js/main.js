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
