import { Table } from "@/components/Table";
import Link from "next/link";
import {
  ChatterVideo,
  RemoveVideoFn,
  useVideos,
} from "@/utils/hooks/useVideos";
import { Spinner } from "@/components/Spinner";
import { DateTime } from "luxon";
import { VideoCard } from "./components";
import { Icon } from "@/icons/Icon";

export const DashboardScreen = () => {
  const { videos, isLoading, removeVideo } = useVideos();

  return (
    <div>
      <div className="p-5 text-lg font-semibold text-left text-white">
        <div className="flex flex-row align-middle justify-start gap-2">
          <Icon name="youtube" />
          <p className="leading-7 text-2xl">Youtube Videos</p>
        </div>
        <p className="mt-1 text-sm font-normal text-gray-400">
          All links sent to you by twitch chat
        </p>
      </div>
      {isLoading && (
        <div className="content-center justify-center flex">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <Table
          headers={[
            "Youtube Video",
            "User",
            "Sent",
            "Rate this Recommendation",
          ]}
          rows={videos.map((v) => getVideoRow(v, removeVideo))}
        />
      )}
    </div>
  );
};

const getVideoRow = (video: ChatterVideo, removeVideo: RemoveVideoFn) => {
  const url = <VideoCard video={video} />;

  const chatter = (
    <Link
      className="text-purple-400"
      key={video.chatterId}
      href={`https://twitch.tv/${video.chatter.username}`}
      target="_blank"
    >
      {video.chatter.username}
    </Link>
  );
  const timestamp = DateTime.fromISO(
    video.timestamp as unknown as string
  ).toRelative();

  const actions = (
    <div>
      <button
        onClick={() => removeVideo(video.id, video.chatterId, 1)}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          🎉
        </span>
      </button>

      <button
        onClick={() => removeVideo(video.id, video.chatterId, 0)}
        type="button"
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        🙃
      </button>

      <button
        onClick={() => removeVideo(video.id, video.chatterId, -1)}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-red-700 group-hover:from-red-500 group-hover:to-red-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          🤮
        </span>
      </button>
    </div>
  );

  return [url, chatter, timestamp, actions];
};
