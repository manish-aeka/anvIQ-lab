/**
 * main.js
 * Application entry point.
 * Initialises Lucide icons, smooth scrolling, footer year, and contact form.
 * Depends on: utils.js (smoothScrollTo, isValidEmail, isNonEmpty)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Initialise Lucide icons ---- */
  lucide.createIcons();

  /* ---- 2. Footer current year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- 3. Smooth scrolling for all anchor links (#…) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // skip empty anchors
      e.preventDefault();
      smoothScrollTo(href, 80);
    });
  });

  /* ---- 4. Contact form handling ---- */
  initContactForm();

});


/* ============================================================
   Contact Form
   Validates fields and shows inline status messages.
   Replace the setTimeout block with a real fetch() call
   to wire up a backend endpoint.
============================================================ */
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const statusEl   = document.getElementById('form-status');
  if (!form || !statusEl) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.name.value;
    const email   = form.email.value;
    const message = form.message.value;

    /* -- Client-side validation -- */
    if (!isNonEmpty(name)) {
      showStatus(statusEl, 'Please enter your full name.', 'error');
      form.name.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(statusEl, 'Please enter a valid email address.', 'error');
      form.email.focus();
      return;
    }

    if (!isNonEmpty(message)) {
      showStatus(statusEl, 'Please describe your project or inquiry.', 'error');
      form.message.focus();
      return;
    }

    /* -- Simulate submission (replace with real API call) -- */
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // TODO: Replace with actual fetch() to your backend / form service
    setTimeout(() => {
      showStatus(
        statusEl,
        '✓ Message sent! We\'ll be in touch within 24 hours.',
        'success'
      );
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i data-lucide="send" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>';
      lucide.createIcons();
    }, 1200);
  });
}


/**
 * Displays a status message below the contact form.
 * @param {HTMLElement} el    - The status paragraph element
 * @param {string}      msg   - Message text
 * @param {'success'|'error'} type - Visual style
 */
function showStatus(el, msg, type) {
  el.textContent = msg;
  el.className = 'mt-3 text-center text-sm'; // reset
  if (type === 'success') {
    el.classList.add('text-emerald-400');
  } else {
    el.classList.add('text-red-400');
  }
  el.classList.remove('hidden');

  // Auto-hide success message after 6 seconds
  if (type === 'success') {
    setTimeout(() => {
      el.classList.add('hidden');
    }, 6000);
  }
}
