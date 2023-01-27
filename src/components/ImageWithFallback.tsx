import Image, { ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = ImageProps & { fallbackSrc: string };

export const ImageWithFallback = ({ ...props }: ImageWithFallbackProps) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [image, setImage] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={image}
      onError={() => {
        setImage(fallbackSrc);
      }}
    />
  );
};
