import axiosInstance from '../api/axiosInstance'
import { Company, ProviderProfileData, ProviderShow, RegisterData, Review, User } from '../types'

interface Service {
  index: (params?: string) => Promise<Company[] | undefined>
  show: (id: number, params?: string) => Promise<ProviderShow | undefined>
  update: (data: ProviderProfileData) => Promise<User | undefined>
}

export default <Service>{
  async index(params) {
    try {
      const response = await axiosInstance.get<Company[]>(`/provider?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
  async show(id, params) {
    try {
      const response = await axiosInstance.get<ProviderShow>(`/provider/${id}?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
  async update(data) {
    const response = await axiosInstance.post<User>(`/provider/update`, data)
    return response.data
  }
}
