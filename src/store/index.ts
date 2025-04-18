import { configureStore, createAction } from '@reduxjs/toolkit'
import authSlice from './authSlice'

export const resetAction = createAction('RESET')

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
