import { FormEvent, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ImageUpload from "@/components/ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import userService from "@/services/userService";
import { authActions } from "@/store/authSlice";

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

const UserSettings = () => {
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
        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">


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


      </Tabs>


    </div>
  );
};

export default UserSettings;