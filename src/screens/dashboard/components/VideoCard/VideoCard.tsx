import Link from "next/link";
import { ChatterVideo, RemoveVideoFn } from "@/utils/hooks/useVideos";
import { Maybe } from "@/utils/utilityTypes";
import { Icon } from "@/icons/Icon";
import { Spinner } from "@/components/Spinner";
import { motion } from "framer-motion";
import { useRemoveVideo } from "@/utils/hooks/useRemoveVideo";
import { Delay } from "@/components/Delay";
import { Timer } from "./Timer";
import { Thumbnail } from "./Thumbnail";

interface VideoCardProps {
  video: ChatterVideo;
  onRemove: (videoId: string) => void;
  index: number;
}

export const VideoCard = ({ index, video, onRemove }: VideoCardProps) => {
  const { removeVideo, isLoading } = useRemoveVideo({ callbackFn: onRemove });
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

  return (
    <Delay delay={index * 255}>
      <motion.div
        layoutId={video.id}
        initial={{ scale: 0, x: 4000, rotate: 180 }}
        animate={{ rotate: 0, x: 0, scale: 1 }}
        exit={{ rotate: 180, y: -10000 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 50,
        }}
        className="hover:border-white mb-10 h-auto flex flex-col justify-start align-middle bg-slate-800 rounded-lg max-w-xs min-w-min"
      >
        <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 h-full">
          <Link
            className="flex grow flex-col bg-slate-800 rounded-md h-full"
            key={video.id}
            href={video.url}
            target="_blank"
          >
            <Thumbnail url={video.thumbnail} title={video.title} />
            <div className="p-5 flex flex-col grow justify-between">
              <Title title={video.title} />
              <div className="flex flex-col gap-2 mb-4">
                <Channel channel={video.channel} />
                <Duration duration={video.duration} />
              </div>

              <div className="flex flex-row justify-between border-t border-b border-gray-500 py-4 align-middle">
                <Chatter username={video.chatter.username} />
                <Timer timestamp={video.timestamp as unknown as string} />
              </div>

              <div className="flex flex-col justify-between mt-3">
                <p className="text-gray-500 text-center mb-3">
                  Rate this recommendation
                </p>
                <Ratings
                  isLoading={isLoading}
                  removeVideo={removeVideo}
                  id={video.id}
                  chatterId={video.chatterId}
                />
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </Delay>
  );
};

const Title = ({ title }: { title: string }) => {
  return <h3 className="h-5/6 text-lg font-semibold">{title}</h3>;
};

const Channel = ({ channel }: { channel: Maybe<string> }) => {
  return (
    <Link
      href={`https://youtube.com/@${channel?.replaceAll(" ", "_")}`}
      target="_blank"
    >
      <p className="text-orange-400 hover:underline">{channel}</p>
    </Link>
  );
};

const Duration = ({ duration }: { duration: Maybe<string> }) => {
  return (
    <div className="flex flex-row gap-1">
      <Icon name="clock" className="h-auto align-middle" />
      <p className="h-auto align-middle leading-6">
        {getDurationFromString(duration)}
      </p>
    </div>
  );
};

const Chatter = ({ username }: { username: Maybe<string> }) => {
  return (
    <Link href={`https://twitch.tv/${username}`} target="_blank">
      <div className="flex hover:underline">
        <p className="leading-7">{username}</p>
      </div>
    </Link>
  );
};

interface RatingsProps {
  removeVideo: RemoveVideoFn;
  id: string;
  isLoading: boolean;
  chatterId: string;
}

const Ratings = ({ removeVideo, isLoading, id, chatterId }: RatingsProps) => {
  if (isLoading)
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    );

  const rateVideo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rating: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    removeVideo(id, chatterId, rating);
  };

  return (
    <div className="flex justify-between mb-2">
      <button
        onClick={(e) => rateVideo(e, 1)}
        className="relative w-full inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
      >
        <span className="text-2xl relative w-full py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
          🎉
        </span>
      </button>

      <button
        onClick={(e) => rateVideo(e, 0)}
        className="relative w-full inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-pink-500 to-lime-500 group-hover:from-pink-500 group-hover:to-lime-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-green-800"
      >
        <span className="text-2xl w-full relative py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
          🙃
        </span>
      </button>

      <button
        onClick={(e) => rateVideo(e, -1)}
        className="relative w-full inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-500 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-800"
      >
        <span className="text-2xl w-full relative py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
          🤮
        </span>
      </button>
    </div>
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
