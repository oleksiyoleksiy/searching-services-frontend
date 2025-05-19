import React, { useEffect, useState } from 'react'
import { Star, MapPin, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { Category, Service } from '@/types'
import SignInModal from './SignInModal'
import BookingModal from './BookingModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { set } from 'date-fns'
import serviceService from '@/services/serviceService'

interface Provider {
  id: string
  name: string
  categories: Category[]
  // subcategory?: string
  image: string
  rating: number
  reviews_count: number
  price: string
  address: string
  postal_code: string
  availability: string
  featured?: boolean
  is_owner: boolean
  // services: Service[]
}

export interface ServiceProviderProps {
  provider: Provider
}

const ServiceCard: React.FC<ServiceProviderProps> = ({
  provider
}) => {
  const navigate = useNavigate()
  const { user } = useSelector((s: RootState) => s.auth)
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  const handleBookNowClick = () => {
    if (!user) {
      setSignInModalOpen(true)
      return
    }

    fetchServices()
    setBookingModalOpen(true)
  }

  const fetchServices = async () => {
    const response = await serviceService.index(Number(provider.id))

    if (response) {
      setServices(response)
    }
  }

  useEffect(()=> {console.log(provider);
  }, [provider])

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${provider?.featured ? 'ring-2 ring-localfind-500' : ''
          }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={provider?.image}
            alt={provider?.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {provider?.featured && (
            <Badge className="absolute top-2 right-2 bg-localfind-500">
              Featured
            </Badge>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2 gap-2">
            <Badge variant="outline" className="text-xs">
              {provider?.categories?.map(c => c.name).join(' · ')}
              {/* {subcategory && ` · ${subcategory}`} */}
            </Badge>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium">{provider?.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({provider?.reviews_count})</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{provider?.name}</h3>

          <div className="space-y-2 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">
                {provider?.address}, {provider?.postal_code}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Available {provider?.availability}</span>
            </div>

            <div className="text-sm font-medium">
              Starting from <span className="text-localfind-700">{provider?.price}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => navigate(`/provider/${provider?.id}`)}
              variant="outline"
              size="sm"
              className="flex-1 text-sm"
            >
              View Profile
            </Button>
            {!provider.is_owner && <Button
              variant="default"
              size="sm"
              className="flex-1 text-sm bg-localfind-600 hover:bg-localfind-700"
              onClick={handleBookNowClick}
            >
              Book Now
            </Button>}
          </div>
        </div>
      </div>

      <SignInModal open={signInModalOpen} onOpenChange={setSignInModalOpen} />

      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        providerId={String(provider.id)}
        providerName={provider.name}
        services={services}
      />
    </>
  )
}

export default ServiceCard
