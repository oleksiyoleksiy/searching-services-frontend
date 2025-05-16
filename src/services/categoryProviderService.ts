import axiosInstance from '../api/axiosInstance'
import { Company, User } from '../types'

interface Category {
  id: number,
  name: string,
  providers_count: number
}


interface Response {
  category: Category
  providers: Company[]
}

interface Service {
  index: (categoryId: number, params?: string) => Promise<Response | undefined>
}

export default <Service>{
  async index(categoryId, params) {
    const response = await axiosInstance.get<Response>(`/category/${categoryId}/provider?${params}`)
    return response.data
  },
}
