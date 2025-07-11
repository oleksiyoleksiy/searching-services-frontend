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
import { User, Package, Calendar, MessageSquare, Star, Settings, Home, LogOut, ChartPie, UserCog2, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import authService from "@/services/authService";
import { authActions } from "@/store/authSlice";
import { hasPermission } from "@/utils/permissions";
import NotFound from "../NotFound";

const ProviderDashboard = () => {
  const [currentNavItem, setCurrentNavItem] = useState("services");
  const { user, isLoading } = useSelector((s: RootState) => s.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

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

  if (!isLoading && user && !hasPermission('provider', user)) return <NotFound />

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <User className="h-7 w-7 rounded-full bg-localfind-100 p-1 text-localfind-600" />
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
                  isActive={location.pathname === "/provider/dashboard"}
                  onClick={() => handleNavigation("/provider/dashboard", "dashboard")}
                >
                  <ChartPie className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/services"}
                  onClick={() => handleNavigation("/provider/dashboard/services", "services")}
                >
                  <Package className="text-localfind-600 min-w-5 min-h-5" />
                  <span>My Services</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/bookings"}
                  onClick={() => handleNavigation("/provider/dashboard/bookings", "bookings")}
                >
                  <Calendar className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Manage Bookings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/my-bookings"}
                  onClick={() => handleNavigation("/provider/dashboard/my-bookings", "my-bookings")}
                >
                  <Calendar className="text-localfind-600 min-w-5 min-h-5" />
                  <span>My Bookings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/favorites"}
                  onClick={() => handleNavigation("/provider/dashboard/favorites", "favorite")}
                >
                  <Heart className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Favorites</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/chat"}
                  onClick={() => handleNavigation("/provider/dashboard/chat", "chat")}
                >
                  <MessageSquare className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/reviews"}
                  onClick={() => handleNavigation("/provider/dashboard/reviews", "reviews")}
                >
                  <Star className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Reviews</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/company-settings"}
                  onClick={() => handleNavigation("/provider/dashboard/company-settings", "company-settings")}
                >
                  <Settings className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Company Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/provider/dashboard/settings"}
                  onClick={() => handleNavigation("/provider/dashboard/settings", "settings")}
                >
                  <UserCog2 className="text-localfind-600 min-w-5 min-h-5" />
                  <span>Profile Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation("/", "home")}
                >
                  <Home className="text-localfind-600 min-w-5 min-h-5" />
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