import { TotalVisitors } from "@/components/DashboardCharts/TotalVisitors/TotalVisitor";
import { Stats } from "@/components/DashboardCharts/Stats/Stats";
import OverviewPage from "./dashboard/overview/page";

export default function Page() {
  return (
    <div className="space-y-6">
      <OverviewPage />
    </div>
  );
}
