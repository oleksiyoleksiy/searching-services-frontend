import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock } from "lucide-react";
import { Booking, BookingStatus } from "@/types";
import bookingService from "@/services/bookingService";

interface Status {
  status: BookingStatus;
  label: string;
}

const statuses: Status[] = [
  {
    status: "pending",
    label: "Pending"
  },
  {
    status: "cancelled",
    label: "Cancelled"
  },
  {
    status: "upcoming",
    label: "Upcoming"
  },
  {
    status: "rejected",
    label: "Rejected"
  },
  {
    status: "no_show",
    label: "No Show"
  },
  {
    status: "completed",
    label: "Completed"
  }
];

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BookingHistory = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookings, setBookings] = useState<Booking[]>([]);

  const filteredBookings = activeFilter === "all"
    ? bookings
    : bookings.filter(booking => booking.status === activeFilter);

  const fetchBookings = async () => {
    const response = await bookingService.index()

    if (response) {
      setBookings(response)
    }
  }

  const getStatusLabel = (status: BookingStatus) => {
    return statuses.find(s => s.status === status)?.label || "Unknown";
  }

  const handleCancelButtonClick = async (id: number) => {
    const response = await bookingService.cancel(id)

    if (response) {
      setBookings(prev => prev.map(booking => booking.id === id ? { ...booking, status: "cancelled" } : booking))
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <p className="text-gray-600">View and manage all your service bookings</p>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          {statuses.map(status => (
            <TabsTrigger value={status.status} key={status.status}>{status.label}</TabsTrigger>
          ))}
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
                        <TableCell className="font-medium">{booking.service}</TableCell>
                        <TableCell>{booking.provider}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-localfind-600" />
                          {booking.date}
                          <Clock className="h-4 w-4 text-localfind-600 ml-2" />
                          {booking.start_time}
                        </TableCell>
                        <TableCell>{booking.price}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {booking.status === "upcoming" && (
                              <Button onClick={() => handleCancelButtonClick(booking.id)} variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-200">Cancel</Button>
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