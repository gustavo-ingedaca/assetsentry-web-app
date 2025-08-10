import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Wrench, 
  Calendar, 
  Bell, 
  Settings, 
  Users, 
  ServerCog,
  LogOut,
  User,
  Bolt
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Asset Management", href: "/assets", icon: ServerCog },
  { name: "Maintenance Tasks", href: "/maintenance", icon: Wrench },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Alerts & Reports", href: "/alerts", icon: Bell },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Team Management", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed h-full w-[280px] bg-white shadow-lg border-r border-gray-200 z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Bolt className="text-white text-lg h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-on-surface">AssetSentry</h1>
            <p className="text-xs text-gray-500">Smart Maintenance</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href || (item.href === "/dashboard" && location === "/");
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <div className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
                    isActive
                      ? "text-on-surface bg-blue-50 border-l-4 border-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-primary" : "text-current"
                    )} />
                    <span className={cn(
                      isActive ? "font-medium" : "font-normal"
                    )}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="text-gray-600 text-sm h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-on-surface truncate">John Smith</p>
            <p className="text-xs text-gray-500 truncate">Maintenance Manager</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
