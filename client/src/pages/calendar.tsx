import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Calendar</h1>
        <p className="text-gray-500 text-sm mt-1">
          Schedule and track maintenance activities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Maintenance Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center text-gray-500">
                Calendar view would be implemented here
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Upcoming Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface">
                      Pump A1 Inspection
                    </p>
                    <p className="text-xs text-gray-500">
                      Today, 2:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface">
                      Generator B3 Maintenance
                    </p>
                    <p className="text-xs text-gray-500">
                      Tomorrow, 9:00 AM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface">
                      HVAC System Check
                    </p>
                    <p className="text-xs text-gray-500">
                      Friday, 10:30 AM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Team Availability</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">John Smith</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sarah Johnson</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Busy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mike Wilson</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Available
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
