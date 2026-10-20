import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { edition2027 } from "@/content/edition-2027";
import hsilLogo from "@/assets/hsil-logo.png";
import ntuCphLogo from "@/assets/ntu-cph-logo.png";

// 2027 edition — front-door shell.
// This landing page preserves the currently published 2027 wording.
// Confirm any new dates, venue, rules, numbers or sponsor claims with the
// event owner before publishing them.
//
// Animation is CSS keyframes (tailwind.config.ts), not `motion`: the front door
// ships no animation library, and the h1 (the LCP element) paints opaque.
const Index = () => (
  <>
    <Navbar variant="edition-2027" />
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <section
        className="relative min-h-screen flex flex-col overflow-hidden bg-[hsl(40_35%_97%)]"
        data-tone="ivory"
      >
        {/* Gradient orbs — same editorial atmosphere as the archive hero */}
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

        {/* English by default inside the zh-Hant page; the Chinese runs are marked back. */}
        <div
          lang="en"
          className="relative z-10 flex-1 container mx-auto px-6 md:px-12 pt-32 md:pt-36 pb-20 max-w-5xl flex flex-col justify-center items-center text-center"
        >
          {/* Lockup */}
          <div className="mb-8 md:mb-10 animate-fade-in-up motion-reduce:animate-none [animation-delay:200ms]">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-3">
              <span className="font-display font-medium md:font-normal tracking-[0.4em] text-sm md:text-lg text-foreground uppercase">
                HSIL Hackathon
              </span>
              <span className="h-4 md:h-5 w-px bg-foreground/25" aria-hidden />
              <span className="font-serif italic text-primary text-sm md:text-base tracking-wide">
                Taiwan Hub
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 text-foreground/55">
              <div className="h-px w-6 bg-foreground/20" />
              <span className="font-display italic text-primary tracking-[0.3em] text-xs md:text-sm">
                {edition2027.year}
              </span>
              <div className="h-px w-6 bg-foreground/20" />
            </div>
          </div>

          {/* Display title */}
          <div className="mb-6 md:mb-8">
            <h1 lang="zh-Hant" className="font-display font-normal text-foreground leading-[1.25] tracking-tight">
              <span className="block text-[2.25rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.5rem] py-2 animate-rise-in motion-reduce:animate-none">
                全球健康創新黑客松
              </span>
            </h1>
          </div>

          {/* Provisional status — states no confirmed fact */}
          <div className="mb-12 md:mb-14 flex flex-col items-center gap-3 animate-fade-in motion-reduce:animate-none [animation-delay:900ms]">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-background/40 px-5 py-2 text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-foreground/70">
              <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping motion-reduce:animate-none rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Planning underway
            </span>
            <p className="font-serif italic text-sm md:text-base text-foreground/70">
              <span lang="zh-Hant">詳情將陸續公布</span> · Details to be announced
            </p>
          </div>

          {/* Institutional lockup — stacked until the row fits (≈800px of logos) */}
          <div className="mb-12 md:mb-14 animate-fade-in-up motion-reduce:animate-none [animation-delay:1050ms]">
            <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/70 mb-5">
              Hosted by
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
              <img
                src={hsilLogo}
                width={800}
                height={132}
                alt="Harvard T.H. Chan · Health Systems Innovation Lab"
                className="h-8 md:h-10 w-auto max-w-full object-contain"
              />
              <div className="h-px w-12 lg:h-8 lg:w-px bg-foreground/20" aria-hidden />
              <img
                src={ntuCphLogo}
                width={1200}
                height={101}
                alt="NTU College of Public Health · Health Economics & AI Lab"
                className="h-8 md:h-10 w-auto max-w-full object-contain"
              />
            </div>
          </div>

          {/* Archive link + HSIL */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up motion-reduce:animate-none [animation-delay:1200ms]">
            <Link
              to="/2026"
              className="group relative inline-flex items-center gap-2.5 bg-foreground text-background px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10">Explore the 2026 edition</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {/* Interim call to action until applications open: partners and mentors can reach the hub now. */}
            <a
              href={`mailto:${edition2027.email}?subject=${encodeURIComponent("HSIL Hackathon Taiwan 2027 — 合作洽詢 Partnership / mentorship")}`}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" strokeWidth={1.75} aria-hidden />
              <span>
                <span lang="zh-Hant">合作洽詢</span> · Partner or mentor with us
              </span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-foreground/70 hover:text-primary px-4 py-2 text-sm font-medium tracking-wide transition-colors"
              href={edition2027.hsilUrl}
            >
              Visit HSIL
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Index;
