import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SoundProvider } from "@/components/providers/SoundProvider";
import { TopBar } from "@/components/chrome/TopBar";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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

export const metadata: Metadata = {
  title: "Wandering Saya Travels — Slow journeys through fast mountains",
  description:
    "A travel atelier from the Himalayas. Curated journeys through Kullu, Manali, Shimla & Spiti — by Saroj Thakur, born and raised in the valley.",
  metadataBase: new URL("https://wanderingsayatravels.com"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/img/logo.jpeg",
  },
  openGraph: {
    title: "Wandering Saya Travels",
    description: "Slow journeys through fast mountains. Explore the world with us.",
    url: "https://wanderingsayatravels.com",
    siteName: "Wandering Saya Travels",
    type: "website",
    images: [
      {
        url: "/img/logo.jpeg",
        width: 1240,
        height: 1240,
        alt: "Wandering Saya Travels — Explore the world with us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wandering Saya Travels",
    description: "Slow journeys through fast mountains. Explore the world with us.",
    images: ["/img/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-snow text-pine antialiased font-sans">
        <ErrorBoundary>
          <SoundProvider>
            <SmoothScroll>
              <TopBar />
              {children}
            </SmoothScroll>
          </SoundProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
