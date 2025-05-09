interface Permission {
  id: number
  name: string
}

interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface User {
  id: number
  name: string
  email: string
  roles: Role[]
  avatar: string
  created_at: string
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