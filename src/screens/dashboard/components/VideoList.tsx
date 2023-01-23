import { ChatterVideo } from "@/utils/hooks/useVideos";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { VideoCard } from "./VideoCard";

interface VideoListProps {
  videos: ChatterVideo[];
  onRemove: (videoId: string) => void;
}

export const VideoList = ({ videos, onRemove }: VideoListProps) => {
  return (
    <div className="flex flex-row gap-10 ml-5 flex-wrap">
      <LayoutGroup id="card">
        <AnimatePresence>
          {videos.map((v, index) => (
            <VideoCard
              key={v.url}
              index={index}
              video={v}
              onRemove={onRemove}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
