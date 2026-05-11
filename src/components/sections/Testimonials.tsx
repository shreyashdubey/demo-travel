"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section className="relative bg-glacier py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
              What our travellers say
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[56px]">
              The Himachal you remember<br /> is the one you trust.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[4px] border border-pine/10 bg-white p-7 sm:p-8"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mb-4 text-alpenglow/80"
                aria-hidden
              >
                <path d="M7.17 6.17a4 4 0 0 0-4 4v6.66h6.66v-6.66H6.5a3 3 0 0 1 3-3V4.83a5.17 5.17 0 0 0-2.33 1.34zm10 0a4 4 0 0 0-4 4v6.66h6.66v-6.66H16.5a3 3 0 0 1 3-3V4.83a5.17 5.17 0 0 0-2.33 1.34z" />
              </svg>
              <p className="text-[16px] leading-relaxed text-pine">"{t.quote}"</p>
              <div className="mt-6 border-t border-pine/10 pt-4">
                <p className="font-display text-[20px] leading-tight tracking-tightest text-pine">
                  {t.name}
                </p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.22em] text-pine/55">
                  {t.location} · {t.trip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
