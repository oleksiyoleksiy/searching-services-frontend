import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Package, MessageSquare, Bell, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Mock user data
  const { user } = useSelector((s: RootState) => s.auth)
  const navigate = useNavigate()

  // Mock statistics
  const stats = [
    { title: "New Requests", value: "8", change: "+2", icon: Bell },
    { title: "Active Bookings", value: "12", change: "+3", icon: Calendar },
    { title: "Completed", value: "156", change: "+12", icon: Package },
    { title: "Client Messages", value: "24", change: "+7", icon: MessageSquare },
  ];

  // Mock recent activity
  const recentActivity = [
    {
      id: "1",
      type: "New Booking",
      clientName: "Sarah Davis",
      service: "Home Cleaning",
      date: "Today, 10:30 AM",
    },
    {
      id: "2",
      type: "Completed",
      clientName: "Robert Johnson",
      service: "Lawn Mowing",
      date: "Yesterday, 2:15 PM",
    },
    {
      id: "3",
      type: "Message",
      clientName: "Emma Wilson",
      service: "Window Cleaning",
      date: "Yesterday, 11:20 AM",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your services today</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-md bg-gradient-to-br from-card to-secondary/10">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-emerald-500 mt-1">{stat.change} this week</p>
              </div>
              <div className="bg-localfind-50 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-localfind-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Profile Information */}
        <Card className="md:col-span-2 overflow-hidden">
          <CardHeader className="bg-localfind-50 border-b pb-3">
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-2 border-4 border-localfind-100">
                <img className='object-center object-cover w-full h-full' src={user?.avatar} alt="Profile" />
              </Avatar>
              <h3 className="font-semibold text-lg">{user?.name}</h3>
              <div className="flex flex-wrap gap-1">
                {user?.company?.categories.map((c) => <Badge key={c.name} variant="outline" className="mt-1 bg-localfind-50">
                  {c.name}
                </Badge>)}
              </div>

            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <User className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div className='w-full'>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground w-full truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-muted-foreground">{user?.created_at}</p>
                </div>
              </div>
              <div className="pt-3">
                <Button onClick={() => navigate('/provider/dashboard/settings')} className="w-full bg-localfind-600 hover:bg-localfind-700" size="sm">
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;