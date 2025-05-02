import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock user data
const user = {
  name: "Jane Smith",
  email: "user@example.com",
  registrationDate: "May 15, 2024",
  avatar: "/placeholder.svg"
};

// Mock upcoming bookings data
const upcomingBookings = [
  {
    id: "1",
    serviceName: "Home Cleaning",
    providerName: "CleanPro Services",
    date: "June 10, 2025",
    time: "10:00 AM",
    status: "upcoming"
  },
  {
    id: "2",
    serviceName: "Plumbing Repair",
    providerName: "Quick Fix Plumbing",
    date: "June 15, 2025",
    time: "2:00 PM",
    status: "upcoming"
  }
];

// Mock suggested services
const suggestedServices = [
  {
    id: "1",
    name: "Gardening Services",
    provider: "Green Thumb",
    image: "/placeholder.svg",
    rating: 4.8,
    price: "$45/hour"
  },
  {
    id: "2",
    name: "Electrical Repair",
    provider: "Power Solutions",
    image: "/placeholder.svg",
    rating: 4.6,
    price: "$60/hour"
  },
  {
    id: "3",
    name: "House Painting",
    provider: "Color Masters",
    image: "/placeholder.svg",
    rating: 4.9,
    price: "$40/hour"
  }
];

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h2>
            <p className="text-gray-600 mt-1">Here's an overview of your services and bookings.</p>
          </div>
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Profile Information */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">{user.registrationDate}</p>
          </div>
        </div>
      </section>

      {/* Upcoming Bookings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h3>
          <Button variant="ghost" onClick={() => navigate("/user/dashboard/bookings")} className="text-sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingBookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader className="pb-2">
                <CardTitle>{booking.serviceName}</CardTitle>
                <CardDescription>{booking.providerName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-localfind-600" />
                  <span>{booking.date} at {booking.time}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Suggested Services */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Suggested For You</h3>
          <Button variant="ghost" onClick={() => navigate("/search")} className="text-sm">
            Browse All Services
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <div className="h-40 bg-gray-200">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.provider}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{service.rating}</span>
                  </div>
                  <span className="font-medium">{service.price}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserHome;