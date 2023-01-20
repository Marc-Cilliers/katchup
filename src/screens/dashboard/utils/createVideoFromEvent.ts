import { ChatterVideo } from "@/utils/hooks/useVideos";

export const createVideoFromEventPayload = (
  payload: any,
  userId: string
): ChatterVideo => {
  const { info: infoArray, timestamp, chatter } = payload;
  const info = infoArray[0];

  return {
    archived: null,
    channel: info.channel,
    chatter,
    chatterId: chatter.id,
    duration: info.duration,
    id: info.id,
    thumbnail: info.thumbnail,
    timestamp,
    title: info.title,
    url: info.url,
    userId,
  };
};
