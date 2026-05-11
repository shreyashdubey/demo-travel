"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/contact";

export type MediaItem =
  | { type: "photo"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export function MediaLightbox({
  open,
  onClose,
  items,
  title,
  region,
}: {
  open: boolean;
  onClose: () => void;
  items: MediaItem[];
  title: string;
  region: string;
}) {
  const [index, setIndex] = useState(0);

  // Reset to first item every time the lightbox opens.
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const goTo = useCallback(
    (i: number) => {
      const len = items.length;
      if (!len) return;
      setIndex(((i % len) + len) % len);
    },
    [items.length],
  );

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Keyboard nav while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, next, prev]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!items.length) return null;
  const current = items[index];
  const enquireHref = whatsappUrl(
    `Hi Saroj, I just saw the ${title} photos on your site — could we plan a trip?`,
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={onClose}
            className="absolute inset-0 bg-night/85 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.96, y: 14, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 10, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[4px] bg-snow ring-soft"
          >
            {/* Header */}
            <div className="flex flex-none items-center justify-between gap-3 border-b border-pine/10 bg-snow px-5 py-3.5 sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-alpenglow">
                  📷 Shot by us
                </p>
                <h3 className="mt-0.5 font-display text-[20px] leading-none tracking-tightest text-pine sm:text-[24px]">
                  {title}
                  <span className="ml-2 font-mono text-[12px] text-pine/55">· {region}</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 flex-none place-items-center rounded-full bg-pine/10 text-pine transition-colors hover:bg-pine/20"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Media area — natural aspect ratio, capped to 60vh tall */}
            <div className="relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden bg-night">
              {current.type === "photo" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className="block max-h-[60vh] max-w-full object-contain"
                />
              ) : (
                <video
                  key={current.src}
                  src={current.src}
                  poster={current.poster}
                  autoPlay
                  controls
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="block max-h-[60vh] max-w-full"
                />
              )}

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-snow/85 text-pine shadow-md transition-colors hover:bg-snow"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-snow/85 text-pine shadow-md transition-colors hover:bg-snow"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              <div className="absolute bottom-3 left-3 rounded-full bg-night/65 px-2.5 py-1 font-mono text-[11px] text-snow backdrop-blur">
                {current.type === "video" ? "▶ Video" : `${index + 1} / ${items.length}`}
              </div>
            </div>

            {/* Thumbnail strip */}
            {items.length > 1 && (
              <div className="no-scrollbar flex flex-none gap-2 overflow-x-auto px-5 py-3 sm:px-7">
                {items.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${item.type} ${i + 1}`}
                    className={`relative h-14 w-20 flex-none overflow-hidden rounded-[2px] border-2 transition-all ${
                      i === index
                        ? "border-pine"
                        : "border-transparent opacity-55 hover:opacity-100"
                    }`}
                  >
                    {item.type === "photo" ? (
                      <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
                    ) : (
                      <div className="relative h-full w-full bg-night">
                        {item.poster && (
                          <Image src={item.poster} alt="" fill sizes="80px" className="object-cover opacity-65" />
                        )}
                        <span className="absolute inset-0 grid place-items-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-snow drop-shadow">
                            <path d="M8 5v14l11-7Z" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Enquiry footer */}
            <div className="flex flex-none flex-col items-start justify-between gap-3 border-t border-pine/10 bg-glacier/60 px-5 py-4 sm:flex-row sm:items-center sm:px-7">
              <p className="text-[13px] leading-relaxed text-pine/75">
                Want to see {title} yourself? Saroj knows the way.
              </p>
              <a
                href={enquireHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
                </svg>
                Enquire on WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
