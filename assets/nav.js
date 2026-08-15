(function () {
  'use strict';

  const isFarsi = document.documentElement.lang === 'fa';
  const base = isFarsi ? '/fa/' : '/';
  const mark = `<img class="ifem-logo" src="/assets/ifem-doctrine-logo.png" alt="" width="1254" height="1254" />`;
  const strings = isFarsi ? {
    skip: 'پرش به محتوا',
    home: 'صفحهٔ اصلی IFEM',
    doctrine: 'دکترین',
    method: 'روش',
    ai: 'مهندسی هوش مصنوعی',
    publications: 'انتشارات',
    author: 'پدیدآورنده',
    read: 'مطالعهٔ نسخهٔ ۲٫۲',
    open: 'باز کردن منو',
    close: 'بستن منو',
    primary: 'ناوبری اصلی',
    footer: 'ناوبری پایین صفحه',
    primaryDoi: 'شناسهٔ DOI اصلی',
    manual: 'راهنمای اجرایی',
    folio: 'وب‌سایت شخصی',
    developed: 'توسعه‌یافته توسط',
    copied: 'در کلیپ‌بورد کپی شد',
    themeLight: 'فعال‌کردن حالت روشن',
    themeDark: 'فعال‌کردن حالت تیره',
    language: 'Switch to English',
    languageShort: 'EN',
    languageLabel: 'English',
  } : {
    skip: 'Skip to content',
    home: 'IFEM home',
    doctrine: 'Doctrine',
    method: 'Method',
    ai: 'AI engineering',
    publications: 'Publications',
    author: 'Author',
    read: 'Read v2.2',
    open: 'Open navigation',
    close: 'Close navigation',
    primary: 'Primary navigation',
    footer: 'Footer navigation',
    primaryDoi: 'Primary DOI',
    manual: 'Runtime Manual',
    folio: 'Personal folio',
    developed: 'Developed by',
    copied: 'Copied to clipboard',
    themeLight: 'Use light appearance',
    themeDark: 'Use dark appearance',
    language: 'نمایش فارسی',
    languageShort: 'فا',
    languageLabel: 'فارسی',
  };

  const page = (name) => name === 'index.html' ? base : `${base}${name}`;
  const languageTarget = (() => {
    const current = location.pathname.replace(/^\/fa\//, '/').replace(/^\//, '') || 'index.html';
    return isFarsi ? `/${current === 'index.html' ? '' : current}` : `/fa/${current}`;
  })();

  const header = `
    <a class="skip-link" href="#main">${strings.skip}</a>
    <header class="site-header">
      <div class="shell nav-wrap">
        <a class="brand" href="${base}" aria-label="${strings.home}">
          <span class="brand-mark" aria-hidden="true">${mark}</span>
          <span class="brand-copy"><strong>IFEM</strong><small>${isFarsi ? 'روش‌شناسی اجرای رابط‌محور' : 'Interface-First Execution Methodology'}</small></span>
        </a>
        <nav id="site-nav" class="site-nav" aria-label="${strings.primary}">
          <a href="${page('doctrine.html')}">${strings.doctrine}</a>
          <a href="${page('method.html')}">${strings.method}</a>
          <a href="${page('ai.html')}">${strings.ai}</a>
          <a href="${page('publications.html')}">${strings.publications}</a>
          <a href="${page('author.html')}">${strings.author}</a>
        </nav>
        <div class="nav-utilities" aria-label="${isFarsi ? 'کنترل‌های نمایش' : 'Display controls'}">
          <button class="utility-control theme-toggle" type="button" aria-label="${strings.themeDark}" title="${strings.themeDark}">
            <span class="theme-icon theme-icon-sun" aria-hidden="true">☀</span>
            <span class="theme-icon theme-icon-moon" aria-hidden="true">◐</span>
          </button>
          <a class="utility-control language-toggle" href="${languageTarget}" hreflang="${isFarsi ? 'en' : 'fa'}" lang="${isFarsi ? 'en' : 'fa'}" aria-label="${strings.language}" title="${strings.language}">
            <span>${strings.languageShort}</span><small>${strings.languageLabel}</small>
          </a>
        </div>
        <a class="nav-cta" href="https://doi.org/10.5281/zenodo.20621561">${strings.read} <span aria-hidden="true">↗</span></a>
        <button class="nav-toggle" aria-label="${strings.open}" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
      </div>
    </header>`;

  const footer = `
    <footer>
      <div class="shell footer-grid">
        <div class="footer-brand">
          <span class="footer-mark" aria-hidden="true">${mark}</span>
          <div class="footer-brand-text"><strong>IFEM</strong><span>${isFarsi ? 'روش‌شناسی اجرای رابط‌محور' : 'Interface-First Execution Methodology'}</span></div>
        </div>
        <nav class="footer-nav" aria-label="${strings.footer}">
          <a href="${page('doctrine.html')}">${strings.doctrine}</a>
          <a href="${page('method.html')}">${strings.method}</a>
          <a href="${page('ai.html')}">${strings.ai}</a>
          <a href="${page('publications.html')}">${strings.publications}</a>
          <a href="${page('author.html')}">${strings.author}</a>
        </nav>
        <div class="footer-right">
          <div class="footer-dois">
            <a href="https://doi.org/10.5281/zenodo.20621561">${strings.primaryDoi} ↗</a>
            <a href="https://doi.org/10.5281/zenodo.21330255">${strings.manual} ↗</a>
            <a href="https://orcid.org/0009-0001-2428-1295">ORCID ↗</a>
            <a href="https://so-muzaff.github.io" rel="external">${strings.folio} ↗</a>
          </div>
          <p class="footer-contact">${strings.developed} <strong>Soheil Muzaffari</strong> · <a href="mailto:so.muzaff@gmail.com">so.muzaff@gmail.com</a></p>
        </div>
      </div>
    </footer>
    <div class="toast" role="status" aria-live="polite" aria-atomic="true">${strings.copied}</div>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a, .footer-nav a').forEach((link) => {
    const href = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (href === path) link.classList.add('active');
  });
})();
