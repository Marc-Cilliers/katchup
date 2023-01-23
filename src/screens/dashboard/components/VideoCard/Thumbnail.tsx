import { Maybe } from "@/utils/utilityTypes";
import Image from "next/image";

interface ThumbnailProps {
  url: Maybe<string>;
  title?: string;
}

export const Thumbnail = ({ url, title }: ThumbnailProps) => {
  const thumbnailHQ = url?.replace("default", "maxresdefault");

  if (!url || !thumbnailHQ) return null;

  return (
    <div className="flex flex-col justify-center align-middle items-center">
      <Image
        placeholder="blur"
        blurDataURL={url}
        className="rounded-t-lg w-full"
        src={thumbnailHQ}
        alt={`${title ?? ""} thumbnail`}
        width={1000}
        height={1000}
      />
    </div>
  );
};
