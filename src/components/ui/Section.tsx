import { ReactNode } from "react";

interface Props {
  id?: string;
  tone?: "ivory" | "stone" | "dark";
  children: ReactNode;
  className?: string;
}

// Design-system section wrapper. Three background tones only.
const Section = ({ id, tone = "ivory", children, className = "" }: Props) => {
  const bg =
    tone === "dark"
      ? "bg-[hsl(220_45%_7%)] text-white"
      : tone === "stone"
      ? "bg-[hsl(40_20%_94%)]"
      : "bg-[hsl(40_35%_97%)]";

  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 lg:py-36 overflow-hidden ${bg} ${className}`}
      data-tone={tone}
    >
      <div className="container mx-auto px-6 relative z-10">{children}</div>
    </section>
  );
};

export default Section;
