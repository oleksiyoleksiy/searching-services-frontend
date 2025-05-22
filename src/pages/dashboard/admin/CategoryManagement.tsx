import { useEffect, useState } from "react";
import {
  Search, Filter, Edit, Trash, PlusCircle,
  ShoppingBag, CheckCircle, XCircle, MoreHorizontal,
  MessageSquare,
  LayoutGrid
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
import { AdminCategoryResponse, AdminReview, AdminService, AdminServiceData, Category, Pagination as PaginationType, PaginationData, Review, Service, ServiceErrors, AdminCategoryData, AdminCategoryErrors } from "@/types";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Loader from "@/components/ui/loader";
import adminServiceService from "@/services/admin/adminServiceService";
import Pagination from "@/components/ui/pagination";
import ServiceDeleteModal from "@/components/ServiceDeleteModal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ServiceForm from "@/components/dashboard/admin/ServiceForm";
import adminReviewService from "@/services/admin/adminReviewService";
import adminCategoryService from "@/services/admin/adminCategoryService";
import CategoryForm from "@/components/dashboard/admin/CategoryForm";


const CategoryManagement = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryStats, setCategoryStats] = useState({
    total_categories: {
      title: "Total categories", value: 0, icon: LayoutGrid, colorClass: "bg-green-100 text-green-600"
    }
  })
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [paginationData, setPaginationData] = useState<PaginationData>()
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<AdminCategoryErrors>({})

  const fetchCategories = async () => {
    setIsLoading(true)

    const response = await adminCategoryService.index(searchParams.toString())

    if (response) {
      updateData(response)
    }

  }

  useEffect(() => {
    fetchCategories().finally(() => setIsLoading(false))
  }, [searchParams])

  const handleAddButtonClick = () => {
    setIsFormModalOpen(true)
  }

  const handleEditButtonClick = (category: Category) => {
    setSelectedCategory(category)
    setIsFormModalOpen(true)
  }

  const handleDeleteButtonClick = async (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }
  const handleCategoryDelete = async () => {
    if (!selectedCategory) return

    const response = await adminCategoryService.destroy(selectedCategory?.id)

    if (response) {
      updateData(response)
      setIsDeleteModalOpen(false)
    }
  }

  const updateData = (data: PaginationType<AdminCategoryResponse>) => {
    setCategories(data.data.categories)
    setCategoryStats(prev => ({ total_categories: { ...prev.total_categories, value: data.data.total_categories } }))
    setPaginationData({ meta: data.meta, links: data.links })
  }

  useEffect(() => {
    if (!isDeleteModalOpen) {
      setSelectedCategory(undefined)
    }
  }, [isDeleteModalOpen])

  useEffect(() => {
    if (!isFormModalOpen) {
      setSelectedCategory(undefined)
    }
  }, [isFormModalOpen])

  const handleCategorySave = async (formData: AdminCategoryData) => {
    try {
      let response

      if (!selectedCategory) {
        response = await adminCategoryService.store(formData)
      } else {
        response = await adminCategoryService.update(formData, selectedCategory.id)
      }


      if (response) {
        updateData(response)
        setIsFormModalOpen(false)
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

  if (isLoading) return <Loader />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Service Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {
          Object.values(categoryStats).map(({ title, value, icon: Icon, colorClass }) => (

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
          <CardTitle>Categories</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleAddButtonClick}>Add Category</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Providers</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => (
                  <TableRow key={category.name}>
                    <TableCell>
                      {category.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{category.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {category.providers_count}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => handleEditButtonClick(category)} variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteButtonClick(category)} variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
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

      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{!selectedCategory ? 'Create New Category' : 'Edit Category'}</DialogTitle>
          </DialogHeader>
          <CategoryForm
            initialData={selectedCategory}
            onSubmit={handleCategorySave}
            onCancel={() => {
              setIsFormModalOpen(false)
            }}
            initialErrors={errors}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleCategoryDelete}>Delete category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;