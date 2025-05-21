import axiosInstance from '../../api/axiosInstance'
import { BookingStatus, ProviderBooking, ProviderCompanyResponse, User } from '@/types'

interface Service {
  index: () => Promise<ProviderCompanyResponse | undefined>
  update: (data: any) => Promise<ProviderCompanyResponse | undefined>
}

export default <Service>{
  async index() {
    try {
      const response = await axiosInstance.get<ProviderCompanyResponse>('/provider/company')
      return response.data
    } catch (e: any) {
      console.log(e);
    }
  },
  async update(data) {
    const response = await axiosInstance.post<ProviderCompanyResponse>('/provider/company/update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
}
