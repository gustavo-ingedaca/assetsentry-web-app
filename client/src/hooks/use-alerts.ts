import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Alert, InsertAlert } from "@shared/schema";

export function useAlerts() {
  return useQuery({
    queryKey: ["/api/alerts"],
  });
}

export function useActiveAlerts() {
  return useQuery({
    queryKey: ["/api/alerts/active"],
  });
}

export function useAlert(id: string) {
  return useQuery({
    queryKey: ["/api/alerts", id],
    enabled: !!id,
  });
}

export function useCreateAlert() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertAlert) => {
      return apiRequest("POST", "/api/alerts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      toast({
        title: "Alert created",
        description: "Alert has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create alert.",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateAlert() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertAlert> }) => {
      return apiRequest("PUT", `/api/alerts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      toast({
        title: "Alert updated",
        description: "Alert has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update alert.",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteAlert() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/alerts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      toast({
        title: "Alert deleted",
        description: "Alert has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete alert.",
        variant: "destructive",
      });
    },
  });
}

export function useAcknowledgeAlert() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("PUT", `/api/alerts/${id}`, { status: "acknowledged" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      toast({
        title: "Alert acknowledged",
        description: "Alert has been acknowledged successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to acknowledge alert.",
        variant: "destructive",
      });
    },
  });
}

export function useResolveAlert() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("PUT", `/api/alerts/${id}`, { status: "resolved" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      toast({
        title: "Alert resolved",
        description: "Alert has been resolved successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to resolve alert.",
        variant: "destructive",
      });
    },
  });
}
