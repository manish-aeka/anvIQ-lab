# AnvIQ Labs — Website

A modern, premium static website for **AnvIQ Labs** built with pure HTML5, Tailwind CSS (CDN), and vanilla JavaScript.

---

## Project Structure

```
AnvIQ Labs/
│
├── index.html           ← Single-page application entry point (all sections inline)
│
├── css/
│   └── styles.css       ← Custom styles complementing Tailwind utilities
│
├── js/
│   ├── utils.js         ← Pure utility functions (debounce, throttle, counter, etc.)
│   ├── navbar.js        ← Sticky navbar + mobile hamburger menu logic
│   ├── animations.js    ← Intersection Observer scroll-reveal + animated counters
│   └── main.js          ← App entry point: Lucide init, smooth scroll, contact form
│
└── assets/
    └── images/          ← Static image assets (favicon, OG image, etc.)
```

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5 (semantic)                    |
| Styling    | Tailwind CSS v3 (CDN)               |
| Icons      | Lucide Icons (CDN, UMD build)       |
| Fonts      | Google Fonts — Inter + Space Grotesk|
| Scripting  | Vanilla JavaScript (ES6+)           |

---

## Sections

1. **Navbar** — Sticky, scroll-aware, mobile hamburger with active link highlighting
2. **Hero** — Full-screen with animated gradient blobs, floating glass cards, micro stats
3. **About** — Company philosophy, research-first approach, proprietary intelligence systems
4. **Capabilities** — 6 capability cards with hover effects and categorisation tags
5. **Industries** — 5 industry cards + open CTA tile
6. **Research** — 4-step process flow + 3 research pillar cards
7. **Stats** — Animated counters triggered on scroll via Intersection Observer
8. **Why Choose Us** — 6 differentiator cards
9. **Contact** — Validated contact form + company info + mission quote
10. **Footer** — Brand, quick links, solutions, social icons, legal links

---

## Running Locally

Simply open `index.html` in any modern browser — no build step required.

For live-reload during development, use a simple local server:

```bash
# Python 3
python -m http.server 3000

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:3000`.

---

## Connecting the Contact Form

In `js/main.js`, locate the `TODO` comment inside `initContactForm()` and replace the `setTimeout` simulation with a real `fetch()` call to your backend endpoint or a form service (e.g. Formspree, EmailJS, AWS SES).

---

## Customisation

- **Colors & theme** — Edit the `tailwind.config` block inside `index.html`
- **Content** — All section content is in `index.html`; search for the section comments (`<!-- HERO -->`, `<!-- ABOUT -->`, etc.)
- **Styles** — Component-level styles live in `css/styles.css`; Tailwind utilities are applied directly in HTML

---

© 2025 AnvIQ Labs. All rights reserved.
