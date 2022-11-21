import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//api
import { PROYECT, api_post } from '../../services/api'

//actions
export const loginCall = createAsyncThunk('/user/login', async body => {
  const headers = { 'Content-Type': 'application/json' }
  const response = await api_post(`${PROYECT}/users/login`, body, headers)
  return response
})

const initialState = {
  user: {},
  token: null,
  loading: 'idle',
  error: {}
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginCall.pending, (state, action) => {
      state.loading = 'pending'
    }),
      builder.addCase(loginCall.fulfilled, (state, action) => {
        const {
          payload: { content }
        } = action
        state.loading = 'resolved'
        state.token = content.token
        state.user = content?.user
        localStorage.setItem('im-user', content.token)
      }),
      builder.addCase(loginCall.rejected, (state, action) => {
        //console.log('action', action)
        // const {
        //   payload: { data }
        // } = action
        // state.loading = 'rejected'
        // state.error = data
      })
  }
})

export default sessionSlice.reducer

export const { login } = sessionSlice.actions
