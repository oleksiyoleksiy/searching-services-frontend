import axiosInstance from '../../api/axiosInstance'
import { AdminStats } from '../../types'

interface Service {
  index: () => Promise<AdminStats | undefined>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<AdminStats>(`/admin/stats`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  },
}
