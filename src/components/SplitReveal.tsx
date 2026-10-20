import { useLayoutEffect, useRef, ReactNode, Children, isValidElement, cloneElement } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

interface Props {
  children: string | ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  by?: "word" | "char";
}

// Scroll-triggered word/character reveal. Wraps plain strings; skips React children.
// For React nodes, call onEnter prop with the same signature (not auto-split).
const SplitReveal = ({
  children,
  className,
  stagger = 0.04,
  duration = 0.9,
  delay = 0,
  by = "word",
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-split]");
    if (!targets.length) return;

    gsap.set(targets, { yPercent: 105, opacity: 0 });

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root,
        // clamp(): a start past the maximum scroll (text near the page end) is pulled back
        // to it, so reaching the bottom still reveals the text.
        start: "clamp(top 85%)",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger, duration, delay]);

  // Split a plain string into words (or chars); wrap each in inline-block for transform.
  const renderString = (s: string) => {
    const units = by === "char" ? Array.from(s) : s.split(/(\s+)/);
    return units.map((u, i) => {
      if (/^\s+$/.test(u)) return <span key={i}>{u}</span>;
      return (
        <span key={i} className="inline-block overflow-hidden align-top px-[0.05em] py-[0.25em]">
          <span data-split className="inline-block will-change-transform">
            {u}
          </span>
        </span>
      );
    });
  };

  // If children is a string, split it. If it's a React tree, walk it shallowly and split text nodes.
  const render = (node: ReactNode): ReactNode => {
    if (typeof node === "string") return renderString(node);
    if (typeof node === "number") return renderString(String(node));
    if (Array.isArray(node)) return node.map((n, i) => <span key={i}>{render(n)}</span>);
    if (isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: ReactNode }>;
      return cloneElement(element, {
        ...element.props,
        children: Children.map(element.props.children, (c) => render(c)),
      });
    }
    return node;
  };

  return (
    <span ref={ref} className={className}>
      {render(children)}
    </span>
  );
};

export default SplitReveal;
