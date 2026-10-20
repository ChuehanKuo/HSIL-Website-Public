import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { edition2026 } from "@/content/edition-2026";
import { useCountUp } from "@/hooks/useCountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

// Character reveal. Assistive tech reads the text once (sr-only); the animated glyphs are hidden from it.
const RevealText = ({
  text,
  className,
  delay = 0,
}: { text: string; className?: string; delay?: number }) => {
  const reduce = useReducedMotion();

  return (
    <span className={`inline-block ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.04,
            ease: EASE,
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  // Reduced motion renders every element at rest, so the hero is readable at first paint.
  const reduce = useReducedMotion();
  const global = useCountUp<HTMLDivElement>(edition2026.globalRegistrantCount, { duration: 2000, delay: 1800, threshold: 0.5 });
  const countries = useCountUp<HTMLDivElement>(edition2026.countryCount, { duration: 1400, delay: 1850, threshold: 0.5 });
  const local = useCountUp<HTMLDivElement>(edition2026.applicantCount, { duration: 1600, delay: 1900, threshold: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[hsl(40_35%_97%)]"
      data-tone="ivory"
    >
      {/* Gradient orbs — CSS keyframes (tailwind.config.ts) keep the drift on the compositor */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full animate-drift-a motion-reduce:animate-none"
          style={{ background: "radial-gradient(circle, hsl(352 72% 50% / 0.16) 0%, transparent 60%)" }}
        />
        <div
          className="absolute top-1/3 -left-48 w-[800px] h-[800px] rounded-full animate-drift-b motion-reduce:animate-none"
          style={{ background: "radial-gradient(circle, hsl(37 90% 60% / 0.10) 0%, transparent 60%)" }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.20] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(220 30% 15% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(220 30% 15% / 0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      {/* Hero content */}
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="relative z-10 flex-1 container mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-16 md:pb-20 max-w-6xl flex flex-col justify-center items-center text-center"
      >
        {/* HSIL HACKATHON lockup — compact, single cluster */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-3">
            <span className="font-display font-medium md:font-normal tracking-[0.4em] text-sm md:text-lg text-foreground uppercase">
              HSIL Hackathon
            </span>
            <span className="h-4 md:h-5 w-px bg-foreground/25" aria-hidden />
            <span className="font-serif italic text-primary text-sm md:text-base tracking-wide">
              Taiwan Hub
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 text-foreground/70">
            <div className="h-px w-6 bg-foreground/20" />
            <span className="font-display italic text-primary tracking-[0.2em] text-[10px] md:text-[11px]">
              {edition2026.editionLabel}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="tracking-[0.2em] text-[10px] md:text-[11px] uppercase">
              {edition2026.dates}
            </span>
            <div className="h-px w-6 bg-foreground/20" />
          </div>
        </motion.div>

        {/* Chinese + gold title */}
        <div className="mb-6 md:mb-8">
          <h1 lang="zh-Hant" className="font-display font-normal text-foreground leading-[1.3] tracking-tight">
            <span className="block overflow-hidden whitespace-nowrap py-2 md:py-4">
              <RevealText
                text="全球健康創新黑客松"
                className="text-[2.25rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.25rem]"
                delay={0.45}
              />
            </span>
            <span className="block overflow-hidden whitespace-nowrap py-2 md:py-4">
              <RevealText
                text={edition2026.titleZh}
                className="text-[1.85rem] sm:text-4xl md:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem] italic text-primary"
                delay={0.85}
              />
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25 }}
            className="font-serif italic text-base md:text-xl text-foreground/70 leading-[1.5] mt-3 md:mt-8 max-w-2xl mx-auto"
          >
            Building High-Value Health Systems,{" "}
            <span className="text-foreground">Leveraging AI</span>.
          </motion.p>
        </div>

        {/* Venue */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-10 md:mb-12 text-xs md:text-sm text-foreground/70"
        >
          <span className="font-serif italic">{edition2026.venueName}</span>
          <span className="w-1 h-1 rounded-full bg-foreground/25" />
          <span className="font-serif italic">{edition2026.venueCity}</span>
        </motion.div>

        {/* Stats — compact */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.55 }}
          className="grid grid-cols-3 gap-2 md:gap-6 mb-10 md:mb-12 max-w-3xl w-full"
        >
          {[
            { ref: global.ref, val: global.value.toLocaleString(), label: "Global Registrants", italic: false },
            { ref: countries.ref, val: countries.value.toString(), label: "Countries", italic: false },
            { ref: local.ref, val: local.value, label: "Taiwan Applicants", italic: true },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`text-center ${i === 1 ? "border-l border-r border-foreground/20 px-2" : ""}`}
            >
              <div
                ref={s.ref}
                className={`font-display ${s.italic ? "italic text-primary" : "text-foreground"} text-3xl md:text-5xl leading-none mb-2 tabular-nums`}
              >
                {s.val}
              </div>
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-foreground/70">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <a
            href="#winners"
            className="group relative inline-flex items-center gap-2.5 bg-foreground text-background px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10">View the Winners</span>
            <ArrowDown className="relative z-10 w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-foreground/70 hover:text-primary px-4 py-2 text-sm font-medium tracking-wide transition-colors"
            href={edition2026.hsilUrl}
          >
            Visit HSIL
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
