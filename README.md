# AnvIQ Labs — Website

Static landing page for **AnvIQ Labs**: HTML5, Tailwind CSS via CDN, and
vanilla JavaScript. No build step, no `package.json`, nothing to install.

All copy is separated from the markup — `public/index.html` carries structure only,
and every string lives in `public/js/data.js`.

---

## Project Structure

`public/` is the entire deployable site — everything Firebase serves. Paths
in this document are relative to the repo root.

```text
AnvIQ Labs/
│
├── README.md            ← This file
├── CLAUDE.md            ← Working notes and gotchas for contributors
├── firebase.json        ← Hosting config (serves `public/`)
├── deploy.sh            ← firebase deploy --only hosting
│
└── public/
    ├── index.html       ← Structure + empty containers (`id="xyz-container"`)
    │
    ├── css/
    │   └── styles.css   ← Design tokens, then component classes
    │
    ├── js/
    │   ├── data.js      ← Single source of truth for all site content
    │   ├── render.js    ← Binds data.js into index.html
    │   ├── utils.js     ← throttle, animateCounter, validators, showStatus, renderIcon
    │   ├── navbar.js    ← Sticky navbar, scrollspy, hamburger menu
    │   ├── animations.js← Scroll-reveal + animated counters (IntersectionObserver)
    │   └── main.js      ← Entry point: anchor scroll, contact form,
    │                       floating scroll button, theme menu
    │
    └── assets/images/
        ├── anviq-logo.svg        ← For light surfaces
        ├── anviq-logo-white.svg  ← For dark surfaces and the footer
        └── favicon.svg           ← Generated from the logo mark
```

Scripts load in the order listed above and that order matters — `utils.js`
must come before `navbar.js` and `main.js`, and `render.js` before
`animations.js`.

---

## Tech Stack

| Layer     | Technology                                              |
|-----------|---------------------------------------------------------|
| Structure | HTML5, semantic and data-bound                          |
| Content   | Vanilla JS data object (`data.js`)                      |
| Styling   | Tailwind CSS v3 (CDN) + CSS custom properties           |
| Fonts     | Google Fonts — Vend Sans, JetBrains Mono, Oldenburg     |
| Icons     | Lucide (CDN, UMD build)                                 |
| Scripting | Vanilla JavaScript (ES6+), plain scripts, no modules    |
| Hosting   | Firebase Hosting (project `anviq-labs`)                 |

---

## Running Locally

Serve the `public/` directory — not the repo root, or the paths will not
resolve:

```bash
# Python 3
python -m http.server 3000 --directory public

# Node.js
npx serve public
```

Then visit `http://localhost:3000`. Opening `public/index.html` directly
also works, since every local path is relative.

## Deploying

```bash
./deploy.sh     # firebase deploy --only hosting
```

---

## How to Edit Content

To change **any text, link, or icon**, you do not need to touch
`public/index.html`:

1. Open `public/js/data.js`.
2. Find the relevant section (`textContent`, `capabilities`, `industries`,
   `whyChooseUs`, …).
3. Update the values. Icons are Lucide names, e.g. `icon: "brain-circuit"`.
4. Refresh — `render.js` injects the changes into the DOM.

Copy is inserted as HTML, so entities (`&mdash;`) and `<br />` work. Use
`<br />` for a deliberate line break in a headline.

Two things live in `public/index.html` instead:

- **Nav items** — the desktop and drawer link lists are hardcoded, so adding
  a section means editing `data.js` *and* both lists.
- **The logo** — an `<img>` pointing at `public/assets/images/`, not a data string.

---

## Theme: Light / Dark / System

A menu in the navbar switches between the three. The choice persists in
`localStorage` and is applied before the stylesheet loads, so there is no
flash on reload.

"System" means no stored preference — the page follows the OS via
`prefers-color-scheme`, and tracks it live. Light and Dark are explicit and
override the OS in either direction.

Adding a colour? Every colour on the site is a CSS custom property defined
in the three `:root` blocks at the top of `styles.css`, and each needs a
light value **and** a dark one. See the design system notes below before
editing colours.

---

## Interactive UI Features

- **Decoupled data architecture** — all copy in `public/js/data.js`, injected by a
  small custom data-binding engine.
- **Scroll animations** — hand-rolled `IntersectionObserver` in
  `animations.js` reveals `.reveal-element` nodes and animates the stat
  counters from zero. No animation library.
- **Floating action button** — tracks scroll depth and morphs between
  scroll-to-bottom and scroll-to-top.
- **Responsive navbar** — sticky on scroll, scrollspy highlights the current
  section, hamburger drawer below 1150px.

---

## Contact Form

Client-side validated (name, email, at least one inquiry type, message),
then it builds an encoded `mailto:` link containing every field and hands
off to the visitor's mail client. There is no backend.

The destination address comes from
`siteData.textContent.contact.info.email`.

> **Known issue:** that value is currently `"anviq.ai"`, which is not a
> valid email address, so the form and the contact link both go nowhere.
> Set a real address in `public/js/data.js` before launch.

---

## Customisation

- **Colours and theme** — the token blocks at the top of `public/css/styles.css`.
  The `tailwind.config` block in `public/index.html` maps Tailwind's utility
  classes onto those tokens; it is a guard rail, not the palette.
- **Type and spacing** — both are clamped to the AnvIQ scales in the same
  `tailwind.config` block, so `text-lg` emits 16px and `p-5` emits 16px.
  Extend the config rather than writing one-off values.
- **Hover and reveal effects** — component classes and `.reveal-element` in
  `public/css/styles.css`.

Design rules (tokens, type scale, spacing scale, accessibility) live in
`.claude/skills/anviq-brand-guide/SKILL.md`. Read that before restyling.

---

&copy; 2026 AnvIQ Labs. All rights reserved.
