import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//api
import { PROYECT, api_post, api_get } from '../../services/api'

//actions
export const createUser = createAsyncThunk('user/newUser', async body => {
  const response = await api_post(`${PROYECT}/users`, body)
  return response
})

export const usersList = createAsyncThunk('user/list', async () => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const response = await api_get(`${PROYECT}/users`, auth)
  return response
})

const initialState = {
  /* users table */
  users: [],
  /* new User */
  newUser: {},
  loading: 'idle',
  token: null,
  error: false,
  message: ''
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = 'pending'
    }),
      builder.addCase(createUser.fulfilled, (state, action) => {
        const {
          payload: { content }
        } = action
        state.loading = 'resolved'
        state.newUser = content
        state.token = content.token
      }),
      builder.addCase(createUser.rejected, (state, action) => {
        state.loading = 'rejected'
        state.error = true
      }),
      //get users tables
      builder.addCase(usersList.pending, (state, action) => {
        state.loading = 'pending'
      }),
      builder.addCase(usersList.fulfilled, (state, action) => {
        const {
          payload: { content }
        } = action
        state.loading = 'resolved'
        state.users = [...content]
      })
  }
})

export default usersSlice.reducer
