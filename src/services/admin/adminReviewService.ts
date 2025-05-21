import axiosInstance from '../../api/axiosInstance'
import { AdminReviewResponse, AdminServiceData, AdminServiceResponse, AdminUserData, AdminUserResponse, Pagination, ProviderStats, Review, User } from '../../types'

interface Service {
  index: (params?: string) => Promise<Pagination<AdminReviewResponse> | undefined>
  destroy: (id: number) => Promise<Pagination<AdminReviewResponse> | undefined>
}

export default <Service>{
  async index(params) {
    try {
      const response = await axiosInstance.get<Pagination<AdminReviewResponse>>(`/admin/review?${params}`)
      return response.data
    } catch (e: any) {
      console.log(e);

    }
  },
  async destroy(id) {
    const response = await axiosInstance.delete<Pagination<AdminReviewResponse>>(`/admin/review/${id}`)
    return response.data
  }

}
