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
  title: "Dhodhu Travels — Slow journeys through fast mountains",
  description:
    "A travel atelier from the Himalayas. Curated journeys through Kullu, Manali, Shimla & Spiti — by Saroj Thakur, born and raised in the valley.",
  metadataBase: new URL("https://dhodhutravels.com"),
  openGraph: {
    title: "Dhodhu Travels",
    description: "Slow journeys through fast mountains.",
    type: "website",
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
