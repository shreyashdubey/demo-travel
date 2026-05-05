"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { food, phrases } from "@/data/content";

export function FoodCulture() {
  const [active, setActive] = useState<number | null>(null);
  const dish = active !== null ? food[active] : null;

  return (
    <section id="food" className="relative bg-snow py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
              Pahari kitchens, slow festivals
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[64px]">
              The food is half the<br /> reason you're here.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-pine/70">
            Every itinerary includes one Pahari kitchen visit, one festival day if the calendar
            agrees, and one quiet meal you'll think about for years.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {food.map((d, i) => (
            <motion.button
              key={d.name}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className="group relative aspect-[3/4] overflow-hidden rounded-[3px] text-left"
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(min-width: 1024px) 14vw, (min-width: 640px) 30vw, 46vw"
                className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-snow">
                <p className="font-display text-[18px] leading-tight tracking-tightest">
                  {d.name}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Culture mosaic */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
              <Image
                src="https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1600&q=80"
                alt="Kullu Dussehra deota procession"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-snow sm:p-8">
                <p className="text-[11.5px] uppercase tracking-[0.22em] text-snow/75">
                  Kullu Dussehra · October
                </p>
                <h3 className="mt-2 font-display text-[28px] leading-tight tracking-tightest sm:text-[36px]">
                  A festival where 200 village deities walk into town.
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-rows-2 gap-5">
            <div className="relative overflow-hidden rounded-[3px] bg-dusk text-snow">
              <div className="relative aspect-[16/10] sm:aspect-auto sm:h-full">
                <Image
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80"
                  alt="Kullvi shawl loom"
                  fill
                  className="object-cover opacity-50"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-[11.5px] uppercase tracking-[0.22em] text-snow/80">
                  Pattu shawls · Kullu loom
                </p>
                <p className="mt-1 font-display text-[22px] leading-tight tracking-tightest">
                  Two hundred years of pattern, four colours, one loom.
                </p>
              </div>
            </div>

            <div className="rounded-[3px] border border-pine/10 bg-glacier p-6">
              <p className="text-[11.5px] uppercase tracking-[0.22em] text-dusk">
                A phrase a day, in Pahari
              </p>
              <ul className="mt-3 space-y-2.5">
                {phrases.map((p) => (
                  <li
                    key={p.en}
                    className="flex items-baseline justify-between gap-3 border-b border-pine/10 pb-2 last:border-0"
                  >
                    <span className="font-display text-[18px] tracking-tightest text-pine">
                      {p.pahari}
                    </span>
                    <span className="text-[13px] text-pine/65">{p.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dish modal */}
      <AnimatePresence>
        {dish && active !== null && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center p-5 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-night/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 14, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-[4px] bg-snow ring-soft sm:grid-cols-2"
            >
              <div className="relative aspect-[4/5] sm:aspect-auto">
                <Image src={dish.image} alt={dish.name} fill className="object-cover" />
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-[11.5px] uppercase tracking-[0.22em] text-dusk">
                  Pahari classic
                </p>
                <h3 className="mt-2 font-display text-[40px] leading-none tracking-tightest text-pine">
                  {dish.name}
                </h3>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-pine/75">
                  {dish.sub}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-pine/70">
                  We'll cook this with you in a real Kullvi kitchen, beside a wood-fired chulha.
                  The grandmother of the house picks the spices. We just chop.
                </p>
                <button
                  onClick={() => setActive(null)}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-pine/20 px-5 py-2.5 text-[13.5px] text-pine transition-colors hover:bg-pine hover:text-snow"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
