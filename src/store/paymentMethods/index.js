import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//api
import {
  api_post,
  api_get,
  api_patch,
  api_delete,
  PROJECT_PAYMENT_METHODS,
  PROJECT_ADDRESS,
  OPENPAY_ID,
  OPENPAY_KEY
} from '../../services/api'
import { setAddresses } from '../address'

import { openSnackBar } from '../notifications'
import { nextStep } from '../register'

//actions

export const createMethod = createAsyncThunk('paymentMethods/newMethod', async ({ body, uuid }, thunkApi) => {
  console.log('payment methods body', body)
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const user = thunkApi.getState().users.user

  if (body.cardUse === 'Pago') {
    const openPay = thunkApi.getState().paymentMethods.openPay
    const deviceSessionId = thunkApi.getState().paymentMethods.deviceSessionId
    const openpayUserId = user.openpay.openpayUserId

    openPay.setId(OPENPAY_ID)
    openPay.setApiKey(OPENPAY_KEY)
    openPay.setSandboxMode(true)
    openPay.getSandboxMode()
    const tokenBody = {
      card_number: body.cardNumber,
      holder_name: body.nameOnCard,
      expiration_year: body.year.slice(2),
      expiration_month: body.month,
      cvv2: body.cvc
    }

    var openpayTokenId
    const tokenPromise = new Promise((resolve, reject) => {
      openPay.token.create(
        tokenBody,
        response => {
          openpayTokenId = response.data.id
          resolve(openpayTokenId)
        },
        onError => {
          console.log('error', onError)
          reject(onError)
        }
      )
    })

    try {
      await tokenPromise
      const paymentBody = {
        alias: body.alias,
        cardUse: body.cardUse,
        nameOnCard: body.nameOnCard,
        beneficiary: 'prueba',
        tokenId: openpayTokenId,
        deviceSessionId: deviceSessionId,
        openpayUserId: openpayUserId,
        bank: body.bank ? body.bank : '',
        shippingPayment: body.shippingPayment
      }

      const response = await api_post(`${PROJECT_PAYMENT_METHODS}/payment-methods/${uuid}`, paymentBody, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      thunkApi.dispatch(setModal(false))
      thunkApi.dispatch(loadInfo(uuid))
      thunkApi.dispatch(nextStep())
      console.log('response payment methods Pago', response)
      return response
    } catch (error) {
      const data = error.response.data
      console.log('error', error)
      if (data.message) {
        thunkApi.dispatch(openSnackBar({ open: true, message: data.message, severity: 'error' }))
        thunkApi.dispatch(setModal(false))
      }

      return thunkApi.rejectWithValue('error')
    }
  } else if (body.cardUse === 'Cobro') {
    try {
      const paymentBody = {
        cardUse: body.cardUse,
        beneficiary: body.beneficiary,
        bank: body.bank,
        clabe: body.clabe
      }

      const response = await api_post(`${PROJECT_PAYMENT_METHODS}/payment-methods/${uuid}`, paymentBody, auth)
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

export const deleteMethod = createAsyncThunk('user/deleteMethod', async ({ id, uuid }, thunkApi) => {
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

  try {
    const response = await api_get(`${PROJECT_PAYMENT_METHODS}/payment-methods/user/${uuid}`, auth)
    return setPaymentMethods(response.content)
  } catch (error) {
    return thunkApi.rejectWithValue(error)
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

export const setMonthlyPaymentMethod = createAsyncThunk(
  'payment-methods/setMonthlyPaymentMethod',
  async (id, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_patch(`${PROJECT_PAYMENT_METHODS}/payment-methods/shippingPayment/${id}`, {}, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
      return setPaymentMethods(response.content)
    } catch (error) {
      const errMessage = error?.response?.data?.message
      thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
      return thunkApi.rejectWithValue('error')
    }
  }
)

const setPaymentMethods = responsePaymentMethods => {
  let paymentInfo = {}
  paymentInfo.paymentMethods = responsePaymentMethods.filter(method => method.cardUse === 'Pago')
  paymentInfo.clabe = responsePaymentMethods.find(method => method.cardUse === 'Cobro')
  return paymentInfo
}

const initialState = {
  // register
  isLoading: false,
  formErrors: null,
  /* users table */
  paymentMethods: [],
  clabe: {},
  bank: '',
  //modal props
  isOpen: false,
  isOpenDelete: false,

  /* method selected */
  selectedPaymentMethod: null,
  isSelectedPaymentMethod: false,

  openPay: {},
  deviceSessionId: ''
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
      state.selectedPaymentMethod = payload
      state.isSelectedPaymentMethod = true
    },
    setBank: (state, { payload }) => {
      state.bank = payload
    },
    setOpenPay: (state, { payload }) => {
      state.openPay = payload
    },
    setDeviceSessionId: (state, { payload }) => {
      state.deviceSessionId = payload
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
      state.clabe = payload.clabe ?? '' //creshea en el registro por no estar declarado
      state.bank = payload?.clabe?.bank || ''
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
    builder.addCase(setMonthlyPaymentMethod.pending, state => {
      state.isLoading = false
    })
    builder.addCase(setMonthlyPaymentMethod.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.paymentMethods = payload.paymentMethods
      state.clabe = payload.clabe ?? '' //creshea en el registro por no estar declarado
      state.bank = payload?.clabe?.bank || ''
      state.selectedPaymentMethod = payload.paymentMethods[0]
    })
  }
})

export default paymentMethodsSlice.reducer

export const {
  setErrors,
  setModal,
  setModalDelete,
  setSelectedPaymentMethodInCart,
  setBank,
  setOpenPay,
  setDeviceSessionId
} = paymentMethodsSlice.actions
