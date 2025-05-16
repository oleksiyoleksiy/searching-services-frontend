import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    if (review.trim() === '') {
      toast.error("Please enter your review");
      return;
    }

    // This would normally send the review to a backend API
    toast.success("Your review has been submitted!");

    // Reset form
    setRating(0);
    setReview('');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium mb-3">Share your experience</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center">
            <div className="mr-2">Your rating:</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => handleStarHover(0)}
                >
                  <Star
                    className={`w-6 h-6 ${star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Textarea
            placeholder="Write your review here... What did you like or dislike about this service?"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-localfind-600 hover:bg-localfind-700">
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;