"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { destinations } from "@/data/content";

export function Destinations() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);

  return (
    <section
      id="destinations"
      ref={ref}
      className="relative bg-glacier py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div style={{ y: headlineY }} className="max-w-2xl">
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
              Eight valleys, one mountain range
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[64px]">
              The places we know<br /> like the back of a hand.
            </h2>
          </motion.div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-pine/70">
            Each destination has a signature — a single thing it does better than anywhere else in
            the Himalayas. Tap a card to wander.
          </p>
        </div>

        <div
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
          role="list"
        >
          {destinations.map((d, i) => (
            <motion.article
              key={d.slug}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.06,
              }}
              className="group relative aspect-[3/4] w-[78vw] flex-none snap-start overflow-hidden rounded-[3px] sm:w-[44vw] lg:w-[28vw] xl:w-[22vw]"
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 44vw, 78vw"
                className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(180deg, transparent 30%, ${d.color}cc 75%, ${d.color} 100%)`,
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-snow">
                <p className="text-[10.5px] uppercase tracking-[0.25em] opacity-80">
                  {d.elevation}
                </p>
                <h3 className="mt-1 font-display text-[34px] leading-none tracking-tightest">
                  {d.name}
                </h3>
                <p className="mt-2 max-w-xs text-[14px] italic opacity-90">{d.signature}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11.5px] uppercase tracking-[0.18em] opacity-75">
                    {d.bestMonths}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-snow/40 transition-all duration-500 group-hover:bg-snow group-hover:text-pine">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-4 text-[12px] uppercase tracking-[0.22em] text-pine/50">
          Drag to explore →
        </p>
      </div>
    </section>
  );
}
