import axiosInstance from '../../api/axiosInstance'
import { AdminUserData, AdminUserResponse, Pagination, ProviderStats, Review, User } from '../../types'

interface Service {
  index: (params?: string) => Promise<Pagination<AdminUserResponse> | undefined>
  show: (id: number) => Promise<User | undefined>
  store: (data: AdminUserData) => Promise<Pagination<AdminUserResponse> | undefined>
  update: (data: AdminUserData, id: number) => Promise<Pagination<AdminUserResponse> | undefined>
}

export default <Service>{
  async index(params) {
    try {
      const response = await axiosInstance.get<Pagination<AdminUserResponse>>(`/admin/user?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  },
  async show(id) {
    try {
      const response = await axiosInstance.get<User>(`/admin/user/${id}`)
      return response.data
    } catch (e: any) {
      console.log(e);
    }
  },
  async store(data) {
    const response = await axiosInstance.post<Pagination<AdminUserResponse>>(`/admin/user`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
  async update(data, id) {
    const response = await axiosInstance.post<Pagination<AdminUserResponse>>(`/admin/user/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

}
