import axiosInstance from '../api/axiosInstance'
import { Availability, Company, User } from '../types'


interface Service {
  index: (providerId: string, params?: string) => Promise<string[] | undefined>
}

export default <Service>{
  async index(providerId, params) {
    try {
      const response = await axiosInstance.get<string[]>(`/availability/${providerId}?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
}
