/* ── IFEM shared behavior: LTR animation controller ── */
'use strict';

/* Reveal on scroll */
(function () {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!elements.length) return;
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        window.setTimeout(() => entry.target.classList.add('visible'), index * 65);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
})();

/* DOI and citation copy */
(function () {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  let timeout;
  document.querySelectorAll('.copy-doi, .copy-doi-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(value);
        toast.textContent = button.dataset.label || 'Copied to clipboard';
      } catch (error) {
        toast.textContent = value;
      }
      toast.classList.add('show');
      clearTimeout(timeout);
      timeout = window.setTimeout(() => toast.classList.remove('show'), 2000);
    });
  });
})();

/* Responsive navigation */
(function () {
  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!button || !nav) return;
  button.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    button.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', (event) => {
    if (!button.contains(event.target) && !nav.contains(event.target)) {
      nav.classList.remove('nav-open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* Verification demonstration: run a continuous contract-check sequence */
(function () {
  const steps = document.querySelectorAll('.verify-step');
  if (!steps.length) return;
  let activeIndex = 0;
  const render = () => {
    steps.forEach((step, index) => {
      const icon = step.querySelector('.vs-icon');
      step.classList.remove('vs-active', 'vs-pass', 'vs-fail');
      if (index < activeIndex) {
        step.classList.add('vs-pass');
        if (icon) icon.textContent = '✓';
      } else if (index === activeIndex && activeIndex < steps.length) {
        step.classList.add('vs-active');
        if (icon) icon.textContent = '⟳';
      } else if (icon) {
        icon.textContent = String(index + 1);
      }
    });
    activeIndex = activeIndex >= steps.length ? 0 : activeIndex + 1;
  };
  render();
  window.setInterval(render, 1500);
})();

/* Restart the parallel implementation animation when it enters the viewport */
(function () {
  const diagram = document.querySelector('.anim-parallel');
  if (!diagram || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    diagram.querySelectorAll('.lane-bar-fill').forEach((bar) => {
      bar.style.animation = 'none';
      void bar.offsetWidth;
      bar.style.animation = '';
    });
  }, { threshold: 0.3 });
  observer.observe(diagram);
})();
