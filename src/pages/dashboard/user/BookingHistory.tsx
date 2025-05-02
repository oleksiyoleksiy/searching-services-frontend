import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock } from "lucide-react";

const bookings = [
  {
    id: "1",
    serviceName: "Home Cleaning",
    providerName: "CleanPro Services",
    date: "June 10, 2025",
    time: "10:00 AM",
    status: "upcoming",
    price: "$120"
  },
  {
    id: "2",
    serviceName: "Plumbing Repair",
    providerName: "Quick Fix Plumbing",
    date: "June 15, 2025",
    time: "2:00 PM",
    status: "upcoming",
    price: "$85"
  },
  {
    id: "3",
    serviceName: "Lawn Mowing",
    providerName: "Green Gardens",
    date: "May 28, 2025",
    time: "9:00 AM",
    status: "completed",
    price: "$60"
  },
  {
    id: "4",
    serviceName: "Electrical Inspection",
    providerName: "Safe Power",
    date: "May 5, 2025",
    time: "11:00 AM",
    status: "completed",
    price: "$95"
  },
  {
    id: "5",
    serviceName: "Roof Repair",
    providerName: "Top Roofing",
    date: "April 20, 2025",
    time: "3:00 PM",
    status: "canceled",
    price: "$250"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "canceled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BookingHistory = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredBookings = activeFilter === "all"
    ? bookings
    : bookings.filter(booking => booking.status === activeFilter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <p className="text-gray-600">View and manage all your service bookings</p>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.serviceName}</TableCell>
                        <TableCell>{booking.providerName}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-localfind-600" />
                          {booking.date}
                          <Clock className="h-4 w-4 text-localfind-600 ml-2" />
                          {booking.time}
                        </TableCell>
                        <TableCell>{booking.price}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            {booking.status === "upcoming" && (
                              <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Cancel</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingHistory;