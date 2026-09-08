/**
 * utils.js
 * Reusable utility functions for AnvIQ Labs website.
 * Keep pure — no DOM side effects at module level.
 */

/* ---------- Debounce ---------- */
/**
 * Returns a debounced version of the provided function.
 * @param {Function} fn  - Function to debounce
 * @param {number}   ms  - Wait time in milliseconds
 */
function debounce(fn, ms = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

/* ---------- Throttle ---------- */
/**
 * Returns a throttled version of the provided function.
 * @param {Function} fn  - Function to throttle
 * @param {number}   ms  - Minimum interval in milliseconds
 */
function throttle(fn, ms = 100) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/* ---------- Ease functions ---------- */
/**
 * Ease-out cubic easing for counter animations.
 * @param {number} t - Progress 0–1
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ---------- Animated counter ---------- */
/**
 * Animates a numeric value from 0 to `target` over `duration` ms.
 * @param {HTMLElement} el       - Element whose textContent is updated
 * @param {number}      target   - Final numeric value (may be decimal)
 * @param {number}      duration - Animation duration in ms
 * @param {string}      suffix   - Optional suffix appended after the number
 * @param {string}      prefix   - Optional prefix prepended before the number
 */
function animateCounter(el, target, duration = 1800, suffix = '', prefix = '') {
  const isDecimal = !Number.isInteger(target);
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = easeOutCubic(progress) * target;
    const display = isDecimal ? current.toFixed(1) : Math.round(current);
    el.textContent = prefix + display + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- Smooth scroll ---------- */
/**
 * Smooth-scrolls to the element matching `selector`.
 * @param {string} selector - CSS selector of target element
 * @param {number} offset   - Pixel offset from top (e.g. navbar height)
 */
function smoothScrollTo(selector, offset = 80) {
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ---------- Form validation helpers ---------- */
/**
 * Returns true if the string is a valid-looking email address.
 * @param {string} email
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Returns true if the string is non-empty after trimming.
 * @param {string} value
 */
function isNonEmpty(value) {
  return value.trim().length > 0;
}

/* ---------- Form Status helper ---------- */
/**
 * Displays a status message in the target element.
 * @param {HTMLElement} el      - Element to display status in
 * @param {string}      message - Status message
 * @param {string}      type    - 'error' or 'success'
 */
function showStatus(el, message, type) {
  if (!el) return;
  el.textContent = message;
  /* Styling lives in css/styles.css so the colours come from the
     support tokens and carry a dark value. Replacing className is
     also what clears the initial `hidden` class. */
  if (type === 'error') {
    el.className = 'form-status form-status--error';
  } else if (type === 'success') {
    el.className = 'form-status form-status--success';
  } else {
    el.className = 'form-status';
  }
}
