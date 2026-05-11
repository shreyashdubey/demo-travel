import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { destinations, hiddenPlaces, packages } from "@/data/content";

const ANCHOR_SECTIONS = [
  "experiences",
  "hidden",
  "journeys",
  "weather",
  "journey",
  "food",
  "saroj",
  "how",
  "faq",
  "book",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const root = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  // Anchor-only "pages" — included so crawlers see the main concepts as named
  // landing fragments. Single-page sites benefit from the breadth.
  const anchors: MetadataRoute.Sitemap = ANCHOR_SECTIONS.map((id) => ({
    url: `${SITE_URL}/#${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tours: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${SITE_URL}/#${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const places: MetadataRoute.Sitemap = [...destinations, ...hiddenPlaces].map(
    (d) => ({
      url: `${SITE_URL}/#${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [root, ...anchors, ...tours, ...places];
}
