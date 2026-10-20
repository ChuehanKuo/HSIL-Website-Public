import type { Plugin } from "vite";
import { headTags, metadataFor, NOT_FOUND, ROUTES, type RouteMetadata } from "../src/content/routes";

// The site is a client-rendered SPA, but crawlers and link-preview scrapers read the
// HTML the server sends. This plugin gives each route its own copy of the built
// index.html with that route's <head> (from src/content/routes.ts), plus 404.html,
// which Vercel serves with a 404 status for any path that matches no file.

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Matches a whole tag together with its indentation (group 1) and line break (group 3),
// so a removed tag takes its line with it.
const tagLine = (tag: string) => new RegExp(`([ \\t]*)(${tag})([ \\t]*(?:\\r?\\n)?)`, "g");

// Replaces the first match with `tag` and drops any duplicates; appends `tag` when
// nothing matches; removes every match when `tag` is null.
function upsert(head: string, pattern: RegExp, tag: string | null): string {
  let placed = false;
  const out = head.replace(pattern, (_match, indent: string, _old: string, lineEnd: string) => {
    if (tag === null || placed) return "";
    placed = true;
    return indent + tag + lineEnd;
  });
  if (tag === null || placed) return out;
  const indent = /[ \t]*$/.exec(out)?.[0] ?? "";
  return `${out.slice(0, out.length - indent.length)}${indent}  ${tag}\n${indent}`;
}

/** Rewrites the managed <head> tags of an HTML document for one route. Pure. */
export function renderRouteHtml(html: string, route: RouteMetadata): string {
  const headEnd = html.search(/<\/head>/i);
  if (headEnd < 0) throw new Error("route-html: the HTML has no </head>");
  const tags = headTags(route);

  // Only the head is edited, so body markup (an SVG <title>, say) is never touched.
  let head = html.slice(0, headEnd);
  if (!/<html\b[^>]*\slang="[^"]*"/.test(head)) throw new Error('route-html: the HTML has no <html lang="…">');
  head = head.replace(/(<html\b[^>]*\slang=")[^"]*"/, (_match, start: string) => `${start}${tags.lang}"`);
  head = upsert(head, tagLine("<title>[\\s\\S]*?<\\/title>"), `<title>${escapeHtml(tags.title)}</title>`);
  head = upsert(
    head,
    tagLine('<link\\b[^>]*\\srel="canonical"[^>]*>'),
    tags.canonical === null ? null : `<link rel="canonical" href="${escapeHtml(tags.canonical)}" />`,
  );
  for (const { attr, key, content } of tags.meta) {
    head = upsert(
      head,
      tagLine(`<meta\\b[^>]*\\s${attr}="${escapeRegExp(key)}"[^>]*>`),
      content === null ? null : `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`,
    );
  }
  head = upsert(
    head,
    tagLine('<script\\b[^>]*\\stype="application/ld\\+json"[^>]*>[\\s\\S]*?<\\/script>'),
    tags.jsonLd === null ? null : `<script type="application/ld+json">${tags.jsonLd}</script>`,
  );
  return head + html.slice(headEnd);
}

/** Every HTML file the build writes, keyed by path in the output directory. */
export function routeHtmlFiles(indexHtml: string): Record<string, string> {
  const files: Record<string, string> = {};
  for (const [path, route] of Object.entries(ROUTES)) {
    files[path === "/" ? "index.html" : `${path.slice(1)}/index.html`] = renderRouteHtml(indexHtml, route);
  }
  files["404.html"] = renderRouteHtml(indexHtml, NOT_FOUND);
  return files;
}

export function routeHtml(): Plugin {
  return {
    name: "route-html",
    // "post" runs generateBundle after vite:build-html has emitted index.html with its asset tags.
    enforce: "post",
    transformIndexHtml(html, ctx) {
      // Dev server only: every URL gets index.html, so give it that URL's head, as production does.
      if (!ctx.server) return;
      return renderRouteHtml(html, metadataFor((ctx.originalUrl ?? ctx.path).split(/[?#]/)[0]));
    },
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (index?.type !== "asset" || typeof index.source !== "string") {
        return this.error("route-html: index.html is missing from the bundle");
      }
      for (const [fileName, html] of Object.entries(routeHtmlFiles(index.source))) {
        if (fileName === "index.html") index.source = html;
        else this.emitFile({ type: "asset", fileName, source: html });
      }
    },
  };
}
