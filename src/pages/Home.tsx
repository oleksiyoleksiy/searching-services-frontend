import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'
import ServiceCard from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
// import { categories, serviceProviders } from '@/data/mockData'
import { MapPin, Search, Star, ArrowRight, Calendar } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import providerService from '@/services/providerService'
import { Category, Company } from '@/types'
import categoryService from '@/services/categoryService'
import { categoryIcons } from '@/data/mockData'

interface CategoryLink extends Category {
  icon: React.ReactNode
  color: string
  to: string
}
const Home = () => {
  // const [searchQuery, setSearchQuery] = useState({ service: '', location: '' })
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [providers, setProviders] = useState<Company[]>([])
  const [categories, setCategories] = useState<CategoryLink[]>([])

  const handleSearch = (search: string, postalCode: string) => {
    // setSearchParams({ service, location })



    navigate(`/search?${search ? `search=${search}` : ''}&${postalCode ? `postalCode=${postalCode}` : ''}`)

    // In a real application, this would trigger an API call
  }

  const fetchProviders = async () => {
    const response = await providerService.index('limit=4')

    if (response) {
      setProviders(response)
    }
  }

  const fetchCategories = async () => {
    const response = await categoryService.index('limit=10')

    if (response) {
      setCategories(response.map(c => ({
        ...c,
        icon: categoryIcons[c.id]?.icon,
        color: categoryIcons[c.id]?.color,
        to: `/category/${c.id}`
      })))
    }
  }

  useEffect(() => {
    fetchProviders()
    fetchCategories()
  }, [])

  // const featuredProviders = serviceProviders.filter(
  //   provider => provider.featured
  // )
  // const popularProviders = serviceProviders.slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <section className="bg-hero-pattern py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                Find Local Service Providers Near You
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover trusted professionals in your area for any service you
                need.
              </p>

              <SearchBar onSearch={handleSearch} />

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                  Trusted Reviews
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-localfind-500" />
                  Location Based
                </span>
                <span className="flex items-center">
                  <Search className="w-4 h-4 mr-1 text-localfind-500" />
                  Easy to Find
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Popular Categories
              </h2>
              <Button
                onClick={() => navigate('/categories')}
                variant="ghost"
                className="text-localfind-600 hidden md:flex items-center"
              >
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  icon={category.icon}
                  title={category.name}
                  providersCount={category.providers_count}
                  color={category.color}
                  to={category.to}
                />
              ))}
            </div>

            <div className="mt-6 text-center md:hidden">
              <Button variant="outline" className="text-localfind-600">
                View All Categories
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Popular Providers
              </h2>
              <Button
                variant="ghost"
                className="text-localfind-600 hidden md:flex items-center"
                onClick={() => navigate('/categories')}
              >
                Explore More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="provider-grid">
              {providers.map(provider => (
                <ServiceCard key={provider.id} provider={provider} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                How LocalFind Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Finding the right service provider has never been easier. Just
                follow these simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-localfind-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-localfind-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Search</h3>
                <p className="text-gray-600">
                  Enter what service you need and your location to find relevant
                  providers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-localfind-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-localfind-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compare</h3>
                <p className="text-gray-600">
                  Browse profiles, read reviews, and compare prices to find your
                  perfect match.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-localfind-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-localfind-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Book</h3>
                <p className="text-gray-600">
                  Schedule an appointment directly through our platform. It's
                  that simple!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
