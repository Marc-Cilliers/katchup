import { YoutubeVideo } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export type RemoveVideoFn = (
  videoId: string,
  chatterId: string,
  rating: number
) => void;

interface UseVideosReturnType {
  videos: ChatterVideo[];
  removeVideo: RemoveVideoFn;
  isLoading: boolean;
}

export type ChatterVideo = YoutubeVideo & {
  chatter: {
    username: string;
  };
  isLoading?: boolean;
};

export const useVideos = (): UseVideosReturnType => {
  const { isAuthReady, isAuthenticated, user } = useAuth();
  const [videos, setVideos] = useState<ChatterVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const res = await fetch(`/api/youtube-videos?userId=${user?.id}`).then(
      (r) => r.json()
    );
    setVideos(res.videos);

    setIsLoading(false);
  }, [user?.id]);

  const removeVideo = useCallback(
    async (videoId: string, chatterId: string, rating: number) => {
      if (!isAuthReady || !isAuthenticated) return;

      setVideos((videos) => videos.filter((v) => v.id !== videoId));
      await axios.delete(`/api/youtube-video`, {
        data: { videoId, chatterId, userId: user?.id, rating },
      });
    },
    [isAuthReady, isAuthenticated, user?.id]
  );

  useEffect(() => {
    if (!isAuthReady) return;

    fetchData();
  }, [isAuthReady, fetchData]);

  return {
    videos,
    removeVideo,
    isLoading,
  };
};
