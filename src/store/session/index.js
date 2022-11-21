import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StackExchange } from 'mdi-material-ui'
import Router from 'next/router'
//api
import { PROYECT, api_post } from '../../services/api'

//actions
export const loginCall = createAsyncThunk('/user/login', async (body, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users/login`, body)
    console.log(Router)
    Router.push('/dashboards/general/')

    return response
  } catch (error) {
    console.log(error.response.data)

    const data = error.response.data

    if (data.content.errors) {
      thunkApi.dispatch(setErrors(data.content.errors.body))
    } else {
      const newErrors = []
      newErrors.push({ msg: data.message })
      thunkApi.dispatch(setErrors(newErrors))
    }

    thunkApi.rejectWithValue(data)
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
      state.token = content.token
      state.user = content?.user
      localStorage.setItem('im-user', content.token)
    })
    builder.addCase(loginCall.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export default sessionSlice.reducer

export const { login, setErrors } = sessionSlice.actions
