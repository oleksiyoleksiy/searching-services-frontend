import {
  BarChart2, Users, Calendar, ShoppingBag,
  ArrowUp, ArrowDown, DollarSign, UserPlus
} from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import adminStatsService from "@/services/admin/adminStatsService";


const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total_users:
    {
      title: "Total Users",
      value: 0,
      change: 12.5,
      trend: "up",
      icon: Users,
      color: "bg-blue-500"
    },
    total_services:
    {
      title: "Active Services",
      value: 0,
      change: 8.2,
      trend: "up",
      icon: ShoppingBag,
      color: "bg-green-500"
    },
    total_bookings:
    {
      title: "Total Bookings",
      value: 0,
      change: -3.4,
      trend: "down",
      icon: Calendar,
      color: "bg-purple-500"
    },
    revenue:
    {
      title: "Revenue",
      value: '0',
      change: 14.6,
      trend: "up",
      icon: DollarSign,
      color: "bg-amber-500"
    }
  })

  const fetchStats = async () => {
    const response = await adminStatsService.index()
    
    if (response) {
      setStats(prev => ({
        total_users: { ...prev.total_users, value: response.total_users },
        total_bookings: { ...prev.total_bookings, value: response.total_bookings },
        total_services: { ...prev.total_services, value: response.total_services },
        revenue: { ...prev.revenue, value: `${response.revenue} ₴` }
      }))
    }
  }

  useEffect(() => {
    fetchStats().finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, Admin</h1>
        <p className="text-gray-500">Here's what's happening with your platform today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          Object.values(stats).map(({ title, value, icon: Icon, color }) => (
            <Card key={title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-full ${color} flex items-center justify-center text-white`}>
                    <Icon size={24} />
                  </div>
                  {/* <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="text-sm font-medium">{Math.abs(stat.change)}%</span>
                </div> */}
                </div>
                <div className="mt-4">
                  <p className="text-gray-500 text-sm">{title}</p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AdminHome;