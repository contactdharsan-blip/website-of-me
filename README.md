# Dharsan Kesavan — Personal Site

A dark, glass-forward résumé / profile site built on a tokenized design system
(see `../design.md`). Near-black canvas, a single deep-red→pink accent, frosted
"liquid glass" surfaces, ambient glow, and spring-overshoot motion.

> Live target quality: Linear / Vercel / Awwwards-tier personal page.

---

## Quick start

```bash
cd site
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve the production build
```

Requires Node 18+.

---

## ✏️ Edit your content (one file)

Everything lives in **`src/data/profile.ts`** — name, title, bio, skills,
experience, projects, stats, education, and section nav. Change copy there and
the whole site updates. No component edits needed.

### Two things to fill in
1. **Social links** — in `profile.ts`, the `socials` array has empty `href: ''`
   entries for GitHub / LinkedIn / X. Fill them in; **links left blank are
   automatically hidden** (no dead icons).
2. **Your CV** — replace `public/CV.pdf` (currently a placeholder) with your real
   résumé. The "Download CV" button points at `/CV.pdf`.

> Inline keyword emphasis: wrap a word in `{curly braces}` in `tagline` /
> `about.paragraphs` and it renders highlighted. e.g. `"a {Rust} core"`.

---

## Architecture

```
site/
├─ index.html              # font links (Bricolage Grotesque / General Sans / JetBrains Mono)
├─ tailwind.config.js      # design tokens → Tailwind theme (colors, fonts, keyframes)
├─ src/
│  ├─ index.css            # :root design tokens, glass/button classes, ambient bg, perf degradation
│  ├─ data/profile.ts      # ← ALL content (single source of truth)
│  ├─ lib/
│  │  ├─ motion.ts         # Motion variant library + useMotionSafe / useHighPerf gates
│  │  ├─ perf.ts           # device perf-tier scoring → tags <html> perf-low/medium
│  │  └─ utils.ts          # cn() classname helper
│  ├─ components/
│  │  ├─ primitives/       # GlassCard, GradientText, Button, SectionWrapper, Highlight, SocialIcon
│  │  ├─ effects/          # AmbientBackground, CursorGlow, ScrollProgress, MagneticButton, TiltCard, AnimatedCounter
│  │  └─ Nav.tsx           # scroll-spy glass nav with sliding active pill
│  └─ sections/            # Hero, About, Skills, Experience, Projects, Stats, Contact
```

---

## Background (ReactBits)

The ambient background is the **Particles** component from the
[ReactBits](https://reactbits.dev) shadcn registry, installed with:

```bash
npx shadcn@latest add "https://reactbits.dev/r/Particles-TS-TW"
```

It lives at `src/components/Particles.tsx` (WebGL via `ogl`) and is wired up in
`src/components/effects/AmbientBackground.tsx`, where it is:

- **lazy-loaded** — `ogl` ships as its own ~15 KB gzip chunk, fetched only when
  the particle layer actually renders;
- **perf-gated** — high tier only (`useHighPerf`), with a WebGL availability
  check and a `SafeEffect` error boundary; medium/low/no-WebGL/reduced-motion
  fall back to the static grid (never a crash);
- **theme-tinted** — deep-red→pink palette.

**Preview it on any device:** append `?fx` to the URL to force the particle
layer on regardless of perf tier (e.g. `localhost:5173/?fx`).

**Swap to another ReactBits background** — just add a different one and change
the import in `AmbientBackground.tsx`:

```bash
npx shadcn@latest add "https://reactbits.dev/r/DotGrid-TS-TW"   # or Squares, Threads, Beams, Silk, Aurora…
```

## Design decisions

- **Tokens, not hardcoded values.** Every color/shadow/radius/transition reads
  from a CSS variable in `:root` (mirrored into the Tailwind theme). Re-skin the
  whole site by overriding the `--theme-*` variables in `src/index.css` — e.g.
  swap emerald→indigo by changing `--theme-primary` and `--theme-primary-rgb`.

- **Two motion engines, by job.** Orchestrated enter/exit (section reveals,
  stagger, nav pill, counters) use **Motion**; always-on ambient loops (glow
  drift, pulse, shimmer) use **CSS keyframes**. Infinite loops never run through
  Motion (JS overhead) and exits never run through CSS.

- **Motion is conditional, never assumed.** `useMotionSafe()` collapses two
  signals — `prefers-reduced-motion` and a low device perf tier — into one gate.
  Functional animations *snap* (`duration: 0`) when unsafe so nothing becomes
  unreachable; decorative effects (cursor glow, 3D tilt, magnetic pull) are
  **high-perf-tier only** and degrade to static. Pure-CSS effects down-shift via
  `perf-low` / `perf-medium` classes set on `<html>` before React mounts.

- **Signature interactions.** Magnetic CTAs (`MagneticButton`), 3D perspective
  tilt with cursor-tracked glare (`TiltCard`), a conic-gradient glow ring on
  featured cards (`@property --border-angle`), a scroll-linked timeline connector,
  count-up stats, parallax hero, and a top scroll-progress bar.

- **Accessibility & responsiveness.** Mobile-first grids, ≥44px touch targets,
  safe-area insets, a skip link, visible focus rings, semantic landmarks, and
  full `prefers-reduced-motion` support. Verified clean at 375px (iPhone SE).

- **Performance.** Static SPA, Motion + icons code-split into separate chunks
  (~23 KB + ~5 KB gzip), main bundle ~75 KB gzip, CSS ~7 KB gzip. No layout
  thrash — animations drive only `transform`/`opacity`.

---

## Re-theming in 10 seconds

Edit the theme hooks at the top of `:root` in `src/index.css` **and** the
matching `primary`/`accent` ramps in `tailwind.config.js` (CSS vars drive
runtime glows/gradients; the Tailwind ramps drive `*-primary-*` utility classes
— change both so they stay in sync). The current deep-red + pink values:

```css
/* src/index.css */
--theme-primary: #ef4444;        --theme-primary-rgb: 239, 68, 68;   /* deep red */
--theme-primary-dark: #b91c1c;   --theme-primary-light: #f87171;
--theme-secondary: #ec4899;      --theme-secondary-rgb: 236, 72, 153; /* pink */
```

Particle tint lives in `AmbientBackground.tsx` (`particleColors`). Re-skin to a
different hue by swapping these three spots; every surface, glow, gradient, and
shadow updates automatically.
