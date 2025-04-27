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

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>()
  const provider =
    serviceProviders.find(p => p.id === id) || serviceProviders[0]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Provider Header */}
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
                    {provider.category}
                    {provider.subcategory && ` · ${provider.subcategory}`}
                  </Badge>

                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600"
                    >
                      <Heart className="h-4 w-4 mr-1" />
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
                      {provider.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="mx-3 text-gray-300">|</div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {provider.location} · {provider.distance} away
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Hours: {provider.availability}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    (123) 456-7890
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    contact@{provider.name.toLowerCase().replace(/\s+/g, '')}
                    .com
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {provider.name} is a highly rated service provider
                  specializing in {provider.subcategory || provider.category}.
                  With years of experience and a commitment to quality, we
                  provide exceptional service to all our clients.
                </p>

                <Button
                  className="w-full md:w-auto bg-localfind-600 hover:bg-localfind-700"
                  size="lg"
                >
                  Book an Appointment
                </Button>
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
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">
                        {provider.subcategory || provider.category} - Package{' '}
                        {i + 1}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Our{' '}
                        {i === 0 ? 'basic' : i === 1 ? 'standard' : 'premium'}{' '}
                        service package. Includes all{' '}
                        {i === 0
                          ? 'essential'
                          : i === 1
                          ? 'standard'
                          : 'premium'}{' '}
                        features.
                      </p>
                      <div className="mt-2 text-localfind-700 font-medium">
                        ${30 + i * 20}+
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-localfind-600 border-localfind-600"
                      >
                        Select
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Button className="bg-localfind-600 hover:bg-localfind-700">
                  Write a Review
                </Button>
              </div>

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-6 last:border-b-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="font-medium text-gray-600">
                            {['JD', 'AM', 'BT'][i]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">
                            {['John Doe', 'Alice Miller', 'Bob Thomas'][i]}
                          </div>
                          <div className="text-sm text-gray-500">
                            {['2 weeks ago', '1 month ago', '3 months ago'][i]}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-4 h-4 ${
                              starIndex < 5 - i
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {
                        [
                          'Great service! Very professional and on time. Would definitely recommend.',
                          'Good experience overall. Service was as described and reasonably priced.',
                          'Satisfactory service. Took a bit longer than expected but quality was good.',
                        ][i]
                      }
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md overflow-hidden cursor-pointer"
                  >
                    <img
                      src={provider.image}
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
                  {provider.name} is a leading provider of{' '}
                  {provider.subcategory || provider.category} services in{' '}
                  {provider.location}. Established in 2015, we've built a
                  reputation for excellence, reliability, and customer
                  satisfaction.
                </p>
                <p>
                  Our team consists of highly trained professionals with years
                  of experience in the field. We pride ourselves on using the
                  latest techniques and high-quality materials to deliver
                  outstanding results.
                </p>
                <p>
                  Whether you're looking for a quick service or a comprehensive
                  solution, we're here to help. Contact us today to learn more
                  about how we can assist you with your{' '}
                  {provider.subcategory || provider.category} needs.
                </p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">
                Business Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ].map((day, i) => (
                  <div key={day} className="flex justify-between py-1 border-b">
                    <span>{day}</span>
                    <span className="font-medium">
                      {i < 5
                        ? '9:00 AM - 6:00 PM'
                        : i === 5
                        ? '10:00 AM - 4:00 PM'
                        : 'Closed'}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Section */}
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
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProviderProfile
