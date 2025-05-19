import axiosInstance from '../api/axiosInstance'
import { Chat, Company, Message, MessageResponse, StoreMessageResponse, User } from '../types'

interface Data {
  content: string
}



interface Service {
  index: (chatId: number) => Promise<MessageResponse[] | undefined>
  store: (chatId: number, data: Data) => Promise<StoreMessageResponse | undefined>
}

export default <Service>{
  async index(chatId) {
    try {
      const response = await axiosInstance.get<MessageResponse[]>(`/message/${chatId}`)
      return response.data
    } catch (e: any) {
      console.log(e);
    }
  },
  async store(chatId, data) {
    const response = await axiosInstance.post<StoreMessageResponse>(`/message/${chatId}`, data)
    return response.data
  },
}
