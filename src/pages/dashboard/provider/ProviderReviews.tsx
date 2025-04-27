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

// Mock data for reviews
const mockReviews = [
  {
    id: '1',
    serviceName: 'Home Cleaning',
    clientName: 'John Smith',
    clientAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment: 'Excellent service! My house has never been cleaner. Will definitely use again.',
    date: new Date(2025, 4, 20),
    reply: null,
  },
  {
    id: '2',
    serviceName: 'Lawn Mowing',
    clientName: 'Alice Johnson',
    clientAvatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    comment: 'Good job on the lawn. Just missed a few spots near the fence.',
    date: new Date(2025, 4, 15),
    reply: 'Thank you for your feedback! We will make sure to pay more attention to the fence area next time.',
  },
  {
    id: '3',
    serviceName: 'Window Cleaning',
    clientName: 'Bob Williams',
    clientAvatar: 'https://i.pravatar.cc/150?img=3',
    rating: 3,
    comment: 'Service was okay but could improve on timeliness.',
    date: new Date(2025, 4, 10),
    reply: null,
  },
  {
    id: '4',
    serviceName: 'Home Cleaning',
    clientName: 'Sarah Davis',
    clientAvatar: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    comment: 'Amazing attention to detail! Everything sparkles.',
    date: new Date(2025, 4, 5),
    reply: 'Thank you for your kind words! We strive for excellence.',
  },
];

// Service ratings summary
const ratingsSummary = {
  'Home Cleaning': {
    averageRating: 5,
    totalReviews: 8,
    ratings: {
      5: 7,
      4: 1,
      3: 0,
      2: 0,
      1: 0,
    },
  },
  'Lawn Mowing': {
    averageRating: 4,
    totalReviews: 10,
    ratings: {
      5: 5,
      4: 3,
      3: 2,
      2: 0,
      1: 0,
    },
  },
  'Window Cleaning': {
    averageRating: 3.5,
    totalReviews: 6,
    ratings: {
      5: 1,
      4: 2,
      3: 2,
      2: 1,
      1: 0,
    },
  },
};

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        <p className="text-muted-foreground">See what your customers are saying about your services</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(ratingsSummary).map(([serviceName, data]) => (
          <Card key={serviceName}>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">{serviceName}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {renderStars(data.averageRating)}
                </div>
                <span className="text-sm font-medium">{data.averageRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({data.totalReviews} reviews)</span>
              </div>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs">{star} star</span>
                    <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${(data.ratings[star as keyof typeof data.ratings] / data.totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs">{data.ratings[star as keyof typeof data.ratings]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Your Reply</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReviews.map(review => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <img src={review.clientAvatar} alt={review.clientName} />
                      </Avatar>
                      <span>{review.clientName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{review.serviceName}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate">{review.comment}</p>
                  </TableCell>
                  <TableCell>{format(review.date, 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    {review.reply ? (
                      <p className="text-sm text-gray-600 max-w-[200px] truncate">{review.reply}</p>
                    ) : (
                      <span className="text-sm text-blue-500 cursor-pointer hover:underline">
                        Reply to review
                      </span>
                    )}
                  </TableCell>
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