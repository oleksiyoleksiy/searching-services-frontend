import {
  BarChart2, Users, Calendar, ShoppingBag,
  ArrowUp, ArrowDown, DollarSign, UserPlus
} from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for statistics
const stats = [
  {
    title: "Total Users",
    value: 2834,
    change: 12.5,
    trend: "up",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    title: "Active Services",
    value: 487,
    change: 8.2,
    trend: "up",
    icon: ShoppingBag,
    color: "bg-green-500"
  },
  {
    title: "Total Bookings",
    value: 1453,
    change: -3.4,
    trend: "down",
    icon: Calendar,
    color: "bg-purple-500"
  },
  {
    title: "Revenue",
    value: "$21,345",
    change: 14.6,
    trend: "up",
    icon: DollarSign,
    color: "bg-amber-500"
  }
];


const AdminHome = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, Admin</h1>
        <p className="text-gray-500">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`h-12 w-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="text-sm font-medium">{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;