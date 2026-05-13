/**
 * animations.js
 * Scroll-reveal (Intersection Observer) and animated counter logic.
 * Depends on: utils.js (animateCounter)
 */

(function initAnimations() {

  /* ====================================================
     SCROLL REVEAL — .reveal-element
     Uses IntersectionObserver for performance.
     Staggered delay is applied via the element's inline
     style.animationDelay when set in HTML.
  ==================================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseFloat(el.style.animationDelay || el.dataset.delay || '0') * 1000;

          setTimeout(() => {
            el.classList.add('revealed');
          }, delay);

          // Once revealed, no need to observe further
          revealObserver.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.reveal-element').forEach(el => {
    revealObserver.observe(el);
  });


  /* ====================================================
     ANIMATED COUNTERS — [data-target]
     Triggers when the stats section enters the viewport.
     Reads `data-target` (number) and `data-suffix` (string).
  ==================================================== */
  let countersTriggered = false;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;

          document.querySelectorAll('.stat-value[data-target]').forEach(el => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, 1800, suffix);
          });

          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stats-container');
  if (statsSection) counterObserver.observe(statsSection);

})();
