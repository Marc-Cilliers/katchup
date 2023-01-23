import { ChatterVideo } from "@/utils/hooks/useVideos";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { VideoCard } from "./VideoCard";

interface VideoListProps {
  videos: ChatterVideo[];
  onRemove: (videoId: string) => void;
}

export const VideoList = ({ videos, onRemove }: VideoListProps) => {
  return (
    <div className="flex flex-row gap-4 ml-5 flex-wrap h-full">
      <LayoutGroup id="card">
        <AnimatePresence>
          {videos.map((v) => (
            <VideoCard key={v.url} video={v} onRemove={onRemove} />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
