import { Link } from "react-router-dom";

// Unknown paths only. RouteMeta makes this document English, so only the
// Chinese lines declare their language.
const NotFound = () => (
  <main
    id="main-content"
    tabIndex={-1}
    className="flex min-h-screen items-center justify-center bg-[hsl(40_35%_97%)] px-6 py-24 focus:outline-none"
  >
    <div className="text-center">
      <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-foreground/65 mb-6">
        HSIL Hackathon · Taiwan Hub
      </p>
      <h1 className="font-display font-normal text-primary text-[6rem] md:text-[8rem] leading-none tracking-tight">
        404
      </h1>
      <div className="h-px w-12 bg-foreground/20 mx-auto my-8" aria-hidden />
      <p lang="zh-Hant" className="font-display text-2xl md:text-3xl text-foreground mb-2">
        找不到此頁面
      </p>
      <p className="font-serif italic text-lg md:text-xl text-foreground/70 mb-10">
        Page not found
      </p>
      <Link
        to="/"
        className="inline-block bg-foreground text-background px-7 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 hover:bg-primary"
      >
        <span lang="zh-Hant">返回首頁</span> · Return to Home
      </Link>
    </div>
  </main>
);

export default NotFound;
