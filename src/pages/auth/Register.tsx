import { ChangeEvent, useState } from 'react'
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

interface Errors {
  name?: string[]
  email?: string[]
  password?: string[]
  password_confirmation?: string[]
  user_type?: string[]
}

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: 'client',
  })
  const [errors, setErrors] = useState<Errors>({})
  const { isLoading, user } = useSelector((s: RootState) => s.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
                name='userType'
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
              {renderErrors(errors.name)}
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
              {renderErrors(errors.email)}
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
              {renderErrors(errors.password)}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name='confirmPassword'
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
              />
              {renderErrors(errors.password_confirmation)}
            </div>
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
