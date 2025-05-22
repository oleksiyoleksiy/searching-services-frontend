import ImageUpload from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AdminCategoryData, AdminCategoryErrors, AdminService, AdminServiceData, AdminUserData, AdminUserErrors, Service, ServiceErrors, User } from '@/types'
import { hasPermission } from '@/utils/permissions'
import { CheckIcon } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface CategoryFormProps {
  initialData?: AdminCategoryData
  onSubmit: (data: any) => void
  onCancel: () => void
  initialErrors?: AdminCategoryErrors
}

function CategoryForm({ initialData, onSubmit, onCancel, initialErrors }: CategoryFormProps) {
  const [formData, setFormData] = useState<AdminCategoryData>({
    name: initialData?.name || '',
  });
  const [errors, setErrors] = useState<AdminCategoryErrors>({});

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
        <Input required id="name" value={formData.name} onChange={handleInputChange} name="name" placeholder="Category name" />
        {renderErrors(errors?.name)}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-localfind-600 hover:bg-localfind-700">
          {initialData ? "Update Category" : "Create Category"}
        </Button>
      </DialogFooter>
    </form>

  );
}

export default CategoryForm