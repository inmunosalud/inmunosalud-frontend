import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { PROYECT, api_post, api_get } from '../../services/api'
import { setLogin } from '../session'

//actions
export const createUser = createAsyncThunk('user/newUser', async (body, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users`, body)

    console.log(response)

    const newUser = {
      user: {
        profile: response.content.profile,
        recommenderId: response.content.recommenderId,
        email: response.content.email,
        id: response.content.id
      },
      token: response.content.token
    }

    thunkApi.dispatch(setLogin(newUser))

    Router.push('/register/welcome')

    return response
  } catch (error) {
    const data = error.response.data

    if (data.content.errors) {
      thunkApi.dispatch(setErrors(data.content.errors.body))
    } else {
      const newErrors = []
      newErrors.push({ msg: data.message })
      thunkApi.dispatch(setErrors(newErrors))
    }

    return thunkApi.rejectWithValue('error')
  }
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
  // register
  isLoadingRegister: false,
  registerErrors: null,
  /* users table */
  users: [],
  /* new User */
  newUser: {},
  loading: 'idle',
  token: null,
  error: false,
  message: '',
  // new user
  isLoading: false
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.registerErrors = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoadingRegister = true
      state.registerErrors = null
    })
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoadingRegister = false
      state.registerErrors = null
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoadingRegister = false
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

export const { setErrors } = usersSlice.actions
