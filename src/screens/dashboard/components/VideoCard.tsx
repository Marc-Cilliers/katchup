import Link from "next/link";
import Image from "next/image";
import { ChatterVideo } from "@/utils/hooks/useVideos";
import { Maybe } from "@/utils/utilityTypes";
import { Icon } from "@/icons/Icon";
import { Spinner } from "@/components/Spinner";

interface VideoCardProps {
  video: ChatterVideo;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  if (!video) return <Spinner />;

  if (!video.title)
    // Minimal subset of standard card, due to missing info
    return (
      <Link
        className="flex justify-start align-middle bg-black"
        key={video.id}
        href={video.url}
        target="_blank"
      >
        {video.url}
      </Link>
    );

  const thumnailHQ = video.thumbnail?.replace("default", "hqdefault");

  return (
    <Link
      className="flex justify-start align-middle"
      key={video.id}
      href={video.url}
      target="_blank"
    >
      <div className="mr-5">
        {thumnailHQ && (
          <Image
            src={thumnailHQ}
            alt={`${video.title} video thumbnail`}
            width={200}
            height={100}
          />
        )}
      </div>
      <div>
        <h3 className="text-xl">{video.title}</h3>
        <p className="text-orange-400">{video.channel}</p>
        <div className="mt-2 flex flex-row align-middle gap-1 justify-start text-center">
          <Icon name="clock" className="h-auto align-middle" />
          <p className="h-auto align-middle leading-6">
            {getDurationFromString(video.duration)}
          </p>
        </div>
      </div>
    </Link>
  );
};

const getDurationFromString = (duration: Maybe<string>) => {
  if (!duration) return "N/A";

  let h = duration?.toLowerCase().split("").splice(2);
  let m = h?.splice(h.indexOf("h") + 1);
  let s = m?.splice(m.indexOf("m") + 1);

  const hours = h?.join("");
  const minutes = m?.join("");
  const seconds = s?.join("");

  return `${hours}${hours ? " " : ""}${minutes}${minutes ? " " : ""}${seconds}`;
};
