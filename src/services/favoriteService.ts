import { ca } from 'date-fns/locale'
import axiosInstance from '../api/axiosInstance'
import { Company, ProviderProfileData, ProviderShow, RegisterData, Review, User } from '../types'

interface Service {
  index: () => Promise<Company[] | undefined>
  store: (companyId: number) => Promise<any>
}

export default <Service>{
  async index() {
    try {

      const response = await axiosInstance.get(`/favorite`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  },
  async store(companyId) {
    const response = await axiosInstance.post(`/favorite/${companyId}`)
    return response.data
  }
}
