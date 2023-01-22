import { ChatterVideo } from "@/utils/hooks/useVideos";

export const createVideoFromEventPayload = (
  payload: any,
  userId: string
): ChatterVideo[] => {
  const { videos, timestamp, chatter } = payload;

  return videos.map((v: any) => {
    return {
      archived: null,
      channel: v.channel,
      chatter,
      chatterId: chatter.id,
      duration: v.duration,
      id: v.id,
      thumbnail: v.thumbnail,
      timestamp,
      title: v.title,
      url: v.url,
      userId,
    };
  });
};
