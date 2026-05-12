"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
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
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Currently we have one fully wired package; others fall back to spitiJourney for the demo.
  const days = spitiJourney;
  const pack = packages.find((p) => p.slug === (selected ?? "spiti-circuit"))!;
  const totalDays = days.length;
  const totalMoments = days.reduce((s, d) => s + d.hours.length, 0);
  const placeCount = new Set(days.map((d) => d.place)).size;

  const enquireHref = whatsappUrl(
    `Hi Saroj, I'd like to enquire about the ${pack.title} journey (${pack.days} days, ${pack.nights} nights).`,
  );

  const scrollToDay = (dayNum: number) => {
    const jump = () => {
      const el = document.getElementById(`day-${dayNum}`);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    if (!expanded) {
      setExpanded(true);
      window.setTimeout(jump, 700);
    } else {
      jump();
    }
  };

  return (
    <section ref={ref} id="journey" className="relative bg-glacier">
      {/* Static journey header, no overlap with TopBar */}
      <div className="border-b border-pine/10 bg-glacier">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-dusk">
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

      <JourneyTeaser
        days={days}
        totalMoments={totalMoments}
        placeCount={placeCount}
        firstPlace={days[0].place}
        lastPlace={days[days.length - 1].place}
        expanded={expanded}
        onToggle={() => setExpanded((e) => !e)}
        onDayClick={scrollToDay}
      />

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="days"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden"
          >
            {days.map((d, i) => (
              <DaySection
                key={d.day}
                day={d}
                index={i}
                total={totalDays}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal panel */}
      <EnquirePanel pack={pack} enquireHref={enquireHref} />
    </section>
  );
}

function JourneyTeaser({
  days,
  totalMoments,
  placeCount,
  firstPlace,
  lastPlace,
  expanded,
  onToggle,
  onDayClick,
}: {
  days: JourneyDay[];
  totalMoments: number;
  placeCount: number;
  firstPlace: string;
  lastPlace: string;
  expanded: boolean;
  onToggle: () => void;
  onDayClick: (day: number) => void;
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10 sm:py-14">
      <div className="text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-dusk">
          The map
        </p>
        <h3 className="mt-2.5 font-display text-[30px] leading-[1.02] tracking-tightest text-pine sm:text-[42px]">
          {firstPlace} <span className="font-sans text-[0.6em] font-medium uppercase tracking-[0.18em] text-pine/55">to</span> {lastPlace}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-pine/75 sm:text-[16.5px]">
          Hour by hour, from first light to the last star.
        </p>
      </div>

      <div className="relative mt-7 -mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-10 sm:px-10 [&::-webkit-scrollbar]:hidden">
        <ol className="relative mx-auto flex snap-x snap-mandatory items-start gap-3 pb-1 sm:max-w-[1080px] sm:snap-none sm:gap-2">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[80px] right-[80px] top-[14px] hidden h-px bg-pine/20 sm:block"
            style={{ left: "calc((100% / 18))", right: "calc((100% / 18))" }}
          />
          {days.map((d) => {
            const c = PHASE_COLORS[d.phase];
            return (
              <li
                key={d.day}
                className="relative z-10 flex w-[150px] flex-none snap-start flex-col items-center sm:w-auto sm:min-w-0 sm:flex-1"
              >
                <button
                  type="button"
                  onClick={() => onDayClick(d.day)}
                  aria-label={`Jump to Day ${d.day}: ${d.title}, ${d.place}`}
                  className="grid h-7 w-7 place-items-center rounded-full ring-[3px] ring-glacier transition-transform duration-300 ease-soft hover:scale-[1.18] focus-visible:outline-none focus-visible:ring-pine"
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                >
                  <span
                    className="text-[10.5px] font-bold tabular-nums"
                    style={{ color: c.text }}
                  >
                    {d.day}
                  </span>
                </button>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-pine/60">
                  Day {d.day}
                </p>
                <p className="mt-1 text-pretty text-center text-[13px] leading-tight text-pine sm:text-[11.5px] sm:text-pine/85">
                  {d.place}
                </p>
              </li>
            );
          })}
        </ol>
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-glacier to-transparent sm:hidden"
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-pine/10 py-4 sm:gap-x-14">
        <Stat label="Days" value={`${days.length}`} />
        <Stat label="Moments" value={`${totalMoments}`} />
        <Stat label="Places" value={`${placeCount}`} />
        <Stat label="Group" value="≤ 6" />
      </div>

      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="group inline-flex items-center gap-3 rounded-full bg-pine px-7 py-3.5 text-[14.5px] font-semibold text-snow shadow-md transition-all hover:bg-pine/90"
        >
          <span>
            {expanded ? "Close the day-by-day" : `Open the ${days.length}-day journey`}
          </span>
          <span
            aria-hidden
            className={`grid h-6 w-6 place-items-center rounded-full bg-snow/15 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-snow"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-[28px] leading-none tracking-tightest text-pine sm:text-[32px]">
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-pine/55">
        {label}
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
    <div
      id={`day-${day.day}`}
      className="relative grid scroll-mt-24 grid-cols-1 gap-5 border-t border-pine/10 px-5 py-10 first:border-t-0 sm:gap-6 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-8"
    >
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <DayCard day={day} progress={localProgress} total={total} />
        </div>
      </div>

      <ol className="space-y-3.5 sm:space-y-4 lg:col-span-9">
        {day.hours.map((h, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            className="grid grid-cols-[56px_1fr] items-start gap-3 sm:grid-cols-[76px_1fr] sm:gap-5"
          >
            <div className="font-mono text-[13px] font-medium tracking-tight text-pine sm:text-[14px]">
              <div>{h.time}</div>
              <div className="mt-1 h-px w-4 bg-pine/40" />
            </div>
            <div className="rounded-[3px] bg-snow/80 p-3.5 backdrop-blur-md ring-soft sm:p-4">
              <h4 className="font-display text-[18px] leading-[1.2] tracking-tightest text-pine sm:text-[20px]">
                {h.title}
              </h4>
              <p className="mt-1.5 max-w-prose text-pretty text-[14px] leading-[1.55] text-pine/85 sm:text-[14.5px]">
                {h.detail}
              </p>
              {h.image && (
                <div className="mt-2.5">
                  <div className="overflow-hidden rounded-[3px]">
                    <div className="relative aspect-[2/1]">
                      <Image
                        src={h.image}
                        alt={`${h.title}, ${day.place}, Himachal Pradesh (${h.time}).`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 92vw"
                        className="object-cover transition-transform duration-[1200ms] ease-soft hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  {h.imageCredit &&
                    (h.imageCredit.url ? (
                      <a
                        href={h.imageCredit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-[11.5px] text-pine/60 hover:text-pine/85 hover:underline"
                      >
                        {h.imageCredit.text}
                      </a>
                    ) : (
                      <p className="mt-2 text-[11.5px] text-pine/60">{h.imageCredit.text}</p>
                    ))}
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
      <div className="relative aspect-[16/9] lg:aspect-[4/3]">
        <Image
          src={day.cover}
          alt={`Day ${day.day} of the Spiti Circuit, ${day.title}. ${day.place}, elevation ${day.elevation}.`}
          fill
          sizes="(min-width: 1024px) 22vw, 92vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/55" />
        <div className="absolute inset-x-0 bottom-0 p-3 text-snow sm:p-3.5">
          <p className="text-[12px] font-medium tracking-wide opacity-95">
            Day {day.day} of {total}
          </p>
          <h3 className="mt-1 font-display text-[19px] leading-[1.05] tracking-tightest sm:text-[21px]">
            {day.title}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
        <div className="py-2">
          <div className="text-[10.5px] uppercase tracking-[0.12em] opacity-75">Place</div>
          <div className="mt-1 text-[12.5px] font-medium">{day.place}</div>
        </div>
        <div className="py-2">
          <div className="text-[10.5px] uppercase tracking-[0.12em] opacity-75">Elev.</div>
          <div className="mt-1 text-[12.5px] font-medium">{day.elevation}</div>
        </div>
        <div className="py-2">
          <div className="text-[10.5px] uppercase tracking-[0.12em] opacity-75">Sky</div>
          <div className="mt-1 font-medium">
            <WeatherIcon w={day.weather} />
          </div>
        </div>
      </div>
      <div className="px-2.5 pb-2 pt-0.5">
        <div className="h-[3px] overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full bg-white"
            style={{ scaleX: progress, transformOrigin: "left" }}
          />
        </div>
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
      className="relative z-20 mx-auto max-w-[1280px] px-5 pb-16 pt-4 sm:px-10 sm:pb-20 sm:pt-6"
    >
      <div className="overflow-hidden rounded-[4px] bg-pine text-snow ring-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto">
            <Image
              src={pack.cover}
              alt={`${pack.title}, ${pack.days}-day, ${pack.nights}-night small-group Himachal journey.`}
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
                    "A welcome pack, hand-drawn map, language card, pressed leaf bookmark",
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
                className="inline-flex w-fit flex-none items-center gap-2 whitespace-nowrap rounded-full bg-[#25D366] px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
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
