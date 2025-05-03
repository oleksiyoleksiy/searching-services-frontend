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

// Mock data for chart
const chartData = [
  { month: "Jan", users: 65, bookings: 78 },
  { month: "Feb", users: 59, bookings: 94 },
  { month: "Mar", users: 80, bookings: 119 },
  { month: "Apr", users: 81, bookings: 125 },
  { month: "May", users: 56, bookings: 95 },
  { month: "Jun", users: 55, bookings: 101 },
  { month: "Jul", users: 40, bookings: 85 },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "new_user",
    user: "Emma Thompson",
    email: "emma.t@example.com",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "booking",
    user: "Michael Chen",
    service: "Home Cleaning",
    provider: "CleanPro Services",
    status: "confirmed",
    time: "3 hours ago"
  },
  {
    id: 3,
    type: "new_service",
    service: "Garden Maintenance",
    provider: "Green Thumb",
    time: "5 hours ago"
  },
  {
    id: 4,
    type: "booking",
    user: "Sarah Johnson",
    service: "Pet Grooming",
    provider: "Paws & Claws",
    status: "pending",
    time: "6 hours ago"
  },
  {
    id: 5,
    type: "new_user",
    user: "James Wilson",
    email: "j.wilson@example.com",
    time: "8 hours ago"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Users & bookings for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "#3b82f6",
                  },
                  bookings: {
                    label: "Bookings",
                    color: "#8b5cf6",
                  },
                }}
              >
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bookings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card> */}

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`mt-1 rounded-full p-2 ${activity.type === 'new_user' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'booking' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                    }`}>
                    {activity.type === 'new_user' ? (
                      <UserPlus size={16} />
                    ) : activity.type === 'booking' ? (
                      <Calendar size={16} />
                    ) : (
                      <ShoppingBag size={16} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{
                        activity.type === 'new_user' ? activity.user :
                          activity.type === 'booking' ? activity.user :
                            activity.provider
                      }</p>
                      {activity.type === 'booking' && (
                        <Badge variant={activity.status === 'confirmed' ? 'default' : 'outline'}>
                          {activity.status}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {activity.type === 'new_user'
                        ? 'New user registered'
                        : activity.type === 'booking'
                          ? `Booked ${activity.service}`
                          : `Added new service: ${activity.service}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <a href="#" className="text-localfind-600 text-sm hover:underline">
                  View all activity
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;