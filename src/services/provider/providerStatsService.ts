import axiosInstance from '../../api/axiosInstance'
import { ProviderStats, Review, User } from '../../types'

interface Service {
  index: () => Promise<ProviderStats | undefined>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<ProviderStats>(`/provider/stats`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  }
}
