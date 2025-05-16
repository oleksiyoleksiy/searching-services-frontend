import axiosInstance from '../api/axiosInstance'
import { Company, User } from '../types'

interface Data {
  date: Date
  start_time: string
}

interface Service {
  store: (serviceId: number, data: Data) => Promise<any>
}

export default <Service>{
  async store(serviceId, data) {    
    const response = await axiosInstance.post(`/booking/${serviceId}`, data)
    return response.data
  },
}
