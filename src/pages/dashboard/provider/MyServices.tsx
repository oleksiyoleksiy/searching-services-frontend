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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import ServiceForm from '@/components/dashboard/ServiceForm';
import { Plus, Edit, Trash } from 'lucide-react';

// Mock data for services
const mockServices = [
  {
    id: '1',
    name: 'Home Cleaning',
    category: 'Cleaning',
    price: '$50/hr',
    bookings: 24,
    rating: 4.8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Lawn Mowing',
    category: 'Gardening',
    price: '$35/hr',
    bookings: 18,
    rating: 4.5,
    status: 'active',
  },
  {
    id: '3',
    name: 'Window Cleaning',
    category: 'Cleaning',
    price: '$40/hr',
    bookings: 12,
    rating: 4.2,
    status: 'inactive',
  },
];

const MyServices = () => {
  const [services, setServices] = useState(mockServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');

  const handleCreateService = () => {
    setDialogMode('create');
    setCurrentService(null);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: any) => {
    setDialogMode('edit');
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleDeletePrompt = (service: any) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteService = () => {
    setServices(services.filter(s => s.id !== currentService.id));
    setIsDeleteDialogOpen(false);
  };

  const handleSaveService = (serviceData: any) => {
    if (dialogMode === 'create') {
      const newService = {
        id: Date.now().toString(),
        ...serviceData,
        bookings: 0,
        rating: 0,
        status: 'active',
      };
      setServices([...services, newService]);
    } else {
      setServices(services.map(s => s.id === currentService.id ? { ...s, ...serviceData } : s));
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Services</h2>
        <Button onClick={handleCreateService} className="bg-localfind-600 hover:bg-localfind-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.bookings}</TableCell>
                  <TableCell>{service.rating > 0 ? service.rating : 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                      {service.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeletePrompt(service)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'create' ? 'Create New Service' : 'Edit Service'}</DialogTitle>
          </DialogHeader>
          <ServiceForm
            initialData={currentService}
            onSubmit={handleSaveService}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete "{currentService?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteService}>Delete Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyServices;