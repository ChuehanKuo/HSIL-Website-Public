import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import RouteMeta from "./components/RouteMeta";
import ScrollManager from "./components/ScrollManager";
import { redactAnalyticsUrl } from "./lib/analytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// The archive pulls in GSAP, Lenis, and the 2026 sections. Keep it out of the
// front-door download; a direct /2026 visit gets dist/2026/index.html (written
// by build/route-html.ts, rewritten to in vercel.json), which loads this chunk.
const Edition2026 = lazy(() => import("./pages/Edition2026"));

const App = () => (
  <BrowserRouter>
    {/* Shared by the zh-Hant front door and the English archive, so each half declares its language. */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-background focus:shadow-lg"
    >
      <span lang="zh-Hant">跳至主要內容</span> · <span lang="en">Skip to content</span>
    </a>
    <RouteMeta />
    <ScrollManager />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/2026" element={<Edition2026 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    {import.meta.env.PROD && <Analytics beforeSend={redactAnalyticsUrl} />}
  </BrowserRouter>
);

export default App;
