"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { spitiJourney, packages, type JourneyDay } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";

const PHASE_COLORS: Record<JourneyDay["phase"], { from: string; to: string; text: string }> = {
  dawn: { from: "#F4D9B0", to: "#C49874", text: "#3D2E1F" },
  noon: { from: "#E7DAB9", to: "#A8927A", text: "#3A4A2F" },
  dusk: { from: "#B85A3E", to: "#3E2820", text: "#F1E4CB" },
  night: { from: "#241B11", to: "#0D0805", text: "#E7DAB9" },
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

  const enquireHref = whatsappUrl(
    `Hi Saroj, I'd like to enquire about the ${pack.title} journey (${pack.days} days, ${pack.nights} nights).`,
  );

  return (
    <section ref={ref} id="journey" className="relative bg-snow">
      {/* Static journey header — no overlap with TopBar */}
      <div className="border-y border-pine/10 bg-glacier">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dusk">
              The journey · day by day
            </p>
            <h2 className="mt-1 font-display text-[26px] leading-none tracking-tightest text-pine sm:text-[32px]">
              {pack.title} · {days.length} days, hour by hour
            </h2>
          </div>
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
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
      <EnquirePanel pack={pack} enquireHref={enquireHref} />
    </section>
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
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[120px]">
          <DayCard day={day} progress={localProgress} total={total} />
        </div>
      </div>

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
                      alt={`${h.title} — ${day.place}, Himachal Pradesh (${h.time}).`}
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
  total,
}: {
  day: JourneyDay;
  progress: MotionValue<number>;
  total: number;
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
        <Image
          src={day.cover}
          alt={`Day ${day.day} of the Spiti Circuit — ${day.title}. ${day.place}, elevation ${day.elevation}.`}
          fill
          sizes="(min-width: 1024px) 30vw, 92vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-snow">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-85">
            Day {day.day} of {total}
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

function EnquirePanel({
  pack,
  enquireHref,
}: {
  pack: typeof packages[number];
  enquireHref: string;
}) {
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
            <Image
              src={pack.cover}
              alt={`${pack.title} — ${pack.days}-day, ${pack.nights}-night small-group Himachal journey.`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pine/80 via-pine/30 to-transparent" />
          </div>
          <div className="p-8 sm:p-12 lg:col-span-7">
            <p className="text-[11.5px] uppercase tracking-[0.22em] text-snow/60">
              Plan your dates with Saroj
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
                    "A welcome pack — hand-drawn map, language card, pressed leaf bookmark",
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

            <div className="mt-10 flex flex-col items-start gap-3 border-t border-snow/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13.5px] text-snow/75">
                Pricing changes with the season. Saroj will WhatsApp you a fair quote within 4 hours.
              </p>
              <a
                href={enquireHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
                </svg>
                Enquire for a quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
