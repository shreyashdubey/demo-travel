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
- [x] Sound provider — Web Audio API synthesis (no external audio files)
- [x] Top-level `ErrorBoundary`

## Phase 2 — Hero & Story
- [x] Cinematic hero with three-layer SVG parallax + sky gradient + sun halo
- [x] Snow particle layer (28 flakes — see *perf notes*)
- [x] Stagger-revealed serif headline + sub copy + CTAs
- [x] Sound mute toggle baked into the sticky `TopBar`
- [x] Saroj's story strip — corrected to her real arc
  (born in Bhuntar, lifelong Kullu, hotel management + tourism)

## Phase 3 — Destinations & Experiences
- [x] Horizontal scroll-snap rail of 8 destinations
- [x] Each destination: signature line + elevation + best months + tinted gradient
- [x] Experiences grid — 8 cells with hover-revealed body, real Wikimedia
      photography for the Pahari food / culture / mountain-lakes / after-dark /
      rivers cards
- [x] "Alpine lakes" → "Mountain lakes" (plain language)

## Phase 4 — The Journey (the wow)
- [x] Package picker (3 hero cards + Build-your-own)
- [x] Day-by-day timeline with sticky day card on the left
- [x] Hour-by-hour entries with selective photos and `font-mono` timestamps
- [x] SVG map line that draws on scroll (top sticky strip)
- [x] Day-change chime when sound is on (`useMotionValueEvent`)
- [x] Price reveal panel + "Reserve this journey" CTA
- [x] **Removed**: the full-viewport tinted backdrop. Reads cleaner
      without the constant overlay; the DayCard's phase-coloured
      header carries the dawn → night feel on its own.
- [x] **Removed**: per-DaySection opacity transform (was driving the
      page from 0.4 → 1 → 0.5 between day sections, which the user
      perceived as a "tint covering the whole screen"). Sections now
      stay at full opacity throughout.
- [x] **Removed**: Journey's `setAmbient("river")` override that was
      killing the Hero's flute. The wind+flute bed now persists for
      the whole page.

## Phase 5 — Food, Culture, About
- [x] Food spread — every dish has a real Pahari/Himachali photo
- [x] Culture mosaic (Kullu Dussehra, Pattu loom, Pahari phrase card)
- [x] About Saroj — corrected biography:
  - Born in Bhuntar (the Kullu valley town with the airport)
  - Schooled in the valley, never left
  - Studied hotel management + tourism
  - Founded Dhodhu Travels in 2017
  - Travels in the off-season (Ladakh, Bhutan, Nepal, Norway, Patagonia next)
- [x] Trust strip (4 trust points)

## Phase 6 — Booking form
- [x] 5-step animated form, top progress bar
- [x] Generated booking reference (`DHODHU-MMM-XXXX`) + soft confetti

## Phase 7 — 3D + Sound
- [x] React-three-fiber mountain scene built
- [x] Lazy-mounted via `next/dynamic` and unmounted when off-screen
- [~] **Disabled in `page.tsx`** per request — to be brought back when the
      3D treatment feels ready
- [x] **Sound is fully synthesised** in the browser (Web Audio API):
  - Hero ambient: filtered pink noise + a slow bansuri-flute melody
    in D pentatonic (Sa Re Ga Pa Dha)
  - Journey ambient: higher-passed pink noise (river)
  - Cues: chime (two-tone), bell (harmonic stack), snow (noise puff)
  - On by default; persists user toggle in `localStorage`
  - Audio context unlocks on first pointerdown/keydown to satisfy
    autoplay policies

## Phase 8 — Polish & post-launch fixes
- [x] Mobile responsive (375 → 1920 grids verified)
- [x] Reduced-motion path
- [x] Footer + closing line
- [x] README + run instructions
- [x] **Photo audit pass 1**: replaced 3 dead Unsplash IDs (Kullu, Shimla, river)
- [x] **Photo audit pass 2**: every food card got a real Pahari dish photo
      via Wikimedia Commons; rivers, mountain-lakes, after-dark, culture,
      Pahari-food, Chandratal day cover, Arrive-Kaza, Key Monastery, Day-6
      cover, and the Saroj story-strip image were all corrected
- [x] **Self-host all Wikimedia photos** in `public/img/{food,places}/` to
      avoid Wikimedia's 429 rate-limit on Next's image proxy
- [x] **Framer Motion compatibility**: pinned to `^11.11.17`
- [x] **R3F React-version mismatch fix**: pinned `fiber@^8.18` + `drei@^9.122`
- [x] **Scroll-time crash hardening**: simplified backdrop, R3F unmount on
      out-of-view, particle counts capped, defensive form `initial`

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
| 13 | `41b11d5` | fix: pin react-three-fiber to v8 + drei to v9 for React 18 |
| 14 | `c1e6a26` | fix: rewrite Saroj's bio (she/her, Bhuntar), real Pahari food photos, sound on by default |
| 15 | `d44741b` | feat(sound): bansuri-flute over wind ambient + fix Chandratal photos |
| 16 | `9758612` | fix: remove journey backdrop tint, fix Arrive Kaza photo, restore sound |
| 17 | `c791df0` | fix: remove journey day-by-day fade + sound silence root causes |

---

## Perf notes (the things you'd want to know during a future audit)

- **Particles**: snow + stars use pure CSS keyframes. Counts capped at 28
  flakes; no JS work per frame.
- **R3F**: pinned to `fiber@8` + `drei@9` for React 18. Mounted only when
  the section is intersecting (300px rootMargin buffer); disposed when out
  of view. Currently disabled in `page.tsx` until the 3D treatment is
  reapproved.
- **Lenis**: durations tuned to 1.15s with the `pow(2)` ease. Disabled
  under `prefers-reduced-motion`.
- **Framer Motion**: pinned to v11. Avoid keyframe arrays with infinite
  repeats on the same property — v12's stricter offset checks will fight
  these on a future upgrade.
- **Images**: all `next/image`. The Pahari/Himachali photos are
  self-hosted in `public/img/{food,places}/`. Unsplash CDN is whitelisted
  in `next.config.mjs` for the destination/package covers.
- **Wikimedia rate limits**: do not point `next/image` at
  `upload.wikimedia.org` directly — Wikimedia 429s the proxy aggressively.
  Always self-host Wikimedia photos.
- **Sound**: all synthesised in-browser via Web Audio API. No external
  audio files = no broken CDN dependencies. The flute uses two sine
  harmonics + 4.5 Hz vibrato + a brief band-pass noise burst at the
  attack to mimic the breath of a bansuri.
- **No backend yet**. The booking form generates a reference locally and
  console-logs the payload. Wire to a backend / WhatsApp Business / email
  before launch.
