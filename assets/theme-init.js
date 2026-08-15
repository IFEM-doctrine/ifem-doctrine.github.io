(function () {
  'use strict';
  try {
    const stored = localStorage.getItem('ifem-theme');
    const preferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = stored === 'dark' || stored === 'light' ? stored : preferred;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
  }
})();
