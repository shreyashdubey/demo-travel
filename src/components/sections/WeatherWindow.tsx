"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { roadStatus } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";

const STATE_STYLE: Record<string, string> = {
  open: "text-pine",
  caution: "text-alpenglow",
  closed: "text-mist",
};

type MonthRow = { name: string; snow: number; temp: string; note: string };
type Destination = {
  name: string;
  elevation: string;
  image: string;
  summary: string;
  months: MonthRow[];
};

// Each destination shows only the months that actually matter for it —
// snow season + a couple of shoulder/peak months — so the user is never
// staring at empty zero-snow bars.
const WEATHER: Record<string, Destination> = {
  spiti: {
    name: "Spiti",
    elevation: "3,650 m",
    image: "/img/places/spiti.jpg",
    summary:
      "Roads open mid-June to October. Snow leopard tracking in deep winter (fly into Kaza). Coldest desert you'll ever love.",
    months: [
      { name: "Jun", snow: 5, temp: "5° / 20°", note: "Roads just opened" },
      { name: "Jul", snow: 0, temp: "8° / 22°", note: "Chandratal at its best" },
      { name: "Aug", snow: 0, temp: "7° / 21°", note: "Clear skies, monasteries open" },
      { name: "Sep", snow: 5, temp: "4° / 18°", note: "Quieter, gold light" },
      { name: "Jan", snow: 95, temp: "−20° / −5°", note: "Snow leopard tracking" },
      { name: "Feb", snow: 95, temp: "−18° / −3°", note: "Coldest — Kaza by air only" },
    ],
  },
  manali: {
    name: "Manali",
    elevation: "2,050 m",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Snow December–February. Apple blossom April–May. Cool and green June–September. Apple harvest October.",
    months: [
      { name: "Dec", snow: 80, temp: "−3° / 8°", note: "Winter takes hold" },
      { name: "Jan", snow: 90, temp: "−4° / 8°", note: "Deep snow — Solang at its best" },
      { name: "Feb", snow: 85, temp: "−2° / 10°", note: "Fresh falls likely" },
      { name: "Mar", snow: 55, temp: "1° / 15°", note: "Snow melts, valley wakes" },
      { name: "May", snow: 5, temp: "10° / 26°", note: "Apple blossom" },
      { name: "Oct", snow: 20, temp: "5° / 18°", note: "Apple harvest — our favourite" },
    ],
  },
  shimla: {
    name: "Shimla",
    elevation: "2,276 m",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Light snow possible December–February. Best for the toy train in October. Avoid May–June crowds.",
    months: [
      { name: "Dec", snow: 60, temp: "−1° / 10°", note: "First snow possible" },
      { name: "Jan", snow: 75, temp: "−1° / 9°", note: "Snow on Mall Road if you're lucky" },
      { name: "Feb", snow: 70, temp: "0° / 11°", note: "Cold, cosy, fewer crowds" },
      { name: "Mar", snow: 40, temp: "4° / 16°", note: "Winter receding" },
      { name: "Oct", snow: 5, temp: "8° / 19°", note: "Best month for the toy train" },
      { name: "Nov", snow: 30, temp: "3° / 13°", note: "The chill returns" },
    ],
  },
  kasol: {
    name: "Kasol & Parvati",
    elevation: "1,580 m",
    image: "/img/places/kasol-parvati.jpg",
    summary:
      "Trekking March–June. Cold river November–March. Skip July–August (landslide-prone monsoon).",
    months: [
      { name: "Mar", snow: 20, temp: "6° / 17°", note: "Trails opening up" },
      { name: "Apr", snow: 5, temp: "10° / 22°", note: "Kheerganga season starts" },
      { name: "May", snow: 0, temp: "14° / 26°", note: "Long days, river loud" },
      { name: "Jun", snow: 0, temp: "17° / 28°", note: "Trekking peak" },
      { name: "Oct", snow: 5, temp: "9° / 19°", note: "Gold autumn pines" },
      { name: "Dec", snow: 40, temp: "1° / 10°", note: "Snow on the high passes" },
    ],
  },
  dharamshala: {
    name: "Dharamshala",
    elevation: "1,457 m",
    image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Mild winters with occasional snow. Triund trek best April–June and September–November. Heavy monsoon July–August.",
    months: [
      { name: "Mar", snow: 15, temp: "9° / 19°", note: "Rhododendrons in bloom" },
      { name: "Apr", snow: 0, temp: "13° / 25°", note: "Triund trek ideal" },
      { name: "Sep", snow: 0, temp: "16° / 24°", note: "Clear, comfortable" },
      { name: "Oct", snow: 5, temp: "12° / 22°", note: "Festival season" },
      { name: "Nov", snow: 15, temp: "7° / 17°", note: "Cold returns" },
      { name: "Dec", snow: 30, temp: "4° / 13°", note: "Winter starts" },
    ],
  },
};

export function WeatherWindow() {
  const [place, setPlace] = useState<string>("spiti");
  const data = WEATHER[place];

  return (
    <section id="weather" className="relative bg-glacier py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-alpenglow px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-snow">
              ❄ Free planning tool
            </span>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[58px]">
              Will it snow when you visit?<br /> See for yourself.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-pine/70">
            Pick a place. We show only the months that matter — when it snows, when it's
            comfortable, when to skip. Based on ten years of regional data.
          </p>
        </div>

        {/* Road status — updated by our driver network */}
        <div className="mb-10 rounded-[3px] border border-pine/10 bg-white p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-pine/10 pb-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-pine">
              Roads today
            </p>
            <p className="text-[11.5px] text-pine/55">
              Last checked {roadStatus.updated} · by {roadStatus.by}
            </p>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {roadStatus.routes.map((r) => (
              <li key={r.name} className="rounded-[3px] bg-glacier/50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[14px] font-medium text-pine">{r.name}</span>
                  <span
                    className={`flex-none text-[10.5px] font-medium uppercase tracking-[0.18em] ${STATE_STYLE[r.state]}`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-snug text-pine/70">{r.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Destination tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.entries(WEATHER).map(([key, p]) => (
            <button
              key={key}
              onClick={() => setPlace(key)}
              className={`rounded-full border px-4 py-2.5 transition-all ${
                place === key
                  ? "border-pine bg-pine text-snow"
                  : "border-pine/15 bg-white text-pine hover:border-pine/40"
              }`}
            >
              <span className="font-display text-[15px] leading-none tracking-tightest">
                {p.name}
              </span>
              <span
                className={`ml-2 font-mono text-[10.5px] uppercase tracking-[0.18em] ${
                  place === key ? "text-snow/65" : "text-pine/50"
                }`}
              >
                {p.elevation}
              </span>
            </button>
          ))}
        </div>

        {/* Destination card with photo + summary + months */}
        <motion.div
          key={place}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[4px] border border-pine/10 bg-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={data.image}
                alt={data.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 via-night/20 to-transparent p-5 text-snow">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-85">
                  {data.elevation}
                </p>
                <h3 className="mt-1 font-display text-[36px] leading-none tracking-tightest sm:text-[44px]">
                  {data.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[15px] leading-relaxed text-pine/85">{data.summary}</p>

              <p className="mt-7 mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-pine/55">
                Months that matter
              </p>
              <ul className="space-y-3">
                {data.months.map((m) => (
                  <li key={m.name} className="flex items-center gap-4">
                    <span className="w-10 flex-none font-display text-[20px] leading-none tracking-tightest text-pine">
                      {m.name}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
                        <span className="text-pine/80">{m.note}</span>
                        <span className="flex-none font-mono text-pine/55">
                          {m.snow > 0 ? `❄ ${m.snow}% · ` : ""}
                          {m.temp}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-pine/10">
                        <div
                          className="h-full rounded-full bg-alpenglow"
                          style={{ width: `${m.snow}%` }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl(
                  `Hi Saroj, I'd like to plan a ${data.name} trip. What dates do you recommend?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
                </svg>
                Enquire about {data.name} dates
              </a>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-[13px] text-pine/55">
          Based on regional climate averages — not a forecast. Saroj will confirm what to expect
          for your specific dates over WhatsApp.
        </p>
      </div>
    </section>
  );
}
