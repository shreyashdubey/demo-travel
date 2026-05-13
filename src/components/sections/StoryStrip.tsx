"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const manifesto = [
  { word: "Local", tail: "first.", offset: "ml-0" },
  { word: "Slow", tail: "always.", offset: "ml-3 sm:ml-10 lg:ml-16" },
  { word: "Mountains", tail: "decide.", offset: "ml-8 sm:ml-20 lg:ml-32" },
] as const;

const contourPattern =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='%23F1E4CB' stroke-width='0.6'%3E%3Cpath d='M-50 220 Q200 80 400 220 T850 220'/%3E%3Cpath d='M-50 260 Q200 110 400 260 T850 260'/%3E%3Cpath d='M-50 300 Q200 150 400 300 T850 300'/%3E%3Cpath d='M-50 340 Q200 200 400 340 T850 340'/%3E%3Cpath d='M-50 380 Q200 240 400 380 T850 380'/%3E%3Cpath d='M-50 420 Q200 280 400 420 T850 420'/%3E%3C/g%3E%3C/svg%3E\")";

export function StoryStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const patternY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-br from-pine via-pine to-night text-snow"
    >
      <motion.div
        aria-hidden
        style={{
          y: patternY,
          backgroundImage: contourPattern,
          backgroundSize: "1100px 800px",
          backgroundRepeat: "repeat",
        }}
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[460px] w-[460px] rounded-full bg-alpenglow/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <div className="mb-8 flex items-center gap-3 sm:mb-10">
          <span className="h-px w-10 bg-gold/60" />
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold">
            A note from the founder
          </p>
          <span className="h-px flex-1 bg-snow/10" />
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <motion.div
              style={{ y: photoY }}
              className="relative aspect-[5/6] overflow-hidden rounded-[2px] ring-1 ring-gold/30 lg:aspect-[4/5]"
            >
              <Image
                src="/img/saroj/founder.jpg"
                alt="Saroj Thakur, founder of Wandering Saya Travels, in Kullu, Himachal Pradesh."
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine/80 via-pine/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-transparent mix-blend-overlay" />
            </motion.div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-snow/55">
                Saroj Thakur
              </span>
              <span className="h-px flex-1 bg-snow/15" />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold/80">
                Bhuntar · Kullu
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display text-balance text-[36px] leading-[1.04] tracking-tightest text-snow sm:text-[52px] lg:text-[64px]">
              <Reveal delay={0}>I was born in Bhuntar.</Reveal>
              <Reveal delay={0.12}>
                <span className="italic text-gold">I studied tourism</span>
              </Reveal>
              <Reveal delay={0.24}>so I could take you home.</Reveal>
            </h2>
            <Reveal delay={0.4}>
              <p className="mt-7 max-w-xl text-pretty text-[15.5px] leading-[1.7] text-snow/75">
                My whole life has been in this valley. I did hotel management and
                tourism because I wanted to learn how to host people the way Pahari
                families already do, properly, slowly, without fuss. I started
                Wandering Saya Travels in 2017 with one Innova and a notebook of
                homestay friends. Today we are eight drivers and eleven homestay
                families. We will not put you on a bus. We will not pretend a place
                is yours when it is not.
              </p>
            </Reveal>

            <div className="mt-10 sm:mt-12">
              {manifesto.map(({ word, tail, offset }, i) => (
                <Reveal key={word} delay={0.1 + i * 0.12}>
                  <div
                    className={`flex flex-col gap-0 sm:flex-row sm:items-baseline sm:gap-6 ${offset}`}
                  >
                    <span className="font-display text-[38px] leading-[0.95] tracking-tightest text-snow sm:text-[54px] lg:text-[68px]">
                      {word}
                    </span>
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/60 to-gold/0 sm:block" />
                    <span className="self-end font-display text-[19px] italic text-gold/90 sm:self-auto sm:text-[24px] lg:text-[28px]">
                      {tail}
                    </span>
                  </div>
                  {i < manifesto.length - 1 && (
                    <div className="my-2 h-px w-full bg-snow/10 sm:my-3" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
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
