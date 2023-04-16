import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StackExchange } from 'mdi-material-ui'
import Router from 'next/router'
//api
import { PROYECT, api_post } from '../../services/api'
import { setUser } from '../dashboard/generalSlice'

//actions
export const loginCall = createAsyncThunk('/session/login', async (body, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users/login`, body)

    thunkApi.dispatch(setUser(response.content.user))
    // thunkApi.dispatch(setLogin(response.content))

    Router.push('/ecommerce/products')

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
  }
})

export default sessionSlice.reducer

export const { login, setErrors } = sessionSlice.actions
