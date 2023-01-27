import Link from "next/link";
import {
  ChatterVideo,
  PartialUserChatter,
  RemoveVideoFn,
} from "@/utils/hooks/useVideos";
import { Maybe } from "@/utils/utilityTypes";
import { Icon } from "@/icons/Icon";
import { Spinner } from "@/components/Spinner";
import { motion } from "framer-motion";
import { useRemoveVideo } from "@/utils/hooks/useRemoveVideo";
import { Timer } from "./Timer";
import { Thumbnail } from "./Thumbnail";
import { useState } from "react";
import { BadgeBuilder } from "./BadgeBuilder";
import { User } from "@prisma/client";

interface VideoCardProps {
  video: ChatterVideo;
  user: User;
  onRemove: (videoId: string) => void;
}

export const VideoCard = ({ video, onRemove, user }: VideoCardProps) => {
  const { removeVideo } = useRemoveVideo({ callbackFn: onRemove });
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

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
    <motion.div
      layoutId={video.id}
      initial={{ scale: 0, x: 4000, rotate: 180 }}
      animate={{ rotate: 0, x: 0, scale: 1 }}
      exit={{ rotate: 420, scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 40,
        duration: 50,
      }}
      className="mb-10 h-[23rem] flex flex-col justify-start align-middle rounded-lg max-w-xs min-w-xs max-h-min"
    >
      <div className="flex grow flex-col rounded-md h-full">
        <Link
          className="flex justify-center align-middle h-1/2 items-center"
          key={video.id}
          href={video.url}
          target="_blank"
        >
          {!thumbnailLoaded && <Spinner />}
          <Thumbnail
            url={video.thumbnail}
            title={video.title}
            duration={video.duration as string}
            onLoadingFinished={() => setThumbnailLoaded(true)}
          />
        </Link>
        <div className="px-2 pt-2 h-1/2 flex flex-col justify-between">
          <div className="flex flex-col">
            <Link key={video.id} href={video.url} target="_blank">
              <Title title={video.title} />
            </Link>
            <Channel channel={video.channel} channelId={video.channelId} />
            <div className="flex flex-row gap-2">
              <Chatter userChatter={video.userChatter} user={user} />
              <p>·</p>
              <Timer timestamp={video.timestamp as unknown as string} />
            </div>
          </div>
          <div className="flex flex-col">
            <Ratings
              removeVideo={removeVideo}
              id={video.id}
              userChatterId={video.userChatterId}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Title = ({ title }: { title: string }) => {
  return (
    <h3 className="text-lg font-semibold overflow-ellipsis max-w-full">
      {title}
    </h3>
  );
};

const Channel = ({
  channel,
  channelId,
}: {
  channel: Maybe<string>;
  channelId: Maybe<string>;
}) => {
  return (
    <Link href={`https://youtube.com/channel/${channelId}`} target="_blank">
      <p className="text-gray-400 text-sm hover:text-white">{channel}</p>
    </Link>
  );
};

interface RatingsProps {
  removeVideo: RemoveVideoFn;
  id: string;
  userChatterId: string;
}

const Ratings = ({ removeVideo, id, userChatterId }: RatingsProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <div
      className={`flex flex-row mt-2 rounded-full w-1/2 justify-center align-middle gap-0.5`}
    >
      <button
        disabled={liked || disliked}
        onClick={() => {
          removeVideo(id, userChatterId, 1);
          setLiked(true);
        }}
        className={`bg-zinc-800 hover:bg-zinc-500 py-2 w-full flex justify-center items-center rounded-l-full ${
          liked && "bg-zinc-100"
        }`}
      >
        <Icon name="thumbsUp" color={liked ? "#000000" : undefined} />
      </button>
      <button
        disabled={liked || disliked}
        onClick={() => {
          removeVideo(id, userChatterId, 1);
          setDisliked(true);
        }}
        className={`bg-zinc-800 hover:bg-zinc-500 py-2 w-full flex justify-center items-center rounded-r-full ${
          disliked && "bg-zinc-100"
        }`}
      >
        <Icon name="thumbsDown" color={disliked ? "#000000" : undefined} />
      </button>
    </div>
  );
};

const Chatter = ({
  userChatter,
  user,
}: {
  userChatter: PartialUserChatter;
  user: User;
}) => {
  const username = userChatter.chatter.username;
  const { color, badges } = userChatter;

  return (
    <Link
      href={`https://twitch.tv/${username}`}
      target="_blank"
      className="flex flex-row gap-1 align-middle items-center"
    >
      <BadgeBuilder badges={badges} user={user} />
      <p style={{ color }} className={`text-md font-semibold hover:underline`}>
        {username}
      </p>
    </Link>
  );
};
