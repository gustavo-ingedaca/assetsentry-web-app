import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, Edit, Calendar } from "lucide-react";
import type { Asset } from "@shared/schema";

interface AssetTableProps {
  assets: Asset[];
  onViewAsset?: (asset: Asset) => void;
  onEditAsset?: (asset: Asset) => void;
  onScheduleMaintenance?: (asset: Asset) => void;
  showPagination?: boolean;
}

export default function AssetTable({ 
  assets, 
  onViewAsset, 
  onEditAsset, 
  onScheduleMaintenance,
  showPagination = false 
}: AssetTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Asset>("assetId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  const itemsPerPage = 10;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-orange-100 text-orange-800";
      case "offline": return "bg-red-100 text-red-800";
      case "decommissioned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pump system":
      case "pump": return "🔧";
      case "generator": return "⚡";
      case "hvac": return "❄️";
      default: return "🏭";
    }
  };

  const handleSort = (field: keyof Asset) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    let comparison = 0;
    if (aValue < bValue) comparison = -1;
    if (aValue > bValue) comparison = 1;
    
    return sortDirection === "desc" ? -comparison : comparison;
  });

  const totalPages = Math.ceil(sortedAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = showPagination ? sortedAssets.slice(startIndex, endIndex) : sortedAssets;

  const formatDate = (date: string | Date | null) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center space-x-1 hover:text-gray-700"
                onClick={() => handleSort("assetId")}
              >
                <span>Asset ID</span>
                <span className="text-gray-400">⏶</span>
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center space-x-1 hover:text-gray-700"
                onClick={() => handleSort("name")}
              >
                <span>Name</span>
                <span className="text-gray-400">⏶</span>
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center space-x-1 hover:text-gray-700"
                onClick={() => handleSort("type")}
              >
                <span>Type</span>
                <span className="text-gray-400">⏶</span>
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center space-x-1 hover:text-gray-700"
                onClick={() => handleSort("status")}
              >
                <span>Status</span>
                <span className="text-gray-400">⏶</span>
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                className="flex items-center space-x-1 hover:text-gray-700"
                onClick={() => handleSort("lastMaintenance")}
              >
                <span>Last Maintenance</span>
                <span className="text-gray-400">⏶</span>
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Performance
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentAssets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                {asset.assetId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm">{getAssetIcon(asset.type)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-on-surface">{asset.name}</div>
                    <div className="text-sm text-gray-500">{asset.location}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {asset.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={getStatusColor(asset.status)}>
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(asset.lastMaintenance)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 mr-2">
                    <Progress value={parseFloat(asset.performance || "0")} className="h-2" />
                  </div>
                  <span className="text-sm text-gray-500">{asset.performance}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewAsset?.(asset)}
                    className="text-primary hover:text-primary/80"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditAsset?.(asset)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onScheduleMaintenance?.(asset)}
                    className="text-accent hover:text-accent/80"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">{Math.min(endIndex, assets.length)}</span> of{" "}
            <span className="font-medium">{assets.length}</span> assets
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-gray-500">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
