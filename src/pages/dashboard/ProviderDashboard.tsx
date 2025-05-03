import { useState } from "react";
import { Routes, Route, useNavigate, Outlet, Link } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User, Package, Calendar, MessageSquare, Star, Settings, Home, LogOut } from "lucide-react";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [currentNavItem, setCurrentNavItem] = useState("services");

  const handleNavigation = (route: string, navItem: string) => {
    navigate(route);
    setCurrentNavItem(navItem);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-localfind-600 to-localfind-500 bg-clip-text text-transparent">
                  LocalFind
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2 px-2">
              <User className="h-7 w-7 rounded-full bg-localfind-100 p-1 text-localfind-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Provider Name</span>
                <span className="text-xs text-muted-foreground">provider@example.com</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "dashboard"}
                  onClick={() => handleNavigation("/provider/dashboard", "dashboard")}
                >
                  <Home className="text-localfind-600" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "services"}
                  onClick={() => handleNavigation("/provider/dashboard/services", "services")}
                >
                  <Package className="text-localfind-600" />
                  <span>My Services</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "bookings"}
                  onClick={() => handleNavigation("/provider/dashboard/bookings", "bookings")}
                >
                  <Calendar className="text-localfind-600" />
                  <span>Manage Bookings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "chat"}
                  onClick={() => handleNavigation("/provider/dashboard/chat", "chat")}
                >
                  <MessageSquare className="text-localfind-600" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "reviews"}
                  onClick={() => handleNavigation("/provider/dashboard/reviews", "reviews")}
                >
                  <Star className="text-localfind-600" />
                  <span>Reviews</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "settings"}
                  onClick={() => handleNavigation("/provider/dashboard/settings", "settings")}
                >
                  <Settings className="text-localfind-600" />
                  <span>Profile Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => navigate("/")}>
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="p-4 md:p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-bold text-gray-800">Provider Dashboard</h1>
              <p className="text-muted-foreground">Manage your services and bookings</p>
            </div>
          </div>
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProviderDashboard;