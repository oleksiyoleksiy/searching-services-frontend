interface Permission {
  id: number
  name: string
}

interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface RegisterData {
  name: string
  email: string
  postal_code: string
  address: string
  password: string
  password_confirmation: string
  company_name: string
  years_of_experience: string
  phone_number: string
  user_type: 'client' | 'provider'
  categories: string[]
}

export interface Company {
  id: string
  name: string
  years_of_experience: string
  description: string
  categories: Category[]
  reviews_count: number
  image: string
  address: string
  postal_code: string
  rating: number
  availability: string
  price: string
  is_owner: boolean
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
  description: string
  created_at: string
}

export interface ProviderService extends Service {
  bookings: number
}

export interface Availability {
  weekday: string,
  start: string,
  end: string,
}

export interface ProviderShow {
  id: number
  name: string
  image: string
  description: string
  user: User
  rating: number
  reviews_count: number
  services: Service[]
  reviews: Review[]
  gallery: string[]
  categories: Category[]
  availability: string
  availabilities: Availability[]
  is_favorite: boolean
  is_owner: boolean
}

export interface Review {
  id: number
  user: User
  rating: number
  content: string
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
  postal_code: string
}

export interface ProviderProfileData {
  name: string
  email: string
  phone_number: string
  address: string
  bio: string
  avatar: File | null
  avatar_remove: 1 | 0
  company_name: string
  categories: string[]
  years_of_experience: string
  company_description: string
  description: string
}

export type BookingStatus = 'pending' | 'cancelled' | 'upcoming' | 'rejected' | 'no_show' | 'completed'

export interface Booking {
  id: number
  date: string
  start_time: string
  service: string
  provider: string
  status: BookingStatus
  price: string
}

export interface ProviderStats {
  requests: number
  active_bookings: number
  completed: number
  reviews: number
}

export interface ProviderBooking {
  id: number
  service: string
  client: string
  date: string
  start_time: string
  price: string,
  status: BookingStatus,
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

export interface ServiceErrors {
  name?: string[];
  price?: string[];
  description?: string[];
}

export interface Chat {
  id: number
  user: User
  last_message?: Message
}

export interface Message {
  id: number
  content: string
  created_at: string
  // is_owner: boolean
  user_id: number
}

export interface MessageResponse {
  date: string
  messages: Message[]
}

export interface StoreMessageResponse {
  date: string
  message: Message
}

export interface AdminUserResponse {
  users: User[]
  total_users: number
  new_this_month: number
}

export interface AdminReview extends Review {
  company: string
}

export interface AdminReviewResponse {
  reviews: AdminReview[]
  total_reviews: number
}

export interface AdminServiceResponse {
  services: AdminService[]
  total_services: number
}

export interface AdminService {
  id: number
  name: string,
  provider: string,
  price: string
  description: string
}

export interface AdminServiceData {
  name: string,
  description: string,
  price: string
}

interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

interface PaginationMetaLinks {
  url: string | null
  label: string
  active: boolean
}

interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: PaginationMetaLinks
  path: string
  per_page: number
  to: number
  total: number
}

export interface PaginationData {
  links: PaginationLinks
  meta: PaginationMeta
}

export interface Pagination<T> extends PaginationData {
  data: T
}


export interface AdminUserData {
  name: string
  email: string
  avatar: File | null
  avatar_remove: 1 | 0
  bio: string
  phone_number: string
  postal_code: string
  address: string
  password: string
  password_confirmation: string
  is_admin: 1 | 0
}

export interface AdminUserErrors {
  name?: string[]
  email?: string[]
  phone_number?: string[]
  address?: string[]
  bio?: string[]
  avatar?: string[]
  roles?: number[]
  password?: string[]
  postal_code?: string[]
  is_admin?: string[]
}

export interface AdminStats {
  total_users: number
  total_services: number
  total_bookings: number
  revenue: number
}