import React from 'react'
import { Star, MapPin, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { Category } from '@/types'

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
}

export interface ServiceProviderProps {
  provider: Provider
}

const ServiceCard: React.FC<ServiceProviderProps> = ({
  provider
}) => {
  const navigate = useNavigate()

  return (
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
            <span className="text-sm font-medium">{Number(provider?.rating).toFixed(1)}</span>
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
          <Button
            variant="default"
            size="sm"
            className="flex-1 text-sm bg-localfind-600 hover:bg-localfind-700"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
