"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function StoryStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      className="relative bg-snow py-28 sm:py-40 lg:py-52"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.div
            style={{ y }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2px] ring-soft"
          >
            <Image
              src="https://images.unsplash.com/photo-1601999117317-3f3a4e066d49?auto=format&fit=crop&w=1200&q=80"
              alt="Saroj Thakur in his home valley"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine/40 via-transparent" />
          </motion.div>
          <p className="mt-4 text-[12px] uppercase tracking-[0.22em] text-mist">
            Saroj Thakur · Patlikuhl, Kullu
          </p>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-dusk">
            <span className="h-px w-8 bg-dusk/60" />
            A note from the founder
          </p>
          <h2 className="font-display text-balance text-[36px] leading-[1.04] tracking-tightest text-pine sm:text-[58px] lg:text-[68px]">
            <Reveal delay={0}>I grew up in Kullu.</Reveal>
            <Reveal delay={0.12}>
              <span className="text-dusk">I came back from Delhi</span>
            </Reveal>
            <Reveal delay={0.24}>to take you home.</Reveal>
          </h2>
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-xl text-pretty text-[16.5px] leading-[1.7] text-pine/75">
              I started Dhodhu Travels in 2017 with one Innova and a list of friends who knew the
              best apple tea, the gentlest river crossing, the snowfield that doesn't make the
              guidebooks. We are now eight drivers and eleven homestay families. We will not put
              you on a bus. We will not pretend a destination is yours when it is not.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["Local", "first."],
                ["Slow", "always."],
                ["Mountains", "decide."],
              ].map(([a, b]) => (
                <li
                  key={a}
                  className="rounded-[2px] border border-pine/10 bg-white/40 p-5 backdrop-blur-sm"
                >
                  <p className="font-display text-[28px] leading-none tracking-tightest text-pine">
                    {a}
                  </p>
                  <p className="mt-1 text-[14px] text-pine/60">{b}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.span
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      className="block"
    >
      {children}
    </motion.span>
  );
}
