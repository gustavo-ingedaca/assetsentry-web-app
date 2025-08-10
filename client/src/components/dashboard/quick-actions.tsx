import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BarChart3, Upload, Activity } from "lucide-react";

const quickActions = [
  {
    title: "Schedule Maintenance",
    description: "Plan upcoming tasks",
    icon: Calendar,
    bgColor: "bg-blue-100",
    iconColor: "text-primary"
  },
  {
    title: "Generate Report",
    description: "Custom analytics",
    icon: BarChart3,
    bgColor: "bg-green-100",
    iconColor: "text-secondary"
  },
  {
    title: "Bulk Import",
    description: "Upload asset data",
    icon: Upload,
    bgColor: "bg-orange-100",
    iconColor: "text-accent"
  },
  {
    title: "System Health",
    description: "Overall status check",
    icon: Activity,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  }
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-on-surface">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <action.icon className={`${action.iconColor} h-6 w-6`} />
              </div>
              <span className="text-sm font-medium text-on-surface">{action.title}</span>
              <span className="text-xs text-gray-500 mt-1">{action.description}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
