import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { format } from 'date-fns';
import providerReviewService from '@/services/provider/providerReviewService';
import { Review } from '@/types';
import { useEffect, useState } from 'react';



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

const ProviderReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    const response = await providerReviewService.index()

    if (response) {
      setReviews(response)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        <p className="text-muted-foreground">See what your customers are saying about your services</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                {/* <TableHead>Service</TableHead> */}
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                {/* <TableHead>Your Reply</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map(review => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <img src={review.user.avatar} alt={review.user.name} />
                      </Avatar>
                      <span>{review.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate">{review.content}</p>
                  </TableCell>
                  <TableCell>{review.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderReviews;