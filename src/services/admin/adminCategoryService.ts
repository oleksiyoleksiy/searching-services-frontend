import axiosInstance from '../../api/axiosInstance'
import { AdminCategoryResponse, AdminReviewResponse, AdminServiceData, AdminServiceResponse, AdminUserData, AdminUserResponse, Pagination, ProviderStats, Review, User } from '../../types'

interface AdminCategoryData {
  name: string
}

interface Service {
  index: (params?: string) => Promise<Pagination<AdminCategoryResponse> | undefined>
  destroy: (id: number) => Promise<Pagination<AdminCategoryResponse> | undefined>
  update: (data: AdminCategoryData, id: number) => Promise<Pagination<AdminCategoryResponse> | undefined>
  store: (data: AdminCategoryData) => Promise<Pagination<AdminCategoryResponse> | undefined>
}

export default <Service>{
  async index(params) {
    try {
      const response = await axiosInstance.get<Pagination<AdminCategoryResponse>>(`/admin/category?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e);
    }
  },
  async update(data, id) {
    const response = await axiosInstance.put<Pagination<AdminCategoryResponse>>(`/admin/category/${id}`, data)
    return response.data
  },
  async store(data) {
    const response = await axiosInstance.post<Pagination<AdminCategoryResponse>>(`/admin/category`, data)
    return response.data
  },
  async destroy(id) {
    try {
      const response = await axiosInstance.delete<Pagination<AdminCategoryResponse>>(`/admin/category/${id}`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  }

}
