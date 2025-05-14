import axiosInstance from '../api/axiosInstance'
import { Company, User } from '../types'

interface Data {
  name: string
  email: string
  phone_number: string
  address: string
  bio: string
  avatar: File | null
  company_name: string
  categories: string[]
  years_of_experience: string
}

interface Category {
  id: number,
  name: string,
  providers_count: number
}


interface Response {
  category: Category
  providers: Company[]
}

interface Service {
  update: (data: Data) => Promise<User | undefined>
  index: (categoryId: number, params?: string) => Promise<Response | undefined>
}

export default <Service>{
  async index(categoryId, params) {
    const response = await axiosInstance.get<Response>(`/category/${categoryId}/provider?${params}`)
    return response.data
  },
  async update(data) {
    const response = await axiosInstance.post<User>('/provider/update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
}
