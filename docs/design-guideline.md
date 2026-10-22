# Design Guideline

Built with the `aesthetic` skill framework (Beautiful → Right → Satisfying → Peak).

## Style

Editorial dark minimalism with a single acid-lime accent. Big confident type, generous
white space, hairline dividers, and motion that rewards scrolling. Inspired by Awwwards-style
developer portfolios: oversized display type, mono labels, sticky stacked cards.

## Color

| Token          | Dark      | Light     | Use                                   |
| -------------- | --------- | --------- | ------------------------------------- |
| `--bg`         | `#0a0a0b` | `#f4f3ee` | Page background                       |
| `--surface`    | `#121214` | `#ffffff` | Cards                                 |
| `--surface-2`  | `#1a1a1d` | `#ebeae4` | Pills, hover fills                    |
| `--text`       | `#f4f4f1` | `#0d0d0e` | Primary text                          |
| `--muted`      | `#8b8b91` | `#5e5e64` | Secondary text (≥ 4.5:1 on `--bg`)    |
| `--line`       | `#232327` | `#d9d8d1` | Hairlines, borders                    |
| `--accent`     | `#d4ff3a` | `#d4ff3a` | Fills: buttons, progress, highlights  |
| `--accent-ink` | `#0a0a0b` | `#0d0d0e` | Text placed on `--accent`             |
| `--accent-text`| `#d4ff3a` | `#4d6000` | Accent used as text on `--bg`         |

Accent is used sparingly: one CTA, the scroll progress bar, active states, and highlights.
The legacy tokens (`--background`, `--text-color`, `--border-color`, …) map onto the new ones
so the Readme, Medium and Contact pages keep working.

## Typography

- Display: **Helvetica Neue** (self-hosted) — tight tracking (`-0.04em`) at large sizes.
- Labels / meta: **SF Mono** (self-hosted) — uppercase, `0.08em` tracking, 12–13px.
- Fluid sizes via `clamp()`; no per-breakpoint vw tables.

| Role          | Size                         |
| ------------- | ---------------------------- |
| Hero name     | `clamp(48px, 14vw, 184px)`   |
| Section title | `clamp(40px, 7vw, 104px)`    |
| Statement     | `clamp(26px, 3.6vw, 52px)`   |
| Card title    | `clamp(24px, 2.6vw, 36px)`   |
| Body          | `16–18px`, line-height 1.6   |
| Label         | `12px` mono uppercase        |

## Layout

- Container: `min(1320px, 100% - 2 × gutter)`, gutter `clamp(16px, 4vw, 48px)`.
- Section rhythm: `clamp(96px, 14vw, 200px)` vertical padding.
- Each section opens with a mono label `(0N) — Name` and a large title.
- Bottom padding leaves room for the fixed dock.

## Components

- **Pills**: 999px radius, `--surface-2` fill, accent fill on hover.
- **Cards**: 24px radius, 1px `--line` border, `--surface` fill.
- **Buttons**: circular magnetic CTA in accent; secondary buttons are outlined pills.
- **Dock**: frosted glass (`backdrop-filter: blur`), accent limelight.

## Motion

| Interaction             | Duration      | Easing             |
| ----------------------- | ------------- | ------------------ |
| Press (`:active`)       | 120ms (`--dur-press`) | `--ease-out`, `scale(0.97)` |
| Hover / micro           | 250ms (`--dur-hover`) | `--ease-out` (transform), `ease` (color) |
| On-screen movement      | 350ms         | `--ease-in-out` (dock indicator) |
| Reveal on enter         | 0.9–1.2s      | `expo.out`         |
| Stagger                 | 0.03–0.08s    | —                  |
| Scroll-linked           | scrubbed      | `none`             |
| Magnetic release        | 0.9s          | `elastic.out(1, .4)` |

- Only `transform`, `opacity` and `clip-path` are animated. Never `left`/`top`/`width`.
- Never enter from `scale(0)`; start at `scale(0.6–0.97)` with `opacity: 0`.
- Bounce/overshoot only where the pointer "threw" something (magnetic release).
- Pressables respond on press (`:active`), not only on hover.
- Hover motion lives inside `@media (hover: hover) and (pointer: fine)` so taps on
  touch screens don't leave elements stuck in their hover state.
- Pointer-follow effects write `transform` on the moving element, never a CSS
  variable on a parent (that restyles every child per frame).
- GSAP tweens that can be re-triggered mid-flight use `overwrite: "auto"` so they
  start from the live value instead of fighting each other.
- No perpetual pulses in persistent chrome (dock); loops are reserved for the hero.
- Smooth scroll: Lenis driven by the GSAP ticker so ScrollTrigger stays in sync.
- `prefers-reduced-motion: reduce` disables smooth scroll, cursor, marquee, every
  reveal and all loops. Colour/opacity transitions stay so state changes still read.
- `prefers-reduced-transparency: reduce` makes the dock and theme toggle solid.
- Custom cursor only on `(pointer: fine)` devices.

## Accessibility

- Semantic sections with headings in order (h1 → h2 → h3).
- Decorative duplicates (marquee copies, split letters) are `aria-hidden`; split headings keep
  an `aria-label` with the full text.
- All interactive elements are real `<a>` / `<button>` with visible focus rings.
