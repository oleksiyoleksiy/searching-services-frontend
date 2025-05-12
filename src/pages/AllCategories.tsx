import React, { ReactNode, useEffect, useState } from 'react'
import CategoryCard from '@/components/CategoryCard'
import { categoryIcons } from '@/data/mockData'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import categoryService from '@/services/categoryService'

interface CategoryLink {
  id: number,
  name: string
  icon: ReactNode
  color: string
  providers_count: number
  to: string
}

const AllCategories = () => {
  const [search, setSearch] = useState<string>('')
  const [categories, setCategories] = useState<CategoryLink[]>([])

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

  const fetchCategories = async () => {
    const response = await categoryService.index()

    if (response) {
      setCategories(response.map(c => ({ ...c, icon: categoryIcons[c.id]?.icon, color: categoryIcons[c.id]?.color, to: `/category/${c.id}` })))
    }
  }

  useEffect(() => { fetchCategories() }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero */}
        <div className="bg-white py-10 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                Browse Service Categories
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Find the perfect service provider for all your needs by
                exploring our categories.
              </p>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  onChange={e => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search categories..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map(category => (
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
        </div>

        <div className="bg-white py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Popular Categories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.slice(0, 3).map(category => (
                <div
                  key={category.id}
                  className={`rounded-xl p-6 ${category.color}`}
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4 text-gray-800">{category.icon}</div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-gray-700">
                        {category.providers_count} providers
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Find trusted {category.name.toLowerCase()} professionals
                    near you. Compare prices, read reviews, and book
                    appointments online.
                  </p>
                  <a
                    href={category.to}
                    className="inline-block bg-white text-localfind-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Explore {category.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AllCategories
