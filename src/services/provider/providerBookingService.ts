import axiosInstance from '../../api/axiosInstance'
import { BookingStatus, ProviderBooking } from '@/types'

interface Service {
  index: () => Promise<ProviderBooking[] | undefined>
  changeStatus: (id: number, status: BookingStatus) => Promise<ProviderBooking | undefined>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<ProviderBooking[]>(`/provider/booking`)
      return response.data
    } catch (e: any) {
      console.log(e)
    }
  },
  async changeStatus(id, status) {
    try {
      const response = await axiosInstance.post<ProviderBooking>(`/provider/booking/${id}/${status}`)
      return response.data
    } catch (e: any) {
      console.log(e)
      return false
    }
  }
}
