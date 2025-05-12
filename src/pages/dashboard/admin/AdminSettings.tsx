import { FormEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, Lock, User, Mail, AlertCircle, CheckIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { authActions } from "@/store/authSlice";
import userService from "@/services/userService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ImageUpload from "@/components/ImageUpload";


interface Errors {
  name?: string[]
  email?: string[]
  phone_number?: string[]
  address?: string[]
  bio?: string[]
  avatar?: string[]
}

interface ProfileData {
  name: string
  email: string
  phone_number: string
  address: string
  bio: string
  avatar: File | null
  avatar_remove: 1 | 0
}


const AdminSettings = () => {
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
    avatar_remove: 0
  })
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
        avatar_remove: 0
      })

      if (user.is_have_avatar) {
        setAvatar(user.avatar)
      }
    }
  }, [user])

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

      const response = await userService.update(profileData).finally(() => setIsSubmitting(false))

      if (response) {
        dispatch(authActions.setUser(response))
        setIsSuccess(true)
      }

    } catch (e: any) {
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
  // const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setSecurityForm(prev => ({ ...prev, [name]: value }));
  // };

  // const handleNotificationToggle = (setting: string) => {
  //   setNotificationSettings(prev => ({
  //     ...prev,
  //     [setting]: !prev[setting as keyof typeof prev]
  //   }));
  // };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        {/* <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
        </TabsList> */}

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-700">
                  For security reasons, we recommend changing your password every 90 days.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={securityForm.currentPassword}
                    onChange={handleSecurityChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={securityForm.newPassword}
                    onChange={handleSecurityChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={handleSecurityChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-md">Delivery Methods</h3>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>
                    <Button
                      variant={notificationSettings.emailNotifications ? "default" : "outline"}
                      onClick={() => handleNotificationToggle('emailNotifications')}
                    >
                      {notificationSettings.emailNotifications ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                      </div>
                    </div>
                    <Button
                      variant={notificationSettings.pushNotifications ? "default" : "outline"}
                      onClick={() => handleNotificationToggle('pushNotifications')}
                    >
                      {notificationSettings.pushNotifications ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <h3 className="font-medium text-md">Notification Types</h3>
                  <div className="grid gap-4">
                    {[
                      { key: 'userRegistration', label: 'User Registrations', description: 'When a new user registers' },
                      { key: 'newBookings', label: 'New Bookings', description: 'When a new booking is made' },
                      { key: 'serviceUpdates', label: 'Service Updates', description: 'When services are added or updated' },
                      { key: 'systemUpdates', label: 'System Updates', description: 'Important system notifications' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <Button
                          variant={notificationSettings[item.key as keyof typeof notificationSettings] ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleNotificationToggle(item.key)}
                        >
                          {notificationSettings[item.key as keyof typeof notificationSettings] ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default AdminSettings;