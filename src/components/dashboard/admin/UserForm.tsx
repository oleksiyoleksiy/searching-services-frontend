import ImageUpload from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AdminUserData, AdminUserErrors, User } from '@/types'
import { hasPermission } from '@/utils/permissions'
import { CheckIcon } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface ServiceFormProps {
  initialData?: User
  onSubmit: (data: any) => void
  onCancel: () => void
  initialErrors?: AdminUserErrors
  mode: 'create' | 'edit'
}

function UserForm({ initialData, onSubmit, onCancel, initialErrors, mode }: ServiceFormProps) {
  const [formData, setFormData] = useState<AdminUserData>({
    name: initialData?.name || "",
    email: initialData?.email || '',
    roles: initialData?.roles.map(r => r.id) || [],
    phone_number: initialData?.phone_number || '',
    address: initialData?.address || '',
    bio: initialData?.bio || '',
    postal_code: initialData?.postal_code || '',
    password: '',
    password_confirmation: '',
    avatar: null,
    avatar_remove: 0,
    is_admin: initialData && hasPermission('admin', initialData) ? 1 : 0
  });
  const [avatar, setAvatar] = useState<string | undefined>(initialData?.is_have_avatar ? initialData?.avatar : undefined)
  const [errors, setErrors] = useState<AdminUserErrors>({});

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

  const handleImageChange = (file: File | null, imageURL: string | null) => {
    setFormData(prev => ({ ...prev, avatar: file, avatar_remove: file ? 0 : 1 }))

    if (imageURL) setAvatar(imageURL)
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

        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <ImageUpload
            defaultImage={avatar}
            onImageChange={handleImageChange}
            size="md"
            title="Profile Picture"
            description="Upload a new profile photo"
          />

          <div className="space-y-4 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input required value={formData.name} onChange={handleInputChange} name="name" id="fullName" placeholder="John Smith" />
              {renderErrors(errors?.name)}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input required value={formData.email} onChange={handleInputChange} name="email" id="email" type="email" placeholder="user@example.com" />
              {renderErrors(errors?.email)}
            </div>
          </div>
        </div>
        {renderErrors(errors?.avatar)}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input required value={formData.phone_number} onChange={handleInputChange} name="phone_number" id="phone" type="tel" placeholder="+1 (xxx) xxx-xxxx" />
        {renderErrors(errors?.phone_number)}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Address</Label>
        <Input required id="address" value={formData.address} onChange={handleInputChange} name="address" placeholder="123 user St, Service City" />
        {renderErrors(errors?.address)}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="postal_code">Postal code</Label>
        <Input required id="postal_code" value={formData.postal_code} onChange={handleInputChange} name="postal_code" placeholder="88000" />
        {renderErrors(errors?.postal_code)}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          placeholder="Write something about yourself."
          value={formData.bio} onChange={handleInputChange}
        />
        {renderErrors(errors?.bio)}
      </div>

      {
        mode === 'create' &&
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type='password' required id="password" value={formData.password} onChange={handleInputChange} name="password" placeholder="password" />
            {renderErrors(errors?.password)}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password_confirmation">Password Confirmation</Label>
            <Input type='password' required id="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange} name="password_confirmation" placeholder="password confirmation" />
          </div>
        </>
      }

      <div className="flex gap-2">
        <Checkbox
          id="is_admin"
          checked={formData.is_admin === 1}
          onCheckedChange={(checked) =>
            setFormData(prev => ({ ...prev, is_admin: checked ? 1 : 0 }))
          }
        />
        <Label htmlFor="is_admin">Is admin</Label>
        {renderErrors(errors?.is_admin)}
      </div>


      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-localfind-600 hover:bg-localfind-700">
          {initialData ? "Update User" : "Create User"}
        </Button>
      </DialogFooter>
    </form>

  );
}

export default UserForm