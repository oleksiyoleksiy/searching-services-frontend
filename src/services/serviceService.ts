import axiosInstance from '../api/axiosInstance'
import { Company, ProviderProfileData, ProviderShow, RegisterData, Review, User } from '../types'
import { Service as ServiceType } from '../types'

interface Service {
  index: (providerId: number, params?: string) => Promise<ServiceType[] | undefined>
}

export default <Service>{
  async index(providerId, params) {
    try {
      const response = await axiosInstance.get<ServiceType[]>(`/service/${providerId}?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
}
