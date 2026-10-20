import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionOutro from "@/components/ui/SectionOutro";
import Reveal from "@/components/ui/Reveal";
import Picture from "@/components/Picture";

import d1_group from "@/assets/gallery/_MG_5219.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d1_keynote from "@/assets/gallery/_MG_4608.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d1_opening from "@/assets/gallery/_MG_4738.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d1_mentor from "@/assets/gallery/_MG_5070.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d1_teams from "@/assets/gallery/_MG_5086.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d1_proflee from "@/assets/gallery/_MG_5158.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d1_network from "@/assets/gallery/_MG_5216.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";

import d2_group from "@/assets/gallery/_MG_5326.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_pitch from "@/assets/gallery/_MG_5460.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_judges from "@/assets/gallery/_MG_5655.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_phenocds from "@/assets/gallery/_MG_6095.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d1_discuss from "@/assets/gallery/_MG_5666.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_pitch2 from "@/assets/gallery/_MG_5625.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import emcees from "@/assets/gallery/_MG_6152.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_judge_q from "@/assets/gallery/_MG_6113.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_judges_side from "@/assets/gallery/_MG_5399.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_team_pitch from "@/assets/gallery/_MG_6047.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";
import d2_audience from "@/assets/gallery/_MG_5251.jpg?w=320;480;640;960;1400&format=webp;jpg&as=picture";

interface Tile { picture: ImagetoolsPicture; alt: string; gc: string; gr: string }

// Layout:
// [ 1  1  2  3 ]  row 1
// [ 1  1  4  5 ]  row 2
// [ 6  7  8  8 ]  row 3
// [ 6  7  9  9 ]  row 4

const day1: Tile[] = [
  { picture: d1_group,    alt: "Group photo of participants filling the lecture hall, the event banner behind them", gc: "1 / 3", gr: "1 / 3" },
  { picture: d1_keynote,  alt: "Participants in the darkened lecture hall watching a speaker on the big screen", gc: "3 / 4", gr: "1 / 2" },
  { picture: d1_opening,  alt: "A participant speaking into a microphone in front of the event banner", gc: "4 / 5", gr: "1 / 2" },
  { picture: d1_mentor,   alt: "Two men in conversation with a participant during mentor consultations", gc: "3 / 4", gr: "2 / 3" },
  { picture: emcees, alt: "Arthur C. Kuo speaking at the podium beside co-MC 艾庭", gc: "4 / 5", gr: "2 / 3" },
  { picture: d1_proflee,  alt: "Three attendees in conversation, one explaining with his hands", gc: "1 / 2", gr: "3 / 5" },
  { picture: d1_network,  alt: "A circle of attendees talking in front of the projection screen", gc: "2 / 3", gr: "3 / 5" },
  { picture: d1_teams,    alt: "Participants at their laptops, one flashing peace signs at the camera", gc: "3 / 5", gr: "3 / 4" },
  { picture: d1_discuss,  alt: "Six people in a row giving a thumbs-up in front of a whiteboard", gc: "3 / 5", gr: "4 / 5" },
];

const day2: Tile[] = [
  { picture: d2_group,       alt: "Group photo with the judging table in front and participants filling the rows behind", gc: "1 / 3", gr: "1 / 3" },
  { picture: d2_pitch,       alt: "A presenter pointing to a hand-drawn slide during his team's pitch", gc: "3 / 4", gr: "1 / 2" },
  { picture: d2_judges,      alt: "Judges at the judging table, Victoria Wang smiling at right", gc: "4 / 5", gr: "1 / 2" },
  { picture: d2_phenocds,    alt: "A PhenoCDS team member presenting a clinical case slide with leg X-rays", gc: "3 / 4", gr: "2 / 3" },
  { picture: d2_pitch2,      alt: "Two team members pitching at the podium, one speaking into the microphone", gc: "4 / 5", gr: "2 / 3" },
  { picture: d2_judge_q,     alt: "A judge standing with a microphone to question a team", gc: "1 / 2", gr: "3 / 5" },
  { picture: d2_audience,    alt: "Three participants at their laptops, sharing a laugh", gc: "2 / 3", gr: "3 / 5" },
  { picture: d2_team_pitch,  alt: "A five-person team on stage as one member speaks into the microphone", gc: "3 / 5", gr: "3 / 4" },
  { picture: d2_judges_side, alt: "Judges taking notes at the judging table", gc: "3 / 5", gr: "4 / 5" },
];

const span = (lines: string) => {
  const [start, end] = lines.split("/").map(Number);
  return end - start;
};

// Drawn width of a 3:2 photo under object-cover, by tile span (cols x rows), md and up.
// Columns stop growing at max-w-7xl (1328px viewport) while rows stay 14vw tall, so on wide
// screens a tall tile's photo is sized by its height and overflows its column.
const MOSAIC_SIZES: Record<string, string> = {
  "1x1": "(min-width: 1503px) 21vw, (min-width: 1328px) 316px, calc(25vw - 16px)",
  "1x2": "calc(42vw + 9px)",
  "2x1": "(min-width: 1328px) 637px, calc(50vw - 27px)",
  "2x2": "(min-width: 1496px) calc(42vw + 9px), (min-width: 1328px) 637px, calc(50vw - 27px)",
};
// Below md: two 3:2 columns inside the px-6 container, 8px gap.
const MOBILE_SIZES = "calc(50vw - 28px)";

const MosaicGrid = ({ tiles, delay = 0 }: { tiles: Tile[]; delay?: number }) => (
  <>
    {/* Desktop mosaic */}
    <div
      className="hidden md:grid gap-[6px]"
      style={{ gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "14vw" }}
    >
      {tiles.map((t, i) => (
        <Reveal
          key={i}
          delay={delay + i * 0.04}
          style={{ gridColumn: t.gc, gridRow: t.gr }}
        >
          <div className="relative overflow-hidden w-full h-full group">
            <Picture
              picture={t.picture}
              sizes={MOSAIC_SIZES[`${span(t.gc)}x${span(t.gr)}`]}
              alt={t.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      ))}
    </div>
    {/* Mobile: simple 2-col */}
    <div className="grid grid-cols-2 gap-2 md:hidden">
      {tiles.map((t, i) => (
        <Reveal key={i} delay={i * 0.03}>
          <figure className="aspect-[3/2] relative overflow-hidden">
            <Picture
              picture={t.picture}
              sizes={MOBILE_SIZES}
              alt={t.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </figure>
        </Reveal>
      ))}
    </div>
  </>
);

const GallerySection = () => (
  <Section id="gallery" tone="stone">
    <SectionHeader
      eyebrow="Gallery · 活動紀實"
      title={
        <>
          The event,{" "}<span className="italic text-primary whitespace-nowrap">in frames</span>.
        </>
      }
      lede="Two days at NTU — in pictures."
    />

    <div className="max-w-7xl mx-auto space-y-12">
      <div>
        <Reveal>
          <p className="font-display text-2xl md:text-3xl text-foreground mb-8">
            Day 1 · April 10
          </p>
        </Reveal>
        <MosaicGrid tiles={day1} />
      </div>

      <div>
        <Reveal>
          <p className="font-display text-2xl md:text-3xl text-foreground mb-8">
            Day 2 · April 11
          </p>
        </Reveal>
        <MosaicGrid tiles={day2} delay={0.2} />
      </div>
    </div>

  </Section>
);

export default GallerySection;
