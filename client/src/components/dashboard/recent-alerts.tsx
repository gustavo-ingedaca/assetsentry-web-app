import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Alert } from "@shared/schema";

interface RecentAlertsProps {
  alerts: Alert[];
}

export default function RecentAlerts({ alerts }: RecentAlertsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const dismissAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return apiRequest("DELETE", `/api/alerts/${alertId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      toast({
        title: "Alert dismissed",
        description: "Alert has been dismissed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to dismiss alert.",
        variant: "destructive",
      });
    },
  });

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "info": return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertBorderColor = (level: string) => {
    switch (level) {
      case "critical": return "border-red-200 bg-red-50";
      case "warning": return "border-orange-200 bg-orange-50";
      case "info": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const alertDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - alertDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const handleDismiss = (alertId: string) => {
    dismissAlertMutation.mutate(alertId);
  };

  const recentAlerts = alerts.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-on-surface">
            Recent Alerts
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No recent alerts</p>
            </div>
          ) : (
            recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg border ${getAlertBorderColor(alert.level)}`}
              >
                <div className="w-2 h-2 rounded-full mt-2" style={{
                  backgroundColor: alert.level === "critical" ? "#ef4444" : 
                                  alert.level === "warning" ? "#f59e0b" : "#3b82f6"
                }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getAlertIcon(alert.level)}
                    <p className="text-sm font-medium text-on-surface truncate">
                      {alert.title}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {formatTimeAgo(alert.createdAt)}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {alert.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDismiss(alert.id)}
                  disabled={dismissAlertMutation.isPending}
                  className="p-1 h-auto"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
