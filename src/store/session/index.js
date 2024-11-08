import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StackExchange } from 'mdi-material-ui'
import Router from 'next/router'
//api
import { USERS, api_post } from '../../services/api'
// import { setUser } from '../dashboard/generalSlice'
import { setUser } from '../users'
import { openSnackBar } from '../notifications'

//actions
export const loginCall = createAsyncThunk('/session/login', async (body, thunkApi) => {
  try {
    const response = await api_post(`${USERS}/users/login`, body)

    thunkApi.dispatch(setUser(response.content))
    if (response.content.user.active === false) {
      Router.push({ pathname: '/register/welcome' })
      return response
    } else {
      Router.push('/landing-page/home/')
      return response
    }
  } catch (error) {
    const data = error.response.data
    if (data.content && data.content.message) {
      thunkApi.dispatch(openSnackBar({ open: true, message: data.content.message, severity: 'error' }))
    }

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

export const loadSession = createAsyncThunk('/session/loadSession', async thunkApi => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${USERS}/users/data-user`, auth)
    return response.content
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  user: {},
  token: null,
  loading: 'idle',
  error: false,
  message: '',
  isLoading: false,
  errors: null
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(loginCall.pending, (state, action) => {
      state.isLoading = true
      state.errors = null
    })
    builder.addCase(loginCall.fulfilled, (state, { payload }) => {
      const { content } = payload
      state.isLoading = false
      state.errors = null
      state.token = content.token
      state.user = content.user
      localStorage.setItem('im-user', content.token)
    })
    builder.addCase(loginCall.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(loadSession.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(loadSession.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(loadSession.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.user = payload.user
    })
  }
})

export default sessionSlice.reducer

export const { login, setErrors } = sessionSlice.actions
