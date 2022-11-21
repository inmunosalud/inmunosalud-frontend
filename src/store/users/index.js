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
export const sendNewUser = createAsyncThunk('user/sendNewUser', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  console.log(token)
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROYECT}/users/admin`, body, auth)
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
    thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  /* users table */
  users: [],
  /* new User */
  newUser: {},
  loading: 'idle',
  error: false,
  message: '',
  // new user
  isLoading: false
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
      console.log(action)
      const {
        payload: { content }
      } = action
      state.loading = 'resolved'
      state.users = [...content]
    })
    builder.addCase(sendNewUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(sendNewUser.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(sendNewUser.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export default usersSlice.reducer
