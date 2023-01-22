import { YoutubeVideo } from "@prisma/client";
import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export type RemoveVideoFn = (
  videoId: string,
  chatterId: string,
  rating: number
) => void;

interface UseVideosReturnType {
  removeVideo: RemoveVideoFn;
  isLoading: boolean;
}

export type ChatterVideo = YoutubeVideo & {
  chatter: {
    username: string;
  };
  isLoading?: boolean;
};

interface RemoveVideoProps {
  callbackFn?: (videoId: string) => void;
}

export const useRemoveVideo = ({
  callbackFn,
}: RemoveVideoProps): UseVideosReturnType => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const removeVideo = useCallback(
    async (videoId: string, chatterId: string, rating: number) => {
      setIsLoading(true);

      await axios.delete(`/api/youtube-video`, {
        data: { videoId, chatterId, userId: user?.id, rating },
      });
      callbackFn?.(videoId);

      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user?.id]
  );

  return {
    removeVideo,
    isLoading,
  };
};
