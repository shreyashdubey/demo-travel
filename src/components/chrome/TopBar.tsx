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
            href="https://wa.me/918580946251"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 h-9 text-[13px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
            </svg>
            +91 85809-46251
          </a>
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
