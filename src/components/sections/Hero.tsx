"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSound } from "@/components/providers/SoundProvider";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { setAmbient, play } = useSound();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax stack of mountain layers
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "20%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "35%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "55%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);

  useEffect(() => {
    setAmbient("wind");
    return () => setAmbient(null);
  }, [setAmbient]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[110vh] w-full overflow-hidden bg-night text-snow"
    >
      {/* Sky / sun gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 25%, #f3c9a3 0%, #b88e7a 22%, #5b6b7e 50%, #1f2e44 80%, #0b1320 100%)",
        }}
      />
      {/* Soft sun halo */}
      <div
        className="absolute -right-24 top-24 h-[480px] w-[480px] rounded-full opacity-90 blur-[60px]"
        style={{ background: "radial-gradient(circle, #ffd9b3 0%, rgba(255,217,179,0) 70%)" }}
      />

      {/* Mountain layers */}
      <motion.div style={{ y: yBack }} className="absolute inset-x-0 bottom-0 h-[80%]">
        <Mountain
          className="absolute inset-x-0 bottom-0 w-full"
          fill="#3b4a5d"
          opacity={0.85}
          variant="far"
        />
      </motion.div>
      <motion.div style={{ y: yMid }} className="absolute inset-x-0 bottom-0 h-[68%]">
        <Mountain
          className="absolute inset-x-0 bottom-0 w-full"
          fill="#283447"
          opacity={0.95}
          variant="mid"
        />
      </motion.div>
      <motion.div style={{ y: yFront }} className="absolute inset-x-0 bottom-0 h-[55%]">
        <Mountain
          className="absolute inset-x-0 bottom-0 w-full"
          fill="#0f1828"
          opacity={1}
          variant="near"
        />
      </motion.div>

      {/* Snow particles */}
      {!reduced && <Snowfall />}

      {/* Foreground photo blend (subtle) */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80"
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Headline */}
      <motion.div
        style={{ y: headlineY, opacity: headlineOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-28 sm:px-10 sm:pb-32 lg:pb-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-snow/90 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-alpenglow animate-ember" />
          Himachal Pradesh, India
        </motion.p>

        <h1 className="font-display text-balance text-[44px] leading-[0.98] tracking-tightest sm:text-[88px] lg:text-[112px]">
          {["The mountains", "are waiting.", "We know the way."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.45 + i * 0.16,
              }}
              className="block"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 80" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
          className="mt-7 max-w-xl text-pretty text-[15.5px] leading-relaxed text-snow/85 sm:text-[17px]"
        >
          A travel atelier from the Himalayas. Curated journeys through Kullu, Manali, Shimla &
          Spiti — by Saroj Thakur, born and raised in the valley.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.25 }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5"
        >
          <a
            href="#journeys"
            onClick={() => play("bell")}
            className="group inline-flex items-center gap-2 rounded-full bg-snow px-6 py-3.5 text-[14.5px] font-medium text-pine transition-all hover:bg-white"
          >
            Plan a journey
            <svg
              className="transition-transform duration-500 ease-soft group-hover:translate-x-1"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
          <a
            href="#destinations"
            className="text-[14.5px] text-snow/85 underline-offset-4 hover:text-snow hover:underline"
          >
            Or wander the valleys ↓
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10.5px] uppercase tracking-[0.3em] text-snow/70"
      >
        <span>Scroll</span>
        <span className="block h-9 w-px origin-top animate-ember bg-snow/40" />
      </motion.div>
    </section>
  );
}

function Mountain({
  className,
  fill,
  opacity,
  variant,
}: {
  className?: string;
  fill: string;
  opacity: number;
  variant: "far" | "mid" | "near";
}) {
  const paths: Record<string, string> = {
    far: "M0,260 L120,180 L220,220 L320,140 L440,200 L560,100 L680,180 L820,80 L940,170 L1080,120 L1200,200 L1280,170 L1280,400 L0,400 Z",
    mid: "M0,300 L100,240 L200,280 L320,200 L420,260 L540,180 L640,250 L760,160 L880,240 L1000,200 L1120,280 L1280,230 L1280,400 L0,400 Z",
    near: "M0,360 L80,320 L180,350 L280,290 L400,340 L520,280 L640,330 L760,260 L880,320 L1000,290 L1140,340 L1280,310 L1280,400 L0,400 Z",
  };
  return (
    <svg
      className={className}
      viewBox="0 0 1280 400"
      preserveAspectRatio="none"
      aria-hidden
      style={{ height: "100%" }}
    >
      <defs>
        <linearGradient id={`m-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={opacity * 0.95} />
          <stop offset="100%" stopColor={fill} stopOpacity={opacity} />
        </linearGradient>
      </defs>
      <path d={paths[variant]} fill={`url(#m-${variant})`} />
      {variant !== "near" && (
        <path
          d={paths[variant].replace(/L0,400 Z/, "")
            .split("L")
            .slice(0, 14)
            .join("L")
            .replace(/^M/, "M")}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
          fill="none"
        />
      )}
    </svg>
  );
}

function Snowfall() {
  // Static positions for SSR consistency
  const flakes = Array.from({ length: 28 }, (_, i) => ({
    left: ((i * 17) % 100) + (i % 7) * 0.7,
    delay: -(i * 0.27) % 14,
    size: 2 + (i % 4),
    duration: 12 + (i % 8),
    opacity: 0.4 + ((i % 5) / 10),
  }));
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="absolute top-0 block animate-snowfall rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            filter: "blur(0.4px)",
          }}
        />
      ))}
    </div>
  );
}
