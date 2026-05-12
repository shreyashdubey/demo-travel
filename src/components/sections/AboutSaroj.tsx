"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { trustPoints } from "@/data/content";

const roles = [
  {
    label: "Drivers",
    tag: "Pahari",
    body: "Pahari, born in the valley. They drive the way the road asks, slowly, with the weather, never against it.",
  },
  {
    label: "Hosts",
    tag: "Of these houses",
    body: "Homestay families we have worked with for years. You stay in their rooms, eat at their table, hear about the goats.",
  },
  {
    label: "Guides",
    tag: "Of these trails",
    body: "From the village, not a website. They know the trails the way you know your own street.",
  },
  {
    label: "Kitchen",
    tag: "Of these tables",
    body: "Pahari mothers and grandmothers. Siddu, trout, chha gosht, what was on the family table last night, not a menu.",
  },
  {
    label: "Office",
    tag: "In Bhuntar",
    body: "Small on purpose. You will hear back the same day, in plain words, usually after the drivers come down from the road.",
  },
] as const;

export function AboutSaroj() {
  return (
    <section
      id="saroj"
      className="relative isolate overflow-hidden bg-pine py-10 text-snow sm:py-14 lg:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 hidden h-[480px] w-[480px] rounded-full bg-alpenglow/10 blur-3xl lg:block"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[5/6] overflow-hidden rounded-[3px] ring-1 ring-snow/10 lg:aspect-[4/5]"
            >
              <Image
                src="/img/places/pahadi-girl.jpg"
                alt="A Pahadi woman in traditional Kullvi dress"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine/75 via-pine/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 py-3">
                <span className="font-display italic text-[16px] text-snow/95">
                  Kullvi dress
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-snow/70">
                  Bhuntar · Kullu
                </span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-alpenglow">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-alpenglow/60" />
              Who you travel with
            </p>
            <h2 className="font-display text-balance text-[38px] leading-[1.04] tracking-tightest sm:text-[54px] lg:text-[62px]">
              Born in these villages.
              <br />
              <span className="text-alpenglow">Cook in their own kitchens.</span>
              <br />
              Walk these trails for work.
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:mt-10 lg:grid-cols-2 lg:gap-x-10">
              {roles.map((role, i) => (
                <motion.article
                  key={role.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                  className="group grid grid-cols-[44px_1fr] gap-x-4 py-4 sm:grid-cols-[56px_1fr] sm:gap-x-5 sm:py-5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-snow/10"
                >
                  <div
                    className="font-display text-[40px] leading-none tracking-tightest text-transparent transition-colors duration-700 group-hover:text-alpenglow sm:text-[48px]"
                    style={{ WebkitTextStroke: "1px rgba(184,90,62,0.65)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h3 className="font-mono text-[13.5px] font-semibold uppercase tracking-[0.18em] text-alpenglow sm:text-[14.5px]">
                        {role.label}
                      </h3>
                      <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-snow/75 sm:text-[12.5px]">
                        · {role.tag}
                      </span>
                    </div>
                    <p className="text-[15px] leading-[1.6] text-snow/85">
                      {role.body}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="mt-8 flex items-baseline gap-4 border-t border-snow/12 pt-5 sm:pt-6"
            >
              <p className="font-display italic text-[19px] text-snow/85 sm:text-[22px]">
                Team Wandering Saya
              </p>
              <span className="h-px flex-1 bg-gradient-to-r from-alpenglow/55 via-snow/10 to-transparent" />
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-snow/55">
                Bhuntar · Kullu Valley
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[3px] bg-snow/10 sm:grid-cols-2 lg:grid-cols-4">
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
