"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative bg-night text-snow">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 pt-24 pb-12 sm:pt-32">
        <div className="mb-16 flex flex-col items-center gap-5 text-center sm:mb-20">
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-snow/15 sm:h-36 sm:w-36">
            <Image
              src="/img/logo.jpeg"
              alt="Wandering Saya Travels, Himachal Pradesh travel atelier based in Kullu valley."
              fill
              sizes="(min-width: 640px) 144px, 112px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-display text-[26px] tracking-tightest leading-none sm:text-[32px]">
              Wandering Saya <span className="opacity-60">Travels</span>
            </p>
            <p className="mt-2 text-[12px] uppercase tracking-[0.22em] text-snow/55">
              Explore the world with us
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-[12px] uppercase tracking-[0.22em] text-alpenglow/80">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-alpenglow/40" />
              Letters from the valley
            </p>
            <h3 className="mt-4 font-display text-balance text-[36px] leading-[1.04] tracking-tightest sm:text-[52px]">
              One slow letter a month.<br /> Photos. A recipe. A route.
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="mt-7 flex max-w-md gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 rounded-full border border-snow/20 bg-white/5 px-5 py-3 text-[14.5px] text-snow placeholder:text-snow/45 focus:border-snow focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-alpenglow px-5 py-3 text-[14px] font-medium text-pine transition-colors hover:bg-snow"
              >
                {done ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
            <p className="mt-3 text-[12.5px] text-snow/55">No tracking. No spam. We mean it.</p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8">
            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.22em] text-snow/55">Reach Saroj</p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-snow/85">
                <li>
                  <a
                    href="https://wa.me/918580946251"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-snow"
                  >
                    +91 85809-46251 · WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:wanderingsayatravels@gmail.com"
                    className="break-all hover:text-snow"
                  >
                    wanderingsayatravels@gmail.com
                  </a>
                </li>
                <li className="text-snow/65">Daily 8am–9pm IST</li>
              </ul>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.22em] text-snow/55">The office</p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-snow/85">
                <li>Village Tharass, PO Hurla</li>
                <li>Tehsil Bhuntar, Kullu</li>
                <li>Himachal Pradesh 175125, India</li>
              </ul>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.22em] text-snow/55">Wander</p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-snow/85">
                {[
                  ["Destinations", "#destinations"],
                  ["Experiences", "#experiences"],
                  ["Where few go", "#hidden"],
                  ["Journeys", "#journeys"],
                  ["When to go", "#weather"],
                  ["Food & Culture", "#food"],
                  ["How it works", "#how"],
                  ["FAQs", "#faq"],
                  ["Plan a journey", "#book"],
                ].map(([t, h]) => (
                  <li key={h}>
                    <a href={h} className="hover:text-snow">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="mt-24 max-w-3xl font-display text-balance text-[28px] leading-[1.15] tracking-tightest text-snow/80 sm:text-[40px]"
        >
          The mountains will still be here when you are ready.
        </motion.p>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-snow/10 pt-8 text-[12.5px] text-snow/55 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Wandering Saya Travels · All photographs licensed.</div>
          <div className="flex gap-5">
            <a
              href="https://www.instagram.com/wanderingsayatravels"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Wandering Saya Travels on Instagram"
              className="hover:text-snow"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@wanderingsayatravels"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Wandering Saya Travels on YouTube"
              className="hover:text-snow"
            >
              YouTube
            </a>
            <a href="#privacy" aria-label="Privacy policy" className="hover:text-snow">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
