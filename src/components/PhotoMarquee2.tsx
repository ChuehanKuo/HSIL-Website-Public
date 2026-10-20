import { MarqueeStrip } from "@/components/PhotoMarquee";

import m01 from "@/assets/marquee2/01.jpg?w=280;560&format=webp;jpg&as=picture";
import m02 from "@/assets/marquee2/02.jpg?w=280;560&format=webp;jpg&as=picture";
import m03 from "@/assets/marquee2/03.jpg?w=280;560&format=webp;jpg&as=picture";
import m04 from "@/assets/marquee2/04.jpg?w=280;560&format=webp;jpg&as=picture";
import m05 from "@/assets/marquee2/05.jpg?w=280;560&format=webp;jpg&as=picture";
import m06 from "@/assets/marquee2/06.jpg?w=280;560&format=webp;jpg&as=picture";
import m07 from "@/assets/marquee2/07.jpg?w=280;560&format=webp;jpg&as=picture";
import m08 from "@/assets/marquee2/08.jpg?w=280;560&format=webp;jpg&as=picture";
import m09 from "@/assets/marquee2/09.jpg?w=280;560&format=webp;jpg&as=picture";
import m10 from "@/assets/marquee2/10.jpg?w=280;560&format=webp;jpg&as=picture";
import m11 from "@/assets/marquee2/11.jpg?w=280;560&format=webp;jpg&as=picture";
import m12 from "@/assets/marquee2/12.jpg?w=280;560&format=webp;jpg&as=picture";
import m13 from "@/assets/marquee2/13.jpg?w=280;560&format=webp;jpg&as=picture";
import m14 from "@/assets/marquee2/14.jpg?w=280;560&format=webp;jpg&as=picture";

const PhotoMarquee2 = () => (
  <MarqueeStrip
    duration={50}
    rows={[
      { images: [m01, m02, m03, m04, m05, m06, m07], reverse: true },
      { images: [m08, m09, m10, m11, m12, m13, m14] },
    ]}
  />
);

export default PhotoMarquee2;
