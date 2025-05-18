import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Check, UserX2, X } from 'lucide-react';
import { BookingStatus, ProviderBooking } from '@/types';
import providerBookingService from '@/services/provider/providerBookingService';

interface Status {
  status: BookingStatus
  label: string
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

const ManageBookings = () => {
  const [bookings, setBookings] = useState<ProviderBooking[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(booking => booking.status.toLowerCase() === activeTab);

  const handleStatusChange = async (bookingId: number, newStatus: BookingStatus) => {
    const response = await providerBookingService.changeStatus(bookingId, newStatus)

    if (response) {
      setBookings(prev => prev.map(booking =>
        booking.id === bookingId ? response : booking
      ))
    }
  }

  const fetchBookings = async () => {
    const response = await providerBookingService.index()

    if (response) {
      setBookings(response)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const getStatusLabel = (status: BookingStatus) => {
    return statuses.find(s => s.status === status)?.label || "Unknown";
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Manage Bookings</h2>
        <p className="text-muted-foreground">View and manage all bookings for your services</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          {statuses.map(s => (
            <TabsTrigger key={s.status} value={s.status}>{s.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.service}</TableCell>
                        <TableCell>{booking.client}</TableCell>
                        <TableCell>{format(booking.date, 'PPP p')}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.status === 'pending' ? 'default' :
                                booking.status === 'upcoming' ? 'secondary' :
                                  booking.status === 'completed' ? 'success' : 'destructive'
                            }
                          >
                            {getStatusLabel(booking.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.price}</TableCell>
                        <TableCell className="text-right">
                          {booking.status === 'pending' && (
                            <div className="flex justify-end gap-2 flex-wrap">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-500 border-green-500 hover:bg-green-200"
                                onClick={() => handleStatusChange(booking.id, 'upcoming')}
                              >
                                <Check className="h-4 w-4 mr-1" /> Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-500 hover:bg-red-200"
                                onClick={() => handleStatusChange(booking.id, 'rejected')}
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            </div>
                          )}
                          {booking.status === 'upcoming' && (
                            <div className="flex justify-end gap-2 flex-wrap">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-500 border-green-500 hover:bg-green-200"
                                onClick={() => handleStatusChange(booking.id, 'completed')}
                              >
                                <Check className="h-4 w-4 mr-1" /> Completed
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-orange-500 border-orange-500 hover:bg-orange-200"
                                onClick={() => handleStatusChange(booking.id, 'no_show')}
                              >
                                <UserX2 className="h-4 w-4 mr-1" /> No show
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageBookings;