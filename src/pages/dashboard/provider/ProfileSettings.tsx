import { FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
// import { Switch } from '@/components/ui/switch';
import { CheckIcon } from 'lucide-react';
import { authActions } from '@/store/authSlice';
import userService from '@/services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import ImageUpload from '@/components/ImageUpload';
import { Category } from '@/types';
import categoryService from '@/services/categoryService';
import { MultiSelect } from '@/components/ui/multi-select';
import providerService from '@/services/providerService';

interface Errors {
  name?: string[]
  email?: string[]
  phone_number?: string[]
  address?: string[]
  bio?: string[]
  avatar?: string[]
  company_name?: string[]
  categories?: string[]
  years_of_experience?: string[]
}

interface ProfileData {
  name: string
  email: string
  phone_number: string
  address: string
  bio: string
  avatar: File | null
  avatar_remove: 1 | 0
  company_name: string
  categories: string[]
  years_of_experience: string
}

const ProfileSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { user } = useSelector((s: RootState) => s.auth)
  const [avatar, setAvatar] = useState<string | undefined>()
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    bio: '',
    avatar: null,
    avatar_remove: 0,
    company_name: '',
    categories: [],
    years_of_experience: ''
  })
  const [categories, setCategories] = useState<Category[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {


      setProfileData({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        bio: user.bio || '',
        avatar: null,
        avatar_remove: 0,
        company_name: user.company?.name || '',
        years_of_experience: user.company?.years_of_experience || '',
        categories: user.company?.categories.map(c => String(c.id)) || []
      })

      if (user.is_have_avatar) {
        setAvatar(user.avatar)
      }
    }
  }, [user])

  const fetchCategories = async () => {
    const response = await categoryService.index()

    if (response) {
      setCategories(response)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (value: string) => {
    setProfileData(prev => ({
      ...prev,
      language: value
    }));
  };

  const handleImageChange = (file: File | null, imageURL: string | null) => {
    setProfileData(prev => ({ ...prev, avatar: file, avatar_remove: file ? 0 : 1 }))

    if (imageURL) setAvatar(imageURL)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      const response = await providerService.update(profileData).finally(() => setIsSubmitting(false))

      if (response) {
        dispatch(authActions.setUser(response))
        setIsSuccess(true)
      }

    } catch (e: any) {
      console.log(e);
      
      setErrors(e.response?.data?.errors)
    }

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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your profile information and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
        </TabsList>

        <TabsContent value="profile" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your profile details and public information
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                        <Input value={profileData.name} onChange={handleInputChange} name="name" id="fullName" placeholder="John Smith" />
                        {renderErrors(errors?.name)}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input value={profileData.email} onChange={handleInputChange} name="email" id="email" type="email" placeholder="user@example.com" />
                        {renderErrors(errors?.email)}
                      </div>
                    </div>
                  </div>
                  {renderErrors(errors?.avatar)}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input value={profileData.phone_number} onChange={handleInputChange} name="phone_number" id="phone" type="tel" placeholder="+1 (xxx) xxx-xxxx" />
                  {renderErrors(errors?.phone_number)}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={profileData.address} onChange={handleInputChange} name="address" placeholder="123 user St, Service City" />
                  {renderErrors(errors?.address)}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Write something about yourself."
                    value={profileData.bio} onChange={handleInputChange}
                  />
                  {renderErrors(errors?.bio)}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>
                      Update your company details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="companyName">Company/Business Name</Label>
                        <Input
                          id="companyName"
                          type="text"
                          name='company_name'
                          placeholder="Your Business LLC"
                          value={profileData.company_name}
                          onChange={handleInputChange}
                          required
                        />
                        {renderErrors(errors?.company_name)}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="serviceCategories">Service Categories</Label>
                        <MultiSelect
                          options={categories.map(c => ({ label: c.name, value: String(c.id) }))}
                          selected={profileData.categories}
                          onChange={(selected) => setProfileData({ ...profileData, categories: selected })}
                          placeholder="Search and select categories..."

                        />
                        {renderErrors(errors?.categories)}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                        <Input
                          id="yearsOfExperience"
                          type="number"
                          name='years_of_experience'
                          min="0"
                          placeholder="e.g. 5"
                          required
                          value={profileData.years_of_experience}
                          onChange={handleInputChange}
                        />
                        {renderErrors(errors?.years_of_experience)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting} className="bg-localfind-600 hover:bg-localfind-700">
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                  {isSuccess && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckIcon className="h-4 w-4" /> Profile updated successfully
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
              <CardDescription>
                Update your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button type="submit" className="bg-localfind-600 hover:bg-localfind-700">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* 
        <TabsContent value="notifications" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive booking notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive booking notifications via SMS
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive booking notifications on your device
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">
                      Receive newsletters and promotional emails
                    </p>
                  </div>
                  <Switch />
                </div>
                <Button className="bg-localfind-600 hover:bg-localfind-700">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default ProfileSettings;