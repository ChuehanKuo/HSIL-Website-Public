import { Instagram, Mail } from "lucide-react";
import hsilLogo from "@/assets/hsil-logo.png";
import ntuCphLogo from "@/assets/ntu-cph-logo.png";
import { edition2027 } from "@/content/edition-2027";

// Both lockups are drawn for light backgrounds (as in the front page's "Hosted by" row).
// On the dark footer they sit on an ivory panel so their brand colours read unaltered;
// a CSS filter to lighten them on dark would have to recolour them.
const logo = "h-11 w-auto max-w-full object-contain";

interface FooterProps {
  variant?: "edition-2027" | "archive-2026";
}

const Footer = ({ variant = "archive-2026" }: FooterProps) => {
  const isFrontDoor = variant === "edition-2027";

  return (
  <footer
    lang={isFrontDoor ? "zh-Hant" : "en"}
    className={`bg-[hsl(220_45%_7%)] text-white/50 ${isFrontDoor ? "pt-12 md:pt-16 pb-8" : "pt-24 md:pt-28 pb-12"} border-t border-white/5`}
  >
    <div className="container mx-auto px-6 max-w-6xl">
      {isFrontDoor ? (
        <div className="mb-8 space-y-2 text-center text-sm">
          <p>
            全球活動 · <span lang="en">{edition2027.hostGlobal}</span>
          </p>
          <p>臺灣承辦 · {edition2027.hostLocalZh}</p>
        </div>
      ) : (
        /* Institutional lockup — stacked until the row fits (≈950px with the panel's padding) */
        <div className="mb-16 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/55 mb-8">
            Hosted by
          </p>
          <div className="inline-flex max-w-full flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 rounded-2xl bg-[hsl(40_35%_97%)] px-5 py-7 sm:px-10">
            <img src={hsilLogo} width={800} height={132} alt="Harvard T.H. Chan HSIL" className={logo} />
            <div className="h-px w-16 lg:h-12 lg:w-px bg-foreground/15" aria-hidden />
            <img src={ntuCphLogo} width={1200} height={101} alt="NTU College of Public Health" className={logo} />
          </div>
        </div>
      )}

      <div className="h-px w-full bg-white/10 mb-10" />

      {/* Contact + copyright */}
      <div className={`flex flex-col items-center justify-between gap-6 ${isFrontDoor ? "" : "md:flex-row"}`}>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <a
            href={edition2027.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium"
          >
            <Instagram className="w-4 h-4" strokeWidth={1.5} />
            <span>{edition2027.instagramHandle}</span>
          </a>
          <a
            href={`mailto:${edition2027.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium"
          >
            <Mail className="w-4 h-4" strokeWidth={1.5} />
            <span>{edition2027.email}</span>
          </a>
        </div>

        <p className="text-xs tracking-[0.2em] uppercase text-white/55 text-center">
          {/* 2026 is literal: importing edition-2026.ts here pulls the archive into the front-door bundle. */}
          © 2026–{edition2027.year} HSIL Hackathon Taiwan Hub
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
