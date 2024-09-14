import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Setting = {
  hLength: number
  vLength: number
  blurRadius: number
  sRadius: number
  opacity: number
  boxRadius: number
  shadowColor: string
  boxColor: string
  inset: boolean
}

type State = {
  setting: Setting
}
const initialState: State = {
  setting: {
    hLength: 0,
    vLength: 0,
    blurRadius: 0,
    sRadius: 0,
    opacity: 1,
    boxRadius: 0,
    shadowColor: '#ffffff',
    boxColor: '#2563eb',
    inset: false,
  },
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Setting>) => {
      //console.log(action.payload)
      state.setting = action.payload
    },
  },
})

export const { setSettings } = inputSlice.actions

export default inputSlice.reducer
