import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Wrench } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import type { MaintenanceTask } from "@shared/schema";

export default function Maintenance() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["/api/maintenance"],
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "scheduled": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
          <h1 className="text-2xl font-bold text-on-surface">Maintenance Tasks</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track maintenance activities
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Wrench className="h-4 w-4" />
          <span>Schedule Maintenance</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((task: MaintenanceTask) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              <Badge className={getStatusColor(task.status)}>
                {task.status.replace('_', ' ')}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{task.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {task.scheduledDate 
                      ? new Date(task.scheduledDate).toLocaleDateString()
                      : "Not scheduled"
                    }
                  </span>
                </div>
                
                {task.estimatedDuration && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{task.estimatedDuration} minutes</span>
                  </div>
                )}
                
                {task.assignedTo && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <User className="h-4 w-4" />
                    <span>Assigned</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-500">
                  Type: {task.type}
                </span>
                {task.cost && (
                  <span className="text-sm font-medium">
                    ${task.cost}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!tasks?.length && (
        <Card>
          <CardContent className="text-center py-8">
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No maintenance tasks found
            </h3>
            <p className="text-gray-500">
              Schedule your first maintenance task to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
