import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
import { COMISSIONS, api_post, api_get, api_put, api_delete } from '../../services/api'

import { openSnackBar } from '../notifications';

export const getComissions = createAsyncThunk(
  "product/getComissions",
  async (thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_get(`${COMISSIONS}/commissions`, auth)
      return response;
    } catch (error) {
      console.log(error) 
      return thunkApi.rejectWithValue('error')
    }
  } 
)


export const liquidationComisions = createAsyncThunk(
  "product/liquidationProduct",
  async (body, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_post(`${COMISSIONS}/commissions/liquidate`, body, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      Router.push('/dashboard/comissions')
      return response;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue('error')
    }
  } 
)

export const deleteComission = createAsyncThunk(
  "product/deleteComission",
  async (body, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = {headers: { Authorization: `Bearer ${token}` }}
    try {
      const response = await api_delete(`${COMISSIONS}/comissions/`,body, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      return response;
    } catch (error) {
      const errMessage = error?.response?.data?.message
      thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
      return thunkApi.rejectWithValue('error')
    }
  } 
) 


const initialState = {
  isLoading: false,
  comissions: [],

  openModal: false
}

export const comissionsSlice = createSlice({
  name: 'comissions',
  initialState,
  reducers: {
    setOpenModal(state, {payload}) {
      state.openModal = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getComissions.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getComissions.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.comissions = payload.content
    })
    builder.addCase(getComissions.rejected, (state, {payload}) => {
      state.isLoading = false;
    })
    builder.addCase(liquidationComisions.fulfilled, (state, {payload}) => {
      state.comissions = payload
    })
     builder.addCase(deleteComission.fulfilled, (state, {payload}) => {
      state.comissions = payload
    })
  }
})

export const {setOpenModal } = comissionsSlice.actions
export default comissionsSlice.reducer