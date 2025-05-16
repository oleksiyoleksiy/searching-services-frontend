import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import authService from '@/services/authService'
import { authActions } from '@/store/authSlice'
import NotFound from '../NotFound'
import { MultiSelect } from '@/components/ui/multi-select'
import { Category, RegisterData } from '@/types'
import categoryService from '@/services/categoryService'

interface Errors {
  name?: string[]
  email?: string[]
  address?: string[]
  postal_code?: string[]
  password?: string[]
  password_confirmation?: string[]
  user_type?: string[]
  years_of_experience?: string[]
  company_name?: string[]
  phone_number?: string[]
  categories?: string[]
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    postal_code: '',
    address: '',
    password: '',
    password_confirmation: '',
    years_of_experience: '',
    company_name: '',
    user_type: 'client',
    categories: [],
    phone_number: ''
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const { isLoading, user } = useSelector((s: RootState) => s.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchCategories = async () => {
    const response = await categoryService.index()

    if (response) {
      setCategories(response)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password.length < 8) {
      setErrors({
        password: [
          'The password field must be at least 8 characters.'
        ]
      })
      return
    }

    if (formData.password_confirmation.length < 8) {
      setErrors({
        password: [
          'The password_confirmation field must be at least 8 characters.'
        ]
      })
      return
    }

    try {
      const response = await authService.register(formData)

      if (response) {
        dispatch(authActions.setToken(response))
        navigate('/')
      }
    } catch (e: any) {
      console.log(e);
      setErrors(e.response?.data?.errors)
    }
  }


  // toast.success(
  //   'Registration successful! Please check your email to verify your account.'
  // )
  // navigate('/auth/login')


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const renderErrors = (errors?: string[]) => {
    return errors && <div className="flex flex-col gap-1">
      {errors.map(error => (
        <div key={error} className="text-red-500 text-sm">
          {error}
        </div>
      ))}
    </div>
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (isLoading) return null

  if (!isLoading && user) return <NotFound />

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>I want to</Label>
              <RadioGroup
                defaultValue={formData.user_type}
                name='user_type'
                onChange={handleInputChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="client" />
                  <Label htmlFor="client">Find services (Client)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="provider" id="provider" />
                  <Label htmlFor="provider">
                    Offer services (Service Provider)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name='name'
                placeholder="Ім'я"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {renderErrors(errors?.name)}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name='email'
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {renderErrors(errors?.email)}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="address"
                  name='address'
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                {renderErrors(errors?.address)}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="postal_code">Postal code</Label>
                <Input
                  id="postal_code"
                  type="postal_code"
                  name='postal_code'
                  placeholder="88000"
                  // regex={/^\d{5}$/}
                  pattern="[0-9]{5}"
                  value={formData.postal_code}
                  onChange={handleInputChange}
                  required
                />
                {renderErrors(errors?.postal_code)}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone_number">Phone number</Label>
              <Input
                id="phone_number"
                type="tel"
                name="phone_number"
                placeholder="+(123) 456-7890"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
              {renderErrors(errors?.phone_number)}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {renderErrors(errors?.password)}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name='password_confirmation'
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
              />
              {renderErrors(errors?.password_confirmation)}
            </div>
            {formData.user_type === 'provider' && (
              <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium text-gray-700">Service Provider Information</h3>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="companyName">Company/Business Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Your Business LLC"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    required={formData.user_type === 'provider'}
                  />
                  {renderErrors(errors?.company_name)}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="serviceCategories">Service Categories</Label>
                  <MultiSelect
                    options={categories.map(c => ({ label: c.name, value: String(c.id) }))}
                    selected={formData.categories}
                    onChange={(selected) => setFormData({ ...formData, categories: selected })}
                    placeholder="Search and select categories..."
                  />
                  {renderErrors(errors?.categories)}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    min="0"
                    placeholder="e.g. 5"
                    value={formData.years_of_experience}
                    onChange={(e) => setFormData({ ...formData, years_of_experience: e.target.value })}
                  />
                  {renderErrors(errors?.years_of_experience)}
                </div>
              </div>
            )}
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
