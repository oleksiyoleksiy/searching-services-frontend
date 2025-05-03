import { useState } from "react";
import { Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import {
  ChevronDown, ChevronUp, Menu, Users, ShoppingBag,
  Bell, LogOut, Settings, BarChart2,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

import { Button } from "@/components/ui/button";
// import AdminHome from "./admin/AdminHome";
// import UserManagement from "./admin/UserManagement";
// import ServiceManagement from "./admin/ServiceManagement";
// import Notifications from "./admin/Notifications";
// import AdminSettings from "./admin/AdminSettings";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"
          } bg-white shadow-lg transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="h-20 flex items-center justify-between px-4 border-b">
          <div className={`flex items-center ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="h-10 w-10 rounded-full bg-localfind-600 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            {sidebarOpen && <span className="ml-3 font-semibold text-xl">Admin</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={!sidebarOpen ? "hidden" : ""}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 flex-1">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mb-6 mx-auto block"
            >
              <ChevronRight className="mx-auto h-5 w-5" />
            </Button>
          )}

          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive("/admin/dashboard") && !isActive("/admin/dashboard/users") && !isActive("/admin/dashboard/services") && !isActive("/admin/dashboard/notifications") && !isActive("/admin/dashboard/settings")
                  ? "bg-localfind-50 text-localfind-700"
                  : "hover:bg-gray-100"
                  }`}
              >
                <BarChart2 className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/users"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive("/admin/dashboard/users")
                  ? "bg-localfind-50 text-localfind-700"
                  : "hover:bg-gray-100"
                  }`}
              >
                <Users className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Users</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/services"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive("/admin/dashboard/services")
                  ? "bg-localfind-50 text-localfind-700"
                  : "hover:bg-gray-100"
                  }`}
              >
                <ShoppingBag className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Services</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/notifications"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive("/admin/dashboard/notifications")
                  ? "bg-localfind-50 text-localfind-700"
                  : "hover:bg-gray-100"
                  }`}
              >
                <div className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </div>
                {sidebarOpen && (
                  <div className="flex items-center ml-3 w-full">
                    <span>Notifications</span>
                    <Badge variant="destructive" className="ml-auto text-xs h-5 min-w-[20px]">
                      3
                    </Badge>
                  </div>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/settings"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive("/admin/dashboard/settings")
                  ? "bg-localfind-50 text-localfind-700"
                  : "hover:bg-gray-100"
                  }`}
              >
                <Settings className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            className={`flex items-center w-full ${!sidebarOpen && "justify-center"} hover:bg-gray-100 hover:text-red-600`}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="block md:hidden mr-4" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
              <Collapsible className="md:hidden w-full">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 font-semibold">
                    <span>Admin Menu</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-sm">
                    <Link
                      to="/admin/dashboard"
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${isActive("/admin/dashboard") && !isActive("/admin/dashboard/users") && !isActive("/admin/dashboard/services") && !isActive("/admin/dashboard/notifications") && !isActive("/admin/dashboard/settings")
                        ? "bg-localfind-50 text-localfind-700"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <BarChart2 className="h-5 w-5 mr-3" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/admin/dashboard/users"
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${isActive("/admin/dashboard/users")
                        ? "bg-localfind-50 text-localfind-700"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <Users className="h-5 w-5 mr-3" />
                      <span>Users</span>
                    </Link>
                    <Link
                      to="/admin/dashboard/services"
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${isActive("/admin/dashboard/services")
                        ? "bg-localfind-50 text-localfind-700"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      <span>Services</span>
                    </Link>
                    <Link
                      to="/admin/dashboard/notifications"
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${isActive("/admin/dashboard/notifications")
                        ? "bg-localfind-50 text-localfind-700"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      <span>Notifications</span>
                      <Badge variant="destructive" className="ml-auto">3</Badge>
                    </Link>
                    <Link
                      to="/admin/dashboard/settings"
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${isActive("/admin/dashboard/settings")
                        ? "bg-localfind-50 text-localfind-700"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      <span>Settings</span>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Bell className="h-5 w-5 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-localfind-600 text-white">A</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;