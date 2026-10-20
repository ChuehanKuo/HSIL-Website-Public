import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { act, render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { collectSiteText, subsetNotoLink } from "../../build/noto-subset";
import { routeHtmlFiles } from "../../build/route-html";
import RouteMeta from "@/components/RouteMeta";
import { edition2026 } from "@/content/edition-2026";
import { edition2027 } from "@/content/edition-2027";
import { metadataFor, NOT_FOUND, ROUTES, SITE_URL, type RouteMetadata } from "@/content/routes";

const root = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");

// The head as a crawler reads it. Lists, so a duplicated tag fails the comparison.
const headOf = (doc: Document) => {
  const all = (selector: string, name: string) =>
    Array.from(doc.querySelectorAll(selector), (el) => el.getAttribute(name));
  const meta = (attr: string, key: string) => all(`meta[${attr}="${key}"]`, "content");
  return {
    lang: doc.documentElement.getAttribute("lang"),
    title: Array.from(doc.querySelectorAll("title"), (el) => el.textContent),
    canonical: all('link[rel="canonical"]', "href"),
    description: meta("name", "description"),
    robots: meta("name", "robots"),
    ogUrl: meta("property", "og:url"),
    ogTitle: meta("property", "og:title"),
    ogDescription: meta("property", "og:description"),
    ogImage: [...meta("property", "og:image"), ...meta("property", "og:image:width"), ...meta("property", "og:image:height")],
    twitterTitle: meta("name", "twitter:title"),
    twitterDescription: meta("name", "twitter:description"),
    twitterImage: meta("name", "twitter:image"),
    jsonLd: Array.from(doc.querySelectorAll('script[type="application/ld+json"]'), (el) => JSON.parse(el.textContent ?? "")),
  };
};

// The same fields, as routes.ts says they should read.
const expectedHead = (route: RouteMetadata) => ({
  lang: route.lang,
  title: [route.title],
  canonical: route.url ? [route.url] : [],
  description: [route.description],
  robots: route.robots ? [route.robots] : [],
  ogUrl: route.url ? [route.url] : [],
  ogTitle: [route.title],
  ogDescription: [route.description],
  ogImage: [route.image.url, String(route.image.width), String(route.image.height)],
  twitterTitle: [route.title],
  twitterDescription: [route.description],
  twitterImage: [route.image.url],
  jsonLd: route.jsonLd ? [route.jsonLd] : [],
});

describe("deploy", () => {
  it("serves /2026 from its own file, sends unknown paths to the real 404 and caches hashed assets", () => {
    const vercel = JSON.parse(read("vercel.json"));
    // Exactly one rewrite per non-root route (today: /2026 -> /2026/index.html) and no SPA
    // catch-all: a path that matches no file must reach dist/404.html with a 404 status.
    expect(vercel.rewrites).toEqual(
      Object.keys(ROUTES)
        .filter((path) => path !== "/")
        .map((path) => ({ source: path, destination: `${path}/index.html` })),
    );
    expect(vercel.trailingSlash).toBe(false);
    const assets = vercel.headers.find((h: { source: string }) => h.source === "/assets/(.*)");
    expect(assets.headers).toEqual([{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]);
  });

  it("canonicalizes on www and lists every route in the sitemap", () => {
    const html = read("index.html");
    expect(html).toContain("https://www.hsilhackathontaiwan.com/og.jpg");
    expect(html).not.toContain("storage.googleapis.com");
    const urls = Object.values(ROUTES).map((route) => route.url);
    for (const url of urls) expect(url?.startsWith(`${SITE_URL}/`)).toBe(true);
    const sitemap = read("public/sitemap.xml");
    expect(Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1])).toEqual(urls);
  });

  it("lets the CSP load the Google-hosted Noto TC fonts that index.html preloads", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const csp: string = vercel.headers
      .flatMap((h: { headers: { key: string; value: string }[] }) => h.headers)
      .find((h: { key: string }) => h.key === "Content-Security-Policy").value;
    const html = read("index.html");
    expect(html).toMatch(/id="noto-tc"[\s\S]*?href="https:\/\/fonts\.googleapis\.com\/css2\?/);
    expect(csp).toMatch(/style-src[^;]*https:\/\/fonts\.googleapis\.com/);
    expect(csp).toMatch(/font-src[^;]*https:\/\/fonts\.gstatic\.com/);
  });

  it("keeps the Google font request off the render-blocking CSS path", () => {
    expect(read("src/index.css")).not.toMatch(/@import[^;]*fonts\.googleapis\.com/);
    expect(read("src/main.tsx")).toContain('getElementById("noto-tc")');
  });
});

describe("route metadata", () => {
  it("matches index.html's defaults for /", () => {
    expect(headOf(parse(read("index.html")))).toEqual(expectedHead(ROUTES["/"]));
  });

  it("keeps its copies of edition facts in sync with the content modules", () => {
    expect(ROUTES["/"].jsonLd).toMatchObject({ email: edition2027.email, sameAs: [edition2027.instagramUrl] });
    expect(ROUTES["/2026"].jsonLd?.organizer).toContainEqual(expect.objectContaining({ url: edition2026.hsilUrl }));
  });

  it("resolves URL paths as Vercel serves them", () => {
    expect(metadataFor("/")).toBe(ROUTES["/"]);
    expect(metadataFor("/index.html")).toBe(ROUTES["/"]);
    expect(metadataFor("/2026")).toBe(ROUTES["/2026"]);
    expect(metadataFor("/2026/")).toBe(ROUTES["/2026"]);
    expect(metadataFor("/2026/index.html")).toBe(ROUTES["/2026"]);
    expect(metadataFor("/2027")).toBe(NOT_FOUND);
    expect(metadataFor("/nope/deeper")).toBe(NOT_FOUND);
  });

  it("swaps the head during in-app navigation", async () => {
    const router = createMemoryRouter([{ path: "*", element: createElement(RouteMeta) }], {
      initialEntries: ["/2026"],
    });
    render(createElement(RouterProvider, { router }));
    expect(headOf(document)).toEqual(expectedHead(ROUTES["/2026"]));
    await act(() => router.navigate("/missing-page"));
    expect(headOf(document)).toEqual(expectedHead(NOT_FOUND));
    await act(() => router.navigate("/"));
    expect(headOf(document)).toEqual(expectedHead(ROUTES["/"]));
  });
});

describe("per-route HTML (build/route-html.ts)", () => {
  // index.html as Vite emits it, with the asset tags injected before </head>.
  const built = read("index.html").replace(
    "</head>",
    '  <script type="module" crossorigin src="/assets/index-abc123.js"></script>\n  </head>',
  );
  const files = routeHtmlFiles(built);

  it("writes index.html, 2026/index.html and 404.html", () => {
    expect(Object.keys(files).sort()).toEqual(["2026/index.html", "404.html", "index.html"]);
  });

  it("gives /2026 its own English head and Event data", () => {
    const doc = parse(files["2026/index.html"]);
    expect(headOf(doc)).toEqual(expectedHead(ROUTES["/2026"]));
    expect(doc.documentElement.lang).toBe("en");
    expect(doc.title).toBe("HSIL Hackathon 2026 — Taiwan Hub | April 10–11, 2026");
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://www.hsilhackathontaiwan.com/2026",
    );
    expect(headOf(doc).jsonLd).toEqual([
      expect.objectContaining({
        "@context": "https://schema.org",
        "@type": "Event",
        startDate: "2026-04-10",
        endDate: "2026-04-11",
        location: expect.objectContaining({ name: "NTU College of Public Health, Room 201" }),
      }),
    ]);
  });

  it("marks 404.html noindex, with no canonical, og:url or JSON-LD", () => {
    const doc = parse(files["404.html"]);
    expect(headOf(doc)).toEqual(expectedHead(NOT_FOUND));
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex");
    expect(doc.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it("keeps / as index.html declares it and leaves everything else untouched", () => {
    expect(headOf(parse(files["index.html"]))).toEqual(headOf(parse(built)));
    for (const html of Object.values(files)) {
      expect(html).toContain(read("index.html").match(/<link\s+id="noto-tc"[\s\S]*?\/>/)?.[0]);
      expect(html).toContain('<script type="module" crossorigin src="/assets/index-abc123.js"></script>');
      expect(html).toContain('<div id="root"></div>');
      expect(html).toContain("<noscript>");
    }
  });
});

describe("Noto TC subset (build/noto-subset.ts)", () => {
  const text = collectSiteText(root);

  it("collects every character the pages render, once", () => {
    for (const phrase of ["全球健康創新黑客松", "台灣站", "活動圓滿落幕", "詳情將陸續公布", "·—–", "AZaz09.,&@"]) {
      for (const ch of phrase) expect(text).toContain(ch);
    }
    expect(new Set(text).size).toBe([...text].length);
  });

  it("points the preloaded Noto link at the subset, keeping family and weights", () => {
    const base =
      "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400..600&family=Noto+Serif+TC:wght@400&display=swap";
    const notoHref = (html: string) => html.match(/id="noto-tc"[\s\S]*?\bhref="([^"]*)"/)?.[1];
    const once = subsetNotoLink(read("index.html"), "台灣 AB");
    expect(notoHref(once)).toBe(`${base}&text=${encodeURIComponent("台灣 AB")}`);
    // Re-running replaces the subset instead of appending a second one.
    expect(notoHref(subsetNotoLink(once, "站"))).toBe(`${base}&text=${encodeURIComponent("站")}`);
  });

  it("fails the build when the Noto link is missing", () => {
    expect(() => subsetNotoLink("<html><head></head></html>", "a")).toThrow(/noto-tc/);
  });
});
