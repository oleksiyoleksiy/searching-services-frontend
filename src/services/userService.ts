import axiosInstance from '../api/axiosInstance'
import { User } from '../types'

interface Data {
  name: string
  email: string
  phone_number: string
  address: string
  bio: string
  avatar: File | null
}

interface Service {
  current: () => Promise<User | undefined>
  update: (data: Data) => Promise<User | undefined>
}

export default <Service>{
  async current() {
    try {
      const response = await axiosInstance.get<User>('/user')
      return response.data
    } catch (e: any) {
      console.log(e?.response?.data)
    }
  },
  async update(data) {
    const response = await axiosInstance.post<User>('/user/update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
}
