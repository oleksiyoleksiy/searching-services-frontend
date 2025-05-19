import axiosInstance from '../api/axiosInstance'
import { Chat, Company, Message, User } from '../types'

interface Data {
  content: string
}

interface Service {
  index: (chatId: number) => Promise<Message[] | undefined>
  store: (chatId: number, data: Data) => Promise<Message | undefined>
}

export default <Service>{
  async index(chatId) {
    try {
      const response = await axiosInstance.get<Message[]>(`/message/${chatId}`)
      return response.data
    } catch (e: any) {
      console.log(e);
    }
  },
  async store(chatId, data) {
    const response = await axiosInstance.post<Message>(`/message/${chatId}`, data)
    return response.data
  },
}
