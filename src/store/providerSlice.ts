import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { Company, ProviderShow, User } from '@/types'


interface State {
  provider: ProviderShow | null
}

const providerSlice = createSlice({
  name: 'provider',
  initialState: <State>{
    provider: null,
  },
  reducers: {
    setProvider(state, action: PayloadAction<ProviderShow>) {
      state.provider = action.payload
    },
  },
})

export const providerActions = providerSlice.actions

export default providerSlice.reducer
