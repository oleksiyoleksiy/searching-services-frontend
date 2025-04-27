import { useState } from 'react';
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
import { Check, X } from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: '1',
    serviceName: 'Home Cleaning',
    clientName: 'John Smith',
    date: new Date(2025, 4, 30, 14, 0),
    address: '123 Main St, Anytown',
    status: 'New',
    price: '$50.00',
  },
  {
    id: '2',
    serviceName: 'Lawn Mowing',
    clientName: 'Alice Johnson',
    date: new Date(2025, 5, 2, 10, 0),
    address: '456 Oak Ave, Somewhere',
    status: 'In Progress',
    price: '$35.00',
  },
  {
    id: '3',
    serviceName: 'Home Cleaning',
    clientName: 'Bob Williams',
    date: new Date(2025, 4, 25, 9, 0),
    address: '789 Elm St, Nowhere',
    status: 'Completed',
    price: '$50.00',
  },
  {
    id: '4',
    serviceName: 'Window Cleaning',
    clientName: 'Sarah Davis',
    date: new Date(2025, 4, 22, 13, 0),
    address: '101 Pine Rd, Elsewhere',
    status: 'Rejected',
    price: '$40.00',
  },
];

type BookingStatus = 'New' | 'In Progress' | 'Completed' | 'Rejected';

const ManageBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(booking => booking.status.toLowerCase() === activeTab);

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Manage Bookings</h2>
        <p className="text-muted-foreground">View and manage all bookings for your services</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
                    <TableHead>Address</TableHead>
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
                        <TableCell className="font-medium">{booking.serviceName}</TableCell>
                        <TableCell>{booking.clientName}</TableCell>
                        <TableCell>{format(booking.date, 'PPP p')}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{booking.address}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.status === 'New' ? 'default' :
                                booking.status === 'In Progress' ? 'secondary' :
                                  booking.status === 'Completed' ? 'success' : 'destructive'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.price}</TableCell>
                        <TableCell className="text-right">
                          {booking.status === 'New' && (
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-500 border-green-500 hover:bg-green-50"
                                onClick={() => handleStatusChange(booking.id, 'In Progress')}
                              >
                                <Check className="h-4 w-4 mr-1" /> Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-500 hover:bg-red-50"
                                onClick={() => handleStatusChange(booking.id, 'Rejected')}
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            </div>
                          )}
                          {booking.status === 'In Progress' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500 border-green-500 hover:bg-green-50"
                              onClick={() => handleStatusChange(booking.id, 'Completed')}
                            >
                              <Check className="h-4 w-4 mr-1" /> Mark Completed
                            </Button>
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