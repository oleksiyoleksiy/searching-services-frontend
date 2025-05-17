import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import bookingService from "@/services/bookingService";
import { useEffect, useState } from "react";
import { Booking } from "@/types";


const UserHome = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s: RootState) => s.auth)
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([])

  const fetchBookings = async () => {
    const response = await bookingService.index('limit=2&status=upcoming')

    if (response) {
      setUpcomingBookings(response)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h2>
            <p className="text-gray-600 mt-1">Here's an overview of your services and bookings.</p>
          </div>
          <Avatar className="h-14 w-14">
            <AvatarImage className="object-cover object-center" src={user?.avatar} alt={user?.name} />
          </Avatar>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">{user?.created_at}</p>
          </div>
        </div>
      </section>

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
                <CardTitle>{booking.service}</CardTitle>
                <CardDescription>{booking.provider}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-localfind-600" />
                  <span>{booking.date} at {booking.start_time}</span>
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
    </div>
  );
};

export default UserHome;