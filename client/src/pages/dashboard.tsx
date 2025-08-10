import { useQuery } from "@tanstack/react-query";
import MetricsCards from "@/components/dashboard/metrics-cards";
import PerformanceChart from "@/components/dashboard/performance-chart";
import RecentAlerts from "@/components/dashboard/recent-alerts";
import QuickActions from "@/components/dashboard/quick-actions";
import AssetTable from "@/components/assets/asset-table";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: assets, isLoading: assetsLoading } = useQuery({
    queryKey: ["/api/assets"],
  });

  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: ["/api/alerts/active"],
  });

  if (metricsLoading || assetsLoading || alertsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor your assets and maintenance activities in real-time
        </p>
      </div>

      <MetricsCards metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <RecentAlerts alerts={alerts || []} />
        </div>
      </div>

      <AssetTable assets={assets || []} showPagination />

      <QuickActions />
    </div>
  );
}
