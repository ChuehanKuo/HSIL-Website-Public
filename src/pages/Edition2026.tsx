import { MotionConfig } from "motion/react";
import Navbar from "@/components/Navbar";

import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import PhotoMarquee from "@/components/PhotoMarquee";
import PhotoMarquee2 from "@/components/PhotoMarquee2";
import WinnersSection from "@/components/WinnersSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ScheduleSection from "@/components/ScheduleSection";
import JudgingSection from "@/components/JudgingSection";
import MediaSection from "@/components/MediaSection";
import PipelineSection from "@/components/PipelineSection";
import OrganizersSection from "@/components/OrganizersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// The 2026 edition, preserved intact as the permanent archive at /2026.
// This is the former homepage composition, unchanged except that the navbar
// runs in its archive variant (adds a link back to the current edition).
// MotionConfig lives here rather than in App so the front door ships no `motion` code.
const Edition2026 = () => (
  <MotionConfig reducedMotion="user">
    <SmoothScroll />
    <ScrollProgress />
    <Navbar variant="archive-2026" />
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <HeroSection />
      <PhotoMarquee />
      <AboutSection />
      <WinnersSection />
      <GallerySection />
      <ScheduleSection />
      <PhotoMarquee2 />
      <JudgingSection />
      <OrganizersSection />
      <MediaSection />
      <PipelineSection />
      <CTASection />
    </main>
    <Footer />
  </MotionConfig>
);

export default Edition2026;
