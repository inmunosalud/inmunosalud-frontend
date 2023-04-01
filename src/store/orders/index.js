import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
import { ORDERS, api_post, api_get, api_put, api_delete } from '../../services/api'

import { openSnackBar } from '../notifications';

export const getOrdersByUser = createAsyncThunk(
  "order/getOrders",
  async (id, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_get(`${ORDERS}/orders/user/${id}`, auth)
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const updateOrder = createAsyncThunk(
  "order/editOrder",
  async (body, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_put(`${ORDERS}/orders/${body.idParam}`, body, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      Router.push('/ecommerce/orders')
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (body, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_post(`${ORDERS}/orders/${body.idUser}`, body, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      Router.push('/ecommerce/orders')
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_delete(`${ORDERS}/orders/${id}`, {}, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      Router.push('/ecommerce/orders')
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

const initialState = {
  isLoading: false,
  messageValid: "",
  orders: [],

  itemUpdated: null,
  isUpdate: false,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setUpdatedOrder(state, { payload }) {
      state.itemUpdated = payload
      state.isUpdate = true
    }
  },
  extraReducers: builder => {
    builder.addCase(getOrdersByUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getOrdersByUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.messageValid = payload.message 
      state.orders = payload.content
    })
    builder.addCase(getOrdersByUser.rejected, (state, {payload}) => {
      state.isLoading = false;
    })
    builder.addCase(updateOrder.fulfilled, (state, {payload}) => {
      state.orders = payload
    })
    builder.addCase(createOrder.fulfilled, (state, {payload}) => {
      state.orders = payload
    })
    builder.addCase(deleteOrder.fulfilled, (state, {payload}) => {
      state.orders = payload
    })
  }
})
export const {setUpdatedOrder} = ordersSlice.actions
export default ordersSlice.reducer