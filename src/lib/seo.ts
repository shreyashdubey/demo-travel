import { faqs, packages, spitiJourney } from "@/data/content";
import { WHATSAPP_DISPLAY } from "@/lib/contact";

export const SITE_URL = "https://wanderingsayatravels.com";
export const SITE_NAME = "Wandering Saya Travels";
const EMAIL = "wanderingsayatravels@gmail.com";
const PHONE_E164 = "+918580946251";

const SAME_AS = [
  // Add real profile URLs as they go live.
  "https://www.instagram.com/wanderingsayatravels",
  "https://www.youtube.com/@wanderingsayatravels",
];

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Village Tharass, PO Hurla, Tehsil Bhuntar",
  addressLocality: "Kullu",
  addressRegion: "Himachal Pradesh",
  postalCode: "175125",
  addressCountry: "IN",
} as const;

const GEO = {
  "@type": "GeoCoordinates",
  latitude: 32.0,
  longitude: 77.15,
} as const;

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: "Wandering Saya",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/img/logo.jpeg"),
      width: 1240,
      height: 1240,
    },
    image: [
      absoluteUrl("/img/places/kullu-valley.jpg"),
      absoluteUrl("/img/places/spiti.jpg"),
      absoluteUrl("/img/places/chandratal.jpg"),
    ],
    description:
      "A travel atelier from the Himalayas. Small-group, locally-run tours through Kullu, Manali, Spiti, Shimla, Kasol, Tirthan and Bir-Billing, by Saroj Thakur, born and raised in the Kullu valley.",
    founder: {
      "@type": "Person",
      name: "Saroj Thakur",
      jobTitle: "Founder",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    foundingDate: "2017",
    foundingLocation: {
      "@type": "Place",
      name: "Bhuntar, Kullu, Himachal Pradesh, India",
    },
    address: ADDRESS,
    geo: GEO,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Himachal Pradesh" },
      { "@type": "Place", name: "Manali" },
      { "@type": "Place", name: "Kullu Valley" },
      { "@type": "Place", name: "Spiti Valley" },
      { "@type": "Place", name: "Shimla" },
      { "@type": "Place", name: "Kasol & Parvati Valley" },
      { "@type": "Place", name: "Tirthan Valley" },
      { "@type": "Place", name: "Bir Billing" },
      { "@type": "Place", name: "Dharamshala" },
    ],
    knowsLanguage: ["en", "hi", "Pahari"],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_E164,
        contactType: "customer service",
        contactOption: "TollFree",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
        email: EMAIL,
      },
      {
        "@type": "ContactPoint",
        telephone: PHONE_E164,
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    telephone: WHATSAPP_DISPLAY,
    email: EMAIL,
    sameAs: SAME_AS,
    makesOffer: packages.map((p) => ({
      "@type": "Offer",
      name: p.title,
      priceCurrency: "INR",
      price: p.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        price: p.priceFrom,
        valueAddedTaxIncluded: true,
        description: `Per person, from ₹${p.priceFrom.toLocaleString("en-IN")}`,
      },
      url: `${SITE_URL}/#${p.slug}`,
    })),
    slogan: "Slow journeys through fast mountains.",
  } as Record<string, unknown>;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: "Curated, small-group Himachal Pradesh tours by Saroj Thakur.",
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  } as Record<string, unknown>;
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  } as Record<string, unknown>;
}

function tripJsonLd(p: (typeof packages)[number]) {
  const itin =
    p.slug === "spiti-circuit"
      ? spitiJourney.map((d) => ({
          "@type": "TouristAttraction",
          name: `Day ${d.day}: ${d.title}`,
          description: `${d.place} · ${d.elevation}`,
        }))
      : undefined;

  return {
    "@type": "TouristTrip",
    "@id": `${SITE_URL}/#${p.slug}`,
    name: p.title,
    description: p.pitch,
    image: absoluteUrl(p.cover),
    url: `${SITE_URL}/#${p.slug}`,
    touristType: "Small group · ≤6 travellers",
    itinerary: itin,
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#book`,
      priceCurrency: "INR",
      price: p.priceFrom,
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
    subjectOf: {
      "@type": "CreativeWork",
      duration: `P${p.days}D`,
    },
  };
}

export function itemListToursJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#tours`,
    name: "Curated Himachal Pradesh journeys",
    description:
      "Three signature, small-group Himachal tours by Wandering Saya Travels. Custom routes available on request.",
    numberOfItems: packages.length,
    itemListElement: packages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: tripJsonLd(p),
    })),
  } as Record<string, unknown>;
}
