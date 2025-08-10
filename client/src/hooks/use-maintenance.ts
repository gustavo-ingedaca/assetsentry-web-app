import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { MaintenanceTask, InsertMaintenanceTask } from "@shared/schema";

export function useMaintenanceTasks() {
  return useQuery({
    queryKey: ["/api/maintenance"],
  });
}

export function useMaintenanceTask(id: string) {
  return useQuery({
    queryKey: ["/api/maintenance", id],
    enabled: !!id,
  });
}

export function useMaintenanceTasksByAsset(assetId: string) {
  return useQuery({
    queryKey: ["/api/maintenance/asset", assetId],
    enabled: !!assetId,
  });
}

export function useCreateMaintenanceTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertMaintenanceTask) => {
      return apiRequest("POST", "/api/maintenance", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      toast({
        title: "Maintenance task created",
        description: "Maintenance task has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create maintenance task.",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateMaintenanceTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertMaintenanceTask> }) => {
      return apiRequest("PUT", `/api/maintenance/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      toast({
        title: "Maintenance task updated",
        description: "Maintenance task has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update maintenance task.",
        variant: "destructive",
      });
    },
  });
}

export function useCompleteMaintenanceTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, actualDuration, notes }: { 
      id: string; 
      actualDuration?: number; 
      notes?: string;
    }) => {
      return apiRequest("PUT", `/api/maintenance/${id}`, {
        status: "completed",
        completedDate: new Date(),
        actualDuration,
        notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      toast({
        title: "Task completed",
        description: "Maintenance task has been marked as completed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to complete maintenance task.",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteMaintenanceTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/maintenance/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      toast({
        title: "Maintenance task deleted",
        description: "Maintenance task has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete maintenance task.",
        variant: "destructive",
      });
    },
  });
}
