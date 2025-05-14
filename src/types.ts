interface Permission {
  id: number
  name: string
}

interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface Company {
  id: number
  name: string
  years_of_experience: string
  description: string
  categories: Category[]
  reviews_count: number
  preview: string
  address: string
  rating: number
  availability: string
  price_from: number
}

export interface Category {
  id: number
  name: string
  providers_count: number
}

export interface Service {
  id: number
  name: string
  price: number
  created_at: string
}

export interface User {
  id: number
  name: string
  email: string
  address: string
  bio: string | null
  roles: Role[]
  avatar: string
  is_have_avatar: boolean
  phone_number: string
  created_at: string
  company: Company | null
}

export interface ApplicationData {
  name: string
  phone: string
  email: string
  service: number
  comment: string
}

export type ApplicationStatus = 'pending' | 'canceled' | 'in-progress' | 'completed'

export interface ApplicationResponse extends ApplicationData {
  id: number
  status: ApplicationStatus
  created_at: string
}