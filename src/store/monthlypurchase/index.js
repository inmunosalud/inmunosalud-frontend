import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PROYECT, api_post, HOST_MONTHLY_PURCHASE, api_get, api_patch } from '../../services/api'
import { openSnackBar } from '../notifications'

export const getMonthlyPurchase = createAsyncThunk('monthlyPurchase/getMonthlyPurchase', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${HOST_MONTHLY_PURCHASE}/monthlyPurchase/${id}`, auth)

    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const updateMonthlyPurchase = createAsyncThunk(
  'monthlyPurchase/updateMonthlyPurchase',
  async ({ id: monthlyPurchaseId, body }, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_patch(`${HOST_MONTHLY_PURCHASE}/monthlyPurchase/${monthlyPurchaseId}`, body, auth)

      return response
    } catch (error) {
      console.log(error.response)
      if (error.response.status == 500) {
        thunkApi.dispatch(
          openSnackBar({
            open: true,
            message: 'El total del pedido no puede ser menor a la compra mensual requerida',
            severity: 'error'
          })
        )
      }
      return thunkApi.rejectWithValue('El total del pedido no puede ser menor a la compra mensual requerida')
    }
  }
)

export const monthlyPurchaseSlice = createSlice({
  name: 'monthlyPurchase',
  initialState: {
    products: [],
    id: null,
    folio: null,
    isLoading: false,
    total: {
      subtotal: 0,
      iva: 0,
      shippingCost: 0,
      ivaValue: 0,
      total: 0
    },

    showModal: false
  },
  reducers: {
    setModal: (state, { payload }) => {
      state.showModal = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getMonthlyPurchase.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getMonthlyPurchase.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload.content.products
      state.id = payload.content.id
      state.folio = payload.folio
      state.total.total = payload.content.total
      state.total.iva = payload.content.iva
      state.total.subtotal = payload.content.subtotal
      state.total.ivaValue = payload.content.ivaPorcentaje
      state.total.shippingCost = payload.content.shippingCost
    })
    builder.addCase(getMonthlyPurchase.rejected, (state, action) => {
      state.isLoading = false
    })

    // ** Update
    builder.addCase(updateMonthlyPurchase.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateMonthlyPurchase.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload.content.products
      state.id = payload.content.id
      state.folio = payload.folio
      state.total.total = payload.content.total
      state.total.iva = payload.content.iva
      state.total.subtotal = payload.content.subtotal
    })
    builder.addCase(updateMonthlyPurchase.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export default monthlyPurchaseSlice.reducer

export const { setModal } = monthlyPurchaseSlice.actions
