"use client";

// Snow globe floater on the bottom-left. Inside its icon, particles fall on
// staggered loops and the central snowflake slowly rotates — all in plain CSS
// so the animation is guaranteed to hot-reload reliably.
export function SnowFloater() {
  return (
    <a
      href="#weather"
      aria-label="Find your snow window — free planning tool"
      className="group fixed bottom-5 left-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-pine py-2 pl-2 pr-4 text-snow shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:left-6 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-5"
    >
      {/* Snow globe — falling particles + slowly spinning snowflake centre */}
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-night/55 sm:h-10 sm:w-10">
        <span
          className="pointer-events-none absolute left-1.5 top-0 h-[3px] w-[3px] rounded-full bg-snow animate-flake-fall"
          style={{ animationDelay: "-0.3s" }}
        />
        <span
          className="pointer-events-none absolute left-[10px] top-0 h-[2px] w-[2px] rounded-full bg-snow/80 animate-flake-fall"
          style={{ animationDelay: "-1.4s", animationDuration: "2.0s" }}
        />
        <span
          className="pointer-events-none absolute left-[18px] top-0 h-[2px] w-[2px] rounded-full bg-snow/85 animate-flake-fall"
          style={{ animationDelay: "-2.1s", animationDuration: "3.0s" }}
        />
        <span
          className="pointer-events-none absolute left-[24px] top-0 h-[3px] w-[3px] rounded-full bg-snow animate-flake-fall"
          style={{ animationDelay: "-0.9s" }}
        />
        <span
          className="pointer-events-none absolute left-[30px] top-0 h-[2px] w-[2px] rounded-full bg-snow/70 animate-flake-fall"
          style={{ animationDelay: "-2.5s", animationDuration: "3.4s" }}
        />

        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 animate-slow-spin text-snow"
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

      <span className="flex flex-col leading-tight">
        <span className="text-[12.5px] font-semibold sm:text-[13px]">
          Find your snow window
        </span>
        <span className="hidden text-[10px] uppercase tracking-[0.18em] text-snow/65 sm:block">
          Free tool · tap to check
        </span>
      </span>
    </a>
  );
}
