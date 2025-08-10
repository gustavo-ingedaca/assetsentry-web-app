import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: activeAlerts } = useQuery({
    queryKey: ["/api/alerts/active"],
  });

  const alertCount = activeAlerts?.length || 0;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">
            Monitor your assets and maintenance activities in real-time
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            {alertCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-destructive text-destructive-foreground p-0">
                {alertCount}
              </Badge>
            )}
          </button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Asset</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
