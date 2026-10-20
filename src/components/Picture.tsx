import type { ImgHTMLAttributes } from "react";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "alt"> {
  picture: ImagetoolsPicture;
  /** Width the image is drawn at (after object-cover), per breakpoint. */
  sizes: string;
  alt: string;
}

// A photo imported with `?w=…&format=webp;jpg&as=picture`: WebP <source>, JPEG srcset on the <img>.
const Picture = ({ picture, sizes, alt, loading = "lazy", decoding = "async", ...img }: Props) => {
  // vitest runs without the imagetools plugin, so there the import is a bare URL string.
  if (typeof picture === "string") return <img src={picture} alt={alt} loading={loading} decoding={decoding} {...img} />;

  const { jpeg, ...modern } = picture.sources;
  return (
    <picture>
      {Object.entries(modern).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={picture.img.src}
        srcSet={jpeg}
        sizes={sizes}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...img}
      />
    </picture>
  );
};

export default Picture;
