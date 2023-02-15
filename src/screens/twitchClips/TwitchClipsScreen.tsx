import { Spinner } from "@/components/Spinner";
import { Icon } from "@/icons/Icon";
import { useRealtimeEvents } from "@/utils/hooks/useRealtimeEvents";
import { useEffect } from "react";
import { useAuth } from "@/utils/hooks/useAuth";
import { createClipFromEvent } from "./utils/createClipFromEvent";
import { ClipList } from "./components/ClipList";
import { motion } from "framer-motion";
import { useClips } from "@/screens/twitchClips/hooks/useClips";

export const TwitchClipsScreen = () => {
  const { user } = useAuth();
  const { clips, isLoading, onRemove, addClips } = useClips();
  const { subscribeToRoom } = useRealtimeEvents();

  useEffect(() => {
    subscribeToRoom({
      room: "twitch",
      event: "newClip",
      callbackFn: (args) => {
        const newClips = createClipFromEvent(args.payload, user?.id!);
        addClips(newClips);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col relative w-full">
      <div className="px-5 pb-5 text-lg font-semibold text-left text-white">
        <div className="flex flex-row align-middle justify-start gap-2">
          <Icon name="twitchLogo" />
          <p className="leading-7 text-2xl">Twitch Clips</p>
        </div>
        <p className="mt-1 text-sm font-normal text-gray-400">
          Catch up on twitch clips sent to you by Twitch Chat
        </p>
      </div>
      {isLoading && (
        <div className="items-center justify-center h-full flex absolute left-1/2 top-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && !clips.length && <EmptyState />}
      {!isLoading && !!clips.length && (
        <ClipList clips={clips} onRemove={onRemove} user={user!} />
      )}
    </div>
  );
};

const EmptyState = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col w-full items-center justify-center align-middle h-full"
    >
      <h1 className="text-center">
        Nothing here! Ask chat to send you some twitch clips
      </h1>
      <div className="flex text-center align-middle content-center self-center">
        <Icon name="emptyState" height={150} width={150} />
      </div>
    </motion.div>
  );
};
