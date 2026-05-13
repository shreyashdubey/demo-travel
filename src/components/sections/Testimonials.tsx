"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { testimonials } from "@/data/content";
import { MediaLightbox } from "@/components/chrome/MediaLightbox";

const VIDEO_TESTIMONIAL_INDEX = 0;

export function Testimonials() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative bg-glacier py-8 sm:py-10 lg:py-12">
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
          {testimonials.map((t, i) => {
            const hasVideo = i === VIDEO_TESTIMONIAL_INDEX;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`overflow-hidden rounded-[4px] border bg-white ${
                  hasVideo
                    ? "border-pine/20 ring-2 ring-pine/20"
                    : "border-pine/10"
                }`}
              >
                {hasVideo && (
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    aria-label="Play video from a recent trip"
                    className="group relative block w-full overflow-hidden bg-pine text-left text-snow"
                  >
                    <div className="relative aspect-[16/9]">
                      <video
                        src="/video/customers-singing.mp4"
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        aria-hidden
                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/35 to-night/10" />
                    </div>

                    <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-snow px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-pine shadow-md">
                      📷 Shot by us
                    </div>

                    <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-night/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-snow backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      Video
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 sm:p-5">
                      <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-snow text-pine shadow-lg transition-transform group-hover:scale-110">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5v14l11-7Z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[10.5px] uppercase tracking-[0.22em] text-snow/85">
                          Moments from a recent trip
                        </p>
                        <p className="mt-0.5 font-display text-[19px] leading-tight tracking-tightest sm:text-[22px]">
                          When the travellers start singing.
                        </p>
                      </div>
                    </div>
                  </button>
                )}

                <div className="p-7 sm:p-8">
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <MediaLightbox
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        items={[{ type: "video", src: "/video/customers-singing.mp4" }]}
        title="Moments from a recent trip"
        region="Kullu"
      />
    </section>
  );
}
