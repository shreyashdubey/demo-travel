"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hiddenPlaces } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";

export function HiddenHimachal() {
  return (
    <section
      id="hidden"
      className="relative bg-night py-24 text-snow sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-alpenglow">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-alpenglow/60" />
              Where few go
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest sm:text-[60px]">
              Some of these places have fewer<br />
              <span className="text-alpenglow">people than your street.</span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-snow/75">
            Himachal had <span className="text-snow font-medium">1.8 crore visitors in 2024.</span>{" "}
            Most of them never left Manali Mall Road. Saroj has been to all of these — off the
            highway, off the apps, off the bus routes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hiddenPlaces.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.06,
              }}
              className="group relative overflow-hidden rounded-[3px] bg-pine"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />

                {/* Stat badge — top-right */}
                <div className="absolute right-3 top-3 rounded-full bg-alpenglow px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-snow">
                  {p.stat}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10.5px] uppercase tracking-[0.22em] text-snow/65">
                    {p.region} · {p.elevation}
                  </p>
                  <h3 className="mt-1 font-display text-[30px] leading-none tracking-tightest">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.22em] text-alpenglow">
                    {p.statLabel}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-snug text-snow/85">{p.detail}</p>
                  <a
                    href={whatsappUrl(
                      `Hi Saroj, I'd like to know about a trip to ${p.name} (${p.region}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta mt-4 inline-flex items-center gap-1.5 rounded-full bg-snow px-4 py-2 text-[12.5px] font-semibold text-pine shadow-md shadow-night/40 ring-1 ring-snow/60 transition-all duration-300 ease-soft hover:gap-2.5 hover:bg-white hover:shadow-lg hover:shadow-night/50"
                  >
                    Enquire now
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      aria-hidden
                      className="transition-transform duration-300 ease-soft group-hover/cta:translate-x-0.5"
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-[3px] border border-snow/15 bg-white/5 px-5 py-5 text-center">
          <p className="text-[14px] leading-relaxed text-snow/85">
            None of these are in the standard packages. Tell us which one calls to you — Saroj
            will build the route. Six travellers maximum, always.
          </p>
        </div>
      </div>
    </section>
  );
}
