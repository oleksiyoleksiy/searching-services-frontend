import axiosInstance from '../api/axiosInstance'
import { Category, User } from '../types'

interface Service {
  index: () => Promise<Category[] | undefined>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<Category[]>('/category')
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
}
