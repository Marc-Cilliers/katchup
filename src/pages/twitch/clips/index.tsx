import { NextPageWithLayout } from "src/utils/types";
import { TwitchClipsScreen } from "@/screens/twitchClips";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";

const TwitchClips: NextPageWithLayout = () => {
  return <TwitchClipsScreen />;
};

TwitchClips.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default TwitchClips;
