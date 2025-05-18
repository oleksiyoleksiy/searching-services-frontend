import axiosInstance from '../../api/axiosInstance'
import { ProviderService } from '@/types'

interface ServiceData {
  name: string
  description: string
  price: number
}

interface Service {
  index: () => Promise<ProviderService[] | undefined>
  update: (id: number, data: ServiceData) => Promise<ProviderService | undefined>
  store: (data: ServiceData) => Promise<ProviderService | undefined>
  destroy: (id: number) => Promise<boolean>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<ProviderService[]>(`/provider/service`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
  async update(id, data) {
    const response = await axiosInstance.put<ProviderService>(`/provider/service/${id}`, data)
    return response.data
  },
  async store(data) {
    const response = await axiosInstance.post<ProviderService>(`/provider/service`, data)
    return response.data
  },
  async destroy(id: number) {
    try {
      await axiosInstance.delete(`/provider/service/${id}`)
      return true
    } catch (e: any) {
      console.log(e)
      return false
    }
  }
}
