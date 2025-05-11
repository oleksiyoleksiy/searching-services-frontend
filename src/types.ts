interface Permission {
  id: number
  name: string
}

interface Role {
  id: number
  name: string
  permissions: Permission[]
}

interface Company {
  id: number
  name: string
  years_of_experience: string
  categories: Category[]
}

export interface Category {
  id: number
  name: string
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