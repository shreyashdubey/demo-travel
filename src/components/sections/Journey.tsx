"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { spitiJourney, packages, type JourneyDay } from "@/data/content";
import { useSound } from "@/components/providers/SoundProvider";

const PHASE_COLORS: Record<JourneyDay["phase"], { from: string; to: string; text: string }> = {
  dawn: { from: "#f6dcc4", to: "#c79a7e", text: "#3a2a22" },
  noon: { from: "#cfe6ee", to: "#7ea3b8", text: "#1f2e3a" },
  dusk: { from: "#e8895c", to: "#5c3b48", text: "#fff5ec" },
  night: { from: "#1f2a44", to: "#070b18", text: "#e7e9f5" },
};

export function Journey({ selected }: { selected: string | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Currently we have one fully wired package; others fall back to spitiJourney for the demo.
  const days = spitiJourney;
  const pack = packages.find((p) => p.slug === (selected ?? "spiti-circuit"))!;
  const totalDays = days.length;

  // Determine current day from progress
  const [currentIdx, setCurrentIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(totalDays - 1, Math.floor(p * totalDays));
    setCurrentIdx(idx);
  });

  const { play } = useSound();
  const prevIdx = useRef(0);
  useEffect(() => {
    if (currentIdx !== prevIdx.current) {
      prevIdx.current = currentIdx;
      play("chime");
    }
  }, [currentIdx, play]);

  const current = days[currentIdx];
  const phase = current.phase;

  // Map line draw progress
  const lineProgress = useTransform(scrollYProgress, [0.02, 0.95], [0, 1]);

  return (
    <section ref={ref} id="journey" className="relative bg-snow">
      {/* Sticky top map */}
      <div className="sticky top-0 z-30 h-[80px] w-full">
        <RouteMap days={days} progress={lineProgress} currentIdx={currentIdx} />
      </div>

      {/* Day sections */}
      <div className="relative z-10">
        {days.map((d, i) => (
          <DaySection
            key={d.day}
            day={d}
            index={i}
            total={totalDays}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Reveal panel */}
      <PriceReveal pack={pack} />
    </section>
  );
}

function RouteMap({
  days,
  progress,
  currentIdx,
}: {
  days: JourneyDay[];
  progress: MotionValue<number>;
  currentIdx: number;
}) {
  const dasharray = 1000;
  const offset = useTransform(progress, (p) => dasharray * (1 - (p as number)));

  return (
    <div className="glass border-b border-pine/10">
      <div className="mx-auto flex h-[80px] max-w-[1280px] items-center gap-4 px-5 sm:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-pine/70">
          Spiti Circuit
        </span>
        <svg
          viewBox="0 0 1000 30"
          className="h-8 flex-1"
          preserveAspectRatio="none"
        >
          <path
            d="M5,15 C100,5 200,25 300,12 S500,22 600,10 700,20 800,12 920,18 995,12"
            stroke="rgba(31,58,46,0.12)"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M5,15 C100,5 200,25 300,12 S500,22 600,10 700,20 800,12 920,18 995,12"
            stroke="#1F3A2E"
            strokeWidth="2"
            fill="none"
            strokeDasharray={dasharray}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          {days.map((d, i) => {
            const x = 5 + (i / (days.length - 1)) * 990;
            const active = i <= currentIdx;
            return (
              <g key={i}>
                <circle cx={x} cy={15} r={active ? 5 : 3.5} fill={active ? "#1F3A2E" : "#B8C2C9"} />
                {active && <circle cx={x} cy={15} r={9} fill="rgba(31,58,46,0.12)" />}
              </g>
            );
          })}
        </svg>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-pine/70 sm:block">
          Day {currentIdx + 1} / {days.length}
        </span>
      </div>
    </div>
  );
}

function DaySection({
  day,
  index,
  total,
  scrollYProgress,
}: {
  day: JourneyDay;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const localStart = index / total;
  const localEnd = (index + 1) / total;
  const localProgress = useTransform(scrollYProgress, [localStart, localEnd], [0, 1]);

  return (
    <div className="relative grid grid-cols-1 gap-8 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-12 lg:gap-10">
      {/* Sticky day card */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[120px]">
          <DayCard day={day} progress={localProgress} />
        </div>
      </div>

      {/* Hours timeline */}
      <ol className="lg:col-span-8 space-y-6">
        {day.hours.map((h, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
            className="grid grid-cols-[80px_1fr] items-start gap-5 sm:grid-cols-[100px_1fr] sm:gap-8"
          >
            <div className="font-mono text-[15px] tracking-tight text-pine">
              <div>{h.time}</div>
              <div className="mt-1 h-px w-6 bg-pine/30" />
            </div>
            <div className="rounded-[3px] bg-snow/80 p-5 backdrop-blur-md ring-soft sm:p-6">
              <h4 className="font-display text-[24px] leading-tight tracking-tightest text-pine sm:text-[28px]">
                {h.title}
              </h4>
              <p className="mt-2 max-w-prose text-pretty text-[15px] leading-relaxed text-pine/75">
                {h.detail}
              </p>
              {h.image && (
                <div className="mt-4 overflow-hidden rounded-[3px]">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={h.image}
                      alt={h.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 92vw"
                      className="object-cover transition-transform duration-[1200ms] ease-soft hover:scale-[1.04]"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function DayCard({
  day,
  progress,
}: {
  day: JourneyDay;
  progress: MotionValue<number>;
}) {
  const c = PHASE_COLORS[day.phase];
  return (
    <motion.div
      className="overflow-hidden rounded-[3px] ring-soft"
      style={{
        background: `linear-gradient(180deg, ${c.from}, ${c.to})`,
        color: c.text,
      }}
    >
      <div className="relative aspect-[4/3]">
        <Image src={day.cover} alt={day.title} fill sizes="(min-width: 1024px) 30vw, 92vw" className="object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-snow">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-85">
            Day {day.day}
          </p>
          <h3 className="mt-1 font-display text-[28px] leading-none tracking-tightest">
            {day.title}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/10 text-center text-[11px] uppercase tracking-[0.18em]">
        <div className="py-3">
          <div className="opacity-70">Place</div>
          <div className="mt-1 font-medium normal-case tracking-normal">{day.place}</div>
        </div>
        <div className="py-3">
          <div className="opacity-70">Elev.</div>
          <div className="mt-1 font-medium normal-case tracking-normal">{day.elevation}</div>
        </div>
        <div className="py-3">
          <div className="opacity-70">Sky</div>
          <div className="mt-1 font-medium normal-case tracking-normal">
            <WeatherIcon w={day.weather} />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="h-1 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full bg-white"
            style={{ scaleX: progress, transformOrigin: "left" }}
          />
        </div>
        <p className="mt-2 text-[10.5px] uppercase tracking-[0.22em] opacity-70">
          The day passes as you scroll
        </p>
      </div>
    </motion.div>
  );
}

function WeatherIcon({ w }: { w: JourneyDay["weather"] }) {
  const className = "inline-block h-4 w-4 align-middle";
  if (w === "snow")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
      </svg>
    );
  if (w === "sun")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
      </svg>
    );
  if (w === "cloud")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 18h13a4 4 0 0 0 0-8 6 6 0 0 0-11.7-1A4 4 0 0 0 5 18Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l2 5 5 1-4 4 1 6-4-3-4 3 1-6-4-4 5-1z" />
    </svg>
  );
}

function PriceReveal({ pack }: { pack: typeof packages[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 mx-auto max-w-[1280px] px-5 pb-24 pt-8 sm:px-10 sm:pb-32"
    >
      <div className="overflow-hidden rounded-[4px] bg-pine text-snow ring-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto">
            <Image src={pack.cover} alt={pack.title} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-pine/80 via-pine/30 to-transparent" />
          </div>
          <div className="p-8 sm:p-12 lg:col-span-7">
            <p className="text-[11.5px] uppercase tracking-[0.22em] text-snow/60">
              The journey ends. The bill arrives, gently.
            </p>
            <h3 className="mt-3 font-display text-[40px] leading-[1.02] tracking-tightest sm:text-[56px]">
              {pack.title}
            </h3>
            <p className="mt-3 max-w-md text-pretty text-[15.5px] leading-relaxed text-snow/80">
              {pack.pitch}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-y-3 border-t border-snow/15 pt-6 text-[13.5px] sm:grid-cols-4">
              {[
                ["Days", `${pack.days}`],
                ["Nights", `${pack.nights}`],
                ["Group", "≤ 6"],
                ["Pace", "Considered"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-snow/55">{k}</p>
                  <p className="mt-1 font-display text-[20px] tracking-tightest">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-snow/55">
                  Included
                </p>
                <ul className="space-y-1.5 text-[14px] text-snow/85">
                  {[
                    "Private vehicle + driver",
                    "All homestays / camps",
                    "Daily breakfast + dinner",
                    "Local guide on trek days",
                    "Inner-line permits",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-alpenglow" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-snow/55">
                  Not included
                </p>
                <ul className="space-y-1.5 text-[14px] text-snow/85">
                  {["Flights to Bhuntar / Chandigarh", "Lunch", "Personal extras"].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-mist" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-snow/15 pt-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-snow/55">From</p>
                <p className="mt-1 font-display text-[44px] leading-none tracking-tightest">
                  ₹{pack.priceFrom.toLocaleString("en-IN")}
                  <span className="ml-2 text-[14px] text-snow/60">/ pp · twin sharing</span>
                </p>
              </div>
              <a
                href="#book"
                className="group inline-flex items-center gap-2 rounded-full bg-alpenglow px-7 py-4 text-[14.5px] font-medium text-pine transition-colors hover:bg-snow"
              >
                Reserve this journey
                <svg
                  className="transition-transform duration-500 ease-soft group-hover:translate-x-1"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
