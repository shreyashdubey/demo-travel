import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Wandering Saya",
    description:
      "Curated, small-group Himachal Pradesh tours by a local Kullu family.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1E4CB",
    theme_color: "#3A4A2F",
    orientation: "portrait",
    lang: "en-IN",
    categories: ["travel", "lifestyle", "tourism"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/img/logo.jpeg",
        sizes: "1240x1240",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
