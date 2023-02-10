import { useVideos } from "@/utils/hooks/useVideos";
import { Spinner } from "@/components/Spinner";
import { Icon } from "@/icons/Icon";
import { useRealtimeEvents } from "@/utils/hooks/useRealtimeEvents";
import { useEffect } from "react";
import { useAuth } from "@/utils/hooks/useAuth";
import { createVideoFromEventPayload } from "./utils/createVideoFromEvent";
import { VideoList } from "./components/VideoList";
import { motion } from "framer-motion";

export const DashboardScreen = () => {
  const { user } = useAuth();
  const { videos, isLoading, onRemove, addVideos } = useVideos();
  const { subscribeToRoom } = useRealtimeEvents();

  useEffect(() => {
    subscribeToRoom({
      room: "youtube",
      event: "newVideo",
      callbackFn: (args) => {
        const newVideos = createVideoFromEventPayload(args.payload, user?.id!);
        addVideos(newVideos);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-1/3 flex flex-col">
      <div className="p-5 text-lg font-semibold text-left text-white">
        <div className="flex flex-row align-middle justify-start gap-2">
          <Icon name="youtube" />
          <p className="leading-7 text-2xl">YouTube Videos</p>
        </div>
        <p className="mt-1 text-sm font-normal text-gray-400">
          Catch up on videos sent to you by chat
        </p>
      </div>
      {isLoading && (
        <div className="items-center justify-center flex absolute left-1/2 top-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && !videos.length && <EmptyState />}
      {!isLoading && !!videos.length && (
        <VideoList videos={videos} onRemove={onRemove} user={user!} />
      )}
    </div>
  );
};

const EmptyState = () => {
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <div className="flex flex-col w-screen content-center justify-center align-middle h-full self-center center">
        <h1 className="text-center">
          Nothing here! Ask chat to send you some YouTube links
        </h1>
        <div className="flex text-center align-middle content-center self-center">
          <Icon name="emptyState" height={150} width={150} />
        </div>
      </div>
    </motion.div>
  );
};
