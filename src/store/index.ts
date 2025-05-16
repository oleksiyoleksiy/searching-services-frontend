import { configureStore, createAction } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import providerSlice from './providerSlice'

export const resetAction = createAction('RESET')

const store = configureStore({
  reducer: {
    auth: authSlice,
    provider: providerSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
