import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export interface ImageUploadProps {
  defaultImage?: string;
  onImageChange?: (file: File | null, imageUrl: string | null) => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  allowedTypes?: string[];
  maxSizeMB?: number;
  className?: string;
}

export const ImageUpload = ({
  defaultImage = "",
  onImageChange,
  title = "Upload Image",
  description = "Drag and drop an image, or click to browse",
  size = "md",
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  maxSizeMB = 5,
  className = "",
}: ImageUploadProps) => {
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const sizeClasses = {
    sm: "h-32 w-32",
    md: "h-40 w-40",
    lg: "h-60 w-60",
  };

  const containerSizeClass = sizeClasses[size] || sizeClasses.md;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    validateAndSetImage(file);
  };

  const validateAndSetImage = (file: File) => {
    setError(null);

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed types: ${allowedTypes.map(t => t.replace('image/', '')).join(', ')}`);
      toast({
        title: "Invalid file type",
        description: `Please upload ${allowedTypes.map(t => t.replace('image/', '')).join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > maxSizeBytes) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB`);
      toast({
        title: "File is too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }

    // Create URL for preview
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // Call the onImageChange callback with the file and the imageUrl
    if (onImageChange) {
      onImageChange(file, imageUrl);
    }

    toast({
      title: "Image uploaded",
      description: "Your image has been uploaded successfully",
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onImageChange) onImageChange(null, null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setImage(defaultImage)
  }, [defaultImage])

  return (
    <div className={`${className}`}>
      <input
        type="file"
        accept={allowedTypes.join(",")}
        onChange={handleImageChange}
        className="hidden"
        ref={fileInputRef}
      />

      {image ? (
        <div className="relative">
          <div className={`relative ${containerSizeClass} overflow-hidden rounded-lg`}>
            <img
              src={image}
              alt="Uploaded"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 rounded-full bg-gray-800/70 p-1 text-white hover:bg-gray-900/90 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <Button size="sm" variant="outline" onClick={handleButtonClick}>
              Change image
            </Button>
          </div>
        </div>
      ) : (
        <Card
          className={`${containerSizeClass} flex flex-col items-center justify-center border-2 border-dashed ${isDragging
            ? "border-localfind-600 bg-localfind-50"
            : "border-gray-300 hover:border-localfind-500 hover:bg-gray-50"
            } cursor-pointer rounded-lg transition-all duration-200 ease-in-out`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <Camera className="mb-2 h-8 w-8 text-gray-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">{title}</p>
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          </div>
        </Card>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;