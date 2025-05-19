import axiosInstance from '../api/axiosInstance'
import { Chat, Company, User } from '../types'


interface Service {
  index: () => Promise<Chat[] | undefined>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<Chat[]>(`/chat`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  },
}
