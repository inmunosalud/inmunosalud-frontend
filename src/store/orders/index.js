import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
import { ORDERS, api_post, api_get, api_patch, api_delete } from '../../services/api'
import { getState } from 'redux'
import toast from 'react-hot-toast'
import { openSnackBar } from '../notifications'
import { getCart } from '../cart'

import { compareByPurchaseDate } from '../../utils/functions'

export const getOrders = createAsyncThunk('order/getAllOrders', async thunkApi => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${ORDERS}/orders/`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const getLogisticsOrders = createAsyncThunk(
  'order/getLogisticsOrders',
  async ({ startDate, endDate }, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    const queryString = new URLSearchParams({ startDate, endDate }).toString()

    try {
      const response = await api_get(`${ORDERS}/orders/logistics?${queryString}`, auth)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const getOrdersByUser = createAsyncThunk('order/getOrdersByUser', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${ORDERS}/orders/user/${id}`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const updateOrder = createAsyncThunk('order/editOrder', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${ORDERS}/orders/${body.idParam}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    Router.push('/orders/admin-orders')
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const createOrder = createAsyncThunk('order/createOrder', async ({ idUser, body, cvv }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const deviceSessionId = thunkApi.getState().paymentMethods.deviceSessionId

  const bodyOrder = {
    deviceSessionId: deviceSessionId,
    cvv: cvv,
    ...body
  }
  try {
    const response = await api_post(`${ORDERS}/orders/${idUser}`, bodyOrder, auth)
    toast.success('Orden creada exitosamente')
    thunkApi.dispatch(getCart(idUser))
    if (Array.isArray(response.content)) {
      if (bodyOrder.type === 'store') {
        thunkApi.dispatch(setStoreOrder(response.content[0]))
        return response
      }
      Router.push(`/ecommerce/orders/?id=${response.content[0].openpay.id}`)
    } else if (
      response.content &&
      response.content.openpay &&
      response.content.openpay.paymentMethod &&
      response.content.openpay.paymentMethod.url
    ) {
      Router.push(response.content.openpay.paymentMethod.url)
    } else {
      console.error('Respuesta inesperada:', response)
    }
    return response
  } catch (error) {
    const data = error.response.data
    if (data.message) {
      thunkApi.dispatch(openSnackBar({ open: true, message: data.message, severity: 'error' }))
    }
    Router.push('/ecommerce/cart')
    return thunkApi.rejectWithValue('error')
  }
})

export const cancelOrder = createAsyncThunk('order/cancel', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const body = { deliveryStatus: 'Cancelado' }
  try {
    const response = await api_patch(`${ORDERS}/orders/cancel/${id}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_delete(`${ORDERS}/orders/${id}`, {}, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    Router.push('/ecommerce/orders')
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  isLoading: false,
  messageValid: '',
  orders: [],
  ordersAll: [],
  logisticsOrdersAll: [],
  cvv: '',
  itemUpdated: null,
  isUpdate: false,
  storeOrder: null,
  openModalEdit: false
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
    setCvv: (state, { payload }) => {
      state.cvv = payload
    },
    setStoreOrder: (state, { payload }) => {
      state.storeOrder = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getOrdersByUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getOrdersByUser.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.messageValid = payload.message
      const sortedOrders = payload.content.sort(compareByPurchaseDate)
      state.orders = sortedOrders
    })
    builder.addCase(getOrdersByUser.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(getOrders.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.ordersAll = payload.content
    })
    builder.addCase(getOrders.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(getLogisticsOrders.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(getLogisticsOrders.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(getLogisticsOrders.fulfilled, (state, { payload }) => {
      state.logisticsOrdersAll = payload.content
      state.isLoading = false
    })
    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      state.orders = payload
    })
    builder.addCase(updateOrder.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(updateOrder.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.orders = payload
    })
    builder.addCase(createOrder.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(createOrder.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteOrder.fulfilled, (state, { payload }) => {
      state.orders = payload
    })
    builder.addCase(cancelOrder.fulfilled, (state, { payload }) => {
      const sortedOrders = payload.content.sort(compareByPurchaseDate)
      state.orders = sortedOrders
    })
  }
})
export const { setUpdatedOrder, setModal, setCvv, setStoreOrder } = ordersSlice.actions
export default ordersSlice.reducer
