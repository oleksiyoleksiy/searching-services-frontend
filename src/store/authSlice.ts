import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types'

interface Token {
  accessToken: string
  refreshToken: string
}

interface State {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  isLoading: boolean
}

const authSlice = createSlice({
  name: 'auth',
  initialState: <State>{
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: null,
    isLoading: true,
  },
  reducers: {
    setToken(state, action: PayloadAction<Token>) {
      const payload = action.payload
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      localStorage.setItem('accessToken', payload.accessToken)
      localStorage.setItem('refreshToken', payload.refreshToken)
    },
    setUser(state, action: PayloadAction<User>) {
      const payload = action.payload
      state.user = payload
    },
    logout(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
