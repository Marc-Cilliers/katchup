import { YoutubeVideo } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export type RemoveVideoFn = (
  videoId: string,
  chatterId: string,
  rating: number
) => void;

export type AddVideoFn = (newVideos: ChatterVideo[]) => void;

interface UseVideosReturnType {
  videos: ChatterVideo[];
  onRemove: (videoId: string) => void;
  addVideos: AddVideoFn;
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

  const onRemove = useCallback(async (videoId: string) => {
    setVideos((videos) => videos.filter((v) => v.id !== videoId));
  }, []);

  const addVideos = useCallback(
    async (newVideos: ChatterVideo[]) => {
      if (!isAuthReady || !isAuthenticated) return;

      setVideos((videos) => [...videos, ...newVideos]);
    },
    [isAuthReady, isAuthenticated]
  );

  useEffect(() => {
    if (!isAuthReady) return;

    fetchData();
  }, [isAuthReady, fetchData]);

  return {
    videos,
    onRemove,
    addVideos,
    isLoading,
  };
};
