# AnvIQ Labs — Website

A modern, premium, data-driven static landing page for **AnvIQ Labs** built with pure HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript.

---

## Project Structure & Architecture

We use a modular, decoupled architecture where **all textual content is separated from the HTML markup**. This makes updating copy easy and keeps the HTML clean structure-only.

```text
AnvIQ Labs/
│
├── index.html           ← Main structure with empty DOM containers (`id="xyz-container"`)
│
├── css/
│   └── styles.css       ← Custom styles complementing Tailwind utilities (hover states, animations)
│
├── js/
│   ├── data.js          ← 🗄️ Single Source of Truth for all site content (JSON-like structure)
│   ├── render.js        ← ⚙️ Dynamic template renderer (binds `data.js` into `index.html`)
│   ├── utils.js         ← Pure utility functions (debounce, throttle, counter)
│   ├── navbar.js        ← Sticky navbar + scrollspy + mobile hamburger menu logic
│   ├── animations.js    ← Intersection Observer scroll-reveal + animated numbers
│   └── main.js          ← App entry point (Form handling, icon initialization)
│
└── assets/
    └── images/          ← Static image assets
```

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Structure  | HTML5 (Semantic, Data-Bound)        |
| Content    | Vanilla JavaScript Data Objects (`data.js`) |
| Styling    | Tailwind CSS v3 (CDN)               |
| Icons      | Lucide Icons (CDN, UMD build)       |
| Fonts      | Google Fonts — Inter & Space Grotesk|
| Scripting  | Vanilla JavaScript (ES6+)           |

---

## How to Edit Content

To change **any text, link, logo, or icon** on the website, you **do not need to touch `index.html`**. 

1. Open `js/data.js`.
2. Find the relevant section (`textContent`, `capabilities`, `industries`, etc.).
3. Update the string values.
4. Refresh the page! The `render.js` engine will automatically parse your changes and inject them into the DOM.

---

## Running Locally

Simply open `index.html` in any modern browser or use an extension like VS Code Live Server — no complex build steps required.

For live-reload during development via terminal:

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

- **Colors & Theme** — Edit the `tailwind.config` block in the `<head>` of `index.html`.
- **Deep Hover Effects** — Adjust the custom CSS transitions and `.reveal-element` classes inside `css/styles.css`.

---

&copy; 2026 AnvIQ Labs. All rights reserved.
