/* ============================================================
   Anviq Labs - Main JavaScript
   This file handles UI interactions, mobile menu, smooth scroll,
   and contact form validation/submission.
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Check for Lucide Icons ---- */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ---- 2. Smooth Scrolling for internal anchor links ---- */
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // skip empty anchors
      e.preventDefault();

      const targetEl = document.querySelector(href);
      if (targetEl) {
        // Close mobile drawer if it's open
        if (window.MobileMenu && window.MobileMenu.close) {
          window.MobileMenu.close();
        }
        
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ---- 3. Init Contact Form ---- */
  initContactForm();

  /* ---- 4. Init Floating Scroll ---- */
  initFloatingScroll();

});


/* ============================================================
   Contact Form logic
============================================================ */
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const statusEl   = document.getElementById('form-status');
  if (!form || !statusEl) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.name.value;
    const email   = form.email.value;
    const company = form.company.value;
    const subject = form.subject.value;
    const message = form.message.value;

    /* -- Client-side validation -- */
    if (!isNonEmpty(name)) {
      showStatus(statusEl, "Please enter your full name.", "error");
      form.name.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(statusEl, "Please enter a valid email address.", "error");
      form.email.focus();
      return;
    }

    if (!isNonEmpty(subject)) {
      showStatus(statusEl, "Please select an inquiry type.", "error");
      form.subject.focus();
      return;
    }

    if (!isNonEmpty(message)) {
      showStatus(statusEl, "Please describe your project or inquiry.", "error");
      form.message.focus();
      return;
    }

        /* -- Trigger Mail Client -- */
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Opening Mail...";

    const targetEmail = (typeof siteData !== "undefined" && siteData.textContent && siteData.textContent.contact && siteData.textContent.contact.info) ? siteData.textContent.contact.info.email : "hello@anviqlabs.com";
    const emailSubject = encodeURIComponent("AnvIQ Labs Inquiry: " + subject);
    const emailBody = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Company: " + company + "\n" +
      "Inquiry Type: " + subject + "\n\n" +
      "Message:\n" + message
    );

    // Open mailto
    /* Create an invisible link to click instead of window.location.href, prevents page freezes */
    const link = document.createElement("a");
    link.href = "mailto:" + targetEmail + "?subject=" + emailSubject + "&body=" + emailBody;
    link.click();

    // Reset button after a brief UI delay
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Message <i data-lucide='send' class='w-4 h-4 group-hover:translate-x-1 transition-transform'></i>";
      if (window.lucide) lucide.createIcons();
    }, 2000);

  });
}

/* ============================================================
   Floating Scroll Logic
============================================================ */
function initFloatingScroll() {
  const scrollBtn = document.getElementById('floating-scroll-btn');
  if (!scrollBtn) return;

  // Show the button after scrolling down 100px
  // Toggle direction based on how far down they are
  let isPointingUp = false;

  const updateScrollBtn = () => {
    const scrollY = window.scrollY;
    // Maximum scroll
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 0);

    // Show or hide the button
    if (scrollY > 150) {
      scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      scrollBtn.classList.add('opacity-0', 'pointer-events-none');
      scrollBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }

    // Toggle icon direction: If we are close to the bottom (80%), point UP. Else, point DOWN.
    if (scrollY >= maxScroll * 0.8) {
      if (!isPointingUp) {
        scrollBtn.innerHTML = '<i data-lucide="arrow-up" id="scroll-icon" class="w-6 h-6"></i>';
        if (window.lucide) lucide.createIcons();
        isPointingUp = true;
      }
    } else {
      if (isPointingUp) {
        scrollBtn.innerHTML = '<i data-lucide="arrow-down" id="scroll-icon" class="w-6 h-6"></i>';
        if (window.lucide) lucide.createIcons();
        isPointingUp = false;
      }
    }
  };

  // Throttle to avoid aggressive reflows
  const throttledUpdate = typeof throttle === 'function' ? throttle(updateScrollBtn, 100) : updateScrollBtn;
  window.addEventListener('scroll', throttledUpdate);
  updateScrollBtn(); // initialize on load

  scrollBtn.addEventListener('click', () => {
    if (isPointingUp) {
      // Scroll to Top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to Bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
}
