import { Maybe } from "@/utils/utilityTypes";
import Image from "next/image";

interface ThumbnailProps {
  url: Maybe<string>;
  title?: string;
  onLoadingFinished: () => void;
}

export const Thumbnail = ({
  url,
  title,
  onLoadingFinished,
}: ThumbnailProps) => {
  const thumbnailHQ = url?.replace("default", "maxresdefault");

  if (!url || !thumbnailHQ) return null;

  return (
    <div className="flex flex-col justify-center align-middle items-center max-h-min h-2/6">
      <Image
        className="rounded-t-lg w-full h-full"
        src={thumbnailHQ}
        alt={`${title ?? ""} thumbnail`}
        width={1000}
        height={0}
        onLoadingComplete={() => {
          onLoadingFinished();
        }}
      />
    </div>
  );
};
