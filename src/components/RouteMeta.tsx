import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { headTags, metadataFor } from "@/content/routes";

// Sets `value` on the first <head> element matching `selector`, creating it when
// absent; removes it when `value` is null.
const sync = <T extends Element>(
  selector: string,
  value: string | null,
  create: () => T,
  apply: (el: T, value: string) => void,
) => {
  const existing = document.head.querySelector<T>(selector);
  if (value === null) {
    existing?.remove();
    return;
  }
  apply(existing ?? document.head.appendChild(create()), value);
};

// Browser counterpart of build/route-html.ts: after in-app navigation the <head>
// matches the HTML the server sends for that URL. Rendered inside <BrowserRouter>.
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = headTags(metadataFor(pathname));
    document.documentElement.lang = head.lang;
    document.title = head.title;
    sync(
      'link[rel="canonical"]',
      head.canonical,
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      (el, href) => el.setAttribute("href", href),
    );
    for (const { attr, key, content } of head.meta) {
      sync(
        `meta[${attr}="${key}"]`,
        content,
        () => {
          const meta = document.createElement("meta");
          meta.setAttribute(attr, key);
          return meta;
        },
        (el, value) => el.setAttribute("content", value),
      );
    }
    sync(
      'script[type="application/ld+json"]',
      head.jsonLd,
      () => Object.assign(document.createElement("script"), { type: "application/ld+json" }),
      (el, json) => {
        el.textContent = json;
      },
    );
  }, [pathname]);

  return null;
};

export default RouteMeta;
