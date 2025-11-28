import { TotalVisitors } from "@/components/DashboardCharts/TotalVisitors/TotalVisitor";
import { Stats } from "@/components/DashboardCharts/Stats/Stats";

export default function Page() {
  return (
    <div className="space-y-6">
      <Stats />
      <TotalVisitors />
    </div>
  );
}
