import { FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckIcon, Plus, X } from 'lucide-react';
import { authActions } from '@/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import ImageUpload from '@/components/ImageUpload';
import { BusinessHours, Category, ProviderProfileData, TimeSlot } from '@/types';
import categoryService from '@/services/categoryService';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import providerCompanyService from '@/services/provider/providerCompanyService';
import Loader from '@/components/ui/loader';

interface Errors {
  preview?: string[]
  name?: string[]
  categories?: string[]
  years_of_experience?: string[]
  description?: string[]
  business_hours?: string[]
  gallery_images?: string[]
  'business_hours.0.start'?: string[]
  'business_hours.0.end'?: string[]
  'business_hours.1.start'?: string[]
  'business_hours.1.end'?: string[]
  'business_hours.2.start'?: string[]
  'business_hours.2.end'?: string[]
  'business_hours.3.start'?: string[]
  'business_hours.3.end'?: string[]
  'business_hours.4.start'?: string[]
  'business_hours.4.end'?: string[]
  'business_hours.5.start'?: string[]
  'business_hours.5.end'?: string[]
  'business_hours.6.start'?: string[]
  'business_hours.6.end'?: string[]
}

const weekdays = [
  { id: 1, label: "Monday" },
  { id: 2, label: "Tuesday" },
  { id: 3, label: "Wednesday" },
  { id: 4, label: "Thursday" },
  { id: 5, label: "Friday" },
  { id: 6, label: "Saturday" },
  { id: 0, label: "Sunday" }
];

const timeOptions = Array.from({ length: 24 }).map((_, index) => {
  const hour = index.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

interface GalleryImage { id?: number, path: string, file: File | null }


const CompanyProfile = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { user } = useSelector((s: RootState) => s.auth)
  const [preview, setPreview] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState<ProviderProfileData>({
    name: '',
    categories: [],
    years_of_experience: '',
    description: '',
    gallery_images_remove: [],
    gallery_images: [],
    preview_remove: 0,
    business_hours: {
      0: { start: "09:00", end: "17:00" },
      1: { start: "09:00", end: "17:00" },
      2: { start: "09:00", end: "17:00" },
      3: { start: "09:00", end: "17:00" },
      4: { start: "09:00", end: "17:00" },
      5: null,
      6: null
    }
  })
  const [categories, setCategories] = useState<Category[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {

      setProfileData(prev => ({
        ...prev, name: user.company?.name || '',
        categories: user.company?.categories.map(c => c.id) || [],
        years_of_experience: user.company?.years_of_experience || '',
        description: user.company?.description || '',
      }))



    }
  }, [user])

  const fetchCategories = async () => {
    setIsLoading(true)
    const response = await categoryService.index()

    if (response) {
      setCategories(response)
    }
  }

  const fetchCompanyInfo = async () => {
    setIsLoading(true)

    const response = await providerCompanyService.index()

    if (response) {

      setProfileData(prev => {
        const business_hours: BusinessHours = {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
          6: null
        };

        response.availabilities.forEach((a: any) => {
          business_hours[a.weekday as keyof BusinessHours] = { start: a.start, end: a.end };
        });
        return {
          ...prev,
          business_hours
        };
      })

      setGalleryImages(response.gallery.map(g => ({ id: g.id, path: g.path, file: null })))
      setPreview(response.preview)
    }
  }

  useEffect(() => {
    fetchCategories().finally(() => setIsLoading(false))
    fetchCompanyInfo()
  }, [])

  const handlePreviewChange = (file: File | null, imageURL: string | null) => {
    setProfileData(prev => ({ ...prev, preview: file, preview_remove: file ? 0 : 1 }))

    if (imageURL) setPreview(imageURL)
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDayToggle = (day: keyof BusinessHours, isEnabled: boolean) => {

    setProfileData(prev => ({
      ...prev,
      business_hours: {
        ...prev.business_hours,
        [day]: isEnabled ? { start: "09:00", end: "17:00" } : null
      }
    }))
  };

  const handleTimeChange = (day: keyof BusinessHours, type: keyof TimeSlot, value: string) => {
    setProfileData(prev => ({
      ...prev,
      business_hours: {
        ...prev.business_hours,
        [day]: {
          ...prev.business_hours[day],
          [type]: value
        }
      }
    }))
  }

  const handleRemoveGalleryImage = (image: GalleryImage, index: number) => {

    if (image?.id) {
      setProfileData(prev => ({ ...prev, gallery_images_remove: [...prev.gallery_images_remove, Number(image.id)] }));
      console.log(image.id);

    }

    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddGalleryImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setGalleryImages(prev => [...prev, { path: imageUrl, file: file }]);
      }
    };

    input.click();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true);
    setIsSuccess(false);


    try {
      const submissionData = {
        ...profileData,
        gallery_images: galleryImages.map(g => g.file!).filter(f => f) // фільтруємо null
      };

      const response = await providerCompanyService.update(submissionData);

      if (response) {
        dispatch(authActions.setUser(response.user));

        setProfileData(prev => {
          const business_hours: BusinessHours = {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null
          };

          response.availabilities.forEach((a: any) => {
            business_hours[a.weekday as keyof BusinessHours] = { start: a.start, end: a.end };
          });
          return {
            ...prev,
            business_hours
          };
        })

        setGalleryImages(response.gallery.map(g => ({ id: g.id, path: g.path, file: null })))
        setPreview(response.preview)
        setIsSuccess(true);
        setProfileData(prev => ({ ...prev, gallery_images_remove: [] }))
        setErrors({})
      }
    } catch (e: any) {
      console.log(e);

      setErrors(e.response?.data?.errors || {});
    } finally {
      setIsSubmitting(false);
    }
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

  if (isLoading) return <Loader />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your profile information and preferences</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="images">Images & Gallery</TabsTrigger>
            <TabsTrigger value="hours">Business Hours</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your profile details and public information
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                        <Label htmlFor="name">Company/Business Name</Label>
                        <Input
                          id="name"
                          type="text"
                          name='name'
                          placeholder="Your Business LLC"
                          value={profileData.name}
                          onChange={handleInputChange}
                          required
                        />
                        {renderErrors(errors?.name)}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="categories">Service Categories</Label>
                        <MultiSelect
                          options={categories.map(c => ({ label: c.name, value: String(c.id) }))}
                          selected={profileData.categories.map(String)}
                          onChange={(selected) => setProfileData({ ...profileData, categories: selected.map(Number) })}
                          placeholder="Search and select categories..."

                        />
                        {renderErrors(errors?.categories)}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="years_of_experience">Years of Experience</Label>
                        <Input
                          id="years_of_experience"
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
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          rows={4}
                          placeholder="describe the scope of your company's activities"
                          value={profileData.description} onChange={handleInputChange}
                        />
                        {renderErrors(errors?.description)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="images" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>
                  Upload your company logo (will be shown in search results and profile)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  defaultImage={preview || ""}
                  onImageChange={handlePreviewChange}
                  title="Company Logo"
                  description="Upload a logo (recommended size: 400x400px)"
                  size="md"
                />
              </CardContent>
              {renderErrors(errors?.preview)}
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gallery Images</CardTitle>
                  <CardDescription>
                    Add images showcasing your services (up to 10 images)
                  </CardDescription>
                </div>
                <Button
                  onClick={handleAddGalleryImage}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  disabled={galleryImages.length >= 10}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Image
                </Button>
              </CardHeader>
              <CardContent>
                {galleryImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-md">
                    {/* <Image className="h-12 w-12 text-gray-400" /> */}
                    <p className="mt-2 text-sm text-gray-500">No gallery images yet</p>
                    <Button
                      onClick={handleAddGalleryImage}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      Upload Images
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                        <img
                          src={image.path}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(image, index)}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {renderErrors(errors?.gallery_images)}
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>
                  Set your available days and working hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {weekdays.map(day => {
                  const id = day.id as keyof BusinessHours
                  const isEnabled = profileData.business_hours[id] !== null;

                  return (
                    <div key={day.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`enable-${day.id}`}
                            checked={isEnabled}
                            onCheckedChange={(checked) =>
                              handleDayToggle(day.id as keyof BusinessHours, checked as boolean)
                            }
                          />
                          <Label htmlFor={`enable-${day.id}`} className="font-medium">
                            {day.label}
                          </Label>
                        </div>

                        {isEnabled ? (
                          <div className="text-sm text-green-600 font-medium">
                            Open
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 font-medium">
                            Closed
                          </div>
                        )}
                      </div>

                      {isEnabled && (
                        <div className="grid grid-cols-2 gap-4">

                          <div className="flex flex-col gap-2">
                            <Label className="text-sm">Opening Time</Label>
                            <Select
                              value={profileData.business_hours[id]?.start}
                              onValueChange={value => handleTimeChange(id, 'start', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Opening time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map(time => (
                                  <SelectItem key={`${day.id}-open-${time.value}`} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {renderErrors(errors[`business_hours.${id}.start`])}
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label className="text-sm">Closing Time</Label>
                            <Select
                              value={profileData.business_hours[id]?.end}
                              onValueChange={value => handleTimeChange(id, 'end', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Closing time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map(time => (
                                  <SelectItem key={`${day.id}-close-${time.value}`} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {renderErrors(errors[`business_hours.${id}.end`])}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            {renderErrors(errors?.business_hours)}
          </TabsContent>

        </Tabs>
        <div className="flex gap-2 justify-end">
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
    </div>
  );
};

export default CompanyProfile