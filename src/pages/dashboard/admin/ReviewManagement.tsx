import { useEffect, useState } from "react";
import {
  Search, Filter, Edit, Trash, PlusCircle,
  ShoppingBag, CheckCircle, XCircle, MoreHorizontal,
  MessageSquare
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
import { AdminReview, AdminService, AdminServiceData, PaginationData, Review, Service, ServiceErrors } from "@/types";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Loader from "@/components/ui/loader";
import adminServiceService from "@/services/admin/adminServiceService";
import Pagination from "@/components/ui/pagination";
import ServiceDeleteModal from "@/components/ServiceDeleteModal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ServiceForm from "@/components/dashboard/admin/ServiceForm";
import adminReviewService from "@/services/admin/adminReviewService";


const ReviewManagement = () => {
  // const [search, setSearch] = useState('');
  // const [debouncedSearch] = useDebounce(search, 500);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [reviewsStats, setReviewsStats] = useState({
    total_reviews: {
      title: "Total reviews", value: 0, icon: MessageSquare, colorClass: "bg-blue-100 text-blue-600"
    }
  })
  const [selectedReview, setSelectedReview] = useState<AdminReview>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [paginationData, setPaginationData] = useState<PaginationData>()
  // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearch(value);
  // };

  const fetchServices = async () => {
    setIsLoading(true)

    const response = await adminReviewService.index(searchParams.toString())

    if (response) {
      setReviews(response.data.reviews)
      setReviewsStats(prev => ({ total_reviews: { ...prev.total_reviews, value: response.data.total_reviews } }))
      setPaginationData({ meta: response.meta, links: response.links })
    }

  }

  useEffect(() => {
    fetchServices().finally(() => setIsLoading(false))
  }, [])

  const handleDeleteButtonClick = async (review: AdminReview) => {
    setSelectedReview(review)
    setIsDeleteModalOpen(true)
  }
  const handleReviewDelete = async () => {
    if (!selectedReview) return

    const response = await adminReviewService.destroy(selectedReview?.id)

    if (response) {
      setReviews(response.data.reviews)
      setReviewsStats(prev => ({ total_reviews: { ...prev.total_reviews, value: response.data.total_reviews } }))
      setPaginationData({ meta: response.meta, links: response.links })
      setIsDeleteModalOpen(false)
    }
  }

  useEffect(() => {
    if (!isDeleteModalOpen) {
      setSelectedReview(undefined)
    }
  }, [isDeleteModalOpen])


  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
      </svg>
    ));
  };

  if (isLoading) return <Loader />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Service Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {
          Object.values(reviewsStats).map(({ title, value, icon: Icon, colorClass }) => (

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
          <CardTitle>Reviews</CardTitle>
          {/* <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search services..."
                className="pl-9"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div> */}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map(review => (
                  <TableRow key={review.content}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{review.user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {review.company}
                    </TableCell>
                    <TableCell className="flex">{renderStars(review.rating)}</TableCell>
                    <TableCell>{review.content}</TableCell>
                    <TableCell>{review.created_at}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => handleDeleteButtonClick(review)} variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                          <Trash className="h-4 w-4" />
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


      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this review? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReviewDelete}>Delete review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewManagement;