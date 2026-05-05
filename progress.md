# Progress Tracker

Tracks build progress against the vision in [`product.md`](./product.md).

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 1 — Foundation
- [x] product.md vision document
- [x] progress.md tracker
- [x] Next.js 14 + TS + App Router scaffolded
- [x] Tailwind configured with the Himalayan-Quiet token set
- [x] Fraunces (display) + Inter (body) + JetBrains Mono via `next/font/google`
- [x] Lenis smooth scroll wired into root layout, respects `prefers-reduced-motion`
- [x] Sound provider (Howler) with opt-in toggle, persisted in `localStorage`
- [x] Top-level `ErrorBoundary` (added during the post-launch hardening pass)

## Phase 2 — Hero & Story
- [x] Cinematic hero with three-layer SVG parallax + sky gradient + sun halo
- [x] Snow particle layer (28 flakes — see *perf notes* below)
- [x] Stagger-revealed serif headline + sub copy + CTAs
- [x] Sound mute toggle baked into the sticky `TopBar`
- [x] Saroj's story strip (portrait + 3-line reveal + 3 values)

## Phase 3 — Destinations & Experiences
- [x] Horizontal scroll-snap rail of 8 destinations
- [x] Each destination: signature line + elevation + best months + tinted gradient
- [x] Experiences grid (8 cells, hover-revealed body, inline SVG icons)
- [ ] Per-destination detail pages (deferred to v2)

## Phase 4 — The Journey (the wow)
- [x] Package picker (3 hero cards + Build-your-own)
- [x] Day-by-day timeline with sticky day card on the left
- [x] Hour-by-hour entries with selective photos and the `font-mono` timestamps
- [x] Scroll-driven backdrop colour (dawn → noon → dusk → night) via `useTransform`
- [x] SVG map line that draws on scroll (top sticky strip)
- [x] Day-change chime when sound is on (`useMotionValueEvent`)
- [x] Stars layer on the night day
- [x] Price reveal panel + "Reserve this journey" CTA

## Phase 5 — Food, Culture, About
- [x] Food spread of 7 Pahari dishes + recipe-card modal
- [x] Culture mosaic (Kullu Dussehra hero, Pattu loom card, Pahari phrase card)
- [x] About Saroj (portrait, 5-row timeline, three-line headline)
- [x] Trust strip (4 trust points)

## Phase 6 — Booking form
- [x] Multi-step form skeleton with progress bar + animated step transitions
- [x] Step 1: Who (name, travellers, WhatsApp, email)
- [x] Step 2: When (12-month picker with snow-likelihood bars + seasonal copy)
- [x] Step 3: What (package picker + suggest-me option)
- [x] Step 4: How (pace · accommodation · food · free-form notes)
- [x] Step 5: Confirm (summary cards)
- [x] Generated booking reference (`DHODHU-MMM-XXXX`) + soft pine/snow confetti

## Phase 7 — 3D + Sound
- [x] React-three-fiber mountain scene (`MountainScene.tsx`) with low-poly peaks,
      snow caps, fog, sun, pointer parallax
- [x] Lazy-mounted via `next/dynamic` and unmounted when the section leaves the
      viewport (IntersectionObserver) so WebGL never burns idle GPU
- [x] Howler ambient layers (wind on hero, river on journey)
- [x] Howler UI sounds (chime on package select / day change, bell on CTA)

## Phase 8 — Polish & post-launch fixes
- [x] Mobile responsive (375 → 1920 grids verified)
- [x] Reduced-motion path (Lenis disabled, parallax collapses)
- [x] Footer + closing line ("The mountains will still be here when you are ready.")
- [x] README + run instructions
- [x] **Photo audit**: replaced three Unsplash IDs that were 404-ing
      (Kullu, Shimla, river) with verified live photos
- [x] **Framer Motion compatibility**: pinned to `^11.11.17`. v12 introduced
      strict WAAPI offset validation that threw "Offsets must be monotonically
      non-decreasing" on a couple of transforms with negative-edge ranges
- [x] **Scroll-time crash hardening**:
  - Replaced the journey's sticky-in-absolute backdrop with a fixed
    `motion.div` whose opacity is tied to journey scroll progress
  - Unmount the R3F scene when the section leaves the viewport
  - Particle counts: snow 60→28, stars 90→40
  - Defensive `initial` on the booking progress bar
  - Clamped the day-section opacity input range so the first day cannot
    start below zero
- [x] **R3F React-version mismatch fix**: pinned
  `@react-three/fiber@^8.18.0` and `@react-three/drei@^9.122.0`. The
  defaults installed by `npm i` (`fiber@9` / `drei@10`) require React 19.
  Next 14 ships React 18, so the reconciler crashed at mount with
  `Cannot read properties of undefined (reading 'S')`. The pinned pair
  is the last R3F line that supports React 18.

---

## Git history (actual commits)

| # | Hash | Message |
|---|---|---|
| 1 | `28d317c` | Initial commit from Create Next App |
| 2 | `277b792` | docs: product vision and progress tracker |
| 3 | `81b4dbc` | feat(foundation): tokens, fonts, smooth scroll, sound provider |
| 4 | `5877c87` | feat(data): curated destinations, experiences, packages, Spiti journey |
| 5 | `40cdd2f` | feat: cinematic hero with parallax + Saroj's story strip |
| 6 | `ee0a9be` | feat: destinations rail + experiences grid |
| 7 | `156f69c` | feat: package picker + cinematic journey + 3D range |
| 8 | `e31c863` | feat: food, culture mosaic, about Saroj + trust strip |
| 9 | `23fbbeb` | feat: multi-step booking form + footer |
| 10 | `9f5b988` | docs: README with run instructions and architecture notes |
| 11 | `db84057` | fix: framer-motion v12 offset error + 3 dead Unsplash photos |
| 12 | `8179878` | fix: scroll-time crashes from heavy paint + GPU pressure |
| 13 | _pending_ | fix: pin R3F to React-18 compatible versions + docs refresh |

---

## Perf notes (the things you'd want to know during a future audit)

- **Particles**: snow + stars use pure CSS keyframes (`@keyframes snowfall`,
  `@keyframes ember`). Counts deliberately conservative — no JS work per frame.
- **R3F**: mounted only when `RangeMoment` is intersecting (300px rootMargin
  buffer). Disposed completely when out of view.
- **Lenis**: durations tuned to 1.15s with the `pow(2)` ease. Disabled under
  `prefers-reduced-motion`.
- **Framer Motion**: pinned to v11. Avoid keyframe arrays with infinite repeats
  on the same property (these can collide with v12's stricter offset checks if
  a future upgrade is attempted).
- **R3F**: pinned to `fiber@8` + `drei@9` for React 18 support. Upgrade only
  alongside a React 19 / Next 15 migration.
- **Images**: all `next/image` with explicit `sizes`. The Unsplash CDN is
  whitelisted in `next.config.mjs`. For production, swap each ID in
  `src/data/content.ts` for the agency's own photography.
- **No backend yet**. The booking form generates a reference locally and
  console-logs the payload. Wire to a backend / WhatsApp Business / email
  before launch.
