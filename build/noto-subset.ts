import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";

// Noto Sans/Serif TC come from Google Fonts. Left to itself, Google slices the CJK
// fonts by unicode-range, and /2026 (~200 distinct Chinese characters) pulled 36 font
// files, 1.7 MB. With &text=, Google returns one file per family holding exactly the
// requested glyphs (~140 KB for the whole site, weight range intact). The set is every
// non-ASCII character in the source plus printable ASCII (body text renders Latin in
// Noto Sans TC); a character missing from it falls back to the system font, nothing breaks.

const NOTO_LINK = /(<link\b[^>]*\bid="noto-tc"[^>]*\bhref=")([^"]*)(")/;

/** Every character the site can render: printable ASCII + non-ASCII in src/ (minus tests) and index.html. */
export function collectSiteText(root: string): string {
  const chars = new Set<string>();
  for (let code = 0x20; code <= 0x7e; code++) chars.add(String.fromCharCode(code));
  const addFile = (path: string) => {
    for (const ch of readFileSync(path, "utf8")) if (ch.codePointAt(0)! > 0x7e) chars.add(ch);
  };
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        if (name !== "test") walk(path);
      } else if (/\.(tsx?|html)$/.test(name)) addFile(path);
    }
  };
  walk(join(root, "src"));
  addFile(join(root, "index.html"));
  return [...chars].sort().join("");
}

/** Points the #noto-tc link at a font subset holding exactly `text`. Pure. */
export function subsetNotoLink(html: string, text: string): string {
  if (!NOTO_LINK.test(html)) throw new Error('noto-subset: index.html has no <link id="noto-tc" href="…">');
  return html.replace(NOTO_LINK, (_match, start: string, href: string, end: string) => {
    const base = href.replace(/&text=[^&]*/, "");
    return `${start}${base}&text=${encodeURIComponent(text)}${end}`;
  });
}

export function notoSubset(): Plugin {
  let root = process.cwd();
  return {
    name: "noto-subset",
    configResolved(config) {
      root = config.root;
    },
    // Runs for the dev server and the build, so both request the same subset.
    transformIndexHtml(html) {
      return subsetNotoLink(html, collectSiteText(root));
    },
  };
}
