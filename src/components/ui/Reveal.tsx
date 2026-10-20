import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

const Reveal = ({ children, delay = 0, y = 30, className, style, once = true }: Props) => {
  // Reduced motion renders the resting state: nothing waits on a fade or a scroll observer.
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // No negative margin, so content reached by an anchor jump or at the page end still reveals.
      viewport={{ once, amount: "some", margin: "0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
