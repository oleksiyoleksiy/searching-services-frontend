  import axios from 'axios'
  import store, { resetAction } from '../store'
  import { authActions } from '../store/authSlice'
  import { getNavigate } from '../navigate' 

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
      Accept: 'application/json',
    },
  })

  axiosInstance.interceptors.request.use(
    (config: any) => {
      const auth = store.getState().auth
      const accessToken = auth.accessToken

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const originalRequest = error.config

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true

        const auth = store.getState().auth

        try {
          const refreshToken = auth.refreshToken

          if (!refreshToken) {
            throw new Error('No refresh token available')
          }

          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/refresh`, null, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          })

          store.dispatch(authActions.setToken(response.data))

          const { accessToken } = response.data

          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`

          return axiosInstance(originalRequest)
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)

          const navigate = getNavigate()

          store.dispatch(authActions.logout())

          store.dispatch(resetAction())

          navigate('/auth/login')

          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  export default axiosInstance
