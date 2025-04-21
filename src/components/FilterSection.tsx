import React, { useEffect, useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { useSearchParams } from 'react-router-dom'

type AvailabilityType = 'today' | 'weekend' | 'online'
type PriceRangeType = 'any' | 'low' | 'medium' | 'high'
type RatingType = '4plus' | '3plus'
type FilterType = 'availability' | 'rating'
type FilterValue = AvailabilityType | RatingType

const availabilityOptions: AvailabilityType[] = ['today', 'weekend', 'online']

const FilterSection = () => {
  const [distance, setDistance] = useState([5])
  const [priceRange, setPriceRange] = useState('any')
  const [availability, setAvailability] = useState<AvailabilityType[]>([])
  const [rating, setRating] = useState<RatingType[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('distance', distance.join(','))
    params.set('priceRange', priceRange)
    availability.forEach(val => params.append('availability', val))
    rating.forEach(val => params.append('rating', val))

    setSearchParams(params)
  }, [distance, priceRange, availability, rating])

  const handleAvailabilityToggle = (value: AvailabilityType) => {
    setAvailability(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }
  const handleRatingToggle = (value: RatingType) => {
    setRating(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const renderAvailabilityCheckboxParams = (value: AvailabilityType) => {
    return {
      checked: availability.includes(value),
      value,
      onClick: () => handleAvailabilityToggle(value),
    }
  }

  const renderRatingCheckboxParams = (value: RatingType) => {
    return {
      checked: rating.includes(value),
      value,
      onClick: () => handleRatingToggle(value),
    }
  }

  const handleResetFiltersButtonClick = () => {
    setDistance([5])
    setPriceRange('any')
    setRating([])
    setAvailability([])
  }

  return (
    <>
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
            </SheetHeader>
            <div className="py-4 overflow-y-auto">
              <MobileFilterContent
                distance={distance}
                setDistance={setDistance}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                renderAvailabilityCheckboxParams={
                  renderAvailabilityCheckboxParams
                }
                renderRatingCheckboxParams={renderRatingCheckboxParams}
              />
            </div>
            <SheetFooter>
              {/* <Button className="w-full bg-localfind-600 hover:bg-localfind-700">
                Apply Filters
              </Button> */}
              <Button
                onClick={handleResetFiltersButtonClick}
                variant="outline"
                className="w-full"
              >
                , Reset Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Filters</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Distance</h4>
              <div className="mb-1">
                <Slider
                  value={distance}
                  onValueChange={setDistance}
                  max={20}
                  step={1}
                  className="py-2"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>0 km</span>
                <span>Within {distance} km</span>
                <span>20 km</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any price</SelectItem>
                  <SelectItem value="low">$ - Inexpensive</SelectItem>
                  <SelectItem value="medium">$$ - Moderate</SelectItem>
                  <SelectItem value="high">$$$ - Expensive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Availability</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...renderAvailabilityCheckboxParams('today')}
                    id="today"
                  />
                  <Label htmlFor="today">Available today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...renderAvailabilityCheckboxParams('weekend')}
                    id="weekend"
                  />
                  <Label htmlFor="weekend">Weekend availability</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...renderAvailabilityCheckboxParams('online')}
                    id="online"
                  />
                  <Label htmlFor="online">Online booking</Label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Rating</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...renderRatingCheckboxParams('4plus')}
                    id="rating-4plus"
                  />
                  <Label htmlFor="rating-4plus">4+ stars</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...renderRatingCheckboxParams('3plus')}
                    id="rating-3plus"
                  />
                  <Label htmlFor="rating-3plus">3+ stars</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleResetFiltersButtonClick}
          variant="outline"
          className="w-full"
        >
          Reset Filters
        </Button>
      </div>
    </>
  )
}

const MobileFilterContent = ({
  distance,
  setDistance,
  priceRange,
  setPriceRange,
  renderAvailabilityCheckboxParams,
  renderRatingCheckboxParams,
}: {
  distance: number[]
  setDistance: (value: number[]) => void
  priceRange: string
  setPriceRange: (value: string) => void
  renderAvailabilityCheckboxParams: (value: AvailabilityType) => {}
  renderRatingCheckboxParams: (value: RatingType) => {}
}) => {
  return (
    <div className="space-y-6 px-1">
      <div>
        <h4 className="text-sm font-medium mb-2">Distance</h4>
        <div className="mb-1">
          <Slider
            value={distance}
            onValueChange={setDistance}
            max={20}
            step={1}
            className="py-2"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>0 km</span>
          <span>Within {distance} km</span>
          <span>20 km</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Price Range</h4>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Any price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any price</SelectItem>
            <SelectItem value="low">$ - Inexpensive</SelectItem>
            <SelectItem value="medium">$$ - Moderate</SelectItem>
            <SelectItem value="high">$$$ - Expensive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              {...renderAvailabilityCheckboxParams('today')}
              id="mobile-today"
            />
            <Label htmlFor="mobile-today">Available today</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              {...renderAvailabilityCheckboxParams('weekend')}
              id="mobile-weekend"
            />
            <Label htmlFor="mobile-weekend">Weekend availability</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              {...renderAvailabilityCheckboxParams('online')}
              id="mobile-online"
            />
            <Label htmlFor="mobile-online">Online booking</Label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Rating</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              {...renderRatingCheckboxParams('4plus')}
              id="mobile-rating-4plus"
            />
            <Label htmlFor="mobile-rating-4plus">4+ stars</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              {...renderRatingCheckboxParams('4plus')}
              id="mobile-rating-3plus"
            />
            <Label htmlFor="mobile-rating-3plus">3+ stars</Label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection
