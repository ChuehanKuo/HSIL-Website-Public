import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Single registration point so every GSAP consumer shares one ScrollTrigger.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
