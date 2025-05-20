import axiosInstance from '../../api/axiosInstance'
import { AdminServiceData, AdminServiceResponse, AdminUserData, AdminUserResponse, Pagination, ProviderStats, Review, User } from '../../types'

interface Service {
  index: (params?: string) => Promise<Pagination<AdminServiceResponse> | undefined>
  store: (data: AdminServiceData) => Promise<Pagination<AdminServiceResponse> | undefined>
  update: (data: AdminServiceData, id: number) => Promise<Pagination<AdminServiceResponse> | undefined>
  destroy: (id: number) => Promise<Pagination<AdminServiceResponse> | undefined>
}

export default <Service>{
  async index(params) {
    try {
      const response = await axiosInstance.get<Pagination<AdminServiceResponse>>(`/admin/service?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  },
  async store(data) {
    const response = await axiosInstance.post<Pagination<AdminServiceResponse>>(`/admin/service`, data)
    return response.data
  },
  async update(data, id) {
    const response = await axiosInstance.put<Pagination<AdminServiceResponse>>(`/admin/service/${id}`, data)
    return response.data
  },
  async destroy(id) {
    const response = await axiosInstance.delete<Pagination<AdminServiceResponse>>(`/admin/service/${id}`)
    return response.data
  }

}
