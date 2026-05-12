"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { trustPoints } from "@/data/content";

export function AboutSaroj() {
  return (
    <section id="saroj" className="relative bg-pine py-24 text-snow sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[3px] ring-1 ring-snow/10"
            >
              <Image
                src="/img/places/pahadi-girl.jpg"
                alt="A Pahadi woman in traditional Kullvi dress"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine/60 via-transparent" />
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-alpenglow">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-alpenglow/60" />
              Who runs this
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest sm:text-[58px] lg:text-[68px]">
              Born in Bhuntar.<br />
              <span className="text-alpenglow">Walked every valley.</span><br />
              Now she takes you home.
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-y-7 sm:grid-cols-[80px_1fr] sm:gap-x-8">
              {[
                ["Born", "In Bhuntar, the small town in the Kullu valley where the airport sits and the Beas meets the Parvati."],
                ["School", "Right here in the valley. Pine forests on the way to school, the river loud in monsoon."],
                ["Tourism", "Studied hotel management and tourism, because she wanted to learn how to host people the way Pahari families already do, but at scale."],
                ["2017", "Founded Wandering Saya Travels with a single Innova and a notebook full of homestay friends."],
                ["Today", "Eight drivers, eleven homestay families. In the off-season she travels, Ladakh, Bhutan, Nepal, Norway, Patagonia next, to bring back what the world is doing right."],
              ].map(([year, line]) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="contents"
                >
                  <div className="font-mono text-[13px] uppercase tracking-[0.22em] text-snow/60">
                    {year}
                  </div>
                  <p className="text-[16px] leading-relaxed text-snow/85">{line}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust strip, big numbers + the promise behind each */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-[3px] bg-snow/10 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="bg-pine p-6"
            >
              <p className="font-display text-[52px] leading-none tracking-tightest text-alpenglow">
                {p.stat}
              </p>
              <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.22em] text-snow/65">
                {p.label}
              </p>
              <p className="mt-4 text-[13.5px] leading-snug text-snow/80">{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
