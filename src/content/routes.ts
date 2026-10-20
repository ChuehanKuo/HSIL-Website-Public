// Page metadata per route: the single source for the <head> the build writes into
// each route's HTML (build/route-html.ts) and for the head RouteMeta swaps in during
// in-app navigation (src/components/RouteMeta.tsx).
//
// vite.config.ts loads this file in Node, so it stays plain data: no asset imports,
// no "@/" alias, no DOM or Node APIs. That is why the three facts below are copies
// rather than imports (edition-2026.ts imports photos); src/test/deploy.test.ts
// checks that the copies still match their sources.

export const SITE_URL = "https://www.hsilhackathontaiwan.com";

const HUB_NAME = "HSIL Hackathon Taiwan Hub";
const CONTACT_EMAIL = "hsilhackathon.taiwan@gmail.com"; // edition2027.email
const INSTAGRAM_URL = "https://www.instagram.com/hsilhackathon.taiwan/"; // edition2027.instagramUrl
const HSIL_2026_URL = // edition2026.hsilUrl
  "https://hsph.harvard.edu/research/health-systems-innovation-lab/work/hsil-hackathon-2026-building-high-value-health-systems-leveraging-ai/";

/** public/og.jpg */
const OG_IMAGE = { url: `${SITE_URL}/og.jpg`, width: 1200, height: 630 };

export interface RouteMetadata {
  lang: "zh-Hant" | "en";
  /** <title>, og:title and twitter:title. */
  title: string;
  /** Meta description, og:description and twitter:description. */
  description: string;
  /** Canonical URL and og:url; omitted on the not-found page. */
  url?: string;
  image: { url: string; width: number; height: number };
  /** Omitted on indexable pages. */
  robots?: string;
  /** schema.org JSON-LD. */
  jsonLd?: Record<string, unknown>;
}

const DESCRIPTION_2026 =
  "Taiwan's first HSIL Hackathon (Harvard Health Systems Innovation Lab), April 10–11, 2026, NTU College of Public Health: 137 applicants, 31 teams. Winners: PhenoCDS, ICBigBoss, The Healthorithm. PhenoCDS was one of 20 global Demo Day finalists.";

export const ROUTES: Readonly<Record<"/" | "/2026", RouteMetadata>> = {
  "/": {
    lang: "zh-Hant",
    title: "2027 全球健康創新黑客松｜HSIL Hackathon Taiwan Hub",
    description:
      "HSIL Hackathon 2027 台灣站將於 2027 年 4 月 16–17 日舉行，主題為「運用人工智慧打造高價值健康體系」。參賽免費，預計 2026 年 12 月 1 日開放申請；報名與活動詳情將陸續公布。",
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: HUB_NAME,
      url: `${SITE_URL}/`,
      email: CONTACT_EMAIL,
      sameAs: [INSTAGRAM_URL],
    },
  },
  "/2026": {
    lang: "en",
    title: "HSIL Hackathon 2026 — Taiwan Hub | April 10–11, 2026",
    description: DESCRIPTION_2026,
    url: `${SITE_URL}/2026`,
    image: OG_IMAGE,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "HSIL Hackathon 2026 — Taiwan Hub",
      description: DESCRIPTION_2026,
      startDate: "2026-04-10",
      endDate: "2026-04-11",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "NTU College of Public Health, Room 201",
        address: { "@type": "PostalAddress", addressLocality: "Taipei", addressCountry: "TW" },
      },
      organizer: [
        { "@type": "Organization", name: HUB_NAME, url: `${SITE_URL}/` },
        {
          "@type": "Organization",
          name: "Health Systems Innovation Lab, Harvard T.H. Chan School of Public Health",
          url: HSIL_2026_URL,
        },
      ],
      image: OG_IMAGE.url,
    },
  },
};

export const NOT_FOUND: RouteMetadata = {
  lang: "en",
  title: "Page not found | HSIL Hackathon — Taiwan Hub",
  description: "This page does not exist on the HSIL Hackathon Taiwan Hub website.",
  image: OG_IMAGE,
  robots: "noindex",
};

/** Metadata for a URL pathname. "/2026/" and "/2026/index.html" resolve to "/2026". */
export function metadataFor(pathname: string): RouteMetadata {
  const path = pathname.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
  return Object.prototype.hasOwnProperty.call(ROUTES, path) ? ROUTES[path as keyof typeof ROUTES] : NOT_FOUND;
}

export interface HeadMeta {
  attr: "name" | "property";
  key: string;
  /** null: the tag must be absent. */
  content: string | null;
}

/** The managed <head> of one route. Build and browser apply exactly this set. */
export interface HeadTags {
  lang: string;
  title: string;
  /** null: no canonical link. */
  canonical: string | null;
  meta: HeadMeta[];
  /** Serialized JSON-LD; null: no JSON-LD script. */
  jsonLd: string | null;
}

export function headTags(route: RouteMetadata): HeadTags {
  const url = route.url ?? null;
  return {
    lang: route.lang,
    title: route.title,
    canonical: url,
    meta: [
      { attr: "name", key: "description", content: route.description },
      { attr: "name", key: "robots", content: route.robots ?? null },
      { attr: "property", key: "og:url", content: url },
      { attr: "property", key: "og:title", content: route.title },
      { attr: "property", key: "og:description", content: route.description },
      { attr: "property", key: "og:image", content: route.image.url },
      { attr: "property", key: "og:image:width", content: String(route.image.width) },
      { attr: "property", key: "og:image:height", content: String(route.image.height) },
      { attr: "name", key: "twitter:title", content: route.title },
      { attr: "name", key: "twitter:description", content: route.description },
      { attr: "name", key: "twitter:image", content: route.image.url },
    ],
    // "<" is escaped so the JSON can never close its <script> element early.
    jsonLd: route.jsonLd ? JSON.stringify(route.jsonLd).replace(/</g, "\\u003c") : null,
  };
}
