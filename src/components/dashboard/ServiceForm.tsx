import { ChangeEvent, useEffect, useState } from "react";
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
import { ServiceErrors } from "@/types";


interface ServiceFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
  initialErrors?: ServiceErrors
}

const ServiceForm = ({ initialData, onSubmit, onCancel, initialErrors }: ServiceFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
  });

  const [errors, setErrors] = useState<ServiceErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (initialErrors) {
      setErrors(initialErrors)
    }
  }, [initialErrors])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
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
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Service Name</Label>
        <Input
          required
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {renderErrors(errors?.name)}
      </div>

      {/* <div className="space-y-2">
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
      </div> */}

      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          required
          id="price"
          name="price"
          placeholder="e.g. $50/hr"
          value={formData.price}
          onChange={handleChange}
        />
        {renderErrors(errors?.price)}
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="duration">Service Duration</Label>
        <Input
          id="duration"
          placeholder="e.g. 2 hours"
          value={formData.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
      </div> */}

      {/* <div className="space-y-2">
        <Label htmlFor="location">Service Area</Label>
        <Input
          id="location"
          placeholder="e.g. Downtown, North Side"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div> */}

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          required
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
        {renderErrors(errors?.description)}
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