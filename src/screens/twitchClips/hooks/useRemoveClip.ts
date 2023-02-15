import { useCallback, useState } from "react";
import axios from "axios";
import { useAuth } from "@/utils/hooks/useAuth";

export type RemoveClipFn = (
  clipId: string,
  chatterId: string,
  rating: number
) => void;

interface UseClipsReturnType {
  removeClip: RemoveClipFn;
  isLoading: boolean;
}

interface RemoveClipProps {
  callbackFn?: (id: string) => void;
}

export const useRemoveClip = ({
  callbackFn,
}: RemoveClipProps): UseClipsReturnType => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const removeClip = useCallback(
    async (clipId: string, userChatterId: string, rating: number) => {
      setIsLoading(true);

      await axios.delete(`/api/twitch-clip`, {
        data: { clipId, userChatterId, rating },
      });
      callbackFn?.(clipId);

      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user?.id]
  );

  return {
    removeClip,
    isLoading,
  };
};
