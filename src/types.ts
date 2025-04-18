export interface User {
  id: number
  name: string
  email: string
  is_admin: boolean
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