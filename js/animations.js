/**
 * animations.js
 * Scroll-reveal (Intersection Observer) and animated counter logic.
 * Depends on: utils.js (animateCounter)
 *
 * Delay source priority (for staggered reveals):
 *   1. data-delay attribute  (e.g. data-delay="0.15")   ← new HTML pattern
 *   2. style.animationDelay  (e.g. style="animation-delay:0.1s") ← legacy
 *   3. Defaults to 0
 */

(function initAnimations() {

  /* ====================================================
     SCROLL REVEAL — .reveal-element
  ==================================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // Resolve delay from data-delay attr or inline style
        const rawDelay =
          el.dataset.delay
          || (el.style.animationDelay ? parseFloat(el.style.animationDelay) : null)
          || 0;

        const delayMs = parseFloat(rawDelay) * 1000;

        setTimeout(() => el.classList.add('revealed'), delayMs);
        revealObserver.unobserve(el);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -32px 0px',
    }
  );

  document.querySelectorAll('.reveal-element').forEach(el => {
    revealObserver.observe(el);
  });

  /* ====================================================
     ANIMATED COUNTERS — .stat-value[data-target]
     Triggers once when the stats row enters the viewport.
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
            animateCounter(el, target, 1600, suffix);
          });

          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  // Works with both old (.stats-container) and new (.stats-row) class names
  const statsEl = document.querySelector('.stats-row, .stats-container');
  if (statsEl) counterObserver.observe(statsEl);

  /* ====================================================
     PLATFORM CARD — animate progress bars on entry
  ==================================================== */
  const platformCard = document.querySelector('.platform-card');

  if (platformCard) {
    // Reset fill widths to 0 initially so they animate in
    document.querySelectorAll('.progress-fill').forEach(bar => {
      bar.dataset.targetWidth = bar.style.width;
      bar.style.width = '0%';
    });

    const platformObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Stagger each bar slightly
            document.querySelectorAll('.progress-fill').forEach((bar, i) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.targetWidth || '0%';
              }, 300 + i * 150);
            });
            platformObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    platformObserver.observe(platformCard);
  }

})();
