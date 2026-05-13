/**
 * navbar.js
 * Handles sticky navbar scroll effect and mobile hamburger menu toggle.
 * Depends on: utils.js (throttle)
 */

(function initNavbar() {
  const navbar       = document.getElementById('navbar');
  const mobileBtn    = document.getElementById('mobile-menu-btn');
  const mobileMenu   = document.getElementById('mobile-menu');
  const menuIcon     = document.getElementById('menu-icon');
  let   menuOpen     = false;

  /* ---- Sticky / scrolled state ---- */
  const SCROLL_THRESHOLD = 40; // px before navbar gets 'scrolled' class

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
  function openMenu() {
    menuOpen = true;
    mobileMenu.classList.remove('hidden');
    mobileBtn.setAttribute('aria-expanded', 'true');
    // Swap icon: menu → x
    menuIcon.setAttribute('data-lucide', 'x');
    lucide.createIcons({ el: menuIcon });
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileBtn.setAttribute('aria-expanded', 'false');
    // Swap icon: x → menu
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons({ el: menuIcon });
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
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('text-white');
          link.classList.add('text-slate-400');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.remove('text-slate-400');
            link.classList.add('text-white');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', throttle(highlightNav, 100), { passive: true });
})();
