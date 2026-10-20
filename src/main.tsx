import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Only the faces the site renders (measured per route and viewport, 2026-09-26).
// Add a weight here before using it in a class, or the browser fakes it.
import "@fontsource/eb-garamond/latin-400.css";
import "@fontsource/eb-garamond/latin-400-italic.css";
import "@fontsource/eb-garamond/latin-500.css";
import "@fontsource/crimson-text/latin-400.css";
import "@fontsource/crimson-text/latin-400-italic.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";

// Apply the Noto TC stylesheet that index.html preloads. A script-inserted
// stylesheet doesn't block rendering, so Chinese text paints in the system
// font first and swaps to Noto when it arrives (display=swap). An inline
// onload handler would do the same but is blocked by the CSP (script-src 'self').
const notoPreload = document.getElementById("noto-tc") as HTMLLinkElement | null;
if (notoPreload) {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = notoPreload.href;
  document.head.appendChild(stylesheet);
}

createRoot(document.getElementById("root")!).render(<App />);
