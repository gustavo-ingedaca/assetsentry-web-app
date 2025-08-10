import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Download, Search } from "lucide-react";
import AssetTable from "@/components/assets/asset-table";
import AssetModal from "@/components/assets/asset-modal";
import LoadingSpinner from "@/components/ui/loading-spinner";
import type { Asset } from "@shared/schema";

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const { data: assets, isLoading } = useQuery({
    queryKey: ["/api/assets"],
  });

  const filteredAssets = assets?.filter((asset: Asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Asset Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and monitor all your assets
          </p>
        </div>
        <Button onClick={handleAddAsset} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Asset</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-on-surface">Assets</h3>
              <p className="text-gray-500 text-sm">
                Total: {filteredAssets.length} assets
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Filter assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-2 w-64"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>

        <AssetTable 
          assets={filteredAssets} 
          onViewAsset={handleViewAsset}
          showPagination={true}
        />
      </div>

      <AssetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        asset={selectedAsset}
      />
    </div>
  );
}
