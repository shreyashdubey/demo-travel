import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { TopBar } from "@/components/chrome/TopBar";
import { WhatsAppFab } from "@/components/chrome/WhatsAppFab";
import { SnowFloater } from "@/components/chrome/SnowFloater";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  faqJsonLd,
  itemListToursJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://wanderingsayatravels.com";
const SITE_NAME = "Wandering Saya Travels";
const TITLE = "Wandering Saya Travels — Himachal trips by a local Kullu family";
const DESCRIPTION =
  "Curated, small-group Himachal Pradesh tours by Saroj Thakur — born and raised in the Kullu valley. Manali, Spiti, Shimla, Kasol, Tirthan and Bir-Billing trips with verified homestays, free cancellation, and a 4-hour WhatsApp reply.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Wandering Saya Travels",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Himachal Pradesh tours",
    "Kullu Manali tour packages",
    "Spiti Valley tour",
    "Manali travel agent",
    "Himachal homestay",
    "Spiti Circuit",
    "Kullu Dussehra tour",
    "Tirthan Valley trip",
    "Kasol Kheerganga trek",
    "Bir Billing paragliding tour",
    "Shimla Manali itinerary",
    "Himachal trekking",
    "Pahari food experience",
    "small group Himachal tour",
    "Himachal travel company",
    "local Kullu travel agent",
    "Wandering Saya Travels",
  ],
  authors: [{ name: "Saroj Thakur", url: SITE_URL }],
  creator: "Saroj Thakur",
  publisher: SITE_NAME,
  category: "Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/img/logo.jpeg", sizes: "any" },
    ],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/img/logo.jpeg", sizes: "180x180", type: "image/jpeg" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/img/places/kullu-valley.jpg",
        width: 1600,
        height: 1067,
        alt: "Kullu valley in Himachal Pradesh — pine ridges and the Beas river below.",
      },
      {
        url: "/img/logo.jpeg",
        width: 1240,
        height: 1240,
        alt: "Wandering Saya Travels logo — Himachal Pradesh travel atelier.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/img/places/kullu-valley.jpg",
        alt: "Kullu valley in Himachal Pradesh — pine ridges and the Beas river below.",
      },
    ],
    creator: "@wanderingsaya",
    site: "@wanderingsaya",
  },
  verification: {
    // Replace with real verification IDs from Google Search Console / Bing Webmaster.
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_TOKEN",
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  other: {
    "geo.region": "IN-HP",
    "geo.placename": "Patlikuhl, Kullu, Himachal Pradesh",
    "geo.position": "32.0000;77.1500",
    ICBM: "32.0000, 77.1500",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1E4CB" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0805" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://plus.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://plus.unsplash.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="" />
      </head>
      <body className="bg-snow text-pine antialiased font-sans">
        <ErrorBoundary>
          <SmoothScroll>
            <TopBar />
            {children}
            <SnowFloater />
            <WhatsAppFab />
          </SmoothScroll>
        </ErrorBoundary>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={itemListToursJsonLd()} />
        <JsonLd data={faqJsonLd()} />
      </body>
    </html>
  );
}
