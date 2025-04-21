import React, { ReactNode, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import ServiceCard from '@/components/ServiceCard'
import FilterSection from '@/components/FilterSection'
import { Button } from '@/components/ui/button'
import { categories, serviceProviders } from '@/data/mockData'
import { ChevronRight } from 'lucide-react'

interface Categories {
  id: string
  title: string
  icon: ReactNode
  providerCount: number
  color: string
  to: string
}

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const [category, setCategory] = useState<Categories>(categories[0])
  const [searchParams, setSearchParams] = useSearchParams()
  // In a real app, you would filter providers by the selected category
  const filteredProviders = serviceProviders.filter(p =>
    p.category.toLowerCase().includes(category?.title.toLowerCase() || '')
  )

  const handleSearch = (service: string, location: string) => {
    setSearchParams({ service, location })
  }

  useEffect(() => {
    setCategory(categories.find(c => c.id === categoryId) || categories[0])
  }, [categoryId])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Category Hero */}
        <div className={`py-10 ${category.color}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 text-gray-800 animate-fade-in">
                {category.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                {category.title}
              </h1>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl">
                Find the best {category.title.toLowerCase()} service providers
                in your area. Browse, compare, and book with ease.
              </p>
              <div className="w-full max-w-2xl">
                <SearchBar onSearch={handleSearch} simplified={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm">
              <a href="/" className="text-gray-500 hover:text-localfind-600">
                Home
              </a>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
              <a
                href="/categories"
                className="text-gray-500 hover:text-localfind-600"
              >
                Categories
              </a>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
              <span className="text-gray-800 font-medium">
                {category.title}
              </span>
            </div>
          </div>
        </div>

        {/* Category Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="md:w-1/4">
              <FilterSection />
            </div>

            {/* Results */}
            <div className="md:w-3/4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.title} Service Providers
                </h2>
                <p className="text-gray-600">
                  {filteredProviders.length} providers available in your area
                </p>
              </div>

              <div className="provider-grid">
                {filteredProviders.length > 0 ? (
                  filteredProviders.map(provider => (
                    <ServiceCard key={provider.id} {...provider} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-500 mb-4">
                      No service providers found in this category for your
                      location.
                    </p>
                    <Button variant="outline">View All Categories</Button>
                  </div>
                )}
              </div>

              {filteredProviders.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="text-localfind-600">
                    Load More Providers
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Categories */}
        <div className="bg-white border-t py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Categories
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories
                .filter(c => c.id !== categoryId)
                .slice(0, 4)
                .map(cat => (
                  <a
                    key={cat.id}
                    href={cat.to}
                    className="flex items-center p-4 border rounded-lg hover:border-localfind-500 hover:bg-localfind-50 transition-colors"
                  >
                    <div className="mr-3 text-gray-800">{cat.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-800">{cat.title}</h3>
                      <p className="text-sm text-gray-500">
                        {cat.providerCount} providers
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CategoryPage
