// What a vite-imagetools import ending in `&as=picture` resolves to (rendered by components/Picture).
// Declared here rather than imported from vite-imagetools: its types pull in sharp's Node typings,
// which the browser-only app config keeps out.
interface ImagetoolsPicture {
  /** srcset per format, keyed by MIME subtype ("webp", "jpeg"). */
  sources: Record<string, string>;
  /** Largest image in the fallback (last-listed) format. */
  img: { src: string; w: number; h: number };
}

declare module "*&as=picture" {
  const picture: ImagetoolsPicture;
  export default picture;
}
