import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Assets from "@/pages/assets";
import Maintenance from "@/pages/maintenance";
import Analytics from "@/pages/analytics";
import Alerts from "@/pages/alerts";
import Calendar from "@/pages/calendar";
import Team from "@/pages/team";
import Settings from "@/pages/settings";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

function Router() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 ml-[280px]">
        <Header />
        <div className="p-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/assets" component={Assets} />
            <Route path="/maintenance" component={Maintenance} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/alerts" component={Alerts} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/team" component={Team} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
