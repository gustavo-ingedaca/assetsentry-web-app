import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Lock, User, Database } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your application preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>Settings Menu</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm bg-primary text-primary-foreground rounded-md">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <Database className="h-4 w-4" />
                  <span>System</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.smith@assetsentry.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Maintenance Manager" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive alerts and updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Critical Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Get notified immediately for critical issues
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Reminders</Label>
                  <p className="text-sm text-gray-500">
                    Receive reminders for scheduled maintenance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-gray-500">
                    Get weekly performance summary reports
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Input id="dateFormat" defaultValue="MM/DD/YYYY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" defaultValue="USD ($)" />
              </div>
              <Button>Update Configuration</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
