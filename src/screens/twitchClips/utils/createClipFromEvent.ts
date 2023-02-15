import { ChatterClip } from "@/screens/twitchClips/hooks/useClips";

export const createClipFromEvent = (
  payload: any,
  userId: string
): ChatterClip[] => {
  const { clips, timestamp, userChatter } = payload;

  return clips.map((v: any) => {
    return {
      archived: null,
      broadcasterName: v.broadcasterName,
      userChatter,
      userChatterId: userChatter.id,
      duration: v.duration,
      id: v.id,
      thumbnail: v.thumbnail,
      timestamp,
      title: v.title,
      url: v.url,
      viewCount: v.viewCount,
      userId,
    };
  });
};
