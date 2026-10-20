import { useLayoutEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

interface Props {
  children: ReactNode;
  distance?: number;
  className?: string;
}

// Wraps content in a GSAP ScrollTrigger-driven parallax.
// Element drifts upward as the user scrolls, slower than scroll speed.
const ParallaxTitle = ({ children, distance = 60, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tween = gsap.fromTo(
      el,
      { y: 0 },
      {
        y: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ParallaxTitle;
