import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { ThumbDown } from 'mdi-material-ui'

import { USERS, api_post, CART, api_get, api_patch } from '../../services/api'

// ** Add User
export const initCart = createAsyncThunk('cart/getCart', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${CART}/cart/${id}`, auth)
    return response.content
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})
export const getCart = createAsyncThunk('cart/getCart', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${CART}/cart/${id}`, auth)
    return response.content
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const updateCart = createAsyncThunk('cart/updateCart', async ({ id: cartId, body }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${CART}/cart/${cartId}`, body, auth)
    return response.content
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    id: null,
    folio: null,
    isLoading: false,
    total: {
      subtotal: 0,
      iva: 0,
      total: 0,
      shippingCost: 0
    },
    isPaymentsModalOpen: false,
    isAddressesModalOpen: false,
    selectedPayment: null,
    selectedAddress: null
  },
  reducers: {
    setOpenPaymentsModal(state, { payload }) {
      state.isPaymentsModalOpen = payload
    },
    setOpenAddressesModal(state, { payload }) {
      state.isAddressesModalOpen = payload
    },
    setPayment(state, { payload }) {
      state.selectedPayment = payload
    },
    setAddress(state, { payload }) {
      state.selectedAddress = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getCart.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload.products
      state.id = payload.id
      state.folio = payload.folio
      state.total.total = payload.total
      state.total.iva = payload.iva
      state.total.subtotal = payload.subtotal
      state.total.shippingCost = payload.shippingCost
    })
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false
    })

    // ** Update
    builder.addCase(updateCart.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload.products
      state.id = payload.id
      state.folio = payload.folio
      state.total.total = payload.total
      state.total.iva = payload.iva
      state.total.subtotal = payload.subtotal
      state.total.shippingCost = payload.shippingCost
    })
    builder.addCase(updateCart.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { setOpenAddressesModal, setOpenPaymentsModal, setPayment, setAddress } = cartSlice.actions
export default cartSlice.reducer
