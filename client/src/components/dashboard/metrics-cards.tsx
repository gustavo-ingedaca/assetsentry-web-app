import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Package, Wrench, BarChart3, AlertTriangle } from "lucide-react";

interface MetricsCardsProps {
  metrics?: {
    totalAssets: number;
    activeMaintenance: number;
    uptimeRate: number;
    criticalAlerts: number;
  };
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Assets",
      value: metrics.totalAssets.toLocaleString(),
      change: "+12%",
      changeType: "increase" as const,
      description: "vs last month",
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-primary"
    },
    {
      title: "Active Maintenance",
      value: metrics.activeMaintenance.toString(),
      change: "-3%",
      changeType: "decrease" as const,
      description: "vs last week",
      icon: Wrench,
      iconBg: "bg-orange-100",
      iconColor: "text-accent"
    },
    {
      title: "Uptime Rate",
      value: `${metrics.uptimeRate}%`,
      change: "+0.3%",
      changeType: "increase" as const,
      description: "vs last month",
      icon: BarChart3,
      iconBg: "bg-green-100",
      iconColor: "text-secondary"
    },
    {
      title: "Critical Alerts",
      value: metrics.criticalAlerts.toString(),
      change: "+25%",
      changeType: "increase" as const,
      description: "vs yesterday",
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-destructive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-on-surface mt-1">{card.value}</p>
                <div className="flex items-center mt-2 text-sm">
                  {card.changeType === "increase" ? (
                    <TrendingUp className="h-4 w-4 text-secondary mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-accent mr-1" />
                  )}
                  <span className={`font-medium ${
                    card.changeType === "increase" ? "text-secondary" : "text-accent"
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-gray-500 ml-1">{card.description}</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`${card.iconColor} h-6 w-6`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
