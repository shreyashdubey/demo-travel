# Progress Tracker

Tracks build progress against the vision in [`product.md`](./product.md).

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 1 — Foundation
- [x] product.md vision document
- [x] progress.md tracker
- [x] Next.js 14 + TS + App Router scaffolded
- [x] Tailwind installed and configured with design tokens
- [x] Self-hosted Fraunces + Inter via `next/font`
- [x] Lenis smooth scroll wired into root layout
- [x] Sound provider (Howler) with opt-in toggle
- [x] Reduced-motion utilities

## Phase 2 — Hero & Story
- [x] Cinematic hero with parallax mountain layers
- [x] Snow particle layer
- [x] Headline + sub copy + CTAs
- [x] Sound mute toggle (top-right)
- [x] Saroj's story strip (3-line scroll-pinned)

## Phase 3 — Destinations & Experiences
- [x] Horizontal scroll-snap rail of destinations (8 places)
- [x] Each destination: signature line + photo
- [x] Destination story modal (deferred to v2 — card opens detail page)
- [x] Experiences grid (8 cells, hover micro-interactions)

## Phase 4 — The Journey (the wow)
- [x] Package picker with 3 hero cards + Build-your-own
- [x] Day-by-day timeline with sticky day card
- [x] Hour-by-hour entries with photos
- [x] Scroll-driven backdrop color (dawn → night)
- [x] SVG map line that draws on scroll
- [x] Per-stop chime when sound is on
- [x] Price reveal + "Reserve this journey" CTA

## Phase 5 — Food, Culture, About
- [x] Food spread with 7 dish cards + recipe modal
- [x] Culture mosaic (Dussehra, weaving, phrase card)
- [x] About Saroj (portrait + story arc + values)
- [x] Trust strip (4 trust points)

## Phase 6 — Booking form
- [x] Multi-step form skeleton
- [x] Step 1: Who
- [x] Step 2: When (calendar with snow overlay)
- [x] Step 3: What (package picker)
- [x] Step 4: How (preferences)
- [x] Step 5: Confirm (animated summary)
- [x] Generated booking reference + soft confetti

## Phase 7 — 3D + Sound
- [x] react-three-fiber mountain hero scene
- [x] Howler ambient layers (wind, river, bell)
- [x] Per-section sound triggers

## Phase 8 — Polish
- [x] Mobile QA (375 + 414)
- [x] Tablet QA (768 + 1024)
- [x] Desktop QA (1280 + 1920)
- [x] Reduced-motion path
- [x] Keyboard nav
- [x] Footer + closing line
- [x] README + run instructions
- [x] Final git commit

---

## Git history (commits made)
1. `init: scaffold Next.js + product vision`
2. `feat: design tokens, fonts, smooth scroll, sound provider`
3. `feat: cinematic hero with parallax + Saroj story strip`
4. `feat: destinations rail + experiences grid`
5. `feat: package journey experience`
6. `feat: food, culture, about Saroj`
7. `feat: multi-step booking form`
8. `feat: 3D mountain scene + ambient sound`
9. `polish: mobile, a11y, perf`
