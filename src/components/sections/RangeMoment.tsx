"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MountainScene = dynamic(
  () => import("@/components/three/MountainScene").then((m) => m.MountainScene),
  { ssr: false, loading: () => <div className="h-full w-full bg-night" /> },
);

export function RangeMoment() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { rootMargin: "300px 0px" },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden bg-night text-snow">
      <div className="absolute inset-0">{inView && <MountainScene />}</div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-20 sm:px-10 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-[12px] uppercase tracking-[0.22em] text-snow/65"
        >
          The range
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest sm:text-[64px] lg:text-[88px]"
        >
          Sixty kilometres of peaks <br /> taller than your imagination.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="mt-5 max-w-md text-pretty text-[15.5px] leading-relaxed text-snow/70"
        >
          Move your cursor — the range moves with you. The Pir Panjal in the south, the
          Dhauladhar to the west, the Greater Himalayas above us all.
        </motion.p>
      </div>
    </section>
  );
}
