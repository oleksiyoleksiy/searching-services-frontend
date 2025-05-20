import ImageUpload from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AdminService, AdminServiceData, AdminUserData, AdminUserErrors, Service, ServiceErrors, User } from '@/types'
import { hasPermission } from '@/utils/permissions'
import { CheckIcon } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface ServiceFormProps {
  initialData?: AdminService
  onSubmit: (data: any) => void
  onCancel: () => void
  initialErrors?: ServiceErrors
}

function ServiceForm({ initialData, onSubmit, onCancel, initialErrors }: ServiceFormProps) {
  const [formData, setFormData] = useState<AdminServiceData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: String(initialData?.price) || '',
  });
  const [errors, setErrors] = useState<ServiceErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  }

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

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input required id="name" value={formData.name} onChange={handleInputChange} name="name" placeholder="123 user St, Service City" />
        {renderErrors(errors?.name)}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input required id="price" value={formData.price} onChange={handleInputChange} name="price" placeholder="88000" />
        {renderErrors(errors?.price)}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Write something about yourself."
          value={formData.description} onChange={handleInputChange}
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
}

export default ServiceForm