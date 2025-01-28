import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CONSTANTS, api_get, api_patch } from 'src/services/api'
import { openSnackBar } from '../notifications'

//Get all constants from system
export const getConstants = createAsyncThunk('constants/getConstants', async (_, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  try {
    const response = await api_get(`${CONSTANTS}/constants`, auth)
    return response.content
  } catch (error) {
    console.log(error)
    return thunkApi.rejectWithValue('error')
  }
})

export const updateConstants = createAsyncThunk('constants/updateConstants', async ({ body, headers }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}`, Password: headers.password } }
  try {
    const response = await api_patch(`${CONSTANTS}/constants`, body, auth)
    thunkApi.dispatch(setModalUpdate(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response.content
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(setModalUpdate(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})
const initialState = {
  constants: null,
  isLoading: false,
  loading: 'idle',
  error: false,
  message: '',
  errors: null,
  showModal: false,
  showConfirmModal: false
}
export const constantsSlice = createSlice({
  name: 'constants',
  initialState,
  reducers: {
    setModalUpdate: (state, { payload }) => {
      state.showModal = payload
    },
    setShowConfirmModal: (state, { payload }) => {
      state.showConfirmModal = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getConstants.pending, (state, _) => {
      state.loading = 'loading'
      state.isLoading = true
    }),
      builder.addCase(getConstants.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.constants = payload
        state.loading = 'finished'
      }),
      builder.addCase(getConstants.rejected, state => {
        state.isLoading = false
        state.loading = 'finished'
      }),
      builder.addCase(updateConstants.pending, state => {
        state.loading = 'loading'
        state.isLoading = true
      }),
      builder.addCase(updateConstants.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.constants = payload
        state.loading = 'finished'
      }),
      builder.addCase(updateConstants.rejected, state => {
        state.isLoading = false
        state.loading = 'finished'
      })
  }
})
export const { setErrors, setModalUpdate, setShowConfirmModal } = constantsSlice.actions
export default constantsSlice.reducer
