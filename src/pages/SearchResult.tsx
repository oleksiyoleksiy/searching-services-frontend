import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import ServiceCard from '@/components/ServiceCard'
import FilterSection from '@/components/FilterSection'
import { Button } from '@/components/ui/Button'
import { serviceProviders } from '@/data/mockData'
import { Grid, List, SlidersHorizontal, MapPin } from 'lucide-react'
import { Star, Clock } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const SearchResults = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSearch = (service: string, location: string) => {
    setSearchParams({ service, location })
    // In a real app, this would fetch results from an API
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <div className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <SearchBar
              onSearch={handleSearch}
              simplified={true}
              initialValues={{
                service: searchParams.get('service') || '',
                location: searchParams.get('location') || '',
              }}
            />
          </div>
        </div>

        <div className="bg-white border-b py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">
                  {searchParams.get('service')} in{' '}
                  {searchParams.get('location')}
                </h1>
                <p className="text-gray-500 text-sm">
                  {serviceProviders.length} service providers found
                </p>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={
                    viewMode === 'grid'
                      ? 'bg-localfind-600 hover:bg-localfind-700'
                      : ''
                  }
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={
                    viewMode === 'list'
                      ? 'bg-localfind-600 hover:bg-localfind-700'
                      : ''
                  }
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <FilterSection />
            </div>

            <div className="md:w-3/4">
              {viewMode === 'grid' ? (
                <div className="provider-grid">
                  {serviceProviders.map(provider => (
                    <ServiceCard key={provider.id} {...provider} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {serviceProviders.map(provider => (
                    <div
                      key={provider.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                    >
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {provider.category} · {provider.subcategory}
                            </div>
                            <h3 className="text-xl font-semibold">
                              {provider.name}
                            </h3>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-medium">
                              {provider.rating.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              ({provider.reviewCount})
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>
                              {provider.location} · {provider.distance} away
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>Available {provider.availability}</span>
                          </div>
                          <div className="text-sm font-medium">
                            Starting from{' '}
                            <span className="text-localfind-700">
                              {provider.price}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto flex space-x-3">
                          <Button variant="outline" className="flex-1">
                            View Profile
                          </Button>
                          <Button
                            variant="default"
                            className="flex-1 bg-localfind-600 hover:bg-localfind-700"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="text-localfind-600">
                  Load More Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SearchResults
