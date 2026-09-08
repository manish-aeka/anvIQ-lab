---
name: anviq-brand-guide
description: AnvIQ design system rules for web UI - Carbon web components (cds-*), the AnvIQ color tokens (green/gold), the Vend Sans type scale, and the spacing scale. Use whenever building, editing, styling, reviewing, or theming web UI in an AnvIQ repo - pages, components, buttons, forms, tables, dashboards, layouts, dark mode, HTML, CSS - and before writing any markup.
---

# AnvIQ brand guide

This file is self-sufficient. Everything needed to build correct AnvIQ UI is
below - tokens, fonts, type scale, spacing, setup boilerplate, component
names. Do not go looking for a brand-guide site; it may not exist in this
repo.

Stack: real `@carbon/web-components` custom elements, themed with AnvIQ CSS
custom properties. Carbon supplies behavior and internal styling; AnvIQ
supplies the palette and the type.

## 1. Setup (do this before writing any UI)

If the repo has no AnvIQ token block yet, add all three sections from
"3. Color tokens" to the global stylesheet first. Without them Carbon falls
back to IBM's own blue defaults, and the page will pass every other rule
here while looking nothing like AnvIQ.

Fonts (exact link - all three families are on Google Fonts):

```html
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Vend+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Oldenburg&display=swap">
```

Carbon via CDN, one script tag per component, `type="module"`:

```html
<script type="module"
  src="https://1.www.s81c.com/common/carbon/web-components/tag/v2/latest/button.min.js"></script>
```

If the repo already uses a bundler, `npm i @carbon/web-components` and import
the same component paths instead. Do not mix the two in one app.

Flash guard - Carbon's own CDN guidance. Without it every page flashes raw
unstyled markup on load. List every top-level tag the page uses:

```css
cds-button:not(:defined),
cds-text-input:not(:defined) { visibility: hidden; }
```

Children of a listed tag inherit this, so only top-level tags need listing.

## 2. Hard rules

1. **Real Carbon component first, always.** Never hand-roll CSS that mimics
   a component Carbon ships. Fall back to plain HTML/CSS only when Carbon
   has no matching component (charts, chat UI, slide replicas) - and theme
   that fallback with the same tokens as everything else.
2. **No hex or named color anywhere except inside the `:root` token blocks.**
   In authored CSS always write `var(--cds-button-primary)`. Never a raw
   gray, never a bare `#fff` or `#000`.
3. **Font size and weight come only from the type scale in section 4.** If a
   value is not a row in that table, it is wrong.
4. **Spacing comes only from the scale in section 5.** No arbitrary px.
5. **Gold is an accent.** One highlight, focus ring, or active indicator.
   Never a fill for a large area, and never text - gold on white is about
   1.9:1 and fails contrast.
6. **Every color needs a dark value.** See section 6; there are two dark
   blocks, not one.

## 3. Color tokens

Copy all three blocks verbatim. Light lives on bare `:root`; the two dark
blocks are both required (section 6 explains why).

```css
:root {
    --cds-background: #ffffff;
    --cds-text-primary: #061b12;
    --cds-text-secondary: #5b6f65;
    --cds-link-primary: #1b4332;
    --cds-button-primary: #1b4332;
    --cds-button-primary-hover: #061b12;
    --cds-border-subtle: #dcdfde;
    --cds-layer-01: #f3f4f3;
    --cds-layer-02: #eaf3ee;
    --cds-focus: #d8a657;
    --cds-icon-primary: #1b4332;
    --cds-icon-secondary: #5b6f65;
    --cds-border-interactive: #d8a657;
    --cds-interactive: #1b4332;
    --cds-field: #f3f4f3;
    --cds-field-01: #f3f4f3;
    --cds-field-02: #ffffff;
    --cds-layer: #f3f4f3;
    --cds-border-strong: #8d8d8d;
    --cds-border-strong-01: #8d8d8d;
    --cds-icon-interactive: #1b4332;
    --cds-text-placeholder: #5b6f65;
    --cds-text-helper: #5b6f65;
    --cds-support-error: #da1e28;
    --cds-support-success: #198038;
    --cds-support-warning: #f1c21b;
    --cds-support-info: #0043ce;
    --cds-font-family: "Vend Sans", system-ui, sans-serif;
    --anviq-accent: #d8a657;
    --anviq-tint: #eaf3ee;
    --anviq-text-on-brand: #ffffff;
    --anviq-text-on-accent: #3a2a05;
}

@media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
        --cds-background: #0b1712;
        --cds-text-primary: #eaf3ee;
        --cds-text-secondary: #9dbfae;
        --cds-link-primary: #3e8867;
        --cds-button-primary: #3e8867;
        --cds-button-primary-hover: #eaf3ee;
        --cds-border-subtle: #254b3a;
        --cds-layer-01: #10231b;
        --cds-layer-02: #132b21;
        --cds-focus: #e7b563;
        --cds-icon-primary: #3e8867;
        --cds-icon-secondary: #9dbfae;
        --cds-border-interactive: #e7b563;
        --cds-interactive: #3e8867;
        --cds-field: #10231b;
        --cds-field-01: #10231b;
        --cds-field-02: #132b21;
        --cds-layer: #10231b;
        --cds-border-strong: #6f6f6f;
        --cds-border-strong-01: #6f6f6f;
        --cds-icon-interactive: #3e8867;
        --cds-text-placeholder: #9dbfae;
        --cds-text-helper: #9dbfae;
        --cds-support-error: #ff8389;
        --cds-support-success: #42be65;
        --cds-support-warning: #f1c21b;
        --cds-support-info: #4589ff;
        --cds-notification-background-success: #0e3b23;
        --cds-notification-background-warning: #3a2d0d;
        --cds-notification-background-error: #2a1210;
        --cds-notification-background-info: #0f1c3d;
        --anviq-accent: #e7b563;
        --anviq-tint: #132b21;
    }
}

/* Same declarations as the media block above - an explicit choice of dark
   must win even when the OS says light. Keep the two in sync. */
:root[data-theme="dark"] {
    --cds-background: #0b1712;
    --cds-text-primary: #eaf3ee;
    --cds-text-secondary: #9dbfae;
    --cds-link-primary: #3e8867;
    --cds-button-primary: #3e8867;
    --cds-button-primary-hover: #eaf3ee;
    --cds-border-subtle: #254b3a;
    --cds-layer-01: #10231b;
    --cds-layer-02: #132b21;
    --cds-focus: #e7b563;
    --cds-icon-primary: #3e8867;
    --cds-icon-secondary: #9dbfae;
    --cds-border-interactive: #e7b563;
    --cds-interactive: #3e8867;
    --cds-field: #10231b;
    --cds-field-01: #10231b;
    --cds-field-02: #132b21;
    --cds-layer: #10231b;
    --cds-border-strong: #6f6f6f;
    --cds-border-strong-01: #6f6f6f;
    --cds-icon-interactive: #3e8867;
    --cds-text-placeholder: #9dbfae;
    --cds-text-helper: #9dbfae;
    --cds-support-error: #ff8389;
    --cds-support-success: #42be65;
    --cds-support-warning: #f1c21b;
    --cds-support-info: #4589ff;
    --cds-notification-background-success: #0e3b23;
    --cds-notification-background-warning: #3a2d0d;
    --cds-notification-background-error: #2a1210;
    --anviq-accent: #e7b563;
    --anviq-tint: #132b21;
}
```

What each token is for:

| Token | Light | Dark | Use for |
|---|---|---|---|
| `--cds-background` | `#ffffff` | `#0b1712` | page background |
| `--cds-layer-01` | `#f3f4f3` | `#10231b` | card / tile surface |
| `--cds-layer-02` | `#eaf3ee` | `#132b21` | soft green section surface |
| `--anviq-tint` | `#eaf3ee` | `#132b21` | alias of `layer-02` within each theme |
| `--cds-text-primary` | `#061b12` | `#eaf3ee` | body and heading text |
| `--cds-text-secondary` | `#5b6f65` | `#9dbfae` | secondary, helper, caption text |
| `--cds-button-primary` | `#1b4332` | `#3e8867` | brand green - primary fills |
| `--cds-button-primary-hover` | `#061b12` | `#eaf3ee` | hover of the above |
| `--cds-link-primary` | `#1b4332` | `#3e8867` | links |
| `--cds-interactive` | `#1b4332` | `#3e8867` | selected control fills |
| `--anviq-accent` | `#d8a657` | `#e7b563` | gold accent - highlight only |
| `--cds-focus` | `#d8a657` | `#e7b563` | focus ring |
| `--cds-border-interactive` | `#d8a657` | `#e7b563` | selected / active indicator |
| `--cds-border-subtle` | `#dcdfde` | `#254b3a` | dividers, outlines |
| `--cds-border-strong` | `#8d8d8d` | `#6f6f6f` | stronger outlines |
| `--cds-field` / `-01` | `#f3f4f3` | `#10231b` | input backgrounds |
| `--cds-field-02` | `#ffffff` | `#132b21` | input on a filled surface |
| `--cds-icon-primary` | `#1b4332` | `#3e8867` | icons |
| `--cds-icon-secondary` | `#5b6f65` | `#9dbfae` | muted icons |
| `--cds-text-placeholder` | `#5b6f65` | `#9dbfae` | input placeholder |
| `--cds-text-helper` | `#5b6f65` | `#9dbfae` | field helper text |
| `--cds-support-error` | `#da1e28` | `#ff8389` | error text and state |
| `--cds-support-success` | `#198038` | `#42be65` | success text and state |
| `--cds-support-warning` | `#f1c21b` | `#f1c21b` | warning - the only token identical in both themes |
| `--cds-support-info` | `#0043ce` | `#4589ff` | info state |
| `--anviq-text-on-brand` | `#ffffff` | `#ffffff` | text on a green fill (avatar, badge) |
| `--anviq-text-on-accent` | `#3a2a05` | `#3a2a05` | text on a gold fill (badge) |

`--cds-focus` and `--cds-border-interactive` are two different tokens that
happen to share a value. Keep using the one that matches the job; do not
collapse them.

Need a color with no token? Add it to bare `:root` **and** to both dark
blocks. Check the table first - inventing a duplicate of a token that
already exists is the exact failure rule 2 exists to prevent.

## 4. Type scale

Three typefaces, and only three:

- **Vend Sans** - everything. Stack: `"Vend Sans", system-ui, sans-serif`.
- **JetBrains Mono** - code and tabular numbers only. Stack:
  `"JetBrains Mono", monospace`.
- **Oldenburg** - the Display style only. Stack: `"Oldenburg", cursive`.

| Style | Size / weight | Use for | Not for |
|---|---|---|---|
| Display | Oldenburg 64px / 400 | one hero moment per app, marketing or landing hero | product UI, anything repeated on a page |
| Heading 07 | 54px / 300 | hero-scale heading where Oldenburg does not fit | body copy, anything inside a card |
| Heading 06 | 42px / 300 | the page `h1` | anything below the page's own top heading |
| Heading 05 | 32px / 400 | a number that reads at a glance - KPI values | running text, labels |
| Heading 04 | 28px / 400 | a prominent number inside a card or tile | page or section titles |
| Heading 03 | 20px / 400 | heading inside a component or card | page titles, body copy |
| Heading 02 | 16px / 600 | sub-heading in a section - Body 02 size but bold | page-level `h1`, body copy |
| Heading 01 | 14px / 600 | short label needing more weight than Body 01 | multi-line headings, page titles |
| Body 02 | 16px / 400 | running prose, page ledes, paragraphs | dense UI copy, tight cards |
| Body 01 | 14px / 400 | compact copy, bullet lists, reference notes | long-form paragraphs |
| Code 02 | 14px / 400 mono | multi-line code samples, tabular numbers | prose, short inline values |
| Code 01 | 12px / 400 mono | inline code, short values | multi-line samples |
| Label 01 | 12px / 400 | field labels, uppercase eyebrow text | body copy |

There is no 11px, no 18px, and no size between the rows above. There is no
Helper or Legal style: field helper and validation text come from Carbon's
own `helper-text` and `invalid-text` attributes, which Carbon sizes itself -
never author a size for them.

Note 28px and 36px are legal type sizes but illegal spacing values. The two
scales are separate; do not snap one to the other.

## 5. Spacing scale

Only these values, for every margin, padding, and gap:

```
2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160
```

Snap to the nearest value; on a tie round down.

These are layout dimensions, not spacing, and stay off the scale: side-nav
width 256px, header height 48px, content max-widths 720px and 760px,
breakpoints 1056px and 760px, border width 1px, corner radius 4px.
Everything else is spacing.

## 6. Dark mode

Three coordinated blocks, in this order:

1. bare `:root` - the light palette. Every token gets its only unconditional
   definition here.
2. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }`
   - follows the OS, unless the user explicitly chose light.
3. `:root[data-theme="dark"] { ... }` - an explicit choice of dark wins even
   when the OS says light.

Blocks 2 and 3 carry identical declarations. Both are required: with only
one, the theme is wrong for any user whose explicit choice differs from
their OS setting - which ships, because it looks correct on the machine it
was built on.

Never give a color its only definition inside a media query or a
`[data-theme]` block.

A manual toggle sets `data-theme` on `<html>` and persists it. Wrap storage
access in try/catch - it throws when site data is blocked, and an
unguarded throw kills every later script in the same block:

```js
try { localStorage.setItem("anviq-theme", next); } catch (e) {}
```

Apply the saved theme in `<head>`, before the stylesheet. Read it at the end
of `<body>` and the browser paints the OS theme first, then flips - a visible
flash for every user whose saved choice differs from their OS:

```html
<head>
    <script>
        try {
            var t = localStorage.getItem("anviq-theme");
            if (t) document.documentElement.setAttribute("data-theme", t);
        } catch (e) {}
    </script>
    <!-- stylesheet comes after -->
</head>
```

## 7. Components

Two traps. First, **the CDN filename is not the tag name.** Second, several
components need mandatory child tags you cannot guess.

| Script file | Tags it defines |
|---|---|
| `ui-shell.min.js` | `cds-header`, `cds-header-name`, `cds-header-menu-button`, `cds-side-nav`, `cds-side-nav-items`, `cds-side-nav-link`, `cds-side-nav-menu`, `cds-side-nav-menu-item` |
| `button.min.js` | `cds-button` |
| `text-input.min.js` | `cds-text-input` |
| `textarea.min.js` | `cds-textarea` |
| `select.min.js` | `cds-select`, `cds-select-item`, `cds-select-item-group` |
| `checkbox.min.js` | `cds-checkbox` |
| `radio-button.min.js` | `cds-radio-button-group`, `cds-radio-button` |
| `toggle.min.js` | `cds-toggle` |
| `notification.min.js` | `cds-inline-notification`, `cds-toast-notification` |
| `modal.min.js` | `cds-modal`, `cds-modal-header`, `cds-modal-heading`, `cds-modal-close-button`, `cds-modal-body`, `cds-modal-footer`, `cds-modal-footer-button` |
| `data-table.min.js` | `cds-table`, `cds-table-head`, `cds-table-header-row`, `cds-table-header-cell`, `cds-table-body`, `cds-table-row`, `cds-table-cell` |
| `tabs.min.js` | `cds-tabs`, `cds-tab` |
| `tile.min.js` | `cds-tile` |
| `tag.min.js` | `cds-tag` |
| `tooltip.min.js` | `cds-tooltip` |
| `code-snippet.min.js` | `cds-code-snippet` |

Note `data-table.min.js` gives `cds-table` (not `table.min.js`), and
`notification.min.js` gives both notification tags. Requesting a filename
that matches the tag name returns a 404 and the page renders blank.

Common attributes:

- `<cds-button kind="primary|secondary|danger|ghost">`
- `<cds-inline-notification kind="success|warning|error">`
- `<cds-text-input label-text="..." helper-text="..." invalid invalid-text="...">`

Forms: use Carbon's `label-text`, `helper-text`, `invalid`, and
`invalid-text` attributes. Never hand-roll a label or an error message
under a Carbon input - that is rule 1's failure mode.

Slot names are not guessable either, and getting one wrong fails silently.
`cds-tooltip` has exactly two slots: the **default** slot for the trigger,
and `content`. There is no `trigger` slot - `slot="trigger"` renders the
trigger at zero size with no error at all. The content must be a
`cds-tooltip-content` element; a plain `<span slot="content">` makes Carbon
throw on every render.

```html
<cds-tooltip>
    <cds-button kind="ghost">Hover me</cds-button>
    <cds-tooltip-content>Explains the control</cds-tooltip-content>
</cds-tooltip>
```

When a component does not render and the console is clean, inspect the
shadow root's real slots rather than guessing:

```js
[...el.shadowRoot.querySelectorAll("slot")].map(function (s) {
    return s.name || "(default)";
});
```

More quirks worth knowing:

- `cds-side-nav-menu`: clear its active state with the JS **property**
  (`menu.active = false`). `removeAttribute("active")` leaves Carbon's
  internal state set, so the group stays lit.
- Do **not** put `is-not-child-of-header` on a `cds-side-nav` that sits
  beside `cds-header`. It repositions the nav over the header and hides the
  header's own content.
- `cds-tabs` does not connect panels that live outside it. `aria-controls`
  cannot cross a shadow boundary, so a `target` attribute pointing at an
  outer id does nothing. Put `role="tabpanel"`, `aria-labelledby`, and
  `tabindex="0"` on your panels yourself, and switch them from the tab
  event. Without it a screen reader gets tabs and unassociated content.
- `cds-select` already renders `label-text`. Adding a
  `cds-select-item-group label="..."` with the same words renders the label
  twice. Group items only when the group name differs from the field name.

Custom elements upgrade asynchronously. `type="module"` scripts are
deferred, so inline script at the end of `<body>` runs *before* Carbon is
defined. Either wait for upgrade, or set attributes rather than properties -
but note the `cds-side-nav-menu` exception above, where only the property
works, so waiting is the reliable option:

```js
await customElements.whenDefined("cds-side-nav");
```

Setting a property before upgrade creates an own property that shadows
Carbon's accessor, and newer Lit versions do not recover from it.

Grid: use plain CSS grid and flexbox. Do not use Carbon's `cds-grid` /
`cds-column`. Breakpoints are 1056px and 760px.

Motion: use Carbon's own duration and easing tokens
(`--cds-duration-fast-01`, `moderate-01`, `slow-01`, and so on). Never an
ad-hoc `transition: 0.3s ease`.

## 8. Page shell

Reuse this shell for a new page instead of inventing one. If the repo does
not have these classes yet, copy them in:

```css
.page        { border-bottom: 1px solid var(--cds-border-subtle); }
.page-hero   { padding: 48px 48px 32px; max-width: 760px; }
.page-hero h1 { font-size: 42px; font-weight: 300;
                letter-spacing: -0.02em; margin: 0 0 16px; }
.lede        { color: var(--cds-text-secondary); font-size: 16px;
               line-height: 1.5; margin: 0 0 8px; }
.page-body   { background: var(--cds-layer-02); padding: 40px 48px 48px; }
.page-body h2 { font-size: 12px; font-weight: 400; letter-spacing: 0.32px;
                text-transform: uppercase;
                color: var(--cds-text-secondary); margin: 0 0 16px; }
.page-body > p { max-width: 720px; line-height: 1.6; }
```

`.page-body h2` is an uppercase 12px eyebrow label, not a visual heading -
that is intentional.

If a page uses the Display style on an `h1` inside `.page-hero`, the
`.page-hero h1` rule above wins on specificity. Qualify it:
`.page-hero h1.display-title { font-size: 64px; font-weight: 400; }`

## 9. Header and side nav

The side nav is a **sibling** of `<header>`, not a child of it:

```html
<header>
    <cds-header aria-label="AnvIQ">
        <cds-header-menu-button
            button-label-active="Close menu"
            button-label-inactive="Open menu"></cds-header-menu-button>
        <cds-header-name href="/" prefix="AnvIQ">Product</cds-header-name>
        <div class="header-actions"><!-- account, theme, etc --></div>
    </cds-header>
</header>

<cds-side-nav
    id="side-nav"
    aria-label="Side navigation"
    collapse-mode="responsive"
    is-not-persistent
>
    <cds-side-nav-items>
        <cds-side-nav-link href="/overview">Overview</cds-side-nav-link>
        <cds-side-nav-menu title="Settings">
            <cds-side-nav-menu-item href="/settings/team"
                >Team</cds-side-nav-menu-item
            >
        </cds-side-nav-menu>
    </cds-side-nav-items>
</cds-side-nav>
```

- The header is fixed at 48px tall, so the content area needs
  `padding-top: 48px`. At 1056px and up the docked nav is 256px wide, so
  content needs `margin-left: 256px`. Both are layout dimensions, not
  spacing (section 5).
- **The active item comes from the current route.** Set `active` on the
  matching `cds-side-nav-link` or `cds-side-nav-menu-item`, then set the
  parent `cds-side-nav-menu`'s `active` **property** so the group lights up
  (see the quirk in section 7). Never derive the active item from scroll
  position in a routed app.
- The gold indicator bar is automatic. Carbon paints it from
  `--cds-border-interactive`; there is no CSS to write for it, and no custom
  hover or selected styling either. If the nav looks wrong, the token is
  wrong, not the nav.
- Wire the hamburger yourself. `cds-header-menu-button` does not find the
  side nav on its own, so below 1056px the nav is otherwise unreachable:

```js
btn.addEventListener("click", function () {
    nav.expanded = !nav.expanded;
});
```

- Carbon ships its styles inside shadow roots, so `cds--*` class names in
  your own markup (`cds--header__global` and friends) do nothing unless the
  separate `@carbon/styles` bundle is loaded. To push header actions to the
  right, use your own class with `margin-left: auto`.

## 10. Icons

One icon pack: **`@carbon/icons`** (Apache-2.0, about 2,620 icons). Never mix
in a second pack, and never use an emoji as a UI icon.

Sizes are 16, 20, 24, and 32. Use 16 or 20 in product UI - they are drawn to
sit with 14px and 16px text. Use 24 or 32 only when an icon is deliberately
large. Keep one size per context; do not mix sizes in the same row of
controls.

Only the 32px set is complete. The smaller folders are sparse (68 icons at
16, 9 at 20, 8 at 24) because a size-specific artboard exists only where the
drawing needed hand-tuning. Everything else scales from the 32px master, so
`svg/32/<name>.svg` is the reliable path and `svg/16/add.svg` is a 404.

Carbon's component CDN does **not** serve icons - only components. There is
no icon script tag. In a no-build repo, download the few icons the page needs
and inline them as SVG, which also keeps the page self-contained:

```html
<svg viewBox="0 0 32 32" fill="currentColor" width="20" height="20"
     aria-hidden="true">
    <!-- path data from @carbon/icons svg/32/<name>.svg -->
</svg>
```

Set `fill="currentColor"` and colour the icon by setting `color` on the
element or its parent, from `--cds-icon-primary`, `--cds-icon-secondary`, or
`--cds-icon-interactive`. Never hardcode an icon fill. Carbon's own icons
carry no `fill` attribute, so `currentColor` works with no edits to the path
data. With a bundler, `npm i @carbon/icons` (or `@carbon/icons-react`) and
import by name instead.

Rules:

- Icons are solid and monochromatic, and must clear **4.5:1** contrast on
  their surface, in both themes - the same bar as text.
- An interactive icon needs a touch target of **44px or larger**. Pad the
  button; do not enlarge the icon to get there. A 20px icon centred in a
  48px button is the standard pairing.
- Decorative icons get `aria-hidden="true"`. An icon that carries meaning
  needs an accessible name, and an icon-only button always needs
  `aria-label`.
- Never let an icon be the only signal for state - pair it with text or a
  label (see section 12).
- Two-tone icons expose an inner path at
  `[data-icon-path="inner-path"]`; set its fill separately and give it
  `opacity: 1` to show it.
- Showing and hiding an inline icon: use
  `svg.toggleAttribute("hidden", bool)`, never `svg.hidden = bool`.
  `hidden` is an `HTMLElement` property and `SVGElement` does not have it,
  so the assignment silently creates a dead expando and the icon never
  changes.

## 11. Logo

Two files, one rule: match the logo's contrast to the surface behind it.
`anviq-logo.svg` on light surfaces, `anviq-logo-white.svg` on dark. Render
at 160px wide. Always give a real `alt` describing which variant it is.
Copy both SVGs into the target repo; never recolor them inline.

## 12. Accessibility

- Body text clears 4.5:1 on its surface, in both themes.
- Gold is never text, and never the only signal. Pair a gold focus ring
  with a visible outline of at least 2px.
- Never signal state by color alone - add an icon, glyph direction, or text.
- One `h1` per document. Do not skip heading levels.
- Every input has a real label. A placeholder is not a label.
- Icon-only buttons need `aria-label`; a toggle needs `aria-pressed`, and
  its label should name the action it will perform.
- Decorative SVG gets `aria-hidden="true"`. Meaningful SVG gets
  `role="img"` and an `aria-label`.
- Data tables: put `scope="col"` on every `<th>` and give the table a
  `<caption>` (visually hidden if it should not show). Without scope, a
  multi-column table cannot be navigated cell by cell.
- Keep a visible focus ring. Do not set `outline: none` without a
  replacement.

## 13. Critique checklist

Run all of these before calling any UI done.

- Any hex, named color, or `rgb()` in authored CSS outside the `:root`
  blocks? Replace with a token, or add a token to all three blocks.
- Every new token defined in bare `:root` *and* both dark blocks?
- Any font-size that is not a row in section 4? Replace with the row that
  matches the content's role, not merely the nearest size.
- Any margin, padding, or gap off the section 5 scale?
- Any hand-rolled markup mimicking a Carbon component from section 7?
- Any Carbon composite missing its mandatory child tags?
- Gold used as a fill, as text, or as the only signal?
- Any JS setting a property on a `cds-*` element before upgrade?
- Set `data-theme="dark"` on `<html>` and re-read every color authored:
  does each token have a dark value?
- Every input labelled, every icon-only control named, heading levels
  unbroken, focus ring visible?
- Any storage access outside a try/catch?

## 14. Polish pass

Once the checklist is clean: group related content tightly and separate
distinct groups generously, check the layout at 760px and 1056px, remove
CSS and markup the change orphaned, and confirm no rule was added that
duplicates one already present.

Polish preserves the existing visual world. It does not redesign it. If the
concept itself is wrong, say so rather than quietly replacing it.
