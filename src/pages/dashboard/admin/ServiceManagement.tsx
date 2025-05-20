import { useEffect, useState } from "react";
import {
  Search, Filter, Edit, Trash, PlusCircle,
  ShoppingBag, CheckCircle, XCircle, MoreHorizontal
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";
import { AdminService, AdminServiceData, PaginationData, Service, ServiceErrors } from "@/types";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Loader from "@/components/ui/loader";
import adminServiceService from "@/services/admin/adminServiceService";
import Pagination from "@/components/ui/pagination";
import ServiceDeleteModal from "@/components/ServiceDeleteModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ServiceForm from "@/components/dashboard/admin/ServiceForm";


const ServiceManagement = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [services, setServices] = useState<AdminService[]>([]);
  const [serviceStats, setServiceStats] = useState({
    total_services: {
      title: "Total Services", value: 0, icon: ShoppingBag, colorClass: "bg-blue-100 text-blue-600"
    }
  })
  const [selectedService, setSelectedService] = useState<AdminService>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [errors, setErrors] = useState<ServiceErrors>({})
  const [isLoading, setIsLoading] = useState(true)
  const [paginationData, setPaginationData] = useState<PaginationData>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const fetchServices = async () => {
    setIsLoading(true)

    const response = await adminServiceService.index(searchParams.toString())

    if (response) {
      setServices(response.data.services)
      setServiceStats(prev => ({ total_services: { ...prev.total_services, value: response.data.total_services } }))
      setPaginationData({ meta: response.meta, links: response.links })
    }

  }

  const handleServiceSave = async (formData: AdminServiceData) => {
    if (!selectedService) return

    try {

      const response = await adminServiceService.update(formData, selectedService.id)


      if (response) {
        setServices(response.data.services)
        setServiceStats(prev => ({ total_services: { ...prev.total_services, value: response.data.total_services } }))
        setPaginationData({ meta: response.meta, links: response.links })
        setIsDialogOpen(false)
      }
    } catch (e: any) {
      console.log(e);
      
      setErrors(e.response?.data?.errors)
    }
  }

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch });
    } else {
      setSearchParams({})
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchServices().finally(() => setIsLoading(false))
  }, [searchParams])

  const handleEditButtonClick = (service: AdminService) => {
    setSelectedService(service)
    setIsDialogOpen(true)
  }


  const handleDeleteButtonClick = async (service: AdminService) => {
    setSelectedService(service)
    setIsDeleteModalOpen(true)
  }
  const handleServiceDelete = async () => {
    if (!selectedService) return

    const response = await adminServiceService.destroy(selectedService?.id)

    if (response) {
      setServices(response.data.services)
      setServiceStats(prev => ({ total_services: { ...prev.total_services, value: response.data.total_services } }))
      setPaginationData({ meta: response.meta, links: response.links })
      setIsDeleteModalOpen(false)
    }
  }

  useEffect(() => {
    if (!isDialogOpen) {
      setErrors({})
      setSelectedService(undefined)
    }
  }, [isDialogOpen])


  if (isLoading) return <Loader />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Service Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {
          Object.values(serviceStats).map(({ title, value, icon: Icon, colorClass }) => (

            <Card key={title}>
              <CardContent className="flex items-center p-6">
                <div className={`p-3 rounded-full ${colorClass}`}>

                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{title}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Services</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search services..."
                className="pl-9"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{service.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{service.provider}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => handleEditButtonClick(service)} variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteButtonClick(service)} variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                          <Trash className="mr-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination paginationData={paginationData} />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{!selectedService ? 'Create New User' : 'Edit User'}</DialogTitle>
          </DialogHeader>
          <ServiceForm
            initialData={selectedService}
            onSubmit={handleServiceSave}
            onCancel={() => {
              setIsDialogOpen(false)
            }}
            initialErrors={errors}
          />
        </DialogContent>
      </Dialog>

      <ServiceDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        selectedService={selectedService}
        onCancel={() => setIsDeleteModalOpen(false)}
        onDelete={handleServiceDelete}
      />
    </div>
  );
};

export default ServiceManagement;