import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
import { COMISSIONS, api_post, api_get } from '../../services/api'

import { openSnackBar } from '../notifications'

export const getComissions = createAsyncThunk('comissions/getComissions', async thunkApi => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${COMISSIONS}/commissions`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const getComissionsByUser = createAsyncThunk('comissions/getComissionsByUser', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${COMISSIONS}/commissions/${id}`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const liquidationComisions = createAsyncThunk('comissions/liquidationProduct', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}`, Password: body.password } }
  let response
  try {
    response = await api_post(`${COMISSIONS}/commissions/liquidate`, body.rowsId, auth)
    thunkApi.dispatch(setOpenModal(false)) //close modal
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' })) //show message success
    thunkApi.dispatch(getComissions())

    return response
  } catch (error) {
    thunkApi.dispatch(openSnackBar({ open: true, message: error.response.data.message, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  isLoading: false,
  comissions: [],
  comissionsHistory: {},

  openModal: false
}

export const comissionsSlice = createSlice({
  name: 'comissions',
  initialState,
  reducers: {
    setOpenModal(state, { payload }) {
      state.openModal = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getComissions.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getComissions.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.comissions = payload.content
    })
    builder.addCase(getComissions.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(getComissionsByUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getComissionsByUser.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.comissionsHistory = payload.content
    })
    builder.addCase(getComissionsByUser.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(liquidationComisions.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(liquidationComisions.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(liquidationComisions.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  }
})

export const { setOpenModal } = comissionsSlice.actions
export default comissionsSlice.reducer
