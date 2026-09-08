/**
 * navbar.js
 * Handles sticky navbar scroll effect and mobile hamburger menu toggle.
 * Depends on: utils.js (throttle, renderIcon) — must load before this file.
 */

(function initNavbar() {
  const navbar       = document.getElementById('navbar');
  const mobileBtn    = document.getElementById('mobile-menu-btn');
  const mobileMenu   = document.getElementById('mobile-menu');
  let   menuOpen     = false;

  /* ---- Sticky / scrolled state ---- */
  const SCROLL_THRESHOLD = 20;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', throttle(onScroll, 80), { passive: true });
  onScroll(); // run once on load

  /* ---- Mobile menu toggle ---- */
  /* Icon swaps go through renderIcon() (utils.js): Lucide replaces the
     <i> it renders, so mutating a stored reference to it is a no-op. */
  function openMenu() {
    menuOpen = true;
    mobileMenu.classList.remove('hidden');
    mobileBtn.setAttribute('aria-expanded', 'true');
    renderIcon(mobileBtn, 'x');
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileBtn.setAttribute('aria-expanded', 'false');
    renderIcon(mobileBtn, 'menu');
  }

  mobileBtn.addEventListener('click', () => {
    menuOpen ? closeMenu() : openMenu();
  });

  /* ---- Close menu when a mobile nav link is clicked ---- */
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* ---- Close on Escape key ---- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  /* ---- Highlight active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    let matched = false;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        matched = true;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
    if (!matched) navLinks.forEach(link => link.classList.remove('active'));
  }

  window.addEventListener('scroll', throttle(highlightNav, 100), { passive: true });
  highlightNav();
})();
