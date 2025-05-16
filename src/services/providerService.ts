import axiosInstance from '../api/axiosInstance'
import { Company, User } from '../types'


interface Service {
  index: (params?: string) => Promise<Company[] | undefined>
}

export default <Service>{
  async index(params) {
    const response = await axiosInstance.get<Company[]>(`/provider?${params}`)
    return response.data
  },
}
