import { ChatterVideo } from "@/utils/hooks/useVideos";
import { User } from "@prisma/client";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { VideoCard } from "./VideoCard";

interface VideoListProps {
  videos: ChatterVideo[];
  user: User;
  onRemove: (videoId: string) => void;
}

export const VideoList = ({ videos, onRemove, user }: VideoListProps) => {
  return (
    <div className="flex flex-row gap-4 ml-5 flex-wrap h-full">
      <LayoutGroup id="card">
        <AnimatePresence>
          {videos.map((v) => (
            <VideoCard key={v.url} video={v} onRemove={onRemove} user={user} />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
