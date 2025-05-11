import axiosInstance from '../api/axiosInstance'
import { User } from '../types'

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

interface Service {
  update: (data: Data) => Promise<User | undefined>
}

export default <Service>{
  async update(data) {
    const response = await axiosInstance.post<User>('/provider/update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
}
