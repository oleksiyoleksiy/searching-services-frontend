import axiosInstance from '../api/axiosInstance'
import { Booking, Company, User } from '../types'

interface Data {
  date: Date
  start_time: string
}


interface Service {
  index: (params?: string) => Promise<Booking[] | undefined>
  store: (serviceId: number, data: Data) => Promise<any>
  cancel: (id: number) => Promise<any>
}

export default <Service>{
  async index(params) {
    try {
      const response = await axiosInstance.get(`/booking?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e);
      
    }
  },
  async store(serviceId, data) {    
    const response = await axiosInstance.post(`/booking/${serviceId}`, data)
    return response.data
  },
  async cancel(id) {    
    const response = await axiosInstance.post(`/booking/${id}/cancel`)
    return response.data
  },
}
