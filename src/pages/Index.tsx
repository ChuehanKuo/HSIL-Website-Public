import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { edition2027 } from "@/content/edition-2027";

const Index = () => (
  <>
    <Navbar variant="edition-2027" />
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <section
        aria-labelledby="event-title"
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[hsl(40_35%_97%)]"
        data-tone="ivory"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 82% 70% at 50% 38%, hsl(352 72% 50% / 0.07) 0%, transparent 75%), radial-gradient(ellipse 60% 45% at 12% 88%, hsl(37 90% 60% / 0.045) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(220 30% 15% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(220 30% 15% / 0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-20 pt-32 md:px-12 md:py-36">
          <div className="mx-auto w-full max-w-4xl text-center">
            <p lang="en" className="font-display text-sm font-medium tracking-[0.12em] text-foreground/70 sm:text-base">
              HSIL HACKATHON · TAIWAN HUB
            </p>

            <h1
              id="event-title"
              className="mt-8 text-pretty font-display text-4xl font-normal leading-[1.2] tracking-tight text-foreground sm:text-5xl lg:text-7xl"
            >
              {edition2027.eventNameZh}
            </h1>

            <div className="mt-7 text-sm text-muted-foreground">
              報名與活動詳情將陸續公布
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
              <a
                href={`mailto:${edition2027.email}?subject=${encodeURIComponent("HSIL Hackathon Taiwan 2027 — 合作與導師洽詢")}`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 motion-reduce:transition-none sm:w-auto"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                合作與導師洽詢
              </a>
              <Link
                to="/2026"
                className="group inline-flex min-h-12 items-center gap-2 px-2 text-sm font-medium text-foreground/75 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-primary hover:decoration-primary motion-reduce:transition-none"
              >
                回顧 2026 活動
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer variant="edition-2027" />
  </>
);

export default Index;
