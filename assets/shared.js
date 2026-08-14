/* ── Shared site behaviour ── */

/* Reveal-on-scroll */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => obs.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }
})();

/* DOI copy toast */
(function () {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  let timer;
  document.querySelectorAll('.copy-doi').forEach(btn => {
    btn.addEventListener('click', async () => {
      const val = btn.dataset.copy;
      try { await navigator.clipboard.writeText(val); toast.textContent = 'DOI copied'; }
      catch { toast.textContent = val; }
      toast.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove('show'), 1900);
    });
  });
})();

/* Active nav link */
(function () {
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (path === '' && href === '/')) a.classList.add('active');
  });
})();

/* Mobile nav toggle */
(function () {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
