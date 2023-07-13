import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//api
import { api_post, api_get, api_patch, api_delete, PROJECT_PAYMENT_METHODS, PROJECT_ADDRESS } from '../../services/api'
import { setAddresses } from '../address'

import { openSnackBar } from '../notifications'
import { nextStep } from '../register'

//actions

export const createMethod = createAsyncThunk('paymentMethods/newMethod', async ({ body, uuid }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROJECT_PAYMENT_METHODS}/payment-methods/${uuid}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(loadInfo(uuid))
    thunkApi.dispatch(nextStep())

    return response
  } catch (error) {
    const data = error.response.data

    if (data.message) {
      thunkApi.dispatch(openSnackBar({ open: true, message: data.message, severity: 'error' }))
      thunkApi.dispatch(setModal(false))
    }

    return thunkApi.rejectWithValue('error')
  }
})

export const updateMethod = createAsyncThunk(
  'paymentMethods/updateMethod',
  async ({ body, uuid, idPaymentMethod }, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_patch(`${PROJECT_PAYMENT_METHODS}/payment-methods/${idPaymentMethod}`, body, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      thunkApi.dispatch(setModal(false))
      thunkApi.dispatch(loadInfo(uuid))
      thunkApi.dispatch(nextStep())

      return response
    } catch (error) {
      const data = error.response.data

      if (data.message) {
        thunkApi.dispatch(openSnackBar({ open: true, message: data.message, severity: 'error' }))
        thunkApi.dispatch(setModal(false))
      }

      return thunkApi.rejectWithValue('error')
    }
  }
)

export const deleteMethod = createAsyncThunk('user/deleteMethod', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_delete(`${PROJECT_PAYMENT_METHODS}/payment-methods/${id}`, {}, auth)
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

export const loadInfo = createAsyncThunk('paymentMethods/loadProfile', async (uuid, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  let paymentInfo = {}

  try {
    const [responseMethods, responseAddress] = await Promise.all([
      api_get(`${PROJECT_PAYMENT_METHODS}/payment-methods/user/${uuid}`, auth),
      api_get(`${PROJECT_ADDRESS}/addresses/user/${uuid}`, auth)
    ])

    thunkApi.dispatch(setAddresses(responseAddress.content))

    paymentInfo.paymentMethods = responseMethods.content.filter(method => method.cardUse === 'Pago')
    paymentInfo.clabe = responseMethods.content.find(method => method.cardUse === 'Cobro')
    return paymentInfo
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const methodsList = createAsyncThunk('user/list', async uuid => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }

  try {
    return await api_get(`${PROJECT_PAYMENT_METHODS}/payment-methods/user/${uuid}`, auth)
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  // register
  isLoading: false,
  formErrors: null,
  /* users table */
  paymentMethods: [],
  clabe: {},
  banco: '',
  //modal props
  isOpen: false,
  isOpenDelete: false,

  /* method selected */
  selectedPaymentMethod: null,
  isSelectedPaymentMethod: false
}

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.registerErrors = payload
    },
    setModal: (state, { payload }) => {
      state.isOpen = payload
    },
    setModalDelete: (state, { payload }) => {
      state.isOpenDelete = payload
    },
    setSelectedPaymentMethodInCart: (state, { payload }) => {
      ;(state.selectedPaymentMethod = payload), (state.isSelectedPaymentMethod = true)
    },
    setBanco: (state, { payload }) => {
      state.banco = payload
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
      state.paymentMethods = payload.paymentMethods
      state.clabe = payload.clabe
      state.banco = payload.clabe.banco
      state.selectedPaymentMethod = payload.paymentMethods[0]
    })
    builder.addCase(loadInfo.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(createMethod.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createMethod.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.paymentMethods = payload.content
    })
    builder.addCase(createMethod.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(updateMethod.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.paymentMethods = payload.content
    })
    builder.addCase(deleteMethod.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.paymentMethods = payload.content
    })
  }
})

export default paymentMethodsSlice.reducer

export const { setErrors, setModal, setModalDelete, setSelectedPaymentMethodInCart, setBanco } =
  paymentMethodsSlice.actions
