import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionOutro from "@/components/ui/SectionOutro";
import Reveal from "@/components/ui/Reveal";
import Picture from "@/components/Picture";
import { judges, mentors, type Person } from "@/content/edition-2026";

const PersonCard = ({ person }: { person: Person }) => (
  <div className="text-center">
    <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
      <Picture picture={person.img} sizes="160px" alt={person.en} className="w-full h-full object-cover" />
    </div>
    <p lang="zh-Hant" className="font-display text-base text-foreground leading-tight">{person.name}</p>
    <p className="text-sm text-muted-foreground">{person.en}</p>
    <p lang="zh-Hant" className="text-xs text-foreground/70 mt-1 font-medium">{person.title}</p>
    <p lang="zh-Hant" className="text-xs text-muted-foreground">{person.org}</p>
  </div>
);

const JudgingSection = () => (
  <Section id="judging" tone="stone">
    <SectionHeader
      eyebrow="Mentors & Judges"
      title={
        <>
          The <span className="italic text-primary">panel</span>.
        </>
      }
      lede="Three mentors on Day 1. Five judges on Day 2. Every team was seen."
    />

    <div className="max-w-5xl mx-auto space-y-16">
      <Reveal>
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground mb-8 border-t border-foreground/10 pt-6">
          Mentors · Day 1
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {mentors.map((m) => <PersonCard key={m.en} person={m} />)}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground mb-8 border-t border-foreground/10 pt-6">
          Judges · Day 2
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {judges.map((j) => <PersonCard key={j.en + j.title} person={j} />)}
        </div>
      </Reveal>
    </div>

    <SectionOutro>
      Each team had three minutes to pitch, followed by open Q&A from the judges — adapted from HSIL's 8-minute global standard to accommodate 31 competing teams.
    </SectionOutro>
  </Section>
);

export default JudgingSection;
