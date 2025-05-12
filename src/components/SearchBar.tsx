import React, { useState } from 'react'
import { Search, MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchBarInitialValues {
  search: string
  location: string
}

interface SearchBarProps {
  onSearch?: (service: string, location: string) => void
  simplified?: boolean
  initialValues?: SearchBarInitialValues
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  simplified = false,
  initialValues = {
    search: '',
    location: '',
  },
}) => {
  const [search, setSearch] = useState(initialValues.search)
  const [location, setLocation] = useState(initialValues.location)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(search, location)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`
        flex flex-col md:flex-row gap-2 
        ${
          simplified ? 'max-w-2xl mx-auto' : 'p-4 rounded-lg bg-white shadow-md'
        }
      `}
    >
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="What service are you looking for?"
          className="w-full pl-10 h-11"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => setSearch('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Your location"
          className="w-full pl-10 h-11"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        {location && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => setLocation('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Button
        type="submit"
        className="h-11 bg-localfind-700 hover:bg-localfind-700 text-white"
      >
        Search
      </Button>
    </form>
  )
}

export default SearchBar
