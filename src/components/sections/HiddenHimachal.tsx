"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { hiddenPlaces } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";
import { MediaLightbox, type MediaItem } from "@/components/chrome/MediaLightbox";

type HiddenPlace = (typeof hiddenPlaces)[number];

function hasShotByUs(
  p: HiddenPlace,
): p is HiddenPlace & {
  shotByUs: { photos: readonly string[]; video?: string };
} {
  return "shotByUs" in p && p.shotByUs !== undefined;
}

export function HiddenHimachal() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openPlace = useMemo(
    () =>
      openSlug
        ? hiddenPlaces.find((p) => p.slug === openSlug) ?? null
        : null,
    [openSlug],
  );

  const lightboxItems: MediaItem[] = useMemo(() => {
    if (!openPlace || !hasShotByUs(openPlace)) return [];
    const items: MediaItem[] = [];
    if (openPlace.shotByUs.video) {
      items.push({
        type: "video",
        src: openPlace.shotByUs.video,
        poster: openPlace.shotByUs.photos[0],
      });
    }
    for (const photo of openPlace.shotByUs.photos) {
      items.push({
        type: "photo",
        src: photo,
        alt: `${openPlace.name} in ${openPlace.region}, Himachal Pradesh, photographed by Wandering Saya Travels.`,
      });
    }
    return items;
  }, [openPlace]);

  return (
    <section
      id="hidden"
      className="relative bg-night py-8 text-snow sm:py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-alpenglow">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-alpenglow/60" />
              Where few go
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest sm:text-[60px]">
              Some of these places have fewer<br />
              <span className="text-alpenglow">people than your street.</span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[15.5px] leading-relaxed text-snow/75">
            Himachal had <span className="text-snow font-medium">1.8 crore visitors in 2024.</span>{" "}
            Most of them never left Manali Mall Road. Saroj has been to all of these, off the
            highway, off the apps, off the bus routes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hiddenPlaces.map((p, i) => {
            const shot = hasShotByUs(p);
            const mediaCount =
              shot && p.shotByUs
                ? p.shotByUs.photos.length + (p.shotByUs.video ? 1 : 0)
                : 0;
            const hasVideo = shot && Boolean(p.shotByUs?.video);

            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (i % 3) * 0.06,
                }}
                className={`group relative overflow-hidden rounded-[3px] bg-pine ${
                  shot
                    ? "ring-2 ring-snow/30 transition-all hover:ring-snow/70"
                    : ""
                }`}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={p.image}
                    alt={`${p.name}, ${p.region}, Himachal Pradesh (${p.elevation}). ${p.statLabel}.`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />

                  {/* Top-left: live video indicator (only when there's a video) */}
                  {hasVideo && (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-night/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-snow backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      Video
                    </div>
                  )}

                  {/* Top-right: badge differs for shot-by-us */}
                  {shot ? (
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-snow px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-pine shadow-md">
                      📷 Shot by us
                    </div>
                  ) : (
                    <div className="absolute right-3 top-3 rounded-full bg-alpenglow px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-snow">
                      {p.stat}
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10.5px] uppercase tracking-[0.22em] text-snow/65">
                      {p.region} · {p.elevation}
                    </p>
                    <h3 className="mt-1 font-display text-[30px] leading-none tracking-tightest">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.22em] text-alpenglow">
                      {p.statLabel}
                    </p>
                    <p className="mt-3 text-[13.5px] leading-snug text-snow/85">{p.detail}</p>

                    {shot ? (
                      <button
                        type="button"
                        onClick={() => setOpenSlug(p.slug)}
                        className="group/cta mt-4 inline-flex items-center gap-2 rounded-full bg-snow px-5 py-2.5 text-[13px] font-semibold text-pine shadow-lg shadow-snow/40 transition-all duration-300 ease-soft hover:gap-3 hover:bg-white"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M8 5v14l11-7Z" />
                        </svg>
                        See {mediaCount > 1 ? `${mediaCount} ` : ""}photos
                        {hasVideo ? " + video" : ""}
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden
                          className="transition-transform duration-300 ease-soft group-hover/cta:translate-x-0.5"
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </button>
                    ) : (
                      <a
                        href={whatsappUrl(
                          `Hi Saroj, I'd like to know about a trip to ${p.name} (${p.region}).`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cta mt-4 inline-flex items-center gap-2 rounded-full bg-alpenglow px-5 py-2.5 text-[13px] font-semibold text-snow shadow-lg shadow-alpenglow/40 ring-1 ring-alpenglow/70 transition-all duration-300 ease-soft hover:gap-3 hover:bg-[#cc6747] hover:shadow-xl hover:shadow-alpenglow/60"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        Take me here
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden
                          className="transition-transform duration-300 ease-soft group-hover/cta:translate-x-0.5"
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 rounded-[3px] border border-snow/15 bg-white/5 px-5 py-5 text-center">
          <p className="text-[14px] leading-relaxed text-snow/85">
            None of these are in the standard packages. Tell us which one calls to you, Saroj
            will build the route. Six travellers maximum, always.
          </p>
        </div>
      </div>

      {/* Photo + video lightbox (mounts only when an item is open) */}
      <MediaLightbox
        open={openSlug !== null && lightboxItems.length > 0}
        onClose={() => setOpenSlug(null)}
        items={lightboxItems}
        title={openPlace?.name ?? ""}
        region={openPlace?.region ?? ""}
      />
    </section>
  );
}
