import { YoutubeVideo } from "@prisma/client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export type RemoveVideoFn = (
  videoId: string,
  chatterId: string,
  rating: number
) => void;

export type AddVideoFn = (newVideos: ChatterVideo[]) => void;

export type Badges = Record<string, string>;

interface UseVideosReturnType {
  videos: ChatterVideo[];
  onRemove: (videoId: string) => void;
  addVideos: AddVideoFn;
  isLoading: boolean;
}

export type PartialUserChatter = {
  color: string;
  badges: Badges;
  mod: boolean;
  subscriber: boolean;
  turbo: boolean;
  chatter: {
    username: string;
  };
};

export type ChatterVideo = YoutubeVideo & {
  userChatter: PartialUserChatter;
  isLoading?: boolean;
};

export const useVideos = (): UseVideosReturnType => {
  const { isAuthReady, isAuthenticated, user } = useAuth();
  const [videos, setVideos] = useState<ChatterVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const res = await axios.get(`/api/youtube-videos?userId=${user?.id}`);
    setVideos(res.data.videos);

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
