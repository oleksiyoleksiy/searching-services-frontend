import axiosInstance from '../../api/axiosInstance'
import { Company, ProviderProfileData, ProviderShow, RegisterData, Review, User } from '../../types'

interface Service {
  update: (data: ProviderProfileData) => Promise<User | undefined>
}

export default <Service>{
  async update(data) {
    const response = await axiosInstance.post<User>(`/provider/update`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
}
