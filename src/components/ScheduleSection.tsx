import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionOutro from "@/components/ui/SectionOutro";
import Reveal from "@/components/ui/Reveal";
import { edition2026, scheduleDays } from "@/content/edition-2026";

const ScheduleSection = () => (
  <Section id="schedule" tone="ivory">
    <SectionHeader
      eyebrow="The Schedule"
      title={
        <>
          Two days,
          <br />
          <span className="italic text-primary whitespace-nowrap">start to finish</span>.
        </>
      }
      lede="How the two days unfolded — from opening ceremony to closing group photo."
    />

    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
      {scheduleDays.map((day, d) => (
        <Reveal key={day.label} delay={d * 0.15}>
          <div className="bg-[hsl(40_35%_97%)] p-8 md:p-12 h-full">
            <div className="mb-10 pb-6 border-b border-foreground/10">
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">
                {day.date}
              </p>
              <h3 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-2">
                {day.label}
              </h3>
              <p className="font-serif italic text-sm md:text-base text-muted-foreground">
                {day.subtitle}
              </p>
            </div>

            <div>
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 py-4 border-b border-foreground/5 last:border-0 group"
                >
                  <span className="font-display text-base md:text-lg text-muted-foreground w-14 shrink-0 tabular-nums pt-0.5">
                    {item.time}
                  </span>
                  <span className="text-sm md:text-base text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    <SectionOutro>
      {edition2026.scheduleVenue}
    </SectionOutro>
  </Section>
);

export default ScheduleSection;
