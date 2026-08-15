/* ── IFEM shared behavior: LTR animation controller ── */
'use strict';

/* Keep all explanatory content visible by default; enable entrance motion only after JS is ready. */
document.documentElement.classList.add('motion-ready');

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
        toast.textContent = button.dataset.label || (document.documentElement.lang === 'fa' ? 'در کلیپ‌بورد کپی شد' : 'Copied to clipboard');
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


/* Interactive hero: explain layers, interfaces, contracts, and the freeze mechanism. */
(function () {
  const system = document.querySelector('.hero-system');
  const steps = Array.from(document.querySelectorAll('.hero-step'));
  const freezeButton = document.querySelector('[data-freeze]');
  const heading = document.querySelector('#hero-explainer-title');
  const copy = document.querySelector('#hero-explainer-text');
  const status = document.querySelector('#freeze-status');
  if (!system || !steps.length || !heading || !copy) return;

  const systemSvg = system.querySelector('.hv-svg');
  const isFarsi = document.documentElement.lang === 'fa';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isSystemVisible = true;

  const syncAmbientMotion = () => {
    const paused = reducedMotion.matches || !isSystemVisible || document.hidden;
    system.classList.toggle('is-ambient-paused', paused);
    if (systemSvg && typeof systemSvg.pauseAnimations === 'function' && typeof systemSvg.unpauseAnimations === 'function') {
      if (paused && !systemSvg.animationsPaused()) systemSvg.pauseAnimations();
      if (!paused && systemSvg.animationsPaused()) systemSvg.unpauseAnimations();
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isSystemVisible = entry.isIntersecting;
      syncAmbientMotion();
    }, { threshold: 0.1 });
    observer.observe(system);
  }
  reducedMotion.addEventListener('change', syncAmbientMotion);
  document.addEventListener('visibilitychange', syncAmbientMotion);
  syncAmbientMotion();

  const applyState = (state, selectedStep) => {
    system.dataset.heroState = state;
    steps.forEach((step) => {
      const active = step === selectedStep;
      step.classList.toggle('is-active', active);
      step.setAttribute('aria-pressed', String(active));
    });
    if (selectedStep) {
      heading.textContent = selectedStep.dataset.title || 'Interactive walkthrough';
      copy.classList.remove('is-changing');
      void copy.offsetWidth;
      copy.textContent = selectedStep.dataset.copy || '';
      copy.classList.add('is-changing');
    }
  };

  steps.forEach((step) => step.addEventListener('click', () => {
    applyState(step.dataset.heroState || 'layers', step);
    if (status) status.textContent = step.dataset.heroState === 'freeze'
      ? (isFarsi ? 'این توافق برای تثبیت به‌صورت یک نسخهٔ صریح آماده است.' : 'Ready to lock this agreement as an explicit version.')
      : (isFarsi ? 'برای تثبیت توافق فعلی، «تثبیت قرارداد» را انتخاب کنید.' : 'Select Freeze contract to lock the current agreement.');
    if (freezeButton) freezeButton.innerHTML = isFarsi
      ? '<span aria-hidden="true">▣</span> تثبیت قرارداد <b>v2.2</b>'
      : '<span aria-hidden="true">▣</span> Freeze contract <b>v2.2</b>';
  }));

  if (freezeButton) {
    freezeButton.addEventListener('click', () => {
      const freezeStep = steps.find((step) => step.dataset.heroState === 'freeze') || steps[0];
      applyState('freeze', freezeStep);
      system.classList.remove('is-freezing');
      void system.offsetWidth;
      system.classList.add('is-freezing');
      freezeButton.innerHTML = isFarsi
        ? '<span aria-hidden="true">✓</span> قرارداد تثبیت شد <b>v2.2</b>'
        : '<span aria-hidden="true">✓</span> Contract frozen <b>v2.2</b>';
      if (status) status.textContent = isFarsi
        ? 'قرارداد v2.2 تثبیت شد. اکنون کار موازی با توافق صریح محدود و هدایت می‌شود.'
        : 'Contract v2.2 is frozen. Parallel work is now bounded by the explicit agreement.';
      window.setTimeout(() => system.classList.remove('is-freezing'), 1100);
    });
  }
})();

/* Appearance preference: persist explicit selection and respect the system default until the user chooses. */
(function () {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  const isFarsi = document.documentElement.lang === 'fa';
  const labels = isFarsi
    ? { light: 'فعال‌کردن حالت روشن', dark: 'فعال‌کردن حالت تیره' }
    : { light: 'Use light appearance', dark: 'Use dark appearance' };
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  const setTheme = (theme, persist = false) => {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = normalized;
    if (themeColor) themeColor.setAttribute('content', normalized === 'dark' ? '#0c1422' : '#f6f7f4');
    toggle.setAttribute('aria-label', normalized === 'dark' ? labels.light : labels.dark);
    toggle.setAttribute('title', normalized === 'dark' ? labels.light : labels.dark);
    toggle.setAttribute('aria-pressed', String(normalized === 'dark'));
    if (persist) {
      try { localStorage.setItem('ifem-theme', normalized); } catch (error) { /* Storage may be unavailable. */ }
    }
  };

  setTheme(document.documentElement.dataset.theme);
  toggle.addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });
  systemPreference.addEventListener('change', (event) => {
    try {
      if (!localStorage.getItem('ifem-theme')) setTheme(event.matches ? 'dark' : 'light');
    } catch (error) {
      setTheme(event.matches ? 'dark' : 'light');
    }
  });
})();
