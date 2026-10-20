import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionOutro from "@/components/ui/SectionOutro";
import Reveal from "@/components/ui/Reveal";
import Picture from "@/components/Picture";
import ZhRuns from "@/components/ui/ZhRuns";

import coreTeam from "@/assets/team/core-team.jpg?w=400;800;1200&format=webp;jpg&as=picture";
import { organizers } from "@/content/edition-2026";

const OrganizersSection = () => (
  <Section id="organizers" tone="stone">
    <SectionHeader
      eyebrow="The Team · 主辦團隊"
      title={
        <>
          The people who{" "}
          <span className="italic text-primary whitespace-nowrap">built this</span>.
        </>
      }
      lede="A student-led volunteer team under NTU College of Public Health's Health Economics & AI Lab, operating the first HSIL Hackathon ever hosted in Taiwan."
    />

    <div className="max-w-3xl mx-auto mb-24">
      <Reveal>
        <figure className="relative overflow-hidden rounded-sm">
          <Picture
            picture={coreTeam}
            sizes="(min-width: 816px) 768px, calc(100vw - 48px)"
            alt="Core organizing team"
            className="w-full h-auto"
          />
        </figure>
      </Reveal>
    </div>

    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
      {organizers.map((m, i) => (
        <Reveal key={m.name} delay={i * 0.04}>
          <div className="text-center">
            <div aria-hidden="true" className="w-20 h-20 bg-foreground/5 border border-foreground/10 flex items-center justify-center rounded-full mx-auto mb-3">
              <span className="font-display text-xl text-foreground/40">{m.initials}</span>
            </div>
            <p className="font-display text-base text-foreground leading-tight"><ZhRuns text={m.name} /></p>
            {m.nameZh && <p lang="zh-Hant" className="text-sm text-muted-foreground">{m.nameZh}</p>}
            <p className="text-xs font-medium text-primary mt-1"><ZhRuns text={m.role} /></p>
          </div>
        </Reveal>
      ))}
    </div>

    <SectionOutro>
      No agency. No sponsorship firm. Ten people, two days.
    </SectionOutro>
  </Section>
);

export default OrganizersSection;
