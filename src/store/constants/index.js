import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CONSTANTS, api_get } from 'src/services/api'
import { openSnackBar } from '../notifications'

export const getConstants = createAsyncThunk('constants/getConstants', async (_, thunkApi) => {
  const constantsObject = {}
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${CONSTANTS}/constants`, auth)
    for (const item of response.content) constantsObject[item.id] = item.value
    return constantsObject
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  constants: {},
  isLoading: false,
  loading: 'idle',
  error: false,
  message: '',
  errors: null
}

export const constantsSlice = createSlice({
  name: 'constants',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getConstants.pending, (state, _) => {
      state.isLoading = true
    }),
      builder.addCase(getConstants.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.constants = payload
      }),
      builder.addCase(getConstants.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  }
})

export const { setErrors } = constantsSlice.actions
export default constantsSlice.reducer
