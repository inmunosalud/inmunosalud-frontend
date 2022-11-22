import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { PROYECT, api_post, api_get } from '../../services/api'

import { openSnackBar } from '../notifications'

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

export const sendNewUser = createAsyncThunk('user/sendNewUser', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROYECT}/users/admin`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    Router.push('/dashboards/general/')
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  /* users table */
  users: [],
  loading: 'idle',
  token: null,
  error: false,
  message: '',
  // new user
  isLoading: 'idle',
  newUser: {}
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      const {
        payload: { content }
      } = action
      state.loading = 'resolved'
      state.newUser = content
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = 'rejected'
      state.error = true
    })
    //get users tables
    builder.addCase(usersList.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(usersList.fulfilled, (state, action) => {
      const {
        payload: { content }
      } = action
      state.loading = 'resolved'
      state.users = [...content]
    })
    //create user
    builder.addCase(sendNewUser.pending, (state, action) => {
      state.isLoading = 'pending'
    })
    builder.addCase(sendNewUser.fulfilled, (state, { payload }) => {
      const newUser = payload.content
      const values = [...state.users, newUser]
      state.isLoading = 'resolved'
      state.users = values
    })
    builder.addCase(sendNewUser.rejected, (state, action) => {
      state.isLoading = 'rejected'
    })
  }
})

export default usersSlice.reducer
