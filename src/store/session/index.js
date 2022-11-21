import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StackExchange } from 'mdi-material-ui'
//api
import { PROYECT, api_post } from '../../services/api'

//actions
export const loginCall = createAsyncThunk('/user/login', async (body, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users/login`, body)
    console.log({ response })
    return response
  } catch (error) {
    console.log(error.response.data)

    const data = error.response.data

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
    builder.addCase(loginCall.fulfilled, (state, action) => {
      // console.log(action)
      // const {
      //   payload: { content }
      // } = action
      // state.loading = 'resolved'
      state.isLoading = false
      // state.token = content.token
      // state.user = content?.user
      // localStorage.setItem('im-user', content.token)
    })
    builder.addCase(loginCall.rejected, (state, action) => {
      state.isLoading = false

      state.errors = {}
    })
  }
})

export default sessionSlice.reducer

export const { login, setErrors } = sessionSlice.actions
