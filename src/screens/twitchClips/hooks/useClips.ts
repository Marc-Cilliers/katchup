import { TwitchClip } from "@prisma/client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../utils/hooks/useAuth";

export type RemoveVideoFn = (
  videoId: string,
  chatterId: string,
  rating: number
) => void;

export type AddClipFn = (newClips: ChatterClip[]) => void;

export type Badges = Record<string, string>[];

interface UseVideosReturnType {
  clips: ChatterClip[];
  onRemove: (videoId: string) => void;
  addClips: AddClipFn;
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

export type ChatterClip = TwitchClip & {
  userChatter: PartialUserChatter;
  isLoading?: boolean;
};

export const useClips = (): UseVideosReturnType => {
  const { isAuthReady, isAuthenticated, user } = useAuth();
  const [clips, setClips] = useState<ChatterClip[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const res = await axios.get(`/api/twitch-clips?userId=${user?.id}`);
    setClips(res.data.clips);

    setIsLoading(false);
  }, [user?.id]);

  const onRemove = useCallback(async (id: string) => {
    setClips((videos) => videos.filter((v) => v.id !== id));
  }, []);

  const addClips = useCallback(
    async (newClips: ChatterClip[]) => {
      if (!isAuthReady || !isAuthenticated) return;

      setClips((clips) => [...clips, ...newClips]);
    },
    [isAuthReady, isAuthenticated]
  );

  useEffect(() => {
    if (!isAuthReady) return;

    fetchData();
  }, [isAuthReady, fetchData]);

  return {
    clips,
    onRemove,
    addClips,
    isLoading,
  };
};
