import axiosInstance from '../api/axiosInstance'
import { Category, User, Service as ServiceType, Company } from '../types'

interface ShowResponse {
  id: number,
  name: string,
  providers: Company[]
}

interface Service {
  index: (params?: string) => Promise<Category[] | undefined>
  show: (id: number, params?: string) => Promise<ShowResponse | undefined>
}

export default <Service>{
  async index(params) {
    try {
      const response = await axiosInstance.get<Category[]>(`/category?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
  async show(id, params) {
    try {
      const response = await axiosInstance.get<Category[]>(`/category/${id}?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
}
