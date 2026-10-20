import { useEffect, useRef, useState } from "react";

interface Options {
  duration?: number;
  delay?: number;
  threshold?: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Counts 0 → target (ease-out cubic) the first time the element scrolls into view.
// With reduced motion the final value renders immediately.
export const useCountUp = <T extends Element>(
  target: number,
  { duration = 1500, delay = 0, threshold = 0.3 }: Options = {}
) => {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let timer = 0;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = -1;
        const step = (now: number) => {
          if (start < 0) start = now;
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        timer = window.setTimeout(() => {
          frame = requestAnimationFrame(step);
        }, delay);
      },
      { threshold }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target, duration, delay, threshold]);

  return { ref, value };
};
