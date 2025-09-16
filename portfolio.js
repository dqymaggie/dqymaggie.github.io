/* ===========================
   Theme (default: dark)
=========================== */
function applyTheme(theme) {
    const el = document.body;
    const icon = document.getElementById('darkmode-icon');
    if (theme === 'dark') {
      el.classList.add('dark-mode');
      if (icon) { icon.classList.remove('bi-moon-fill'); icon.classList.add('bi-sun'); }
    } else {
      el.classList.remove('dark-mode');
      if (icon) { icon.classList.remove('bi-sun'); icon.classList.add('bi-moon-fill'); }
    }
  }
  
  function toggleTheme() {
    const current = localStorage.getItem('theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  }
  
  /* ===========================
     Active link helpers
  =========================== */
  function clearActive() {
    document.querySelectorAll('.header-text.active').forEach(el => el.classList.remove('active'));
  }
  
  // Find the header <span.header-text> for a given section id.
  // Works for either in-page anchors (#skills) OR separate pages (projects.html).
  function findNavTextForSection(id) {
    const links = document.querySelectorAll('.header-box a');
    for (const a of links) {
      const span = a.querySelector('.header-text') || a;
      const href = (a.getAttribute('href') || '').trim();
      const label = (span.textContent || '').trim().toLowerCase();
  
      if (id === 'top') {
        // Treat anything that looks like “Home” as the top item
        const path = href.split('#')[0];
        const isHomeHref =
          href === '#' ||
          href === '' ||
          /\/$/.test(path) ||
          /index\.html$/i.test(path);
        const isHomeText = label === 'home';
        if (isHomeHref || isHomeText) return span;
      } else {
        if (href === `#${id}`) return span;                 // in-page anchor
        if (href.toLowerCase().endsWith(`${id}.html`)) return span; // separate page
      }
    }
    return null;
  }
  
  // Initial page-based underline (e.g., projects.html)
  function setActiveByURL() {
    const here = location.pathname.replace(/\/index\.html$/, '/');
    document.querySelectorAll('.header-box a').forEach(a => {
      const span = a.querySelector('.header-text');
      if (!span) return;
      const url = new URL(a.href, location.origin);
      const linkPath = url.pathname.replace(/\/index\.html$/, '/');
      if (!url.hash && linkPath === here) span.classList.add('active');
    });
  }
  
  // Hash-based underline (when clicking #skills etc.)
  function setActiveByHash() {
    const hash = location.hash;
    if (!hash) return;
    const span = document.querySelector(`.header-box a[href="${hash}"] .header-text`);
    if (span) {
      clearActive();
      span.classList.add('active');
    }
  }
  
  // Scroll spy for sections on the home page
  function initScrollSpy(sectionIds = ['skills', 'projects', 'contact']) {
    // Build observed list for sections that exist
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);
  
    if (sections.length === 0) return;
  
    // IO tuned to “center of viewport” feel, works better on ~1200px widths too
    const io = new IntersectionObserver((entries) => {
      // If we’re basically at the top, force Home active
      if (window.scrollY <= 4) {
        clearActive();
        const home = findNavTextForSection('top');
        if (home) home.classList.add('active');
        return;
      }
  
      // Choose the most visible section right now
      let best = null; let bestRatio = 0;
      for (const e of entries) {
        if (e.isIntersecting && e.intersectionRatio >= bestRatio) {
          best = e; bestRatio = e.intersectionRatio;
        }
      }
      if (best) {
        clearActive();
        const span = findNavTextForSection(best.target.id);
        if (span) span.classList.add('active');
      }
    }, {
      threshold: [0.01, 0.2, 0.5, 0.8],
      rootMargin: '-40% 0px -40% 0px' // focus around viewport center
    });
  
    sections.forEach(sec => io.observe(sec));
  
    // Extra guard so Home reselects if you fling to top fast
    window.addEventListener('scroll', () => {
      if (window.scrollY <= 2) {
        clearActive();
        const home = findNavTextForSection('top');
        if (home) home.classList.add('active');
      }
    }, { passive: true });
  }
  
  /* ===========================
     Reveal-on-scroll (unchanged)
  =========================== */
  function initReveals() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }
  
  /* ===========================
     Boot
  =========================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Theme
    const saved = localStorage.getItem('theme') || 'dark'; // default to dark
    localStorage.setItem('theme', saved);
    applyTheme(saved);
  
    // Make sure the button toggles even if the inline onclick changes later
    const themeBtn = document.getElementById('darkmode');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  
    // Footer year (if present)
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  
    // Underlines based on URL (page) and hash (anchor)
    setActiveByURL();
    setActiveByHash();
  
    // Scroll spy only on the home page sections that exist
    initScrollSpy(['skills', 'projects', 'contact']);
  
    // Update underline on hash changes (anchor jumps)
    window.addEventListener('hashchange', setActiveByHash);
  
    // Instant feedback for same-page anchors when clicked
    document.querySelectorAll('.header-box a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        clearActive();
        const span = a.querySelector('.header-text');
        if (span) span.classList.add('active');
      });
    });
  
    // Reveal animations
    initReveals();
  });
  