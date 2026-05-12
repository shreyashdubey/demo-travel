"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { experiences } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";

export function Experiences() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-snow pb-10 pt-8 sm:pb-12 sm:pt-12 lg:pb-16 lg:pt-16"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
              The eight things we do
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[64px]">
              Treks. Snow.<br /> Lakes. Rivers. Stars.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-pine/70">
            Pick what calls you. We'll match it to a route, a season, a homestay, a dish.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {experiences.map((e, i) => {
            const isOpen = openSlug === e.slug;
            return (
            <motion.article
              key={e.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 4) * 0.06 + Math.floor(i / 4) * 0.1,
              }}
              onClick={() => setOpenSlug(isOpen ? null : e.slug)}
              className="group relative aspect-[5/6] cursor-pointer select-none overflow-hidden rounded-[3px] bg-pine"
            >
              <Image
                src={e.image}
                alt={`${e.title} in Himachal Pradesh, ${e.sub}`}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 92vw"
                className="object-cover opacity-80 transition-all duration-[1400ms] ease-soft group-hover:scale-[1.06] group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/35 to-transparent transition-opacity duration-500 group-hover:from-night/70" />

              <div
                aria-hidden
                className={`absolute inset-0 bg-night/55 backdrop-blur-[3px] transition-opacity duration-500 ease-soft ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="absolute inset-x-0 top-0 p-3.5 sm:p-5">
                <ExpIcon name={e.icon} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3.5 text-snow sm:p-5">
                <h3 className="font-display text-[20px] leading-none tracking-tightest sm:text-[26px]">
                  {e.title}
                </h3>
                <p className="mt-1 text-[10.5px] uppercase tracking-[0.18em] text-snow/70 sm:text-[11.5px]">
                  {e.sub}
                </p>
                <p
                  className={`mt-3 overflow-hidden text-[13.5px] leading-snug text-snow/90 transition-all duration-700 ease-soft [@media(hover:hover)]:group-hover:max-h-40 ${
                    isOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {e.body}
                </p>
                <a
                  href={whatsappUrl(
                    `Hi Saroj, I'd like to enquire about ${e.title.toLowerCase()} in Himachal.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(ev) => ev.stopPropagation()}
                  className="group/cta mt-3 inline-flex items-center gap-1.5 rounded-full bg-snow px-3 py-1.5 text-[11.5px] font-semibold text-pine shadow-md shadow-night/40 ring-1 ring-snow/60 transition-all duration-300 ease-soft hover:gap-2.5 hover:bg-white hover:shadow-lg hover:shadow-night/50 sm:mt-4 sm:px-4 sm:py-2 sm:text-[12.5px]"
                >
                  Enquire for free
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
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExpIcon({ name }: { name: string }) {
  const className = "h-6 w-6 text-snow/85";
  switch (name) {
    case "trek":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="m3 20 5-7 4 5 3-4 6 6" />
          <circle cx="17" cy="6" r="2" />
        </svg>
      );
    case "snow":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
        </svg>
      );
    case "lake":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        </svg>
      );
    case "river":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M3 20c2-1 3-3 3-5s2-4 4-4 3 2 4 4 2 5 4 5M3 8c2-1 3-3 3-5" />
        </svg>
      );
    case "wildlife":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <circle cx="9" cy="10" r="1.5" />
          <circle cx="15" cy="10" r="1.5" />
          <path d="M5 6c1-2 3-3 7-3s6 1 7 3M8 16c1 2 3 3 4 3s3-1 4-3" />
        </svg>
      );
    case "food":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M3 11h18M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
          <path d="M8 11V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
        </svg>
      );
    case "culture":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" />
        </svg>
      );
    case "night":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M21 12.5A9 9 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5Z" />
        </svg>
      );
    default:
      return null;
  }
}
