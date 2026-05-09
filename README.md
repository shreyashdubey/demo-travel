# Wandering Saya Travels

A travel atelier from the Himalayas, run by **Saroj Thakur**.
Curated journeys through Kullu, Manali, Shimla & Spiti.

This repo is a Next.js 14 + TypeScript build of the marketing & booking site, designed
to feel cinematic on desktop and elegant on mobile — slow scroll, layered mountains,
day-by-day journey storytelling, and a five-step booking conversation.

## Run it

```bash
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000
```

## Build for production

```bash
npm run build
npm start
```

## What's where

```
src/
├── app/
│   ├── layout.tsx        # fonts, providers, metadata
│   ├── page.tsx          # composes all sections
│   └── globals.css       # tokens, smooth scroll, snowfall, grain
├── components/
│   ├── chrome/           # TopBar (sticky nav + sound toggle)
│   ├── providers/        # SmoothScroll (Lenis), SoundProvider (Howler)
│   ├── three/            # MountainScene (R3F)
│   └── sections/         # Hero, StoryStrip, Destinations, Experiences,
│                         # RangeMoment, Packages, Journey, FoodCulture,
│                         # AboutSaroj, BookingForm, Footer
├── data/content.ts       # destinations, experiences, packages, the
│                         # fully-wired Spiti journey, food, phrases
└── lib/cn.ts             # class-name util
```

## Design system

Colours, type, motion and sound are documented in [`product.md`](./product.md).
Build progress is tracked in [`progress.md`](./progress.md).

## Notable bits

- **The Journey** (`src/components/sections/Journey.tsx`) is the centrepiece. Pick a
  package and the page becomes a vertical, day-by-day, hour-by-hour walkthrough — sky
  shifts dawn → noon → dusk → night with scroll, the route line draws itself, and a
  soft chime plays at each new day if sound is on.
- **The Range** (`RangeMoment.tsx` + `MountainScene.tsx`) is a low-poly R3F scene
  that lazy-mounts when in view. Move the cursor — the range follows.
- **Sound** is opt-in. Toggle in the top-right. Wind ambient on hero, river ambient on
  the journey, chime on day-change, bell on CTA.
- **Reduced motion** is respected. The Lenis smooth scroller is disabled, parallax
  collapses, and animation durations clamp.

## Stack

- **Next.js 14** App Router · TypeScript · Tailwind CSS
- **Framer Motion** for UI motion · **GSAP** available for advanced choreography
- **Lenis** smooth scroll
- **Howler.js** for ambient & UI sound
- **react-three-fiber + drei + three** for the 3D moment
- **react-hook-form + zod** for the booking form (zod schemas can be added)

## Photography

All images are licensed from Unsplash. For production launch, replace with the
agency's own photography of Kullu, Manali, Shimla and Spiti. The `data/content.ts`
exports each section's image URL — easy to swap.

## Deploying

Deploy to Vercel, Netlify, or any Node host. No backend yet — the booking form logs
the booking reference locally. Wire to a backend / WhatsApp Business / email of choice.

---

> "The mountains will still be here when you are ready." — Saroj Thakur
