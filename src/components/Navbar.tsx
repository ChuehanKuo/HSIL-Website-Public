import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import hsilLogo from "@/assets/hsil-logo.png";
import ntuCphLogo from "@/assets/ntu-cph-logo.png";

// Section anchors for the 2026 archive page (single-page scroll nav).
const archiveLinks = [
  { label: "About", href: "#about" },
  { label: "Winners", href: "#winners" },
  { label: "Gallery", href: "#gallery" },
  { label: "Schedule", href: "#schedule" },
  { label: "Judging", href: "#judging" },
  { label: "Team", href: "#organizers" },
  { label: "Press", href: "#media" },
];

type NavVariant = "edition-2027" | "archive-2026";

interface NavbarProps {
  // "edition-2027" (default) is the current-edition front door: minimal nav
  // linking to the archive. "archive-2026" is the past-edition page: the full
  // section anchors plus a link back to the current edition.
  variant?: NavVariant;
}

const Navbar = ({ variant = "edition-2027" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // /0.9 with /70 link text keeps 5.2:1 even when the bar passes over the dark
  // tone; at /0.8 the links and the crimson pill dropped to ~4.2:1 there.
  const navBg = scrolled
    ? "bg-[hsl(40_35%_97%/0.9)] backdrop-blur-xl border-b border-foreground/10"
    : "bg-transparent";

  const isArchive = variant === "archive-2026";
  const anchorLinks = isArchive ? archiveLinks : [];
  // Cross-edition link: archive → current 2027 edition; 2027 → 2026 archive.
  const crossEdition = isArchive
    ? { label: "Current edition", to: "/" }
    : { label: "回顧 2026 活動", to: "/2026" };
  const crossEditionClass = isArchive
    ? "ml-1.5 inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold px-3.5 py-2 rounded-full text-primary border border-primary/25 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
    : "ml-1.5 inline-flex min-h-11 items-center whitespace-nowrap px-3 py-2 text-sm font-medium text-foreground/70 underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary motion-reduce:transition-none";
  const navTransition = isArchive
    ? "transition-all duration-500"
    : "transition-colors duration-300 motion-reduce:transition-none";
  // Logos + seven anchors + pill measure ~1180px, so the archive keeps the
  // menu button until xl; the 2027 bar (one link) fits from lg.
  const inlineLinks = isArchive ? "hidden xl:flex" : "hidden lg:flex";
  const menuOnly = isArchive ? "xl:hidden" : "lg:hidden";

  return (
    // English labels on both routes; "/" is a zh-Hant document.
    <nav lang={isArchive ? "en" : "zh-Hant"} className={`fixed top-0 left-0 right-0 z-50 ${navTransition} ${navBg}`}>
      <div className="container mx-auto flex items-center justify-between py-3 md:py-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 md:gap-4 mr-3 lg:mr-0 lg:shrink-0">
          <Link to="/" className="flex min-w-0 items-center gap-2 md:gap-4">
            <img
              src={hsilLogo}
              alt="Harvard T.H. Chan · HSIL"
              width={800}
              height={132}
              className="h-5 md:h-7 w-auto min-w-0 object-contain"
            />
            <div className="h-4 md:h-6 w-px bg-foreground/20 shrink-0" aria-hidden />
            <img
              src={ntuCphLogo}
              alt="NTU College of Public Health · Health Economics & AI Lab"
              width={1200}
              height={101}
              className="h-5 md:h-7 w-auto min-w-0 object-contain"
            />
          </Link>
          {isArchive && (
            // Hidden xl–2xl: next to the inline links it would push the pill off-screen below ~1360px.
            <span className="hidden sm:inline-flex xl:hidden 2xl:inline-flex items-center whitespace-nowrap rounded-full border border-foreground/15 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/70">
              2026 · Past Edition
            </span>
          )}
        </div>

        <div className={`${inlineLinks} items-center gap-0.5`}>
          {anchorLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium px-2.5 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <Link
            to={crossEdition.to}
            className={crossEditionClass}
          >
            {crossEdition.label}
          </Link>
        </div>

        <button
          ref={toggleRef}
          className={`${menuOnly} shrink-0 p-2 rounded-lg hover:bg-foreground/5 transition-colors`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={isArchive ? "Toggle menu" : mobileOpen ? "關閉導覽" : "開啟導覽"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="text-foreground" /> : <Menu className="text-foreground" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className={`${menuOnly} bg-[hsl(40_35%_97%/0.95)] backdrop-blur-xl border-t border-foreground/10 px-4 pb-4 shadow-lg`}
        >
          {anchorLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-foreground border-b border-foreground/10 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <Link
            to={crossEdition.to}
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-sm font-semibold text-primary"
          >
            {crossEdition.label}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
