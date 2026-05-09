"use client";

import { useEffect, useState } from "react";
import { useSound } from "@/components/providers/SoundProvider";
import { cn } from "@/lib/cn";

export function TopBar() {
  const { enabled, toggle } = useSound();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-soft",
        scrolled ? "py-2" : "py-5",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[1280px] px-4 sm:px-8 flex items-center justify-between",
          "transition-all duration-500 ease-soft",
        )}
      >
        <a
          href="#top"
          className={cn(
            "flex items-center gap-2 font-display text-[19px] tracking-tight",
            scrolled ? "text-pine" : "text-snow drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]",
          )}
        >
          <Glyph className={cn("transition-colors", scrolled ? "text-alpenglow" : "text-snow")} />
          <span className="font-medium">Wandering Saya</span>
          <span className="opacity-60">Travels</span>
        </a>

        <nav
          className={cn(
            "hidden md:flex items-center gap-7 text-[13.5px]",
            scrolled ? "text-pine/85" : "text-snow/95",
          )}
        >
          {[
            ["Destinations", "#destinations"],
            ["Experiences", "#experiences"],
            ["Journeys", "#journeys"],
            ["Food & Culture", "#food"],
            ["Saroj", "#saroj"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="hover:opacity-100 opacity-90 transition-opacity">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={enabled ? "Mute sound" : "Unmute sound"}
            className={cn(
              "h-9 w-9 grid place-items-center rounded-full border transition-all",
              scrolled
                ? "border-pine/15 bg-snow/80 text-pine hover:bg-snow"
                : "border-white/30 glass-dark text-snow hover:bg-white/20",
            )}
          >
            {enabled ? <SoundOn /> : <SoundOff />}
          </button>
          <a
            href="#book"
            className={cn(
              "hidden sm:inline-flex items-center rounded-full px-4 h-9 text-[13.5px] font-medium transition-all",
              scrolled
                ? "bg-pine text-snow hover:bg-pine/90"
                : "bg-snow text-pine hover:bg-snow/90",
            )}
          >
            Plan a journey
          </a>
        </div>
      </div>
    </header>
  );
}

function Glyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={cn("w-7 h-7", className)} aria-hidden>
      <path
        d="M2 22 L9 10 L13 16 L17 6 L26 22 Z"
        fill="currentColor"
        opacity="0.92"
      />
      <circle cx="22" cy="7" r="2.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function SoundOn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
function SoundOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="m22 9-6 6" />
      <path d="m16 9 6 6" />
    </svg>
  );
}
