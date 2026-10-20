import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionOutro from "@/components/ui/SectionOutro";
import Reveal from "@/components/ui/Reveal";
import ScrubNumber from "@/components/ScrubNumber";
import { eventStats } from "@/content/edition-2026";

const AboutSection = () => (
  <Section id="about" tone="stone">
    {/* Whisper of hero atmosphere — opposite corner from Winners */}
    <div
      className="absolute -bottom-40 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, hsl(37 90% 60% / 0.08) 0%, transparent 60%)" }}
      aria-hidden
    />

    <SectionHeader
      eyebrow="About · 活動回顧"
      title={
        <>
          <span className="block mb-3">Taiwan's <span className="italic text-primary">first</span></span>
          <span className="whitespace-nowrap">HSIL Hackathon</span>.
        </>
      }
      lede={
        <>
          <p className="mb-4">
            On April 10 and 11, 2026, the Harvard T.H. Chan School of Public Health's{" "}
            <em className="text-primary">Health Systems Innovation Lab</em> brought its seventh annual hackathon to Taipei — the first time the program has been hosted in Taiwan.
          </p>
          <p className="text-sm md:text-base not-italic text-foreground/70 font-sans leading-[1.8]">
            Co-hosted by National Taiwan University's Health Economics & AI Lab (620 Lab), the two-day event gathered students, clinicians, engineers, designers, and researchers to build AI-driven solutions against eleven reference tracks — from EHR analysis to pediatric AI — under the theme <em className="not-italic font-medium text-foreground">Building High-Value Health Systems, Leveraging AI.</em>
          </p>
        </>
      }
    />

    <div className="max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground mb-10 border-t border-foreground/10 pt-8">
          By the Numbers
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {eventStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div>
              <div className="font-display font-normal text-5xl md:text-7xl text-foreground leading-none mb-3 tabular-nums">
                {s.prefix}
                <ScrubNumber target={s.target} />
              </div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground leading-snug">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>

    <SectionOutro>
      Two days of real problems and real teams.
    </SectionOutro>
  </Section>
);

export default AboutSection;
