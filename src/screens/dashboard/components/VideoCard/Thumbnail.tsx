import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Maybe } from "@/utils/utilityTypes";

interface ThumbnailProps {
  url: Maybe<string>;
  title?: string;
  duration: string;
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
  const length = getDurationFromString(duration);

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

const getDurationFromString = (duration: Maybe<string>) => {
  if (!duration) return "N/A";

  let h = duration?.toLowerCase().split("").splice(2);
  let m = h?.splice(h.indexOf("h") + 1);
  let s = m?.splice(m.indexOf("m") + 1);

  const hours = h?.join("").replace("h", "");
  const minutes = m?.join("").replace("m", "");
  const seconds = s?.join("").replace("s", "");

  const hStr = hours;
  const mStr = +minutes < 10 ? `0${minutes}` : minutes;
  const sStr = +seconds < 10 ? `0${seconds}` : seconds;

  return `${hStr}${hStr ? ":" : ""}${mStr}${mStr ? ":" : ""}${sStr}`;
};
