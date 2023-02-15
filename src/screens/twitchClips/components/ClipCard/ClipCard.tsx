import Link from "next/link";
import { PartialUserChatter, RemoveVideoFn } from "@/utils/hooks/useVideos";
import { Maybe } from "@/utils/utilityTypes";
import { Icon } from "@/icons/Icon";
import { Spinner } from "@/components/Spinner";
import { motion } from "framer-motion";
import { Timer } from "./Timer";
import { Thumbnail } from "./Thumbnail";
import { useState } from "react";
import { User } from "@prisma/client";
import Balancer from "react-wrap-balancer";
import { ChatterClip } from "@/screens/twitchClips/hooks/useClips";
import { useRemoveClip } from "../../hooks/useRemoveClip";
import { BadgeBuilder } from "@/components/BadgeBuilder";

interface ClipCardProps {
  clip: ChatterClip;
  user: User;
  onRemove: (videoId: string) => void;
}

export const ClipCard = ({ clip, onRemove, user }: ClipCardProps) => {
  const { removeClip } = useRemoveClip({ callbackFn: onRemove });
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  if (!clip) return <Spinner />;

  if (!clip.title)
    // Minimal subset of standard card, due to missing info
    return (
      <Link
        className="flex justify-start align-middle bg-black"
        key={clip.id}
        href={clip.url}
        target="_blank"
      >
        {clip.url}
      </Link>
    );

  return (
    <motion.div
      layoutId={clip.id}
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
          key={clip.id}
          href={clip.url}
          target="_blank"
        >
          {!thumbnailLoaded && <Spinner />}
          <Thumbnail
            url={clip.thumbnail}
            title={clip.title}
            duration={clip.duration}
            onLoadingFinished={() => setThumbnailLoaded(true)}
          />
        </Link>
        <div className="px-2 pt-2 flex flex-col justify-between">
          <div className="flex flex-col">
            <Link key={clip.id} href={clip.url} target="_blank">
              <Title title={clip.title} />
            </Link>
            <Channel channel={clip.broadcasterName} />
            <ClippedBy clippedBy={clip.creatorName} />
            <div className="flex flex-row gap-2 mt-5">
              <Chatter userChatter={clip.userChatter} user={user} />
              <p>·</p>
              <Timer timestamp={clip.timestamp as unknown as string} />
            </div>
          </div>
          <div className="flex flex-col">
            <Ratings
              removeVideo={removeClip}
              id={clip.id}
              userChatterId={clip.userChatterId}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Title = ({ title }: { title: string }) => {
  return (
    <h3>
      <Balancer>{title}</Balancer>
    </h3>
  );
};

const ClippedBy = ({ clippedBy }: { clippedBy: string }) => {
  return (
    <div className="flex text-sm gap-1.5">
      <p>Clipped by</p>
      <Link href={`https://www.twitch.tv/${clippedBy}`} target="_blank">
        <p className="text-gray-100 text-sm hover:underline">{clippedBy}</p>
      </Link>
    </div>
  );
};

const Channel = ({ channel }: { channel: Maybe<string> }) => {
  return (
    <Link href={`https://www.twitch.tv/${channel}`} target="_blank">
      <p className="text-purple-400 text-sm hover:underline">{channel}</p>
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
      <motion.button
        className={`bg-zinc-800 hover:bg-zinc-500 py-2 w-full flex justify-center items-center rounded-l-full ${
          liked && "bg-zinc-100"
        }`}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.3,
          rotate: -45,
        }}
        onTapCancel={() => {
          removeVideo(id, userChatterId, 1);
          setLiked(true);
        }}
        onTap={() => {
          removeVideo(id, userChatterId, 1);
          setLiked(true);
        }}
        disabled={liked || disliked}
      >
        <Icon name="thumbsUp" color={liked ? "#000000" : undefined} />
      </motion.button>
      <motion.button
        disabled={liked || disliked}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.3,
          rotate: -45,
        }}
        onTapCancel={() => {
          removeVideo(id, userChatterId, -1);
          setDisliked(true);
        }}
        onTap={() => {
          removeVideo(id, userChatterId, -1);
          setDisliked(true);
        }}
        className={`bg-zinc-800 hover:bg-zinc-500 py-2 w-full flex justify-center items-center rounded-r-full ${
          disliked && "bg-zinc-100"
        }`}
      >
        <Icon name="thumbsDown" color={disliked ? "#000000" : undefined} />
      </motion.button>
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
