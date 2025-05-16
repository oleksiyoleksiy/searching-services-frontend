import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReviewForm from './ReviewForm';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerId: string;
  providerName: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onOpenChange,
  providerId,
  providerName
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review for {providerName}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ReviewForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;