import { ChatterClip } from "@/screens/twitchClips/hooks/useClips";
import { User } from "@prisma/client";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { ClipCard } from "./ClipCard";

interface ClipListProps {
  clips: ChatterClip[];
  user: User;
  onRemove: (id: string) => void;
}

export const ClipList = ({ clips, onRemove, user }: ClipListProps) => {
  return (
    <div className="flex flex-row gap-4 ml-5 flex-wrap h-full">
      <LayoutGroup id="card">
        <AnimatePresence>
          {clips.map((v) => (
            <ClipCard key={v.url} clip={v} onRemove={onRemove} user={user} />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
