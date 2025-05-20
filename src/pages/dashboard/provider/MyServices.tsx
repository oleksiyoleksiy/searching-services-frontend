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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import ServiceForm from '@/components/dashboard/ServiceForm';
import { Plus, Edit, Trash } from 'lucide-react';
import providerServiceService from '@/services/provider/providerServiceService';
import { ProviderService, Service, ServiceErrors } from '@/types';
import ServiceDeleteModal from '@/components/ServiceDeleteModal';



const MyServices = () => {
  const [services, setServices] = useState<ProviderService[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<ProviderService>();
  const [errors, setErrors] = useState<ServiceErrors>({});

  const handleCreateService = () => {
    setCurrentService(undefined);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: any) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleDeletePrompt = (service: any) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteService = async () => {
    const response = await providerServiceService.destroy(Number(currentService?.id))

    if (response) {
      setServices(prev => prev.filter(s => s.id !== currentService?.id));
      setIsDeleteDialogOpen(false);
    }
  };

  const fetchServices = async () => {
    const response = await providerServiceService.index();

    if (response) {
      setServices(response);
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleSaveService = async (serviceData: any) => {
    try {
      if (!currentService) {
        const response = await providerServiceService.store(serviceData)

        if (response) {
          setServices([response, ...services]);
        }
      } else {
        const response = await providerServiceService.update(Number(currentService.id), serviceData)

        if (response) {
          setServices(prev => prev.map(s => s.id === response.id ? response : s));
        }
      }
      setIsDialogOpen(false);
    } catch (e: any) {
      setErrors(e.response?.data?.errors);
    }
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
                <TableHead>Price</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.bookings}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell className="flex flex-wrap gap-2 justify-end">
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
            <DialogTitle>{!currentService ? 'Create New Service' : 'Edit Service'}</DialogTitle>
          </DialogHeader>
          <ServiceForm
            initialData={currentService}
            onSubmit={handleSaveService}
            onCancel={() => {
              setIsDialogOpen(false)
              setErrors({})
            }}
            initialErrors={errors}
          />
        </DialogContent>
      </Dialog>

      <ServiceDeleteModal
        selectedService={currentService}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onCancel={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteService} />
    </div>
  );
};

export default MyServices;