import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", performance: 85, efficiency: 78 },
  { name: "Week 2", performance: 88, efficiency: 82 },
  { name: "Week 3", performance: 92, efficiency: 85 },
  { name: "Week 4", performance: 85, efficiency: 88 },
];

export default function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-on-surface">
              Asset Performance Trends
            </CardTitle>
            <p className="text-gray-500 text-sm">Last 30 days performance metrics</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Asset Performance"
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                name="Maintenance Efficiency"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
