# Photography Wishlist

Every photo currently used on the site, and which ones need replacing with the agency's own photography before launch. This is the single highest-ROI investment before going live (per `strategies.md` §10.1 — Airbnb's professional photography lift was +19% in their 2024–25 evaluation, 2.5× in the classic early-Airbnb experiment).

## Status legend

- 🔴 **Stock** — Unsplash placeholder. Needs replacement.
- 🟡 **Wikimedia** — licensed but generic. Can stay short-term if a real shot isn't available.
- 🟢 **Self-hosted** — already in `public/img/`, but a real-trip refresh would still help.
- ⚠️ **Stand-in** — currently using an unrelated photo. MUST be replaced.

---

## Priority 1 — Most visible (replace first)

### Hero background
- **File**: `src/components/sections/Hero.tsx`
- **Current**: 🔴 Stock — Unsplash `1626621341517-bbf3d9990a23` (generic snowy peaks)
- **Need**: Cinematic wide shot of Kullu/Manali at golden hour. Above Patlikuhl looking down at the Beas would be perfect.
- **Spec**: 3840×2160 min, landscape, warm color grade

### Saroj's portrait
- **File**: `src/components/sections/AboutSaroj.tsx`
- **Current**: ⚠️ Stand-in — `/img/places/pahadi-girl.jpg` is a copy of `dussehra-procession.jpg`
- **Need**: A real portrait of Saroj outdoors in a Pahari setting (family orchard, valley path, homestay verandah). Alternative: a stylized illustration of a Pahadi woman in traditional dress if Saroj prefers to keep her own photo off the site.
- **Spec**: 1200×1500 (4:5 portrait), warm natural light

---

## Priority 2 — Destination cards (8 destinations in the rail)

Defined in `src/data/content.ts` → `destinations`.

| Slug | Status | Need |
|---|---|---|
| manali | 🔴 Stock | Pine valley, woodsmoke, apple blossom OR first snow |
| kullu | 🔴 Stock | Dussehra deota procession OR apple orchard with weaving |
| shimla | 🔴 Stock | Mall Road / toy train / deodar at golden hour |
| spiti | 🟢 Self-hosted (large — 5 MB) | Refresh + compress |
| kasol | 🟢 Self-hosted (large — 10 MB) | Refresh + compress |
| tirthan | 🔴 Stock | Trout stream + stone homestay |
| bir-billing | 🔴 Stock | Take-off + landing field, tea-estate landing |
| dharamshala | 🔴 Stock — *same image as Manali, currently* | Triund trek or McLeodGanj at dawn |

**Spec**: 3:4 vertical, ~1200×1600

---

## Priority 3 — Experiences grid (8 cells)

Defined in `src/data/content.ts` → `experiences`.

| Slug | Status | Note |
|---|---|---|
| treks | 🔴 Stock | Need a real Hampta or Beas Kund shot |
| snowfall | 🔴 Stock | Solang fresh fall preferred |
| lakes | 🟢 Self-hosted (chandratal) | Fine |
| rivers | 🟢 Self-hosted (beas) | Fine |
| wildlife | 🔴 Stock | Real GHNP / monal / ibex (snow leopard tracking trip would be gold) |
| food | 🟢 Self-hosted (dham) | A shot in Saroj's kitchen would be magical |
| culture | 🟢 Self-hosted (dussehra procession) | Fine |
| after-dark | 🟢 Self-hosted (starry night) | Real Kaza Milky Way shot would be perfect |

**Spec**: 5:6 portrait, ~1200×1440

---

## Priority 4 — Package covers (3 packages)

Defined in `src/data/content.ts` → `packages`.

| Slug | Status | Note |
|---|---|---|
| first-snow | 🔴 Stock | Solang/Manali first snow |
| kullu-roots | 🔴 Stock | Kullu valley orchard |
| spiti-circuit | 🟢 Self-hosted (large — 5 MB) | Compress; consider Key Monastery as alternate |

**Spec**: 4:5 portrait, ~1600×2000

---

## Priority 5 — Spiti Circuit hour-by-hour (the journey demo)

Defined in `src/data/content.ts` → `spitiJourney`. Many hours have illustrative photos, most are stock Unsplash. Replace with actual photos from past Spiti Circuit trips.

**Days that have stock hour photos:**
- Day 1: Bhuntar airport pickup
- Day 2: Sissu waterfall stop
- Day 3: (Key Monastery is self-hosted, fine)
- Day 4: Dhankar fort-monastery
- Day 5: (Chandratal is self-hosted, fine)
- Day 7–9: Various

**Spec**: 16:9, ~1600×900

---

## Priority 6 — Weather Window destination cards (5 destinations)

Defined in `src/components/sections/WeatherWindow.tsx` → `WEATHER`.

| Slug | Status |
|---|---|
| spiti | 🟢 Self-hosted |
| manali | 🔴 Stock |
| shimla | 🔴 Stock |
| kasol | 🟢 Self-hosted |
| dharamshala | 🔴 Stock |

**Spec**: 4:3, ~1600×1200

---

## Priority 7 — Hidden Himachal cards (6 places)

Defined in `src/data/content.ts` → `hiddenPlaces`. These places are the offbeat positioning — a real photo of each would be the strongest possible differentiator.

| Slug | Status | Reuses |
|---|---|---|
| komic | 🟢 Reuses key-monastery.jpg | Real Komic monastery shot |
| hikkim | 🟢 Reuses spiti.jpg | Real post-office shot (the actual board) |
| mudh | 🟢 Reuses chandratal.jpg | Real Pin Valley shot |
| chitkul | 🔴 Stock | Real Chitkul village/Baspa shot |
| malana | 🟢 Reuses kasol-parvati.jpg | Real Malana shot (respect customs) |
| pangi | 🟢 Reuses beas.jpg | Real Pangi/Sach Pass shot |

**Spec**: 4:5 portrait, ~1200×1500

---

## Priority 8 — Food card photos (7 dishes)

Defined in `src/data/content.ts` → `food`. All 🟡 Wikimedia. Generally acceptable but a real shoot in Saroj's kitchen with the actual dishes would be on-brand.

**Spec**: 3:4 portrait, ~900×1200

---

## Photography brief — what to send your photographer

Before the shoot, give them:

- [ ] This wishlist
- [ ] Brand palette tokens (warm earth tones — `snow #F1E4CB`, `pine #3A4A2F`, `alpenglow #B85A3E`, `dusk #8B6B3F`)
- [ ] Tone guidance — Kinfolk, Aman, Apple product page, Ghibli skylines
- [ ] Aspect ratios and dimensions per section (see above)
- [ ] Permission to do indoor portraits at homestays
- [ ] Two-week schedule to catch different light, weather, seasons
- [ ] Specific shot list per destination (Saroj knows the best vantage points)

---

## After the shoot

1. Drop each photo in `public/img/{places,food,hours,packages,hidden}/` with descriptive filenames (e.g. `manali-golden-hour.jpg`).
2. Update the corresponding `image:` field in `src/data/content.ts`.
3. Update `Hero.tsx`'s `src` for the hero photo.
4. Update `AboutSaroj.tsx`'s `src` for the founder photo. Remove the `pahadi-girl.jpg` stand-in.
5. Compress everything — currently `kullu-valley.jpg` is ~8 MB, `kasol-parvati.jpg` is ~10 MB, `spiti.jpg` is ~5 MB. Target ≤1 MB each. Use `cwebp -q 85` or an online tool.
6. Run `npm run build` and check for broken image paths.

---

## Cost estimate (from strategies.md §11 month 2)

- 2 Himachal-resident photographers, 14-day production shoot
- 200+ trip-ready photos across all 8 destinations + Saroj portrait series + Apple Harvest signature
- Budget: ₹2–4 lakh
- This is the single highest-ROI investment before launch.
