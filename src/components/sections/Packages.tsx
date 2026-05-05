"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { packages } from "@/data/content";
import { useSound } from "@/components/providers/SoundProvider";

export function Packages({
  onSelect,
  selected,
}: {
  onSelect: (slug: string) => void;
  selected: string | null;
}) {
  const { play } = useSound();

  return (
    <section
      id="journeys"
      className="relative bg-snow py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
              Curated journeys
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[64px]">
              Three journeys.<br /> One way to travel.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-pine/70">
            Tap a card to step into the journey hour-by-hour. We'll walk you through it like
            you're already on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {packages.map((p, i) => (
            <motion.button
              key={p.slug}
              onClick={() => {
                play("chime");
                onSelect(p.slug);
                requestAnimationFrame(() => {
                  document
                    .getElementById("journey")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                });
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className={`group relative aspect-[4/5] overflow-hidden rounded-[3px] text-left transition-all ${
                selected === p.slug ? "ring-2 ring-pine ring-offset-2 ring-offset-snow" : ""
              }`}
            >
              <Image
                src={p.cover}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 32vw, 92vw"
                className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 text-snow">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-90">
                  {p.days}D · {p.nights}N
                </div>
                <span
                  className="grid h-9 w-9 place-items-center rounded-full border"
                  style={{ borderColor: `${p.accent}99`, color: p.accent }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-snow">
                <h3 className="font-display text-[34px] leading-none tracking-tightest">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-sm text-pretty text-[14px] leading-snug text-snow/85">
                  {p.pitch}
                </p>
                <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
                  <div>
                    <p className="text-[10.5px] uppercase tracking-[0.22em] text-snow/65">
                      From
                    </p>
                    <p className="font-display text-[22px] leading-none tracking-tightest">
                      ₹{p.priceFrom.toLocaleString("en-IN")}
                      <span className="ml-1 text-[12px] text-snow/65"> / pp</span>
                    </p>
                  </div>
                  <span
                    className="text-[12.5px] underline-offset-4 group-hover:underline"
                    style={{ color: p.accent }}
                  >
                    Begin journey →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[3px] border border-pine/10 bg-glacier p-6">
            <p className="text-[12px] uppercase tracking-[0.22em] text-dusk">
              Don't see your trip?
            </p>
            <p className="mt-2 font-display text-[26px] leading-tight tracking-tightest text-pine">
              We build journeys around your dates, pace and people. Tell us what you're after —
              we'll send you a draft within a day.
            </p>
          </div>
          <a
            href="#book"
            className="grid place-items-center rounded-[3px] bg-pine p-8 text-center text-snow transition-colors hover:bg-pine/90"
          >
            <div>
              <p className="font-display text-[24px] leading-tight tracking-tightest">
                Build your own →
              </p>
              <p className="mt-2 text-[13px] text-snow/70">A 2-minute conversation, that's all.</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
