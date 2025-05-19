import { useState } from "react";
import { Routes, Route, useNavigate, Outlet, Link, useLocation } from "react-router-dom";
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
import { User, Clock, Star, Settings, Home, LogOut, BookOpen, Heart, ChartPie, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/authSlice";
import authService from "@/services/authService";
import { RootState } from "@/store";

const UserDashboard = () => {
  const [currentNavItem, setCurrentNavItem] = useState("home");
  const { user } = useSelector((s: RootState) => s.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation()

  const handleNavigation = (route: string, navItem: string) => {
    navigate(route);
    setCurrentNavItem(navItem);
  };

  const handleLogoutButtonClick = async () => {
    const response = await authService.logout()

    if (response) {
      dispatch(authActions.logout())
      navigate('/auth/login')
    }
  }

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
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="p-3">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/user/dashboard"}
                  onClick={() => handleNavigation("/user/dashboard", "home")}
                >
                  <ChartPie className="text-localfind-600 min-h-5 min-w-5" />
                  <span >Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/user/dashboard/bookings"}
                  onClick={() => handleNavigation("/user/dashboard/bookings", "bookings")}
                >
                  <Clock className="text-localfind-600 min-h-5 min-w-5" />
                  <span>My Bookings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/user/dashboard/chat"}
                  onClick={() => handleNavigation("/user/dashboard/chat", "chat")}
                >
                  <MessageSquare className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/user/dashboard/favorites"}
                  onClick={() => handleNavigation("/user/dashboard/favorites", "favorites")}
                >
                  <Heart className="text-localfind-600 min-h-5 min-w-5" />
                  <span>Favorites</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/user/dashboard/settings"}
                  onClick={() => handleNavigation("/user/dashboard/settings", "settings")}
                >
                  <Settings className="text-localfind-600 min-h-5 min-w-5" />
                  <span>Profile Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation("/", "home")}
                >
                  <Home className="text-localfind-600 min-h-5 min-w-5" />
                  <span>To homepage</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleLogoutButtonClick}>
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