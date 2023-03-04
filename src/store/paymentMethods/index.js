import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { api_post, api_get, api_put, api_delete, PROJECT_PAYMENT_METHODS, PROJECT_ADDRESS } from '../../services/api'
import { setAddresses } from '../address'

import { openSnackBar } from '../notifications'
import { nextStep } from '../register'

//actions

export const createMethod = createAsyncThunk('paymentMethods/newMethod', async ({ body, uuid }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROJECT_PAYMENT_METHODS}/payment-methods/${uuid}`, body, auth)

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

export const loadInfo = createAsyncThunk('paymentMethods/loadProfile', async (uuid, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }

  try {
    const [responseMethods, responseAddress] = await Promise.all([
      api_get(`${PROJECT_PAYMENT_METHODS}/payment-methods/user/${uuid}`, auth),
      api_get(`${PROJECT_ADDRESS}/addresses/user/${uuid}`, auth)
    ])

    thunkApi.dispatch(setAddresses(responseAddress.content))

    return responseMethods
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const methodsList = createAsyncThunk('user/list', async uuid => {
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

// export const updateAddress = createAsyncThunk('user/updateAddress', async (body, thunkApi) => {
//   const token = localStorage.getItem('im-user')
//   const auth = { headers: { Authorization: `Bearer ${token}` } }
//   try {
//     const response = await api_put(`${PROJECT_ADDRESS}/users/${body.id}`, body, auth)
//     thunkApi.dispatch(setModal(false))
//     thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
//     //thunkApi.dispatch(addressList())
//     return response
//   } catch (error) {
//     const errMessage = error?.response?.data?.message
//     thunkApi.dispatch(setModal(false))
//     thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
//     return thunkApi.rejectWithValue('error')
//   }
// })

// export const deleteAddress = createAsyncThunk('user/deleteAddress', async (body, thunkApi) => {
//   const token = localStorage.getItem('im-user')
//   const auth = { headers: { Authorization: `Bearer ${token}` } }
//   try {
//     const response = await api_delete(`${PROJECT_ADDRESS}/users/${body.id}`, body, auth)
//     thunkApi.dispatch(setModalDelete(false))
//     thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
//     console.log(response)
//     return response
//   } catch (error) {
//     const errMessage = error?.response?.data?.message
//     thunkApi.dispatch(setModalDelete(false))
//     thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
//     return thunkApi.rejectWithValue('error')
//   }
// })

const initialState = {
  // register
  isLoading: false,
  formErrors: null,
  /* users table */
  paymentMethods: []
}

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.registerErrors = payload
    }
  },
  extraReducers: builder => {
    // session
    builder.addCase(methodsList.pending, (state, action) => {
      state.isLoading = true
      state.errors = null
    })
    builder.addCase(methodsList.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.paymentMethods = payload.content
    })
    builder.addCase(methodsList.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(loadInfo.pending, (state, action) => {
      state.isLoading = true
      state.errors = null
    })
    builder.addCase(loadInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.paymentMethods = payload.content
    })
    builder.addCase(loadInfo.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export default paymentMethodsSlice.reducer

export const { setErrors } = paymentMethodsSlice.actions
