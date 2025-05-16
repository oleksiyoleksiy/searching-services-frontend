import axiosInstance from '../api/axiosInstance'
import { RegisterData, User } from '../types'

interface LoginData {
  email: string
  password: string
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

interface Service {
  login: (data: LoginData) => Promise<AuthResponse | undefined>
  register: (data: RegisterData) => Promise<AuthResponse | undefined>
  logout: () => Promise<boolean>
}

export default <Service>{
  async login(data) {
    const response = await axiosInstance.post<AuthResponse>('/login', data)
    return response.data
  },
  async register(data) {
    const response = await axiosInstance.post<AuthResponse>('/register', data)
    return response.data
  },
  async logout() {
    try {
      await axiosInstance.post('/logout')
      return true
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
      return false
    }
  },
}
