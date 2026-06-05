# Dark Liquid-Glass Design System

A reusable, product-agnostic design system for dark, depth-driven web apps.
Built around a near-black canvas, frosted translucent ("liquid glass") surfaces,
a single themeable accent ramp, and spring-overshoot motion.

Everything here is tokenized so a new project can adopt it by overriding a
handful of CSS variables — no component rewrites required.

---

## 1. Design Principles

1. **Dark-first.** The canvas is near-black (`#030712`), not gray. Depth comes
   from translucency and blur, not from borders or heavy shadows.
2. **Liquid glass.** Surfaces are semi-transparent, backdrop-blurred panels that
   let an ambient background glow bleed through. Frosting > flat fills.
3. **One accent, many tints.** A single accent hue (emerald → teal) carries the
   whole identity through a 50–900 ramp. Avoid contrasting hues; same-family
   colors blend into the dark background.
4. **Motion is springy, not linear.** Interactions ease with a subtle overshoot
   (`cubic-bezier(0.34, 1.56, 0.64, 1)`) so the UI feels physical and "liquid."
5. **Themeable by indirection.** Every accent reads from a `--theme-*` variable
   with a hardcoded fallback. Re-skin the whole app from one `:root` block.
6. **Mobile-first & safe.** Layouts start single/two-column and scale up; touch
   targets are ≥44px; safe-area insets are respected on notched devices.

---

## 2. Color

### 2.1 Canvas & surfaces

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg-primary` | `#030712` | App background (near-black) |
| `--color-bg-secondary` | `#111827` | Raised background |
| `--color-bg-tertiary` | `#1f2937` | Highest background |
| `--color-card-bg` | `rgba(17, 24, 39, 0.8)` | Opaque card fallback |

### 2.2 Glass (the core surface treatment)

| Token | Value |
|-------|-------|
| `--glass-bg` | `rgba(255, 255, 255, 0.07)` |
| `--glass-border` | `rgba(255, 255, 255, 0.14)` |
| `--glass-shadow` | `0 8px 32px rgba(0, 0, 0, 0.3)` |
| `--glass-blur` | `blur(16px)` |

### 2.3 Text

| Token | Value | Use |
|-------|-------|-----|
| `--color-text-primary` | `#f8fafc` | Headings, key values |
| `--color-text-secondary` | `#cbd5e1` | Body copy |
| `--color-text-tertiary` | `#94a3b8` | Captions, labels, muted |

### 2.4 Accent ramp (themeable)

The primary accent is an **emerald → teal** family. Defined twice: as a Tailwind
ramp and as themeable CSS vars. Swap the hue by overriding `--theme-primary*`.

| Step | Primary (emerald) | Accent (teal) |
|------|-------------------|---------------|
| 50  | `#ecfdf5` | `#f0fdfa` |
| 100 | `#d1fae5` | `#ccfbf1` |
| 200 | `#a7f3d0` | `#99f6e4` |
| 300 | `#6ee7b7` | `#5eead4` |
| 400 | `#34d399` | `#2dd4bf` |
| 500 | `#10b981` | `#14b8a6` |
| 600 | `#059669` | `#0d9488` |
| 700 | `#047857` | `#0f766e` |
| 800 | `#065f46` | `#115e59` |
| 900 | `#064e3b` | `#134e4a` |

Themeable aliases:

```css
--color-primary:       var(--theme-primary, #34d399);
--color-primary-dark:  var(--theme-primary-dark, #059669);
--color-primary-light: var(--theme-primary-light, #6ee7b7);
--color-secondary:     var(--theme-secondary, #38bdf8);  /* sky/teal */
```

> **Theming:** define `--theme-primary`, `--theme-primary-rgb`,
> `--theme-secondary`, etc. on `:root` to re-skin the entire UI. The `*-rgb`
> form (`52, 211, 153`) is required for `rgba()` glow math.

### 2.5 Semantic status

| Token | Value | Meaning |
|-------|-------|---------|
| `--color-success` | `#10b981` | Success / verified / high quality |
| `--color-warning` | `#f59e0b` | Warning / partial / caution |
| `--color-error` | `#ef4444` | Error / danger |
| `--color-alert` | `#f87171` | Soft alert |
| `--color-info` | `var(--color-primary)` | Informational |

A neutral gray (`#6b7280`) rounds out a 3-step quality scale
(success → warning → neutral) for any "confidence / quality" badges.

### 2.6 Borders & dividers

| Token | Value |
|-------|-------|
| `--color-border` | `rgba(255, 255, 255, 0.1)` |
| `--color-divider` | `rgba(255, 255, 255, 0.06)` |
| `--color-card-border` | `rgba(255, 255, 255, 0.08)` |

---

## 3. Typography

### 3.1 Families

| Role | Stack | Source |
|------|-------|--------|
| Display / Titles | `'Bricolage Grotesque', 'General Sans', system-ui, sans-serif` | Google Fonts (variable `opsz,wght@12..48,400..800`) |
| Body / UI | `'General Sans', system-ui, -apple-system, sans-serif` | Fontshare CDN (weights 200–700) |
| Card titles | `'General Sans', system-ui, sans-serif` | — |
| Mono / code / data | `'JetBrains Mono', monospace` | Google Fonts |

Load via `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Bricolage+Grotesque:opsz,wght@12..48,400..800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap" rel="stylesheet">
```

### 3.2 Type scale (size / line-height)

| Token | Size | Line height |
|-------|------|-------------|
| xs | 0.75rem | 1.5 |
| sm | 0.875rem | 1.5 |
| base | 1rem | 1.6 |
| lg | 1.125rem | 1.5 |
| xl | 1.25rem | 1.4 |
| 2xl | 1.5rem | 1.3 |
| 3xl | 2rem | 1.2 |
| 4xl | 2.5rem | 1.1 |
| 5xl | 3rem | 1.1 |
| 6xl | 3.75rem | 1 |
| 7xl | 4.5rem | 1 |
| 8xl | 6rem | 1 |

Body default: `font-size: base; font-weight: 400; line-height: relaxed (1.6)`.
Display sizes tighten line-height as they grow — large headings sit at ~1.0–1.2.

### 3.3 Typographic component classes

Reusable text treatments (Tailwind `@layer components`):

| Class | Recipe |
|-------|--------|
| `.typo-label` | `text-xs font-semibold uppercase tracking-wider` + tertiary color |
| `.typo-badge` | `text-xs font-medium leading-none` |
| `.typo-body` | `text-sm sm:text-base leading-relaxed` + secondary color |
| `.typo-caption` | `text-xs sm:text-sm` + tertiary color |
| `.typo-card-heading` | `text-base sm:text-lg font-medium` + light color |
| `.typo-h3` | `text-lg sm:text-xl font-semibold` |
| `.typo-h4` | `text-base font-semibold` |
| `.typo-metric` | `text-2xl sm:text-3xl font-bold tabular-nums` (numeric KPIs) |
| `.typo-mono` | `font-mono text-xs` + tertiary color |

> Use `tabular-nums` on any changing numeric value so digits don't jitter.

---

## 4. Spacing, Radius, Shadow

### 4.1 Spacing scale

`--spacing-1`…`--spacing-20` → `0.25 · 0.5 · 0.75 · 1 · 1.25 · 1.5 · 2 · 2.5 · 3 · 4 · 5 rem`.

Card padding convention (mobile→desktop): `p-3 sm:p-4 lg:p-6`.

### 4.2 Radius scale

| Token | Value |
|-------|-------|
| `--radius-sm` | 0.5rem |
| `--radius-md` | 0.75rem |
| `--radius-lg` | 1rem |
| `--radius-xl` | 1.25rem |
| `--radius-2xl` | 1.5rem |
| `--radius-full` | 9999px |

Cards use `--radius-2xl`; inputs/buttons use `--radius-lg`; pills use `--radius-full`.

### 4.3 Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` |
| `--shadow-xl` | `0 20px 40px rgba(0,0,0,0.6)` |
| `--shadow-glow` | `0 0 30px rgba(<accent-rgb>, 0.3)` |
| `--shadow-interactive` | `0 0 20px rgba(<accent-rgb>, 0.4)` |

Tailwind equivalents: `glow: 0 0 20px rgba(<accent>,0.3)`, `glow-lg: 0 0 40px rgba(<accent>,0.2)`.

---

## 5. Motion

Motion has two engines, and the first rule is knowing which to reach for:

| Engine | Use it for | Examples |
|--------|-----------|----------|
| **Motion** (`motion` pkg, ex-Framer Motion) | Orchestrated **enter/exit**, layout shifts, interactive state, anything that needs `AnimatePresence` | List reveals, modals, toasts, accordions, drag/hover |
| **CSS keyframes / transitions** | **Always-on, looping, ambient** motion that has no enter/exit lifecycle | Ambient background drift, pulse loops, shimmer, glow sweep |

> Rule of thumb: if it appears, moves, and disappears → **Motion variants**. If it
> just *loops* in place → **CSS**. Don't drive infinite loops through Motion (extra
> JS overhead) and don't try to coordinate exit animations through CSS.

### 5.1 Transition tokens

| Token | Value | Use |
|-------|-------|-----|
| `--transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` | Color / opacity, dropdowns |
| `--transition-base` | `250ms cubic-bezier(0.4, 0, 0.2, 1)` | Most state changes |
| `--transition-slow` | `350ms cubic-bezier(0.4, 0, 0.2, 1)` | Larger reveals |
| `--transition-spring` | `500ms cubic-bezier(0.34, 1.56, 0.64, 1)` | **Signature** — buttons, card entry, hovers |

> The **spring** curve overshoots (peaks above 1.0). It's the defining feel of
> the system — apply it to transforms (scale/translate) on interactive elements.
> In Motion, express the same feel with `{ type: 'spring', damping: 25, stiffness: 300 }`.

### 5.2 The variant library (Motion)

Ship a single `motionVariants.ts` module and import named variants everywhere —
never hand-write inline `animate={{...}}` objects per component. This keeps motion
consistent and makes the perf gating (§5.4) a one-line swap. Each variant defines
`hidden` / `visible` / `exit` so it drops straight into `AnimatePresence`.

| Variant | Motion | Built for |
|---------|--------|-----------|
| `fadeIn` | opacity 0→1 (0.3s) | Backdrops, simple reveals, image loads |
| `slideUp` | y:16→0 + fade (0.4s easeOut) | Section headers, single cards entering on scroll |
| `scaleIn` | scale:0.95→1 + fade (spring) | Popovers, badges, things that "pop" into place |
| `staggerContainer` | `staggerChildren: 0.06`, `delayChildren: 0.05` | **Parent** of any list/grid — orchestrates children |
| `staggerItem` | y:12→0, scale:0.97→1 + fade (spring) | **Child** rows/cards inside a `staggerContainer` |
| `modalOverlay` | opacity 0→1 (0.2s) | Dialog scrim / backdrop |
| `modalContent` | y:24→0, scale:0.97→1 (spring, damping 28) | Dialog panel — heavier spring than items |
| `toastVariants` | y:-20→0 in (spring), x:50 out | Transient notifications; exits sideways |
| `dropdownVariants` | y:-8→0, scale:0.96→1 (0.15s, **no spring**) | Menus/selects — fast & crisp, not bouncy |
| `expandCollapse` | `height: 0 ↔ auto` (spring) + opacity | Accordions, "show more", filter drawers |

> **When to suppress the overshoot:** dropdowns and menus use a *linear* ease
> (`[0.4,0,0.2,1]`), not the spring. Small, frequently-triggered surfaces feel
> sloppy when they bounce — reserve spring for hero/primary interactions.

### 5.3 Interaction → variant (decision table)

| You're animating… | Use |
|-------------------|-----|
| A list or grid of cards appearing | `staggerContainer` on wrapper + `staggerItem` per child |
| A single card / panel entering | `slideUp` (on scroll) or `scaleIn` (in place) |
| A modal / dialog | `modalOverlay` on scrim + `modalContent` on panel, wrapped in `AnimatePresence` |
| A toast / snackbar | `toastVariants` |
| A dropdown / select / context menu | `dropdownVariants` |
| An accordion / collapsible section | `expandCollapse` |
| A backdrop, skeleton, or fade | `fadeIn` |
| Button press / hover | CSS `--transition-spring` on `transform` (`scale(0.95)` active) |
| Numeric KPI counting up | Animated count component (interpolate value), not a CSS transition |
| Ambient background, shimmer, pulse | **CSS keyframes** (§5.5), not Motion |

### 5.4 Performance & reduced-motion gating (required)

Motion is **conditional**, never assumed. Two signals gate every animation:

1. **`prefers-reduced-motion: reduce`** — an OS accessibility setting. Honor it.
2. **Device perf tier** (`high` / `medium` / `low`) — scored from GPU renderer
   string, RAM, and CPU. Weak/integrated GPUs and low-RAM devices fall to `low`.

Collapse both into one hook and one fallback:

```ts
/** true only when motion is safe: not reduced-motion AND not a low-perf device. */
export function useMotionSafe(): boolean { /* watches the media query + perf tier */ }

const instant = { duration: 0 }; // swap any transition for this when unsafe
```

Gating rules:

- **Functional variants** (modal, toast, dropdown, stagger) still *render* when
  unsafe — they just use `instant`, so the UI snaps instead of animating. Nothing
  becomes unreachable.
- **Decorative / WebGL effects** (particles, fluid-glass ripple, animated hero
  backgrounds, cursor glow) are **`high`-tier only** and are not rendered at all
  on `medium`/`low`. The CSS-degradation approach: set a `perf-low` / `perf-medium`
  class on `<html>` so effects can also down-shift in pure CSS (reduced blur,
  fewer particles, solid backgrounds).
- Infinite/looping CSS animations should be disabled under `perf-low` and under
  `@media (prefers-reduced-motion: reduce)`.

### 5.5 CSS keyframe library (always-on motion)

For looping/ambient motion only — paired with the rules above.

| Animation | Definition |
|-----------|-----------|
| `fade-in` | opacity 0→1, 0.3s ease-in-out (non-JS fallback) |
| `slide-up` | translateY(10px)→0 + fade, 0.4s ease-out |
| `scale-in` | scale(0.95)→1 + fade, 0.3s ease-out |
| `card-entry` | translateY(8px) scale(0.97)→0/1 + fade, 0.4s spring |
| `pulse-slow` | 3s pulse loop (status dots, "live" indicators) |
| `shimmer` | gradient sweep loop (skeleton loaders, shiny text) |
| `ambient-drift` | 25–30s ease-in-out infinite alternate (background glows, §6) |

---

## 6. Ambient Background

Two depth layers create the "alive" dark canvas. Keep glows **ultra-subtle**
(opacity ≤ 0.08) and **same-family** so they melt into the background.

**Layer A — fixed multi-stop radial wash** (behind everything, `z-index: 0`):

```css
.app-bg::before {
  content: '';
  position: fixed; inset: -50%;
  pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(<accent-rgb>, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(<secondary-rgb>, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(<secondary-light-rgb>, 0.04) 0%, transparent 50%);
}
```

**Layer B — slow drifting glows** (`ambient-glow-*`): two radial ellipses at
opposite corners, each drifting on a 25–30s `ease-in-out infinite alternate`
loop with ≤3% translate and ~1.02 scale. Subliminal, never distracting.

---

## 7. Components

### 7.0 Component taxonomy — what to use when

Build the library in five buckets. Reach for the lightest bucket that does the
job; decorative and background effects are opt-in and perf-gated (§5.4).

| Bucket | Components (types) | Role | Reach for it when |
|--------|--------------------|------|-------------------|
| **Primitives** | Button, Badge/Pill, Card/Surface, Input, Autocomplete, Segmented control, Tabs | The structural vocabulary every screen is built from | Always — these are the defaults |
| **Feedback** | Toast, Skeleton, Spinner, Loading overlay, Empty state, Inline error | Communicate system status: pending, empty, failed, done | Any async boundary: fetch → loading → data → error/empty |
| **Overlays** | Modal/Dialog, Dropdown/Select, Popover, Tooltip, Drawer | Transient layers above the page, dismissible, focus-trapped | Content that interrupts or branches the main flow |
| **Data display** | Animated metric (count-up), Legend, Stat card, Progress, Chart frame | Present values clearly; emphasize change | Showing numbers, status scales, or quantitative results |
| **Decorative / effects** | Gradient text, Shiny/blur text reveal, Cursor glow, Click spark, Particles, Fluid-glass ripple, Animated/WebGL hero background | Personality and depth — never function | Hero / landing / marketing surfaces, **high-perf only** |

> **Decision order:** can a *primitive* do it? → does it need a *feedback* or
> *overlay* state? → only then consider a *decorative* layer. Decorative effects
> never gate access to content and are rendered only on `high` perf tier.

**Feedback contract (every async view):** model the four states explicitly —
`loading` (Skeleton/Spinner) → `data` → `empty` (Empty state) → `error` (inline
fallback). Never show a blank region while pending; never let an error render as
emptiness.

**Decorative effects — treat as a category, not a grab-bag.** Text effects
(gradient fill, shimmer sweep, per-word blur-in reveal) animate copy on a hero;
pointer effects (cursor glow, click spark) respond to input; ambient effects
(particles, fluid-glass ripple, WebGL background) sit *behind* content at low
opacity. All share three rules: behind content (`z-index` below interactive
layers), `pointer-events: none` unless interactive by design, and gated to
`high` perf tier with a static fallback.

### 7.1 Glass card (the primary surface)

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  transition: all var(--transition-base);
}
.glass-card:hover {
  box-shadow: var(--shadow-lg),
              inset 0 1px 0 rgba(<accent-rgb>, 0.05),
              0 0 20px rgba(<accent-rgb>, 0.06);
}
```

- Always pair `backdrop-filter` with the `-webkit-` prefix (Safari).
- The `inset 0 1px 0` top highlight simulates a lit glass edge — keep it.

### 7.2 Animated glow border (premium accent)

For "featured" cards, draw a rotating conic-gradient outline using an animated
custom property (`@property --border-angle`) so the glow sweeps the edge.
Run it slowly (long duration) to minimize repaint cost.

```css
@property --border-angle {
  syntax: '<angle>'; initial-value: 0deg; inherits: false;
}
/* mask a conic-gradient(from var(--border-angle), ...) to the 1px border ring */
```

### 7.3 Buttons

**Primary** — gradient fill + accent glow, springy press:

```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 14px rgba(<accent-rgb>, 0.4);
  transition: transform var(--transition-spring);
}
.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(<accent-rgb>, 0.5), 0 0 40px rgba(<accent-rgb>, 0.15);
}
.btn-primary:active { transform: scale(0.95); }
```

**Glass / secondary** — `--glass-bg` + `--glass-border` + `--glass-blur`, same
radius and spring press.

### 7.4 Segmented control (mode switcher)

A glass track with a sliding "liquid" indicator behind the active option:

- Track: `rgba(255,255,255,0.04)`, `blur(12px)`, `1px` border, `--radius-xl`, `0.3rem` padding.
- Tabs: `flex: 1`, ≥44px tall, color-only transition; active tab is white.
- Indicator: absolutely-positioned glass pill that animates between tabs on the
  spring curve (animate position, not the tabs themselves).

### 7.5 Inputs

`--glass-bg` fill, `--glass-border`, `--radius-lg`, primary text color, focus
raises border to the accent and adds a soft accent glow ring.

### 7.6 Badges

`.typo-badge` text inside a pill (`--radius-full`) tinted with the relevant
semantic color at low alpha; uppercase + `tracking-wider` for labels.

---

## 8. Layout & Responsiveness

- **Breakpoints:** standard Tailwind + custom `xs: 475px`.
- **Mobile-first grids:** start `grid-cols-1` / `grid-cols-2`; add columns at
  `sm:` and up. Never ship a bare `grid-cols-3`.
- **Touch targets:** every interactive element ≥ **44px** on mobile.
- **Safe areas:** consume notch insets via
  `--safe-top/-bottom/-left/-right: env(safe-area-inset-*, 0px)`; apply to
  fixed headers and bottom navigation.
- **Overflow:** `overflow-x: hidden` on `body`; use `min-height: -webkit-fill-available`
  alongside `100vh` for correct mobile viewport height.

---

## 9. Iconography & Visuals

- **Icons:** `lucide-react` (consistent stroke icons). **Never emoji** in UI —
  rendering is inconsistent across platforms. Map icons via typed lookups
  (`Record<Key, ReactNode>`).
- **3D / WebGL (optional):** `three` + `@react-three/fiber` + `@react-three/drei`
  for hero scenes and ambient 3D. Keep it behind content and performance-budgeted.
- **Selection color:** tint `::selection` with the accent at 0.3 alpha.

---

## 10. Tech Stack (reference implementation)

| Concern | Choice |
|---------|--------|
| Styling | Tailwind CSS 3.4 (`darkMode: 'class'`) + CSS custom properties |
| Animation | Motion (`motion`) + CSS keyframes |
| 3D | three / @react-three/fiber / @react-three/drei |
| Icons | lucide-react |
| Class utils | clsx |
| Build | Vite |

---

## 11. Copy-Paste Starter

### `tailwind.config.js` (theme excerpt)

```js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50:'#ecfdf5',100:'#d1fae5',200:'#a7f3d0',300:'#6ee7b7',400:'#34d399',500:'#10b981',600:'#059669',700:'#047857',800:'#065f46',900:'#064e3b' },
        accent:  { 50:'#f0fdfa',100:'#ccfbf1',200:'#99f6e4',300:'#5eead4',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59',900:'#134e4a' },
      },
      fontFamily: {
        sans: ['General Sans','system-ui','sans-serif'],
        display: ['Bricolage Grotesque','General Sans','system-ui','sans-serif'],
        mono: ['JetBrains Mono','monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgb(var(--theme-primary-rgb,52 211 153) / 0.3)',
        'glow-lg': '0 0 40px rgb(var(--theme-primary-rgb,52 211 153) / 0.2)',
      },
      animation: {
        'fade-in':'fadeIn .3s ease-in-out',
        'slide-up':'slideUp .4s ease-out',
        'scale-in':'scaleIn .3s ease-out',
        'card-entry':'cardEntry .4s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      screens: { xs: '475px' },
    },
  },
}
```

### `:root` tokens (drop into global CSS)

```css
:root {
  /* Theme hooks — override these to re-skin */
  --theme-primary: #34d399;        --theme-primary-rgb: 52, 211, 153;
  --theme-primary-dark: #059669;   --theme-primary-light: #6ee7b7;
  --theme-secondary: #38bdf8;      --theme-secondary-rgb: 56, 189, 248;

  /* Backgrounds */
  --color-bg-primary: #030712; --color-bg-secondary: #111827; --color-bg-tertiary: #1f2937;
  /* Text */
  --color-text-primary: #f8fafc; --color-text-secondary: #cbd5e1; --color-text-tertiary: #94a3b8;
  /* Glass */
  --glass-bg: rgba(255,255,255,0.07); --glass-border: rgba(255,255,255,0.14);
  --glass-shadow: 0 8px 32px rgba(0,0,0,0.3); --glass-blur: blur(16px);
  /* Semantic */
  --color-success:#10b981; --color-warning:#f59e0b; --color-error:#ef4444; --color-alert:#f87171;
  /* Radius */
  --radius-sm:.5rem; --radius-md:.75rem; --radius-lg:1rem; --radius-xl:1.25rem; --radius-2xl:1.5rem; --radius-full:9999px;
  /* Transitions */
  --transition-fast:150ms cubic-bezier(0.4,0,0.2,1);
  --transition-base:250ms cubic-bezier(0.4,0,0.2,1);
  --transition-slow:350ms cubic-bezier(0.4,0,0.2,1);
  --transition-spring:500ms cubic-bezier(0.34,1.56,0.64,1);
  /* Safe areas */
  --safe-top: env(safe-area-inset-top,0px); --safe-bottom: env(safe-area-inset-bottom,0px);
}

body {
  margin: 0;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: 'General Sans', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  min-height: 100vh; min-height: -webkit-fill-available;
}
::selection { background: rgba(var(--theme-primary-rgb), 0.3); color: var(--color-text-primary); }
```

### `motionVariants.ts` (drop into any Motion project)

The whole §5.2 library + the perf/reduced-motion gate, ready to import.

```ts
import { type Variants } from 'motion/react';
import { useState, useEffect } from 'react';

/** true only when motion is safe: not reduced-motion AND not a low-perf device. */
export function useMotionSafe(): boolean {
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('perf-low');
  const [safe, setSafe] = useState(() => !reduced());
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setSafe(!reduced());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return safe;
}

/** Swap any variant's transition for this when motion is unsafe. */
export const instant = { duration: 0 };

const spring = { type: 'spring', damping: 25, stiffness: 300 } as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: spring },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
export const modalContent: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 28, stiffness: 350 } },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.15, ease: 'easeIn' } },
};
export const toastVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
  exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
};
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.1 } },
};
export const expandCollapse: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { height: { type: 'spring', damping: 25, stiffness: 200 }, opacity: { duration: 0.2, delay: 0.05 } } },
  exit: { height: 0, opacity: 0, transition: { height: { type: 'spring', damping: 25, stiffness: 200 }, opacity: { duration: 0.1 } } },
};
```

Usage — a staggered card list that respects the perf gate:

```tsx
const safe = useMotionSafe();
<motion.ul variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((it) => (
    <motion.li key={it.id} variants={staggerItem}
      transition={safe ? undefined : instant}>
      {/* ... */}
    </motion.li>
  ))}
</motion.ul>
```

---

*A dark, glass-forward design language: near-black canvas, one themeable accent,
frosted surfaces, ambient glow, and spring-overshoot motion. Re-skin via the
`--theme-*` variables.*
