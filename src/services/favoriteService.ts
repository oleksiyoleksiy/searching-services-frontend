import axiosInstance from '../api/axiosInstance'
import { Company, ProviderProfileData, ProviderShow, RegisterData, Review, User } from '../types'

interface Service {
  store: (companyId: number) => Promise<any>
}

export default <Service>{
  async store(companyId) {
    const response = await axiosInstance.post(`/favorite/${companyId}`)
    return response.data
  }
}
