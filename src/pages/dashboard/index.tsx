import { DashboardScreen } from "@/screens/dashboard/DashboardScreen";
import { AuthenticatedLayout } from "src/layouts/AuthenticatedLayout";
import { NextPageWithLayout } from "src/utils/types";

const Dashboard: NextPageWithLayout = () => {
  return <DashboardScreen />;
};

Dashboard.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default Dashboard;
