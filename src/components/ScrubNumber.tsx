import { useCountUp } from "@/hooks/useCountUp";

interface Props {
  target: number;
  format?: (n: number) => string;
  className?: string;
}

const ScrubNumber = ({ target, format, className }: Props) => {
  const { ref, value } = useCountUp<HTMLSpanElement>(target, { duration: 1500, threshold: 0.3 });

  return (
    <span ref={ref} className={className}>
      {format ? format(value) : value.toLocaleString()}
    </span>
  );
};

export default ScrubNumber;
