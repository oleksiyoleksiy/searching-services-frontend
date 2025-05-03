import { useState } from "react";
import { Bell, User, BookOpen, ShoppingBag, X, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock notifications
const allNotifications = [
  {
    id: 1,
    title: "New User Registration",
    message: "Emma Thompson has registered as a new user.",
    type: "user",
    read: false,
    time: "10 minutes ago"
  },
  {
    id: 2,
    title: "New Booking Request",
    message: "Michael Chen has booked Home Cleaning service.",
    type: "booking",
    read: false,
    time: "30 minutes ago"
  },
  {
    id: 3,
    title: "Service Provider Application",
    message: "Green Thumb has applied to become a service provider.",
    type: "provider",
    read: false,
    time: "1 hour ago"
  },
  {
    id: 4,
    title: "Booking Cancelled",
    message: "Sarah Johnson has cancelled Pet Grooming appointment.",
    type: "booking",
    read: true,
    time: "2 hours ago"
  },
  {
    id: 5,
    title: "New Review Submitted",
    message: "James Wilson left a 5-star review for Elegant Salon.",
    type: "review",
    read: true,
    time: "3 hours ago"
  },
  {
    id: 6,
    title: "Service Updated",
    message: "CleanPro Services updated Home Cleaning details.",
    type: "service",
    read: true,
    time: "5 hours ago"
  },
  {
    id: 7,
    title: "Payment Received",
    message: "Payment received for booking #12345.",
    type: "payment",
    read: true,
    time: "8 hours ago"
  },
  {
    id: 8,
    title: "System Update",
    message: "Platform will undergo maintenance on Sunday, 2am-4am.",
    type: "system",
    read: true,
    time: "1 day ago"
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const filteredNotifications = filter === "all"
    ? notifications
    : filter === "unread"
      ? notifications.filter(notification => !notification.read)
      : notifications.filter(notification => notification.type === filter);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-5 w-5" />;
      case "booking":
        return <BookOpen className="h-5 w-5" />;
      case "provider":
      case "service":
        return <ShoppingBag className="h-5 w-5" />;
      case "review":
        return <Bell className="h-5 w-5" />;
      case "payment":
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-600";
      case "booking":
        return "bg-purple-100 text-purple-600";
      case "provider":
      case "service":
        return "bg-green-100 text-green-600";
      case "review":
        return "bg-yellow-100 text-yellow-600";
      case "payment":
        return "bg-emerald-100 text-emerald-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4" /> Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>All Notifications</CardTitle>
            <Badge variant="outline">
              {unreadCount} unread
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              Unread
            </Button>
            <Button
              variant={filter === "user" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("user")}
            >
              Users
            </Button>
            <Button
              variant={filter === "booking" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("booking")}
            >
              Bookings
            </Button>
            <Button
              variant={filter === "service" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("service")}
            >
              Services
            </Button>
          </div>
        </CardHeader>
        <CardContent className="divide-y">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div key={notification.id} className={`py-4 ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-600'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {notification.time}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-gray-500">No notifications found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;