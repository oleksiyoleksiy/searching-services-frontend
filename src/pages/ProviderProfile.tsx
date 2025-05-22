import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { serviceProviders } from '@/data/mockData'
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  ChevronRight,
  Heart,
  Share2,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import providerService from '@/services/providerService'
import BookingModal from '@/components/BookingModal'
import ReviewModal from '@/components/ReviewModal'
import SignInModal from '@/components/SignInModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { providerActions } from '@/store/providerSlice'
import favoriteService from '@/services/favoriteService'

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useSelector((s: RootState) => s.auth)
  const { provider } = useSelector((s: RootState) => s.provider)
  const dispatch = useDispatch()
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const fetchProvider = async () => {
    const response = await providerService.show(Number(id))
    console.log(response);
    
    if (response) {
      dispatch(providerActions.setProvider(response))
    }
  }

  useEffect(() => {
    fetchProvider()
  }, [])


  const handleBookAppointment = () => {
    if (!user) {
      setSignInModalOpen(true);
      return;
    }

    setSelectedServiceId(undefined);
    setBookingModalOpen(true);
  };

  const handleServiceSelect = (serviceId: string) => {
    if (!user) {
      setSignInModalOpen(true);
      return;
    }

    setSelectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const handleWriteReview = () => {
    if (!user) {
      setSignInModalOpen(true);
      return;
    }

    setReviewModalOpen(true);
  };

  const handleSaveButtonClick = async () => {
    if (!user) {
      setSignInModalOpen(true);
      return;
    }

    try {
      const response = await favoriteService.store(Number(id))

      if (response) {
        dispatch(providerActions.setProvider({ ...provider!, is_favorite: !provider?.is_favorite }))
      }
    } catch (e: any) {
      console.log(e);
    }

  }

  if (!provider) return null

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:w-2/3 md:pl-8">
                <div className="flex flex-wrap items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {provider.categories?.map(c => c.name).join(' · ')}
                  </Badge>

                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600"
                      onClick={handleSaveButtonClick}
                    >
                      {provider.is_favorite ? <Heart className="stroke-none h-4 w-4 mr-1 fill-red-500" /> : <Heart className="h-4 w-4 mr-1" />}
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {provider.name}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">
                      {provider.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({provider.reviews_count} reviews)
                    </span>
                  </div>
                  <div className="mx-3 text-gray-300">|</div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {provider.user.address}, {provider.user.postal_code}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Available: {provider.availability}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {provider.user.phone_number}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    {provider.user.email}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {provider.description}
                </p>

                {!provider.is_owner && <Button
                  className="w-full md:w-auto bg-localfind-600 hover:bg-localfind-700"
                  size="lg"
                  onClick={handleBookAppointment}
                >
                  Book an Appointment
                </Button>}
              </div>
            </div>
          </div>
        </div>

        {/* Provider Details */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="services">
            <TabsList className="bg-white mb-6">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Services Offered</h2>

              <div className="space-y-4">
                {provider.services?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                      <div className="mt-2 text-localfind-700 font-medium">
                        ${item.price}+
                      </div>
                    </div>
                    <div>
                      {!provider.is_owner && <Button
                        variant="outline"
                        size="sm"
                        className="text-localfind-600 border-localfind-600"
                        onClick={() => handleServiceSelect(String(item.id))}
                      >
                        Select
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Button
                  className="bg-localfind-600 hover:bg-localfind-700"
                  onClick={() => handleWriteReview()}
                >
                  Write a Review
                </Button>
              </div>

              <div className="space-y-6">
                {provider.reviews?.map((item, i) => (
                  <div key={i} className="border-b pb-6 last:border-b-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img src={item.user.avatar} alt={item.user.name} className="w-10 h-10 rounded-full object-center object-cover bg-gray-200" />
                        <div>
                          <div className="font-medium">
                            {item.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.created_at}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)]?.map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-4 h-4 ${item.rating > starIndex
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {
                        item.content
                      }
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {provider.gallery?.map((image, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md overflow-hidden cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                About {provider.name}
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  {provider.description}
                </p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">
                Business Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {provider.availabilities?.map((availability, i) => (
                  <div key={availability.weekday} className="flex justify-between py-1 border-b">
                    <span>{availability.weekday}</span>
                    <span className="font-medium">
                      {availability.start} - {availability.end}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-white border-t mt-8">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Book with {provider.name}?
              </h2>
              <p className="text-gray-600 mb-6">
                Choose a date and time that works for you and our team will be
                ready to provide excellent service.
              </p>
              <Button
                className="bg-localfind-600 hover:bg-localfind-700"
                size="lg"
                onClick={handleBookAppointment}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </main>

      <SignInModal open={signInModalOpen} onOpenChange={setSignInModalOpen} />

      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        providerId={String(provider.id)}
        services={provider.services}
        providerName={provider.name}
        preselectedService={selectedServiceId}
      />

      <ReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        providerName={provider.name}
      />
    </div>
  )
}

export default ProviderProfile
