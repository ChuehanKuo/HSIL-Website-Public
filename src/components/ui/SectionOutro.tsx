import Reveal from "./Reveal";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  tone?: "light" | "dark";
  delay?: number;
}

// Unified section close: hairline rule + italic caption.
const SectionOutro = ({ children, tone = "light", delay = 0.2 }: Props) => (
  <Reveal delay={delay} className="mt-20 md:mt-24 max-w-2xl mx-auto text-center">
    <div className={`h-px w-12 mx-auto mb-8 ${tone === "dark" ? "bg-white/20" : "bg-foreground/20"}`} />
    <p
      className={`font-serif italic text-sm md:text-base leading-relaxed ${
        tone === "dark" ? "text-white/60" : "text-muted-foreground"
      }`}
    >
      {children}
    </p>
  </Reveal>
);

export default SectionOutro;
