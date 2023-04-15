import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
import { ORDERS, api_post, api_get, api_put, api_delete } from '../../services/api'

import { openSnackBar } from '../notifications';

export const getOrders = createAsyncThunk(
  "order/getAllOrders",
  async (thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_get(`${ORDERS}/orders/`, auth)
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

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
    console.log({body});
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_put(`${ORDERS}/orders/${body.idParam}`, body, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      thunkApi.dispatch(getOrders())
      Router.push('/orders/admin-orders')
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
      //Router.push('/ecommerce/orders')
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
  ordersAll: [],

  itemUpdated: null,
  isUpdate: false,

  openModalEdit: false,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setUpdatedOrder(state, { payload }) {
      state.itemUpdated = payload
      state.isUpdate = true
    },
    setModal(state, { payload }) {
      state.openModalEdit = payload
    },
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
    builder.addCase(getOrders.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      
      const mappedOrders = payload.content.map(order => {

        const deliveryDate = order.deliveryDate;
        let validDeliveryDate;

        if (deliveryDate) {
          const [day, month, year] = deliveryDate.split('/');
          validDeliveryDate = new Date(year, month - 1, day);
        } else {
          validDeliveryDate = new Date();
        }
        
        const cardNumberSplitted = order.paymentMethod.cardNumber.slice(4)
        const paymentMethodMapped = `${order.paymentMethod.cardType} ${cardNumberSplitted}`
        const shipmentMapped = `${order.shipment.company}`
        const totalProducts = `${order.products.length}`
        
        return {
          ...order,
          paymentMethodMapped,
          shipmentMapped,
          totalProducts,
          validDeliveryDate
        }
      })
      state.ordersAll = mappedOrders
    })
    builder.addCase(getOrders.rejected, (state, {payload}) => {
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
export const {setUpdatedOrder,setModal} = ordersSlice.actions
export default ordersSlice.reducer