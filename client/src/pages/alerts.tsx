import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, AlertCircle, X, Check } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Alert } from "@shared/schema";

export default function Alerts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: alerts, isLoading } = useQuery({
    queryKey: ["/api/alerts"],
  });

  const updateAlertMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PUT", `/api/alerts/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      toast({
        title: "Alert updated",
        description: "Alert status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update alert status.",
        variant: "destructive",
      });
    },
  });

  const deleteAlertMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/alerts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      toast({
        title: "Alert deleted",
        description: "Alert has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete alert.",
        variant: "destructive",
      });
    },
  });

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "critical": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "info": return <Info className="h-5 w-5 text-blue-500" />;
      default: return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBadgeColor = (level: string) => {
    switch (level) {
      case "critical": return "bg-red-100 text-red-800";
      case "warning": return "bg-orange-100 text-orange-800";
      case "info": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-red-100 text-red-800";
      case "acknowledged": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcknowledge = (alertId: string) => {
    updateAlertMutation.mutate({ id: alertId, status: "acknowledged" });
  };

  const handleResolve = (alertId: string) => {
    updateAlertMutation.mutate({ id: alertId, status: "resolved" });
  };

  const handleDelete = (alertId: string) => {
    deleteAlertMutation.mutate(alertId);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  const activeAlerts = alerts?.filter((alert: Alert) => alert.status === "active") || [];
  const acknowledgedAlerts = alerts?.filter((alert: Alert) => alert.status === "acknowledged") || [];
  const resolvedAlerts = alerts?.filter((alert: Alert) => alert.status === "resolved") || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Alerts & Notifications</h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor and manage system alerts and notifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <Check className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acknowledgedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Being addressed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Successfully resolved
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Active Alerts</h2>
        {activeAlerts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No active alerts
              </h3>
              <p className="text-gray-500">
                All systems are running smoothly.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert: Alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-on-surface">
                            {alert.title}
                          </h4>
                          <Badge className={getAlertBadgeColor(alert.level)}>
                            {alert.level}
                          </Badge>
                          <Badge className={getStatusBadgeColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {alert.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(alert.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAcknowledge(alert.id)}
                        disabled={updateAlertMutation.isPending}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Acknowledge
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                        disabled={updateAlertMutation.isPending}
                      >
                        Resolve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(alert.id)}
                        disabled={deleteAlertMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {(acknowledgedAlerts.length > 0 || resolvedAlerts.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">All Alerts</h2>
          <div className="space-y-3">
            {[...acknowledgedAlerts, ...resolvedAlerts].map((alert: Alert) => (
              <Card key={alert.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-on-surface">
                            {alert.title}
                          </h4>
                          <Badge className={getAlertBadgeColor(alert.level)}>
                            {alert.level}
                          </Badge>
                          <Badge className={getStatusBadgeColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {alert.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(alert.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(alert.id)}
                      disabled={deleteAlertMutation.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
