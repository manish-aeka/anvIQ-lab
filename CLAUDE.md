# AnvIQ Labs — website

Static single-page marketing site. No build step, no package.json, no
dependencies to install. `public/` is the entire deployable site.

## Commands

```bash
# serve locally (either works)
python -m http.server 3000 --directory public
npx serve public

# deploy the current branch to Firebase Hosting (project: anviq-labs)
./deploy.sh          # wraps: firebase deploy --only hosting
```

There are no tests and no linter. Verification is opening the page in a
browser.

## Layout

```
public/index.html      structure only — empty containers + data-bind attrs
public/css/styles.css  ~1200 lines hand-written, complements Tailwind CDN
public/js/data.js      ALL site copy, one `siteData` object
public/js/render.js    walks [data-bind], innerHTML-fills ~13 containers
public/js/utils.js     debounce/throttle/easeOutCubic/animateCounter/validators
public/js/navbar.js    IIFE — sticky class, hamburger, scrollspy
public/js/animations.js IntersectionObserver reveal, counters, progress bars
public/js/main.js      lucide init, anchor scroll, contact form, scroll button
```

## How content changes work

Edit `public/js/data.js` — not `index.html`. `render.js` resolves each
`data-bind="a.b.c"` path against `siteData` and assigns `innerHTML`, so copy
may contain HTML entities and `<br />`.

Two exceptions where `index.html` must also be edited:

- **Nav items** are hardcoded in `index.html` (both the desktop and mobile
  lists) as `textContent.nav.links.0..7`, and their `href`s are hardcoded
  too. `nav.links[].href` in data.js is unused.
- The About-section stat cards hardcode 55+ / 10 TB+ / 97.4% / <50ms,
  duplicating `siteData.stats`.

## Script order matters

`data.js → render.js → utils.js → navbar.js → animations.js → main.js`.
`render.js` and `animations.js` both register `DOMContentLoaded` handlers;
render's is registered first, so injected `.reveal-element` and
`.progress-fill` nodes exist by the time the observers query them. Do not
reorder the tags in `index.html`.

## Known issues (verified, unfixed)

- `data.js` `contact.info.email` is `"anviq.ai"` — not an email. Every
  contact path (`mailto:` link and the form in `main.js`) is broken. Two
  stale fallbacks disagree: `hello@anviq.ai` in `index.html`,
  `hello@anviqlabs.com` in `main.js`.
- `index.html` has no closing `</body></html>`.
- Leadership section renders three empty holes: `leadershipCredentials` is
  `[]`, and `leadership.p2` / `teamDNAHeading` are commented out in data.js
  while still having `data-bind` targets.
- Anchor scrolling uses `scrollIntoView({block:'start'})`, so the fixed 70px
  navbar covers section headings. `smoothScrollTo(sel, offset)` in utils.js
  does it correctly and is never called.
- `main.js` guards on `window.MobileMenu`, which nothing defines.
- Dead code: `.industry-*` and `.case-*` CSS (~100 lines, unreferenced),
  `problem`/`solution`/`result` fields on every industry (never rendered),
  `debounce`, `smoothScrollTo`, `about.statsHeading`.
- `CONTENT_OVERHAUL_SUMMARY.md` and `IMPLEMENTATION_CHECKLIST.md` describe
  already-merged work and contradict the live copy. Treat data.js as truth.

## Conventions

- Vanilla JS, no framework, no modules — plain scripts and globals.
- Tailwind via `cdn.tailwindcss.com` with the theme in an inline
  `tailwind.config` block in `index.html`'s `<head>`. Custom component
  classes live in `styles.css`.
- Icons: Lucide via CDN. After injecting markup that contains
  `<i data-lucide="…">`, call `lucide.createIcons()`.
- Branch per deploy iteration (`firebase-deploy-v5`); PRs target `master`.

## Design system

`.claude/skills/anviq-brand-guide/SKILL.md` governs styling here, and the
site has been migrated onto it: AnvIQ green/gold tokens, the Vend Sans type
scale (JetBrains Mono for numbers, Oldenburg for the single hero Display),
the 13-value spacing scale, 4px radius, and full light/dark support.

Carbon web components (guide §7) are deliberately **not** used — the stack
stays Tailwind CDN + vanilla JS. These CSS classes are the themed plain-CSS
fallback §2 rule 1 permits.

Two rules that are easy to break here:

- **Colours only from tokens.** All three `:root` blocks are at the top of
  `styles.css`. Never add a hex outside them. A new colour goes in bare
  `:root` *and* both dark blocks.
- **The Tailwind config is a guard rail, not a palette.** Its `colors` map
  every utility used in the markup onto `var(--cds-*)` tokens, and its
  `fontSize` / `fontWeight` / `borderRadius` / `padding` / `margin` / `gap`
  / `space` overrides clamp Tailwind's default scales to the guide's. So
  `text-lg` emits 16px, not 18px, and `p-5` emits 16px, not 20px. If you
  add a utility whose colour or step is not in that config, it will emit an
  off-guide value — extend the config instead of writing a one-off hex.
  `width`/`height` are intentionally left on Tailwind's own scale so
  `w-5 h-5` stays a legal 20px icon size.

Breakpoints are the guide's: `sm`/`md` 760px, `lg` 1056px. `nav` 1150px is
this site's own switch for the desktop nav.
