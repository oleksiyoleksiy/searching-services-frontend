import axiosInstance from '../api/axiosInstance'
import { ProviderShow, Review } from '../types'

interface Data {
  rating: number
  content: string
}

interface Service {
  store: (providerId: number, data: Data) => Promise<ProviderShow | undefined>
}

export default <Service>{
  async store(providerId, data) {
    try {
      const response = await axiosInstance.post<Review[]>(`/review/${providerId}`, data)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
}
