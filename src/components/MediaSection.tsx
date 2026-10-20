import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ZhRuns from "@/components/ui/ZhRuns";
import { ArrowUpRight } from "lucide-react";
import { pressItems } from "@/content/edition-2026";

const MediaSection = () => (
  <Section id="media" tone="ivory">
    <SectionHeader
      eyebrow="Press · 媒體報導"
      title={
        <>
          Media{" "}<span className="italic text-primary">coverage</span>.
        </>
      }
    />

    <div className="max-w-4xl mx-auto">
      <Reveal>
        <div className="border-t border-foreground/10">
          {pressItems.map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-8 border-b border-foreground/10 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    <ZhRuns text={a.outlet} />
                  </p>
                  <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                    <ZhRuns text={a.title} />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <ZhRuns text={a.preview} />
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  </Section>
);

export default MediaSection;
