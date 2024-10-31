import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { PROJECT_ADDRESS, api_post, api_get, api_put, api_delete, api_patch } from '../../services/api'

import { openSnackBar } from '../notifications'
import { nextStep } from '../register'

//actions

export const createAddress = createAsyncThunk('user/newAddress', async ({ body, uuid }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROJECT_ADDRESS}/addresses/${uuid}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    thunkApi.dispatch(addressList(uuid))
    thunkApi.dispatch(setModal(false))
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

export const addressList = createAsyncThunk('user/getAddress', async id => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${PROJECT_ADDRESS}/addresses/user/${id}`, auth)
    if (Array.isArray(response.content) && response.content.length === 0) {
      thunkApi.dispatch(
        openSnackBar({
          open: true,
          message: 'No tienes direcciones. Por favor, agrega uno en tu perfil para realizar compras.',
          severity: 'info'
        })
      )
    }
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const updateAddress = createAsyncThunk('user/updateAddress', async ({ body }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${PROJECT_ADDRESS}/addresses/${body.id}`, body, auth)
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))

    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteAddress = createAsyncThunk('user/deleteAddress', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_delete(`${PROJECT_ADDRESS}/addresses/${id}`, {}, auth)
    thunkApi.dispatch(setModalDelete(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(setModalDelete(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const getColonies = createAsyncThunk('address/getColonies', async (zipCode, thunkApi) => {
  try {
    const response = await api_get(`${PROJECT_ADDRESS}/addresses/colonies/${zipCode}`)
    return response.content
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const setMonthlyPaymentAddress = createAsyncThunk('address/setMonthlyPaymentAddress', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${PROJECT_ADDRESS}/addresses/shippingAddress/${id}`, {}, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  // register
  isLoading: false,
  isLoadingColonies: false,
  formErrors: null,
  /* users table */
  address: [],
  colonies: [],
  selectedColony: {},
  selectedAddressInCart: null,
  isSelectedAddress: false,

  addressId: '',
  showModal: false
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
      state.selectedAddressInCart = payload[0]
    },
    setSelectedAddressInCart: (state, { payload }) => {
      state.selectedAddressInCart = payload
      state.isSelectedAddress = true
    },
    selectColony: (state, { payload }) => {
      state.selectedColony = payload
    },
    cleanColonies: state => {
      state.colonies = []
      state.selectedColony = null
    }
  },
  extraReducers: builder => {
    builder.addCase(createAddress.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.isLoading = false
      const {
        payload: { content }
      } = action
      state.selectedAddressInCart = content[0] ?? null
    })
    builder.addCase(createAddress.rejected, (state, action) => {
      state.isLoading = false
    })
    //get users tables
    builder.addCase(addressList.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(addressList.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(addressList.fulfilled, (state, action) => {
      const {
        payload: { content }
      } = action
      state.isLoading = false
      state.address = content
      state.selectedAddressInCart = content[0] ?? null
    })
    builder.addCase(updateAddress.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(updateAddress.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(updateAddress.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const updatedAddress = payload?.content
      state.address = updatedAddress
      state.selectedAddressInCart = payload.content[0] ?? null
    })
    builder.addCase(deleteAddress.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(deleteAddress.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteAddress.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.address = payload.content
      state.selectedAddressInCart = payload.content[0] ?? null
    })
    builder.addCase(getColonies.pending, state => {
      state.isLoadingColonies = true
    })
    builder.addCase(getColonies.fulfilled, (state, { payload }) => {
      state.colonies = payload
      state.isLoadingColonies = false
    })
    builder.addCase(getColonies.rejected, state => {
      state.isLoadingColonies = false
    })
    builder.addCase(setMonthlyPaymentAddress.pending, state => {
      state.isLoading = true
    })
    builder.addCase(setMonthlyPaymentAddress.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const updatedAddress = payload?.content
      state.address = updatedAddress
    })
    builder.addCase(setMonthlyPaymentAddress.rejected, state => {
      state.isLoading = false
    })
  }
})

export default addressSlice.reducer

export const {
  setErrors,
  setModal,
  setModalRow,
  setModalDelete,
  setAddresses,
  setSelectedAddressInCart,
  selectColony,
  cleanColonies
} = addressSlice.actions
