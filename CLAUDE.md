# AnvIQ Labs — website

Static single-page marketing site. No build step, no `package.json`, nothing
to install. `public/` is the entire deployable site.

## Commands

```bash
# serve locally (either works)
python -m http.server 3000 --directory public
npx serve public

# deploy the current branch to Firebase Hosting (project: anviq-labs)
./deploy.sh          # wraps: firebase deploy --only hosting
```

No tests, no linter, no CI. Verification is loading the page and reading the
console. Since the JS files are plain scripts with top-level function
declarations, a function can be exercised in Node without a browser by
reading the file and wrapping it — useful for the theme and icon logic:

```js
new Function('document', 'window', 'localStorage', 'lucide',
             src + '; return initThemeMenu;')(stubs…)();
```

## Layout

```
public/index.html       structure only — empty containers + data-bind attrs
public/css/styles.css   ~1280 lines: token blocks, then component classes
public/js/data.js       ALL site copy, one `siteData` object
public/js/render.js     walks [data-bind], innerHTML-fills ~13 containers
public/js/utils.js      throttle, animateCounter, validators, showStatus, renderIcon
public/js/navbar.js     IIFE — sticky class, hamburger, scrollspy
public/js/animations.js IntersectionObserver reveal, counters, progress bars
public/js/main.js       lucide init, anchor scroll, contact form, scroll button, theme menu
public/assets/images/   anviq-logo.svg, anviq-logo-white.svg, favicon.svg
```

## Content lives in data.js

Edit `public/js/data.js`, not `index.html`. `render.js` resolves each
`data-bind="a.b.c"` path against `siteData` and assigns `innerHTML`, so copy
may carry HTML entities and `<br />` (six headlines already do — that is the
convention for a deliberate line break).

Two places `index.html` must also be edited:

- **Nav items** are hardcoded in `index.html` (desktop and drawer lists) as
  `textContent.nav.links.0..7`, with hardcoded `href`s. `nav.links[].href`
  in data.js is unused.
- The About-section stat cards hardcode 55+ / 10 TB+ / 97.4% / <50ms,
  duplicating `siteData.stats`.

## Script order matters

`data.js → render.js → utils.js → navbar.js → animations.js → main.js`

Two dependencies ride on that order — do not reorder the tags:

- **utils.js must precede navbar.js and main.js.** Both call `renderIcon`,
  and navbar.js also calls `throttle`.
- **render.js must precede animations.js.** Both register
  `DOMContentLoaded` handlers; render's is registered first, so the
  `.reveal-element` and `.progress-fill` nodes it injects exist by the time
  the observers query them.

## Design system

`.claude/skills/anviq-brand-guide/SKILL.md` governs styling, and the site is
migrated onto it: AnvIQ green/gold tokens, the Vend Sans type scale
(JetBrains Mono for numbers, Oldenburg for the single hero Display), the
13-value spacing scale, 4px radius, light and dark.

Carbon web components (guide §7) are deliberately **not** used — the stack
stays Tailwind CDN + vanilla JS. These CSS classes are the themed plain-CSS
fallback §2 rule 1 permits.

- **Colours only from tokens.** The three `:root` blocks are at the top of
  `styles.css`. Never add a hex outside them. A new colour goes in bare
  `:root` *and* both dark blocks.
- **The `tailwind.config` block is a guard rail, not a palette.** Its
  `colors` map every utility used in the markup onto `var(--cds-*)`, and its
  `fontSize` / `fontWeight` / `borderRadius` / `padding` / `margin` / `gap` /
  `space` overrides clamp Tailwind's defaults to the guide's scales — so
  `text-lg` emits 16px, not 18px, and `p-5` emits 16px, not 20px. A utility
  whose colour or step is absent from that config will emit an off-guide
  value; extend the config rather than writing a one-off hex.
  `width`/`height` are left on Tailwind's own scale on purpose, so
  `w-5 h-5` stays a legal 20px icon size.
- Breakpoints are the guide's: `sm`/`md` 760px, `lg` 1056px. `nav` 1150px is
  this site's own switch for the desktop nav. Note this also redefines
  `max-w-screen-*`, so `max-w-screen-lg` is 1056px, not Tailwind's 1024px.

## Theme: light / dark / system

Three states, and **"system" is the absence of state** — not a stored value:

| choice | `data-theme` on `<html>` | localStorage `anviq-theme` |
|---|---|---|
| Light  | `"light"` — beats an OS set to dark | `light` |
| Dark   | `"dark"` — beats an OS set to light | `dark` |
| System | *attribute removed* | *key removed* |

That is exactly what the CSS is written for: the dark values live in both
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`
and `:root[data-theme="dark"]`. Both blocks are required and must stay
identical — with only one, the theme is wrong for anyone whose explicit
choice differs from their OS. The same guard pair drives the logo swap and
the on-brand hover colours.

Do not "simplify" System to `data-theme="system"`. It appears to work
(it isn't `"light"`, so the media query still matches) but it is state the
stylesheet does not understand.

The inline script in `<head>` applies a saved choice before the stylesheet
loads, so there is no flash; it stamps only `light` or `dark`. Every
`localStorage` access on the page is inside `try/catch` — it *throws*, not
returns null, when site data is blocked, and an unguarded throw kills the
rest of the script block.

`initThemeMenu()` in main.js drives an icon-only dropdown trigger. It binds
hover only behind `(hover: hover) and (pointer: fine)`, because on a touch
screen a tap synthesises `mouseenter` and the menu would open and instantly
close. Keyboard: ArrowDown opens, arrows wrap, Home/End, Escape closes and
restores focus, Tab closes.

## Icons: always re-render, never mutate

Lucide's `createIcons()` ends in `parentNode.replaceChild(svg, element)` —
the `<i data-lucide>` **leaves the DOM**. Any reference captured beforehand
is detached, and setting `data-lucide` on it does nothing, silently. Its
scoping option is `root`, not `el`; anything else is ignored and falls back
to re-rendering every icon on the page.

So to change an icon, use the helper in utils.js:

```js
renderIcon(container, 'menu');            // re-renders into the PARENT
renderIcon(scrollBtn, 'arrow-up', 'w-6 h-6');
```

Six call sites use it (hamburger, floating scroll button, theme trigger).
The two bare `lucide.createIcons()` calls — `main.js:13` and
`render.js:277` — are correct as-is; they paint the whole document once.
The contact submit button keeps its own `innerHTML` (text plus an icon) but
passes `root: submitBtn`.

## Assets

- `anviq-logo.svg` on light surfaces, `anviq-logo-white.svg` on dark and in
  the footer. Swapped in CSS via the same `[data-theme]` / media guards —
  never recoloured inline.
- `favicon.svg` is generated from the logo's mark (the first `<g>`, no
  wordmark) with the path data copied verbatim, and carries its own
  `prefers-color-scheme` block so it lightens on dark tab chrome. If the
  logo changes, regenerate rather than hand-editing.
- No `og-image.png`, and the page has no Open Graph tags at all.

## Gotchas

- **`[hidden]` loses to author `display`.** `.theme-menu__list` sets
  `display: flex`, so `.theme-menu__list[hidden] { display: none }` is
  restated explicitly. Without it the menu renders permanently open. Applies
  to any element you hide with the attribute and style with `display`.
- Adding a section means adding it to `nav.links` *and* to both hardcoded
  nav lists in `index.html`.
- `render.js` uses `innerHTML` throughout. Fine today — every value comes
  from `data.js` — but it is not a place to put user input.

## Known issues (verified, unfixed)

- **Every contact path is broken.** `data.js` `contact.info.email` is
  `"anviq.ai"`, which is not an email, so the `mailto:` link and the form in
  `main.js` both go nowhere. Two stale fallbacks disagree with it:
  `hello@anviq.ai` in `index.html`, `hello@anviqlabs.com` in `main.js`.
- Leadership renders three empty holes: `leadershipCredentials` is `[]` (all
  entries commented out), and `leadership.p2` / `teamDNAHeading` are
  commented out in data.js while still having `data-bind` targets in
  `index.html`.
- Anchor scrolling uses `scrollIntoView({ block: 'start' })`, so the fixed
  64px navbar covers section headings. `smoothScrollTo(sel, offset)` in
  utils.js does it correctly and is never called.
- `main.js` guards on `window.MobileMenu`, which nothing defines.
- Dead code: `problem` / `solution` / `result` on all five industries (never
  rendered — the Problem→Solution→Result format the root docs advertise is
  not on the page), plus `debounce`, `smoothScrollTo`,
  `about.statsHeading`, and `nav.logoMark` / `logoP1` / `logoP2` (orphaned
  when the image logo replaced the text lockup).
- `CONTENT_OVERHAUL_SUMMARY.md` and `IMPLEMENTATION_CHECKLIST.md` describe
  already-merged work and contradict the live copy. Treat `data.js` as
  truth.

## Conventions

- Vanilla JS, no framework, no modules — plain scripts and globals.
- Branch per iteration (currently `update-with-anviq-style`); PRs target
  `master`. Commits are short and single-purpose: `fix:`, `add:`, `refac:`.
