import Picture from "@/components/Picture";

import m01 from "@/assets/marquee/01.jpg?w=280;560&format=webp;jpg&as=picture";
import m02 from "@/assets/marquee/02.jpg?w=280;560&format=webp;jpg&as=picture";
import m03 from "@/assets/marquee/03.jpg?w=280;560&format=webp;jpg&as=picture";
import m04 from "@/assets/marquee/04.jpg?w=280;560&format=webp;jpg&as=picture";
import m05 from "@/assets/marquee/05.jpg?w=280;560&format=webp;jpg&as=picture";
import m06 from "@/assets/marquee/06.jpg?w=280;560&format=webp;jpg&as=picture";
import m07 from "@/assets/marquee/07.jpg?w=280;560&format=webp;jpg&as=picture";
import m08 from "@/assets/marquee/08.jpg?w=280;560&format=webp;jpg&as=picture";
import m09 from "@/assets/marquee/09.jpg?w=280;560&format=webp;jpg&as=picture";
import m10 from "@/assets/marquee/10.jpg?w=280;560&format=webp;jpg&as=picture";
import m11 from "@/assets/marquee/11.jpg?w=280;560&format=webp;jpg&as=picture";
import m12 from "@/assets/marquee/12.jpg?w=280;560&format=webp;jpg&as=picture";
import m13 from "@/assets/marquee/13.jpg?w=280;560&format=webp;jpg&as=picture";
import m14 from "@/assets/marquee/14.jpg?w=280;560&format=webp;jpg&as=picture";

interface MarqueeRowProps {
  images: ImagetoolsPicture[];
  reverse?: boolean;
}

const MarqueeRow = ({ images, reverse = false, duration }: MarqueeRowProps & { duration?: number }) => {
  // The list runs twice so the -50% translate loops seamlessly.
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content", animationDuration: duration ? `${duration}s` : undefined }}
      >
        {doubled.map((picture, i) => (
          <div key={i} className="w-[280px] h-[187px] flex-shrink-0 overflow-hidden rounded-sm">
            <Picture picture={picture} sizes="280px" alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Decorative photo strip (its photos repeat gallery content), so it is hidden from assistive tech.
// `duration` is seconds per loop; the CSS default is 40s.
export const MarqueeStrip = ({ rows, duration }: { rows: MarqueeRowProps[]; duration?: number }) => (
  <div className="space-y-3 py-8 overflow-hidden" aria-hidden="true">
    {rows.map((row, i) => (
      <MarqueeRow key={i} {...row} duration={duration} />
    ))}
  </div>
);

const PhotoMarquee = () => (
  <MarqueeStrip
    rows={[
      { images: [m01, m02, m03, m04, m05, m06, m07] },
      { images: [m08, m09, m10, m11, m12, m13, m14], reverse: true },
    ]}
  />
);

export default PhotoMarquee;
