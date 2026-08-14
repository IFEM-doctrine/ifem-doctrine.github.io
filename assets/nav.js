/* IFEM shared LTR navigation and footer */
(function () {
  const mark = `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M28 72V28H72 M128 28H172V72 M172 128V172H128 M72 172H28V128" stroke="#1257D6" stroke-width="18" stroke-linecap="square"/>
    <path d="M62 96V62H96 M104 62H138V96 M138 104V138H104 M96 138H62V104" stroke="#10233E" stroke-width="16" stroke-linecap="square"/>
    <circle cx="100" cy="100" r="18" fill="#74C69D"/>
  </svg>`;

  const header = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="shell nav-wrap">
        <a class="brand" href="/" aria-label="IFEM home">
          <span class="brand-mark" aria-hidden="true">${mark}</span>
          <span class="brand-copy"><strong>IFEM</strong><small>Interface-First Execution Methodology</small></span>
        </a>
        <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
          <a href="/doctrine.html">Doctrine</a>
          <a href="/method.html">Method</a>
          <a href="/ai.html">AI engineering</a>
          <a href="/publications.html">Publications</a>
          <a href="/author.html">Author</a>
        </nav>
        <a class="nav-cta" href="https://doi.org/10.5281/zenodo.20621561">Read v2.2 <span aria-hidden="true">↗</span></a>
        <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
      </div>
    </header>`;

  const footer = `
    <footer>
      <div class="shell footer-grid">
        <div class="footer-brand">
          <span class="footer-mark" aria-hidden="true">${mark}</span>
          <div class="footer-brand-text"><strong>IFEM</strong><span>Interface-First Execution Methodology</span></div>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="/doctrine.html">Doctrine</a>
          <a href="/method.html">Method</a>
          <a href="/ai.html">AI engineering</a>
          <a href="/publications.html">Publications</a>
          <a href="/author.html">Author</a>
        </nav>
        <div class="footer-right">
          <div class="footer-dois">
            <a href="https://doi.org/10.5281/zenodo.20621561">Primary DOI ↗</a>
            <a href="https://doi.org/10.5281/zenodo.21330255">Runtime Manual ↗</a>
            <a href="https://orcid.org/0009-0001-2428-1295">ORCID ↗</a>
          </div>
          <p class="footer-contact">Developed by <strong>Suhail Muzaffari</strong> · <a href="mailto:so.muzaff@gmail.com">so.muzaff@gmail.com</a></p>
        </div>
      </div>
    </footer>
    <div class="toast" role="status" aria-live="polite" aria-atomic="true">Copied to clipboard</div>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a, .footer-nav a').forEach((link) => {
    const href = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (href === path) link.classList.add('active');
  });
})();
