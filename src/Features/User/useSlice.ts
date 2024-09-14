import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
type Theme = {
  theme: 'light' | 'dark'
}

// Define the initial state using that type
const initialState: Theme = {
  theme: 'light',
}

function getTheme(): Theme {
  const storedTheme = localStorage.getItem('theme')

  return storedTheme ? JSON.parse(storedTheme) : initialState
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getTheme,
  reducers: {
    toggleTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
      localStorage.setItem('theme', JSON.stringify(state))
    },
  },
})

export const { toggleTheme } = userSlice.actions

export default userSlice.reducer
