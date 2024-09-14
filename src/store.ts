import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Features/User/useSlice'
import inputReducer from './Features/Inputs/inputSlice'
// ...

export const store = configureStore({
  reducer: {
    users: userReducer,
    inputs: inputReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
