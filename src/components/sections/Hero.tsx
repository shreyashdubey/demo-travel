"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

const ENQUIRE = whatsappUrl(
  "Hi Saroj, I'd like to plan a Himachal journey. Could we talk?",
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-night text-snow sm:h-screen sm:min-h-[720px]"
    >
      <Image
        src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80"
        alt="Snow-capped Himalayan peaks above the Kullu valley in Himachal Pradesh at first light."
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/15" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-start px-5 pb-10 pt-20 sm:justify-end sm:px-10 sm:pb-20 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Trust pill, credentials at a glance */}
          <div className="mb-4 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-[12.5px] text-snow backdrop-blur">
            <span className="font-medium">🏔 Based in Kullu</span>
            <span className="opacity-50">·</span>
            <span>Since 2017</span>
            <span className="opacity-50">·</span>
            <span>11 homestay families</span>
          </div>

          <h1 className="font-display text-balance text-[36px] leading-[1.02] tracking-tightest sm:text-[68px] lg:text-[96px]">
            Saroj's Himachal,
            <br />
            <span className="opacity-90">not the one in the brochures.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-[15.5px] leading-relaxed text-snow/90 sm:mt-5 sm:text-[17.5px]">
            Born and raised in Bhuntar. We've been in this valley all our lives, and we take you
            to the homestays you call by first name, the trails the buses skip, the festivals only
            the villages know.
            <span className="mt-2 block font-medium text-snow">
              Tell us your dates, Saroj replies on WhatsApp within 4 hours.
            </span>
          </p>

          {/* Snow window CTA, clean glass pill, cool not warm */}
          <a
            href="#weather"
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-snow/30 bg-white/10 px-4 py-2.5 text-[13.5px] font-medium text-snow backdrop-blur transition-all hover:border-snow/60 hover:bg-white/20"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-snow text-pine">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M2 12h20" />
                <path d="M12 2v20" />
                <path d="m20 16-4-4 4-4" />
                <path d="m4 8 4 4-4 4" />
                <path d="m16 4-4 4-4-4" />
                <path d="m8 20 4-4 4 4" />
              </svg>
            </span>
            <span>
              Find out when it snows
              <span className="ml-1.5 text-snow/65">- free tool →</span>
            </span>
          </a>

          {/* Primary CTAs */}
          <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3">
            <a
              href="#journeys"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-snow px-6 py-3.5 text-[15px] font-semibold text-pine transition-colors hover:bg-white"
            >
              See all journeys
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a
              href={ENQUIRE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-white transition-colors hover:bg-[#1ebd5a]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
              </svg>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10.5px] font-medium uppercase tracking-wider opacity-90">
                  WhatsApp Saroj
                </span>
                <span className="text-[15px] font-semibold">{WHATSAPP_DISPLAY}</span>
              </span>
            </a>
          </div>

          {/* Reassurance row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-snow/85">
            <span className="flex items-center gap-1.5">
              <CheckMark /> Free cancellation up to 14 days
            </span>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1.5">
              <CheckMark /> ≤6 travellers per group
            </span>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1.5">
              <CheckMark /> Verified homestays
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
      className="text-alpenglow"
    >
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
}
