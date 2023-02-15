import { YoutubeScreen } from "@/screens/youtube/YoutubeScreen";
import { AuthenticatedLayout } from "src/layouts/AuthenticatedLayout";
import { NextPageWithLayout } from "src/utils/types";

const Youtube: NextPageWithLayout = () => {
  return <YoutubeScreen />;
};

Youtube.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Youtube;
