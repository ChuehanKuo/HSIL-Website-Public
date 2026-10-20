import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// The /2026 sections render only after the lazy archive chunk resolves, so a
// #hash target can appear well after the browser's own fragment jump failed.
const TARGET_TIMEOUT_MS = 5000;
// After the jump, late layout (fonts swapping, images loading above a section)
// or the browser's own history restoration can still move the page; scroll
// anchoring doesn't catch either, so re-align until the target holds still.
const SETTLED_MS = 1000;
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

// Router-level scroll handling: a new page starts at the top, and a #hash
// (deep link or in-app link) lands on its section once that section exists.
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  // Keyed by history entry, so re-running the effect for the same entry
  // (StrictMode) compares against the same previous page.
  const visit = useRef<{ key: string; pathname: string; from: string | null } | null>(null);

  useEffect(() => {
    if (visit.current?.key !== key) visit.current = { key, pathname, from: visit.current?.pathname ?? null };
    const { from } = visit.current;
    const initialLoad = from === null;
    const pageChanged = !initialLoad && from !== pathname;

    // A POP within the same page is a native #anchor click or back/forward
    // between anchors: the browser (or Lenis on desktop /2026) already scrolls.
    // Across pages the browser's own restoration runs before the new route
    // renders and clamps to the old page's height, so those start fresh too.
    const samePagePop = !initialLoad && !pageChanged && navigationType === "POP";
    // A plain first load keeps the browser's position (e.g. after a reload).
    if (samePagePop || (initialLoad && !hash)) return;

    let id = "";
    if (hash) {
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }
    }
    const find = () => (hash ? document.getElementById(id) : document.documentElement);

    let target: HTMLElement | null = null;
    let deadline = performance.now() + TARGET_TIMEOUT_MS;
    let top = 0;
    let stableSince = 0;
    let frame = 0;

    const release = () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisible);
      for (const type of USER_SCROLL_EVENTS) window.removeEventListener(type, release, true);
    };
    const align = (el: HTMLElement) => {
      // "instant" overrides html { scroll-behavior: smooth }, which would
      // otherwise animate the jump from the old page's offset.
      if (hash) el.scrollIntoView({ block: "start", behavior: "instant" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      top = el.getBoundingClientRect().top;
      stableSince = performance.now();
    };
    const step = () => {
      const now = performance.now();
      if (now > deadline) return release();
      if (!target) {
        target = find();
        if (target) {
          deadline = now + TARGET_TIMEOUT_MS;
          align(target);
        }
      } else if (Math.abs(target.getBoundingClientRect().top - top) >= 1) {
        align(target);
      } else if (now - stableSince > SETTLED_MS) {
        return release();
      }
      frame = requestAnimationFrame(step);
    };

    // A tab opened in the background (Cmd/Ctrl-click on a deep link) gets no animation
    // frames, so the budget would run out unseen: start counting once the tab is shown.
    function onVisible() {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisible);
      deadline = performance.now() + TARGET_TIMEOUT_MS;
      step();
    }

    // The reader takes over the moment they scroll, tap, click or press a key.
    for (const type of USER_SCROLL_EVENTS) window.addEventListener(type, release, { capture: true, passive: true });
    if (document.visibilityState === "hidden") document.addEventListener("visibilitychange", onVisible);
    else step();
    return release;
  }, [pathname, hash, key, navigationType]);

  return null;
};

export default ScrollManager;
