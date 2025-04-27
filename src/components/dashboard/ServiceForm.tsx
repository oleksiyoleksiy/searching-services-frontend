import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock categories for the form
const categories = [
  "Cleaning",
  "Gardening",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Personal Training",
  "Pet Care",
  "Beauty & Wellness",
  "IT & Technology",
];

interface ServiceFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ServiceForm = ({ initialData, onSubmit, onCancel }: ServiceFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    duration: initialData?.duration || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Service name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          placeholder="e.g. $50/hr"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Service Duration</Label>
        <Input
          id="duration"
          placeholder="e.g. 2 hours"
          value={formData.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Service Area</Label>
        <Input
          id="location"
          placeholder="e.g. Downtown, North Side"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-localfind-600 hover:bg-localfind-700">
          {initialData ? "Update Service" : "Create Service"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ServiceForm;