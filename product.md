# Dhodhu Travels — Product Vision

> A travel atelier from the Himalayas, run by **Saroj Thakur**.
> Crafted for travellers who want to *feel* Himachal, not just see it.

---

## 1. Brand soul

| | |
|---|---|
| **Name** | Dhodhu Travels |
| **Owner** | Saroj Thakur (born and raised in Kullu valley) |
| **Promise** | "Slow journeys through fast mountains." |
| **Tone** | Warm, cinematic, calm. Confidence of a local elder, taste of an Apple product page. |
| **Why us** | Locally owned. Drivers are family. Homestays are friends. The route bends to the weather, the snow, the apple harvest. |

### Voice

- Speaks in *first person, plural* — "we walk you up to Beas Kund the way our grandmothers took us."
- Uses Pahari words sparingly: *bhitar* (inside), *chha* (tea), *deota* (local god).
- Never shouts. Never says "best in town." Lets the mountains do that.

---

## 2. Design language — "Himalayan Quiet"

Inspired by Apple's product storytelling × Aman resorts × Kinfolk magazine × Ghibli's *Princess Mononoke* skyline.

### Palette

| Token | Hex | Use |
|---|---|---|
| `snow` | `#F6F4EF` | Default canvas |
| `glacier` | `#E8EEF2` | Soft sections |
| `mist` | `#B8C2C9` | Borders, secondary text |
| `pine` | `#1F3A2E` | Primary text, hero |
| `slate` | `#243240` | Dark surfaces |
| `dusk` | `#7B5E57` | Accent — wood, leather |
| `alpenglow` | `#E8895C` | Highlight — sunset on snow |
| `night` | `#0B1320` | Night/stars sections |
| `gold` | `#C9A26A` | Subtle luxury accent |

### Type

- **Display**: *Fraunces* (modern serif, optical for huge headlines) or *Cormorant Garamond*
- **Body**: *Inter* tight tracking
- **Mono / numerals**: *JetBrains Mono* for hour-by-hour itinerary timestamps

### Motion principles

1. **Earned, not decorative.** Every animation should reveal information.
2. **Scroll = time passing.** Mountains pan, sun arcs, day turns to night as you scroll.
3. **120 fps feel.** Spring physics with easing `[0.22, 1, 0.36, 1]`. No `linear`. Ever.
4. **Reduce-motion respect.** Honor `prefers-reduced-motion`.

### Sound

- Optional, off by default. A persistent `🔊` toggle in top-right.
- Layers: ambient mountain wind (loop), distant temple bell on hero, soft snow crunch on package selection, river flow on the rivers section.
- Howler.js, fades only.

---

## 3. Sections (top → bottom)

### A. Cinematic Hero
- Full-bleed video (Manali pine slope, snow falling) with parallax layers.
- Headline: **"The mountains are waiting. We know the way."**
- Sub: "Curated journeys through Kullu, Manali, Shimla & Spiti — by Saroj Thakur, born here."
- CTA: *"Plan a journey"* (smooth-scrolls into packages) and *"Watch the valley"* (mute toggle).
- Behind text: 3D parallax of three mountain layers + sun + snow particles.

### B. The Story Strip
- A short scroll-pinned section. Saroj's portrait fades in. Three lines, big serif.
- "I grew up in Kullu. I came back from the city to take you home."

### C. Destinations
Horizontal scroll-snap rail of cards. Each card: one photo, one place name, one *signature* line, one CTA.

| Place | Signature |
|---|---|
| **Manali** | Where the Beas is born. |
| **Kullu** | The valley of the gods. |
| **Shimla** | Where the British forgot to leave. |
| **Spiti** | A cold desert that prays in monasteries. |
| **Kasol** | Israel in pine. |
| **Tirthan** | A river that no one tells you about. |
| **Bir Billing** | Run, take off, fly. |
| **Dharamshala** | Tea, monks, drum circles. |

Each card opens an immersive *destination story*: lateral split-screen of 5 photos, 3 paragraphs, local food note, best months bar chart.

### D. Experiences (the grid)
8-cell grid, hover reveals motion.

1. **Treks** — Hampta Pass, Bhrigu, Kheerganga, Triund, Beas Kund, Pin-Parvati
2. **Snowfall** — Solang, Rohtang, Atal Tunnel runs
3. **Lakes** — Chandratal, Prashar, Dashir, Bhrigu
4. **Rivers** — Beas, Parvati, Tirthan, Spiti rafting/fly-fishing
5. **Wildlife** — Great Himalayan National Park, snow leopard tracking in Spiti (Feb)
6. **Food** — Dham feast, Sidu cooking class, apple-orchard breakfast
7. **Culture** — Dussehra in Kullu, weaving with a Kullvi family, temple deota processions
8. **After dark** — Stargazing at 4,200m, bonfire kathas, Kasol cafés, hot springs at Manikaran

### E. Featured Packages (3 hero cards)

| Title | Length | Vibe | Starts at |
|---|---|---|---|
| **The First Snow** | 4 days | Manali + Solang for couples | ₹14,900 / pp |
| **Kullu Roots** | 6 days | Kullu valley + Tirthan + Naggar slow travel | ₹22,500 / pp |
| **Spiti Circuit** | 9 days | Manali → Kaza → Chandratal → Shimla, monasteries, lakes | ₹38,900 / pp |

Plus a *Build your own* CTA.

### F. The Journey Experience (the magic moment ✨)
> The thing the owner specifically asked for.

When a user clicks a package, the page **transforms** into a full-screen vertical journey:

1. Top: a hand-drawn-feeling SVG **map line** that draws itself as you scroll, marking each stop.
2. Each scroll section = one **day**:
   - Sticky day card on left (Day 1, Day 2…) with weather icon and elevation.
   - Right column: hour-by-hour timeline. `06:00 — Wake to the Beas. Chha by the window.` `08:30 — Drive to Naggar Castle.`
   - Each hour entry has its own small photo, expanding on hover.
3. As you scroll, the mountain backdrop **changes color** from dawn → noon → dusk → night, mirroring the day. By Day 2's evening, stars appear.
4. At each major stop, a soft chime plays (if sound is on).
5. End of journey: an animated reveal of price, what's included, what's not, plus a **"Reserve this journey"** button that gently scrolls into the booking form.

This is the "*ride*" the brief asked for. Cinematic, factual, never gimmicky.

### G. Food & Culture
- Editorial-style spread.
- Top: scroll-driven photo tray of 7 dishes. Each click pops a recipe-card modal.
  - **Sidu** — wheat bread steamed over a wood fire, ghee.
  - **Madra** — chickpeas in yogurt, a Pahari Sunday classic.
  - **Babru** — black-gram-stuffed kachori.
  - **Dham** — a sit-down feast served on a pattal of leaves, only by botis (priest-cooks).
  - **Chha Gosht** — yogurt-marinated lamb.
  - **Aktori** — buckwheat pancake from Kinnaur.
  - **Tudkiya Bhath** — slow-cooked rice, pulses, potato.
- Below: culture mosaic — Kullu Dussehra (deota procession photos), the *Kullvi Pattu* shawl loom video, a phrase-of-the-day card teaching simple Pahari.

### H. About Saroj
- Half-page portrait left, story right.
- Story arc: born in Patlikuhl • left for Delhi at 19 • came home in 2014 • started Dhodhu Travels with one Innova in 2017 • today, eight drivers, eleven homestay partners.
- Three values: *Local first. Slow always. Mountains decide.*

### I. Trust strip
- "₹0 cancellation up to 14 days before"
- "Verified homestays, no commission games"
- "Local guides, paid fairly"
- "Curated for ≤ 6 travellers per group"

### J. Booking form (multi-step)

5 steps, animated transitions between them, mountain progress bar at top:

1. **Who** — Name, travellers, contact (WhatsApp first, email optional).
2. **When** — calendar with snow-likelihood overlay per month.
3. **What** — pick a package or "I'm not sure, suggest me."
4. **How** — preferences: pace (slow / standard / packed), accommodation (homestay / boutique / hotel), food (veg / non-veg / vegan), accessibility.
5. **Confirm** — animated summary card, price estimate band, "Saroj will WhatsApp you within 4 hours."

On submit: a soft confetti of pine needles and snowflakes, plus a generated *Booking Reference* like `DHODHU-MAY-A7K2`.

### K. Footer
- Newsletter "*Letters from the valley*" (monthly story + photos).
- Contact: phone, WhatsApp, email, instagram.
- Office: Patlikuhl, Kullu, HP 175130.
- Closing line in serif: *"The mountains will still be here when you are ready."*

---

## 4. Tech architecture

| Layer | Choice | Pinned to | Why |
|---|---|---|---|
| Framework | **Next.js 14 App Router, TypeScript** | `next@14.2.15` · `react@18` | RSC, image optimization, route handlers for booking |
| Styling | **Tailwind CSS** + CSS variables for tokens | `tailwindcss@3.4` | Speed without losing custom feel |
| Animation | **Framer Motion** | `^11.11.17` ⚠️ not v12 | v12 introduced strict WAAPI offset validation that bit us with `Offsets must be monotonically non-decreasing` |
| 3D | **react-three-fiber** + **drei** | `fiber@^8.18` · `drei@^9.122` ⚠️ | The `npm i` default is `fiber@9` / `drei@10`, which require **React 19**. Pin until we move to Next 15 / React 19. Symptom otherwise: `Cannot read properties of undefined (reading 'S')` at the R3F reconciler. |
| Smooth scroll | **Lenis** | `^1.3` | Buttery scroll feel; honors `prefers-reduced-motion` |
| Sound | **Howler.js** | `^2.2` | Cross-browser, fades, mute persistence |
| Forms | **react-hook-form** + **zod** | `^7.75` / `^4.4` | Type-safe validation, animated steps |
| Images | `next/image` + Unsplash curated set | — | Replace with the agency's own photography for launch |
| Fonts | `next/font/google` Fraunces + Inter + JetBrains Mono | — | Zero CLS, self-hosted at build time |
| Error boundary | Top-level class component in `src/components/ErrorBoundary.tsx` | — | Surfaces silent runtime crashes with a friendly fallback instead of a blank tab |
| Analytics | none for now (privacy) | — | Saroj is private |
| Deploy | Vercel-ready | — | One-click |

### Performance budget
- LCP < 2.0s on 4G
- Lighthouse > 90 on mobile
- All animations via `transform` / `opacity` only
- 3D scene lazy-mounted *and* unmounted on `IntersectionObserver`. The WebGL
  context is freed the moment the section leaves the viewport — no idle
  GPU work behind the rest of the page.
- Snow particles capped at 28; journey stars at 40. Both are CSS keyframe
  animations, no per-frame JS.
- The journey's tinted backdrop is a single fixed `motion.div` whose
  opacity is tied to journey scroll progress (cleaner than sticky-in-absolute
  and avoids the `position: sticky` paint storm).

### Accessibility
- All images have alt text written *editorially*
- Keyboard nav across packages
- Reduced motion: replaces parallax with static photos, journey scrolls without color shift
- Sound is opt-in

---

## 5. Build phases

1. **Phase 1 — Foundation**: scaffold, design tokens, layout, fonts, smooth scroll.
2. **Phase 2 — Hero & Story**: cinematic hero, parallax, Saroj's intro.
3. **Phase 3 — Destinations & Experiences**: horizontal rail + 8-cell grid.
4. **Phase 4 — The Journey**: the package storytelling system (the wow).
5. **Phase 5 — Food, Culture, About**: editorial sections.
6. **Phase 6 — Booking form**: multi-step + summary.
7. **Phase 7 — 3D + Sound**: react-three-fiber mountain, Howler ambient.
8. **Phase 8 — Polish**: mobile, a11y, perf, lighthouse, README.

Commit boundaries are at the end of each phase.

---

## 6. What "done" looks like for the demo

- One package (Spiti Circuit) is **fully wired** through the journey experience — every other package can reuse the system.
- All sections render on mobile cleanly.
- Sound and 3D are togglable, do not break if disabled.
- The form submits to a console log + a fake "Booking Reference" — real backend is out of scope.
- A `progress.md` captures what's done.

This is a feel demo for Saroj. The point is that he should walk through it and feel: *yes, this is the agency I run.*
