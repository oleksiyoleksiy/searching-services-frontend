import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import reviewService from '@/services/reviewService';
import { ca } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { providerActions } from '@/store/providerSlice';

interface Errors {
  rating?: string[]
  content?: string[]
}

interface Props {
  onOpenChange: (open: boolean) => void;
}

const ReviewForm = ({ onOpenChange }: Props) => {
  const [formData, setFormData] = useState({
    rating: 0,
    content: ''
  })
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const { provider } = useSelector((state: RootState) => state.provider)
  const dispatch = useDispatch()

  const handleStarClick = (selectedRating: number) => {
    setFormData(prev => ({ ...prev, rating: selectedRating }));
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    if (formData.content.trim() === '') {
      toast.error("Please enter your review");
      return;
    }

    try {
      const response = await reviewService.store(Number(provider?.id), formData)

      if (response) {
        dispatch(providerActions.setProvider(response))

        toast.success("Your review has been submitted!");

        setFormData({
          rating: 0,
          content: ''
        })

        onOpenChange(false);
      }
    } catch (e: any) {
      setErrors(e.response?.data?.errors);
    }
  };

  const renderErrors = (errors?: string[]) => {
    return errors && <div className="flex flex-col gap-1">
      {errors.map(error => (
        <div key={error} className="text-red-500 text-sm">
          {error}
        </div>
      ))}
    </div>
  }

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
                    className={`w-6 h-6 ${star <= (hoveredRating || formData.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                      }`}
                  />
                </button>
              ))}
            </div>
            {renderErrors(errors?.rating)}
          </div>
        </div>

        <div className="mb-4">
          <Textarea
            placeholder="Write your review here... What did you like or dislike about this service?"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="min-h-[120px]"
          />
          {renderErrors(errors?.content)}
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