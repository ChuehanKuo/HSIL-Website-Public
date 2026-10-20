import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/SplitReveal";
import { edition2027 } from "@/content/edition-2027";

const CTASection = () => (
  <Section tone="dark">
    {/* Crimson glow, centred behind the heading. Centred with a negative margin, not
        -translate-x-1/2: the pulse animates transform and would override a translate. */}
    <div
      className="absolute -top-40 left-1/2 -ml-[450px] w-[900px] h-[500px] rounded-full pointer-events-none animate-glow-pulse motion-reduce:animate-none"
      style={{ background: "radial-gradient(circle, hsl(352 72% 40% / 0.2) 0%, transparent 65%)" }}
      aria-hidden
    />

    <div className="max-w-4xl mx-auto text-center">
      <Reveal>
        <p className="text-[10px] md:text-xs font-medium tracking-[0.35em] text-[hsl(37_90%_75%)] uppercase mb-10">
          2026
        </p>
      </Reveal>

      <h2 lang="zh-Hant" className="font-display font-normal text-white leading-[1] tracking-tight mb-12">
        <SplitReveal by="char" stagger={0.05} duration={1} className="block text-6xl md:text-8xl lg:text-9xl">
          活動
        </SplitReveal>
        <SplitReveal by="char" stagger={0.05} delay={0.2} duration={1} className="block text-6xl md:text-8xl lg:text-9xl italic text-[hsl(37_90%_75%)] mt-3">
          圓滿落幕.
        </SplitReveal>
      </h2>

      <Reveal delay={0.2}>
        <p className="font-serif italic text-xl md:text-2xl text-white/80 leading-[1.5] max-w-2xl mx-auto mb-16">
          Thank you to every participant, mentor, judge, and partner who made Taiwan's first HSIL Hackathon possible.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        {/* Only the forward-looking line is labelled 2027. */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-20 bg-white/25" aria-hidden />
          <span className="font-display italic text-sm text-white/55">2027</span>
          <div className="h-px w-20 bg-white/25" aria-hidden />
        </div>
        <p className="font-display text-2xl md:text-3xl text-white/90 leading-snug">
          Details to be announced.
        </p>
        <p lang="zh-Hant" className="font-serif italic text-base md:text-lg text-white/55 mt-4">
          詳情將陸續公布
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <p className="text-xs tracking-[0.25em] uppercase text-white/55 mt-14">
          Contact · {edition2027.email}
        </p>
      </Reveal>
    </div>
  </Section>
);

export default CTASection;
