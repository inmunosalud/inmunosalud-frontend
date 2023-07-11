import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api_post, PROYECT } from '../../services/api'
import { openSnackBar } from '../notifications'

export const contactUs = createAsyncThunk('user/contactUsEmail', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROYECT}/users/contactUsEmail`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  isLoadingContact: false,
  openModalContact: false
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setModal(state, { payload }) {
      state.openModalContact = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(contactUs.pending, (state, action) => {
      state.isLoadingContact = true
    })
    builder.addCase(contactUs.fulfilled, (state, { payload }) => {
      state.isLoadingContact = false
      state.openModalContact = false
    })
    builder.addCase(contactUs.rejected, state => {
      state.isLoadingContact = false
    })
  }
})

export const { setModal } = contactSlice.actions
export default contactSlice.reducer
