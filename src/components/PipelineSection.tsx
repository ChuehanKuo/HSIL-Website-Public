import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionOutro from "@/components/ui/SectionOutro";
import Reveal from "@/components/ui/Reveal";
import ZhRuns from "@/components/ui/ZhRuns";
import { pipelineStages } from "@/content/edition-2026";

const PipelineSection = () => (
  <Section tone="ivory">
    <SectionHeader
      eyebrow="After Taipei"
      title={
        <>
          The hackathon was{" "}
          <span className="italic text-primary">chapter one</span>.
        </>
      }
      lede={
        <>
          <p lang="zh-Hant" className="mb-4 text-xl md:text-2xl">黑客松之後</p>
          <p className="text-sm md:text-base not-italic font-sans text-muted-foreground leading-[1.85]">
            <span className="text-foreground font-medium">PhenoCDS</span>, Taiwan's first-place team, was one of 20 global Demo Day finalists on June 16, 2026. <span className="text-foreground font-medium">ICBigBoss</span>, the runner-up, was selected into the global program.
          </p>
        </>
      }
    />

    <div className="max-w-5xl mx-auto border-t border-foreground/10">
      {pipelineStages.map((s, i) => (
        <Reveal key={s.num} delay={i * 0.08}>
          <div className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-foreground/10 group hover:bg-foreground/[0.02] transition-colors duration-500">
            <div className="col-span-2 md:col-span-1">
              {/* Large text (24px+): /70 clears the 3:1 large-text minimum. */}
              <span className="font-display italic text-2xl md:text-3xl text-primary/70 group-hover:text-primary transition-colors duration-500">
                {s.num}
              </span>
            </div>
            <div className="col-span-10 md:col-span-4">
              <h3 className="font-display text-xl md:text-2xl text-foreground leading-tight mb-1">
                {s.title}
              </h3>
              <p className="font-serif italic text-sm text-primary mb-2">
                <ZhRuns text={s.zh} />
              </p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                {s.dates}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col justify-between gap-3">
              <p className="text-sm md:text-base text-muted-foreground leading-[1.75]">{s.desc}</p>
              {/* Status hues darkened to clear 4.5:1 on ivory (teal 5.2, gold 5.3). */}
              <p className={`text-[10px] tracking-[0.25em] uppercase self-start ${
                s.status === "Completed" ? "text-[hsl(170_85%_25%)]" :
                s.status === "In Progress" ? "text-[hsl(37_90%_30%)]" : "text-muted-foreground"
              }`}>
                {s.status === "Completed" ? "● Completed" : s.status === "In Progress" ? "◉ In Progress" : "○ Upcoming"}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    <SectionOutro>
      Demo Day was held on June 16, 2026.
    </SectionOutro>
  </Section>
);

export default PipelineSection;
