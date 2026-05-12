"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { packages } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";

const WhatsAppGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
  </svg>
);

export function Packages({
  onSelect,
  selected,
}: {
  onSelect: (slug: string) => void;
  selected: string | null;
}) {
  return (
    <section id="journeys" className="relative bg-snow py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
              Curated journeys
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[64px]">
              Three journeys.<br /> One way to travel.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-pine/70">
            Tap a card to step into the journey hour-by-hour. Or message Saroj, she'll shape one
            around your dates and pace.
          </p>
        </div>

        {/* Apple Harvest signature callout, bold, action-forward */}
        <div className="mb-10 rounded-[4px] border-2 border-alpenglow bg-gradient-to-r from-alpenglow/20 via-alpenglow/8 to-transparent px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-alpenglow px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-snow">
                🍎 New · Sept–Oct
              </span>
              <p className="text-[16.5px] font-medium text-pine">
                The Apple Harvest, our signature trip through Kullu's orchards.
              </p>
            </div>
            <a
              href={whatsappUrl("Hi Saroj, tell me about The Apple Harvest signature trip.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-alpenglow px-5 py-2.5 text-[14px] font-semibold text-snow transition-colors hover:bg-pine"
            >
              Enquire now →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {packages.map((p, i) => (
            <div key={p.slug} className="flex flex-col gap-3">
              <motion.button
                onClick={() => {
                  onSelect(p.slug);
                  requestAnimationFrame(() => {
                    document
                      .getElementById("journey")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className={`group relative aspect-[4/5] overflow-hidden rounded-[3px] text-left transition-all ${
                  selected === p.slug ? "ring-2 ring-pine ring-offset-2 ring-offset-snow" : ""
                }`}
              >
                <Image
                  src={p.cover}
                  alt={`${p.title}, ${p.days}-day Himachal Pradesh journey. ${p.pitch}`}
                  fill
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 text-snow">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-90">
                    {p.days}D · {p.nights}N
                  </div>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border"
                    style={{ borderColor: `${p.accent}99`, color: p.accent }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-snow">
                  <h3 className="font-display text-[34px] leading-none tracking-tightest">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-pretty text-[14px] leading-snug text-snow/85">
                    {p.pitch}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-snow/65">
                      Enquire for dates & price
                    </span>
                    <span
                      className="text-[12.5px] underline-offset-4 group-hover:underline"
                      style={{ color: p.accent }}
                    >
                      View itinerary →
                    </span>
                  </div>
                </div>
              </motion.button>

              <a
                href={whatsappUrl(
                  `Hi Saroj, I'd like to enquire about the ${p.title} journey (${p.days}D/${p.nights}N).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-pine/15 bg-white px-4 py-2.5 text-[13px] font-medium text-pine transition-colors hover:bg-pine hover:text-snow"
              >
                <WhatsAppGlyph />
                Enquire for free
              </a>
            </div>
          ))}
        </div>

        {/* Free cancellation + Saroj Promise reassurance strip */}
        <div className="mt-8 rounded-[3px] border border-pine/10 bg-glacier/60 px-5 py-4 text-center">
          <p className="text-[13.5px] leading-relaxed text-pine">
            <span className="font-medium">Every journey:</span> free cancellation up to 14 days
            before, and a full refund if a cloudburst or road closure ends the trip. The Saroj
            Promise.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[3px] border border-pine/10 bg-glacier p-6">
            <p className="text-[12px] uppercase tracking-[0.22em] text-dusk">
              Don't see your trip?
            </p>
            <p className="mt-2 font-display text-[26px] leading-tight tracking-tightest text-pine">
              We build journeys around your dates, pace and people. Tell us what you're after -
              we'll send you a draft within a day.
            </p>
          </div>
          <a
            href={whatsappUrl("Hi Saroj, I'd like a custom journey designed for me.")}
            target="_blank"
            rel="noopener noreferrer"
            className="grid place-items-center rounded-[3px] bg-pine p-8 text-center text-snow transition-colors hover:bg-pine/90"
          >
            <div>
              <p className="font-display text-[24px] leading-tight tracking-tightest">
                Build your own →
              </p>
              <p className="mt-2 text-[13px] text-snow/70">A 2-minute WhatsApp chat with Saroj.</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
