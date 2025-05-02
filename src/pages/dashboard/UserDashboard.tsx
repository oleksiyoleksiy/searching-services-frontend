import { useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
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
import { User, Clock, Star, Settings, Home, LogOut, BookOpen, Heart } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentNavItem, setCurrentNavItem] = useState("home");

  const handleNavigation = (route: string, navItem: string) => {
    navigate(route);
    setCurrentNavItem(navItem);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <div className="h-7 w-7 rounded-full bg-localfind-100 p-1 text-localfind-600 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Jane Smith</span>
                <span className="text-xs text-muted-foreground">user@example.com</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "home"}
                  onClick={() => handleNavigation("/user/dashboard", "home")}
                >
                  <Home className="text-localfind-600" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "bookings"}
                  onClick={() => handleNavigation("/user/dashboard/bookings", "bookings")}
                >
                  <Clock className="text-localfind-600" />
                  <span>My Bookings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "favorites"}
                  onClick={() => handleNavigation("/user/dashboard/favorites", "favorites")}
                >
                  <Heart className="text-localfind-600" />
                  <span>Favorites</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentNavItem === "settings"}
                  onClick={() => handleNavigation("/user/dashboard/settings", "settings")}
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
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
            </div>
          </div>
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;