/* ============================================================
   Anviq Labs - Main JavaScript
   This file handles UI interactions, mobile menu, smooth scroll,
   theme toggle, and contact form validation/submission.
   Depends on: utils.js (isNonEmpty, isValidEmail, showStatus,
   throttle, renderIcon) — must load before this file.
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

  /* ---- 5. Init Theme Menu ---- */
  initThemeMenu();

});


/* ============================================================
   Theme menu — light / dark / system
   A saved choice is already applied by the inline script in
   <head>; this wires the dropdown and keeps it in sync.
============================================================ */
function initThemeMenu() {
  const wrap = document.getElementById('theme-menu');
  if (!wrap) return;

  const trigger  = document.getElementById('theme-menu-trigger');
  const list     = document.getElementById('theme-menu-list');
  const items    = Array.from(list.querySelectorAll('[data-theme-choice]'));
  const iconSlot = wrap.querySelector('.theme-menu__icon');

  const root = document.documentElement;
  const KEY  = 'anviq-theme';
  const META = {
    light:  { icon: 'sun',     label: 'Light'  },
    dark:   { icon: 'moon',    label: 'Dark'   },
    system: { icon: 'monitor', label: 'System' }
  };

  /* Three states, and the CSS already distinguishes them:
       light   -> data-theme="light", which beats an OS set to dark
       dark    -> data-theme="dark",  which beats an OS set to light
       system  -> no attribute, so prefers-color-scheme decides
     "system" is therefore the absence of a stored value, not a
     stored value of its own. */
  function apply(choice) {
    if (choice === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', choice);
    }
    try {
      if (choice === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, choice);
    } catch (e) {}
  }

  function paint(choice) {
    const meta = META[choice];
    renderIcon(iconSlot, meta.icon);
    /* The trigger shows no text, so the current choice has to reach
       assistive tech through the accessible name (§12). */
    trigger.setAttribute('aria-label', 'Theme: ' + meta.label);
    items.forEach((item) => {
      item.setAttribute('aria-checked', String(item.dataset.themeChoice === choice));
    });
  }

  function storedChoice() {
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    /* Anything unrecognised — including a "system" left by an older
       build — resolves to system and gets cleaned up by apply(). */
    return saved === 'light' || saved === 'dark' ? saved : 'system';
  }

  /* ---- open / close ---- */
  let open = false;

  function openMenu() {
    open = true;
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu(returnFocus) {
    open = false;
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus) trigger.focus();
  }

  trigger.addEventListener('click', () => {
    if (open) closeMenu(); else openMenu();
  });

  /* Hover only where hovering is real. On a touch screen a tap can
     synthesise mouseenter, which would open the menu and then let the
     click close it again. */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    wrap.addEventListener('mouseenter', openMenu);
    wrap.addEventListener('mouseleave', () => closeMenu());
  }

  /* Enter and Space already reach the click handler natively. */
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openMenu();
      items[0].focus();
    }
  });

  list.addEventListener('keydown', (e) => {
    const at = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(at + 1) % items.length].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(at - 1 + items.length) % items.length].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1].focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu(true);
    } else if (e.key === 'Tab') {
      closeMenu();
    }
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const choice = item.dataset.themeChoice;
      apply(choice);
      paint(choice);
      closeMenu(true);
    });
  });

  document.addEventListener('click', (e) => {
    if (open && !wrap.contains(e.target)) closeMenu();
  });

  const choice = storedChoice();
  apply(choice);
  paint(choice);
  closeMenu();

  /* No matchMedia listener for the theme itself: on "system" the CSS
     tracks the OS on its own, and the trigger still reads "System". */
}



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
    const message = form.message.value;

    const checkedSubjects = Array.from(form.querySelectorAll('input[name="subject"]:checked'));
    const subjectLabels   = {
      technical:    "Technical Deep-Dive / Pilot Program",
      benchmarks:   "Performance Benchmarks Review",
      partnership:  "Partnership / Investment Information",
      "ai-challenge": "Specific AI Challenge",
      other:        "General Inquiry"
    };
    const subject = checkedSubjects.map(cb => subjectLabels[cb.value] || cb.value).join(", ");

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

    if (checkedSubjects.length === 0) {
      showStatus(statusEl, "Please select at least one inquiry type.", "error");
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
      submitBtn.innerHTML = "Send Message <i data-lucide='send' class='w-4 h-4 group-hover:translate-x-0.5 transition-transform'></i>";
      if (window.lucide) lucide.createIcons({ root: submitBtn });
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
        renderIcon(scrollBtn, 'arrow-up', 'w-6 h-6');
        isPointingUp = true;
      }
    } else {
      if (isPointingUp) {
        renderIcon(scrollBtn, 'arrow-down', 'w-6 h-6');
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
