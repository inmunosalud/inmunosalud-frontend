import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { PROJECT_ADDRESS, api_post, api_get, api_put, api_delete } from '../../services/api'
import { setLogin } from '../session'

import { openSnackBar } from '../notifications'
import { nextStep } from '../register'

//actions

export const createAddress = createAsyncThunk('user/newAddress', async ({ body, uuid }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROJECT_ADDRESS}/addresses/${uuid}`, body, auth)

    console.log(response)

    thunkApi.dispatch(nextStep())

    return response
  } catch (error) {
    const data = error.response.data

    if (data.message) {
      thunkApi.dispatch(openSnackBar({ open: true, message: data.message, severity: 'error' }))
    }

    return thunkApi.rejectWithValue('error')
  }
})

export const addressList = createAsyncThunk('user/list', async () => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${PROJECT_PAYMENT_METHODS}/payment-methods/user/${uuid}`, auth)

    console.log(response)

    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const updateAddress = createAsyncThunk('user/updateAddress', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_put(`${PROJECT_ADDRESS}/users/${body.id}`, body, auth)
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    //thunkApi.dispatch(addressList())
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteAddress = createAsyncThunk('user/deleteAddress', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_delete(`${PROJECT_ADDRESS}/users/${body.id}`, body, auth)
    thunkApi.dispatch(setModalDelete(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    console.log(response)
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(setModalDelete(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  // register
  isLoading: false,
  formErrors: null,
  /* users table */
  address: []
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.registerErrors = payload
    },
    setModal: (state, { payload }) => {
      state.showModal = payload
    },
    setModalRow: (state, { payload }) => {
      state.modalRow = payload
    },
    setModalDelete: (state, { payload }) => {
      state.showDelete = payload
    },
    setAddresses: (state, { payload }) => {
      state.address = payload
    }
  },
  extraReducers: builder => {
    //get users tables
    builder.addCase(addressList.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(addressList.fulfilled, (state, action) => {
      const {
        payload: { content }
      } = action
      state.isLoading = false
      state.users = [...content]
    })

    //update user
    builder.addCase(updateAddress.fulfilled, (state, { payload }) => {
      const updatedUser = payload?.content
      console.log({ updatedUser })
      state.users = state.users.filter(usr => usr.id !== updatedUser.id).concat(updatedUser)
    })
    builder.addCase(deleteAddress.fulfilled, (state, { payload }) => {
      state.users = payload.content
    })
  }
})

export default addressSlice.reducer

export const { setErrors, setModal, setModalRow, setModalDelete, setAddresses } = addressSlice.actions
