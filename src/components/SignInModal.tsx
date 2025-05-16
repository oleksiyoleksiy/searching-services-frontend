import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  open,
  onOpenChange
}) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onOpenChange(false);
    navigate('/auth/login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Sign in</DialogTitle>
          <DialogDescription>
            Please sign in to continue using all features.
          </DialogDescription>
        </DialogHeader>
{/* 
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </div> */}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSignIn}
            className="bg-localfind-600 hover:bg-localfind-700"
          >
            Sign in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;