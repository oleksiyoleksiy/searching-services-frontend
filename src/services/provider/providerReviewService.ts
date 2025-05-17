import axiosInstance from '../../api/axiosInstance'
import { Review, User } from '../../types'

interface Service {
  index: () => Promise<Review[] | undefined>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<Review[]>(`/provider/review`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  }
}
