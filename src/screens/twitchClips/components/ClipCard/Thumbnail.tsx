import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Maybe } from "@/utils/utilityTypes";

interface ThumbnailProps {
  url: Maybe<string>;
  title?: string;
  duration: number;
  onLoadingFinished: () => void;
}

export const Thumbnail = ({
  url,
  title,
  duration,
  onLoadingFinished,
}: ThumbnailProps) => {
  const thumbnailHQ = url?.replace("default", "maxresdefault");
  const thumbnailNormal = url?.replace("default", "hqdefault");
  const length = getDurationFromSeconds(duration);

  if (!url || !thumbnailHQ) return null;

  return (
    <div className="flex relative flex-col justify-center align-middle items-center max-h-min h-full">
      <ImageWithFallback
        className="rounded-lg w-full h-full"
        src={thumbnailHQ}
        fallbackSrc={thumbnailNormal!}
        alt={`${title ?? ""} thumbnail`}
        width={1200}
        height={0}
        priority
        onLoadingComplete={() => {
          onLoadingFinished();
        }}
      />
      <p className="hover:bg-opacity-100 text-xs w-auto absolute left-[1%] top-[87%] rounded-lg px-1 py-0.5 bg-black bg-opacity-50">
        {length}
      </p>
    </div>
  );
};

const getDurationFromSeconds = (duration?: number) => {
  if (!duration) return "N/A";

  const seconds = Math.round(duration % 60);
  const minutes = duration / 60 >= 1 ? duration / 60 : 0;
  const hours = minutes / 60 >= 1 ? minutes / 60 : 0;

  const hStr = hours > 0 ? hours : "";
  const mStr = +minutes < 10 ? `0${minutes}` : minutes;
  const sStr = +seconds < 10 ? `0${seconds}` : seconds;

  return `${hStr}${hStr ? ":" : ""}${mStr}${mStr ? ":" : ""}${sStr}`;
};
