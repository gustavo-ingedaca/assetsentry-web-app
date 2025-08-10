import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertAssetSchema, AssetStatus } from "@shared/schema";
import type { Asset } from "@shared/schema";
import { z } from "zod";

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset?: Asset | null;
}

const formSchema = insertAssetSchema.extend({
  installDate: z.string().optional(),
  lastMaintenance: z.string().optional(),
  nextMaintenance: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AssetModal({ isOpen, onClose, asset }: AssetModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: "",
      name: "",
      type: "",
      status: "operational",
      location: "",
      description: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      performance: "100.00",
      installDate: "",
      lastMaintenance: "",
      nextMaintenance: "",
    },
  });

  const createAssetMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        ...data,
        installDate: data.installDate ? new Date(data.installDate) : null,
        lastMaintenance: data.lastMaintenance ? new Date(data.lastMaintenance) : null,
        nextMaintenance: data.nextMaintenance ? new Date(data.nextMaintenance) : null,
      };
      return apiRequest("POST", "/api/assets", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      toast({
        title: "Asset created",
        description: "Asset has been created successfully.",
      });
      onClose();
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create asset.",
        variant: "destructive",
      });
    },
  });

  const updateAssetMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!asset) throw new Error("No asset to update");
      const payload = {
        ...data,
        installDate: data.installDate ? new Date(data.installDate) : null,
        lastMaintenance: data.lastMaintenance ? new Date(data.lastMaintenance) : null,
        nextMaintenance: data.nextMaintenance ? new Date(data.nextMaintenance) : null,
      };
      return apiRequest("PUT", `/api/assets/${asset.id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      toast({
        title: "Asset updated",
        description: "Asset has been updated successfully.",
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update asset.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (asset) {
      form.reset({
        assetId: asset.assetId,
        name: asset.name,
        type: asset.type,
        status: asset.status,
        location: asset.location,
        description: asset.description || "",
        manufacturer: asset.manufacturer || "",
        model: asset.model || "",
        serialNumber: asset.serialNumber || "",
        performance: asset.performance || "100.00",
        installDate: asset.installDate ? new Date(asset.installDate).toISOString().split('T')[0] : "",
        lastMaintenance: asset.lastMaintenance ? new Date(asset.lastMaintenance).toISOString().split('T')[0] : "",
        nextMaintenance: asset.nextMaintenance ? new Date(asset.nextMaintenance).toISOString().split('T')[0] : "",
      });
    } else {
      form.reset({
        assetId: "",
        name: "",
        type: "",
        status: "operational",
        location: "",
        description: "",
        manufacturer: "",
        model: "",
        serialNumber: "",
        performance: "100.00",
        installDate: "",
        lastMaintenance: "",
        nextMaintenance: "",
      });
    }
  }, [asset, form]);

  const onSubmit = (data: FormData) => {
    if (asset) {
      updateAssetMutation.mutate(data);
    } else {
      createAssetMutation.mutate(data);
    }
  };

  const isPending = createAssetMutation.isPending || updateAssetMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {asset ? "Edit Asset" : "Add New Asset"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="AS001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={AssetStatus.OPERATIONAL}>Operational</SelectItem>
                        <SelectItem value={AssetStatus.MAINTENANCE}>Maintenance</SelectItem>
                        <SelectItem value={AssetStatus.OFFLINE}>Offline</SelectItem>
                        <SelectItem value={AssetStatus.DECOMMISSIONED}>Decommissioned</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Centrifugal Pump A1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Pump System" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Building A - Floor 1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Asset description..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="FlowTech Industries" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="FT-2500X" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="FT2500X-2024-001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="performance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Performance (%)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" max="100" step="0.01" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="installDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Install Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastMaintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Maintenance</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextMaintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Maintenance</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : asset ? "Update Asset" : "Create Asset"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
