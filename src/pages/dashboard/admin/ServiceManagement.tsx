import { useState } from "react";
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

// Mock service data
const services = [
  {
    id: 1,
    name: "Home Cleaning",
    provider: "CleanPro Services",
    category: "Cleaning",
    price: "$120",
    status: "Active",
    featured: true,
    createdAt: "2023-02-10"
  },
  {
    id: 2,
    name: "Lawn Maintenance",
    provider: "Green Gardens",
    category: "Gardening",
    price: "$60",
    status: "Active",
    featured: false,
    createdAt: "2023-03-15"
  },
  {
    id: 3,
    name: "Hair Styling",
    provider: "Elegant Salon",
    category: "Beauty",
    price: "$85",
    status: "Active",
    featured: true,
    createdAt: "2023-04-02"
  },
  {
    id: 4,
    name: "Computer Repair",
    provider: "Tech Solutions",
    category: "Tech",
    price: "$75",
    status: "Inactive",
    featured: false,
    createdAt: "2023-03-20"
  },
  {
    id: 5,
    name: "Dog Walking",
    provider: "Pet Care Plus",
    category: "Pet Care",
    price: "$40",
    status: "Active",
    featured: false,
    createdAt: "2023-05-11"
  },
  {
    id: 6,
    name: "Personal Training",
    provider: "Fitness First",
    category: "Fitness",
    price: "$50",
    status: "Active",
    featured: true,
    createdAt: "2023-05-22"
  },
];

// Service statistics
const serviceStats = [
  { title: "Total Services", value: 487, icon: ShoppingBag, colorClass: "bg-blue-100 text-blue-600" },
  { title: "Active Services", value: 412, icon: CheckCircle, colorClass: "bg-green-100 text-green-600" },
  { title: "Inactive Services", value: 75, icon: XCircle, colorClass: "bg-red-100 text-red-600" }
];

const ServiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      setFilteredServices(
        services.filter(service =>
          service.name.toLowerCase().includes(value.toLowerCase()) ||
          service.provider.toLowerCase().includes(value.toLowerCase()) ||
          service.category.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredServices(services);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Service Management</h1>

      {/* Service stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {serviceStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className={`p-3 rounded-full ${stat.colorClass}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
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
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add Service
              </Button>
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
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        {service.featured && (
                          <Badge className="mt-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{service.provider}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={service.status === "Active" ? "default" : "secondary"}
                        className="font-normal"
                      >
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-1" align="end">
                            <div className="flex flex-col">
                              <Button variant="ghost" className="justify-start">
                                {service.status === "Active" ? (
                                  <>
                                    <XCircle className="mr-2 h-4 w-4" /> Deactivate
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Activate
                                  </>
                                )}
                              </Button>
                              {!service.featured && (
                                <Button variant="ghost" className="justify-start">
                                  <PlusCircle className="mr-2 h-4 w-4" /> Feature
                                </Button>
                              )}
                              <Button variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing <strong>{filteredServices.length}</strong> of <strong>{services.length}</strong> services
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceManagement;