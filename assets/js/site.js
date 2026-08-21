(() => {
  'use strict';

  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-primary-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', (event) => {
      if (event.target.matches('a')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = 'Menu';
      }
    });
  }

  const diagram = document.querySelector('[data-hero-diagram]');
  const phaseMessage = document.querySelector('[data-phase-message]');
  const phaseButtons = [...document.querySelectorAll('[data-hero-phase]')];
  const pauseButton = document.querySelector('[data-hero-pause]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let phaseIndex = 0;
  let timer = null;
  let paused = reducedMotion.matches;
  let diagramVisible = false;

  const setPhase = (index, announce = false) => {
    if (!diagram || !phaseButtons.length) return;
    phaseIndex = (index + phaseButtons.length) % phaseButtons.length;
    const button = phaseButtons[phaseIndex];
    diagram.dataset.phase = button.dataset.heroPhase;
    phaseButtons.forEach((item, itemIndex) => {
      const active = itemIndex === phaseIndex;
      item.setAttribute('aria-pressed', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    if (phaseMessage) {
      phaseMessage.textContent = button.dataset.phaseMessage || '';
      if (!announce) phaseMessage.setAttribute('aria-live', 'off');
      else phaseMessage.setAttribute('aria-live', 'polite');
    }
  };

  const stopSequence = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const startSequence = () => {
    stopSequence();
    if (paused || reducedMotion.matches || !diagramVisible || !phaseButtons.length) return;
    timer = window.setInterval(() => setPhase(phaseIndex + 1), 3000);
  };

  phaseButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      paused = true;
      if (pauseButton) {
        pauseButton.setAttribute('aria-pressed', 'true');
        pauseButton.textContent = 'Resume sequence';
      }
      stopSequence();
      setPhase(index, true);
    });
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'ArrowRight' ? index + 1 : index - 1;
      const nextIndex = (next + phaseButtons.length) % phaseButtons.length;
      phaseButtons[nextIndex].focus();
      phaseButtons[nextIndex].click();
    });
  });

  if (pauseButton) {
    pauseButton.addEventListener('click', () => {
      paused = !paused;
      pauseButton.setAttribute('aria-pressed', String(paused));
      pauseButton.textContent = paused ? 'Resume sequence' : 'Pause sequence';
      if (paused) stopSequence();
      else startSequence();
    });
    if (reducedMotion.matches) {
      pauseButton.setAttribute('aria-pressed', 'true');
      pauseButton.textContent = 'Motion reduced';
      pauseButton.disabled = true;
    }
  }

  if (diagram && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      diagramVisible = entries.some((entry) => entry.isIntersecting);
      if (diagramVisible) startSequence();
      else stopSequence();
    }, { threshold: .35 });
    observer.observe(diagram);
  } else {
    diagramVisible = true;
    startSequence();
  }

  reducedMotion.addEventListener('change', (event) => {
    paused = event.matches;
    if (event.matches) {
      stopSequence();
      if (pauseButton) {
        pauseButton.setAttribute('aria-pressed', 'true');
        pauseButton.textContent = 'Motion reduced';
        pauseButton.disabled = true;
      }
    }
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy || '';
      const status = button.parentElement?.querySelector('[data-copy-status]') || document.querySelector('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(text);
        if (status) status.textContent = 'Copied to clipboard.';
      } catch (error) {
        const fallback = document.createElement('textarea');
        fallback.value = text;
        fallback.style.position = 'fixed';
        fallback.style.opacity = '0';
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand('copy');
        fallback.remove();
        if (status) status.textContent = 'Copied to clipboard.';
      }
      window.setTimeout(() => { if (status) status.textContent = ''; }, 2500);
    });
  });
})();

/* 2026-08-21 global navigation and scroll-reveal enhancements */
(() => {
  'use strict';
  const isFa = document.documentElement.lang === 'fa' || document.documentElement.dir === 'rtl';
  let back = document.querySelector('.back-to-top');
  if (!back) {
    back = document.createElement('a');
    back.className = 'back-to-top';
    back.href = '#main';
    back.textContent = isFa ? '↑ بالا' : '↑ Top';
    back.setAttribute('aria-label', isFa ? 'بازگشت به بالای صفحه' : 'Back to top');
    document.body.append(back);
  }
  const updateBack = () => back.classList.toggle('is-visible', window.scrollY > Math.max(520, innerHeight * .7));
  updateBack();
  addEventListener('scroll', updateBack, { passive: true });

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.page-hero,.hero-grid,.proof-item,.section-heading,.principle,.phase,.example-card,.case-study-media,.publication-card,.author-panel,.doctrine-addition,.final-cta-wrap');
  targets.forEach((el, index) => {
    el.classList.add('reveal-item');
    if (index % 3 === 1) el.classList.add('reveal-side');
  });
  if (reduce || !('IntersectionObserver' in window)) targets.forEach(el => el.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(el => observer.observe(el));
  }
})();
