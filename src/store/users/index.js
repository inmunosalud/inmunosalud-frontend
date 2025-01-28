import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { USERS, api_delete, api_get, api_patch, api_post } from '../../services/api'
import { PROFILES_USER } from 'src/configs/profiles'
import { openSnackBar } from '../notifications'
import { nextStep, setActiveStep } from '../register'
import { updateSession } from '../session'
import toast from 'react-hot-toast'
//actions
export const createUser = createAsyncThunk('user/newUser', async (body, thunkApi) => {
  try {
    const response = await api_post(`${USERS}/users`, body)
    const newUser = {
      user: {
        firstName: response.content.firstName,
        lastName: response.content.lastName,
        profile: response.content.profile,
        recommenderId: response.content.recommenderId,
        email: response.content.email,
        id: response.content.id ?? ''
      },
      token: response.content.token
    }
    Router.push({ pathname: '/register/welcome' })
    return newUser
  } catch (error) {
    toast.error(error.response.data.message)

    return thunkApi.rejectWithValue('error')
  }
})

export const usersList = createAsyncThunk('user/list', async ({ startDate, endDate }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const queryString = []
  if (startDate) {
    queryString.push(`startDate=${startDate}`)
  }
  if (endDate) {
    queryString.push(`endDate=${endDate}`)
  }
  const query = queryString.length ? `?${queryString.join('&')}` : ''

  try {
    const response = await api_get(`${USERS}/users${query}`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const sendNewUser = createAsyncThunk('user/send-new-user', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${USERS}/users/admin`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    Router.push('/dashboards/general/')
    return response
  } catch (error) {
    console.log(error)
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createPartner = createAsyncThunk('/join/register', async ({ body, id }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${USERS}/users/affiliate/${id}`, body, auth)

    thunkApi.dispatch(updateSession(response.content))
    Router.push({ pathname: '/network/' })
    toast.success('Te has afiliado con éxito')
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async ({ body, uuid, isAdministrator }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = isAdministrator
      ? await api_patch(`${USERS}/users/admin/${uuid}`, body, auth)
      : await api_patch(`${USERS}/users/${uuid}`, body, auth)
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(updateSession(response.content))

    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))

    return thunkApi.rejectWithValue('error')
  }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async ({ body, headers }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}`, Password: headers.password } }
  try {
    const response = await api_delete(`${USERS}/users/${body.id}`, body, auth)
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

export const createContract = createAsyncThunk('contracts/createContract', async ({ body, uuid }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }

  try {
    const response = await api_post(`${USERS}/users/contract/${uuid}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    thunkApi.dispatch(setModal(false))
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

//Recover Password
export const sendPasswordVerificationCode = createAsyncThunk('users/verification-code', async (email, thunkApi) => {
  try {
    const response = await api_post(`${USERS}/users/password-recovery-code`, email)

    toast.success('Se ha enviado un código de verificación a su correo electrónico')
    return response
  } catch (error) {
    toast.error(error.message)
    return thunkApi.rejectWithValue('error')
  }
})

export const validatePasswordRecoveryCode = createAsyncThunk(
  'users/validatePasswordRecoveryCode',
  async (body, thunkApi) => {
    try {
      const response = await api_post(`${USERS}/users/validate-password-recovery-code`, body)
      return response
    } catch (error) {
      toast.error('El código de verificación no es valido')
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const recoverPassword = createAsyncThunk('/users/password', async (body, thunkApi) => {
  try {
    const response = await api_patch(`${USERS}/users/password`, body)
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

//validate Verification Code
export const validateVerificationCode = createAsyncThunk('users/validateVerificationCode', async (body, thunkApi) => {
  try {
    const response = await api_post(`${USERS}/users/validate-verification-code`, body)
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

//get user network details
export const getNetworkDetails = createAsyncThunk(
  'user/network-detail',
  async ({ id, startDate, endDate }, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    let queryString = ''

    if (startDate && endDate) {
      queryString = new URLSearchParams({ startDate, endDate }).toString()
      queryString = `?${queryString}`
    }

    try {
      const response = await api_get(`${USERS}/users/network/detail/${id}${queryString}`, auth)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)
//get user info
export const getUserInfo = createAsyncThunk('user/infoUser', async id => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const response = await api_get(`${USERS}/users/${id}`, auth)
  return response
})

export const getNetworkById = createAsyncThunk('user/networkUser', async id => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const response = await api_get(`${USERS}/users/network/${id}`, auth)
  return response
})

export const sendVerificationCode = createAsyncThunk('user/verificationCode', async (email, thunkApi) => {
  try {
    const response = await api_post(`${USERS}/users/verification-code`, email)
    alert('Se ha enviado un código de verificación a su correo electrónico')
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const validateNewUser = createAsyncThunk('user/validateNewUser', async (body, thunkApi) => {
  try {
    const response = await api_post(`${USERS}/users/validate-verification-code`, body)
    localStorage.setItem('im-user', response.content.token)

    Router.push('/landing-page/home/')

    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

//TaxInfo
export const getTaxInfo = createAsyncThunk('user/getTaxInfo', async ({ id }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${USERS}/users/tax-info/${id}`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const createTaxInfoCommission = createAsyncThunk(
  'user/createTaxInfoCommission',
  async ({ body, uuid }, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
      const response = await api_patch(`${USERS}/users/tax-info/commission/${uuid}`, body, auth)
      thunkApi.dispatch(openSnackBar({ open: true, message: 'Actualizado.', severity: 'success' }))
      return response
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const createTaxInfoOrder = createAsyncThunk('user/createTaxInfoOrder', async ({ body, uuid }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${USERS}/users/tax-info/order/${uuid}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: 'Actualizado.', severity: 'success' }))
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  // register
  isLoadingRegister: false,
  registerErrors: null,
  isAffiliated: null,
  /* users table */
  users: [],
  loading: false,
  token: null,
  error: false,
  message: '',
  network: {},
  commissionInvoice: null,
  orderInvoice: null,
  // new user
  isLoading: false,
  user: {},
  //user contract
  contract: {},
  //edit user
  showModal: false,
  modalRow: null,

  //user info
  userInfo: null,
  firstName: '',
  lastName: '',
  //email
  email: '',

  networkDetails: {}, // { [userId]: data }
  loadingDetails: {},

  stripeLink: '',

  //detele modal
  showDelete: false,

  //confirm modal
  showConfirmModal: false,

  //redirect modal
  showRedirectModal: false,

  //Patch password
  patchPassword: false,

  //RecoveryCode
  recoveryCode: 0
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.registerErrors = payload
    },
    setModal: (state, { payload }) => {
      state.showModal = payload
    },
    setIsAffiliated: (state, { payload }) => {
      state.isAffiliated = payload
    },
    setModalRow: (state, { payload }) => {
      state.modalRow = payload
    },
    setModalDelete: (state, { payload }) => {
      state.showDelete = payload
    },
    setShowConfirmModal: (state, { payload }) => {
      state.showConfirmModal = payload
    },
    setShowRedirectModal: (state, { payload }) => {
      state.showRedirectModal = payload
    },
    setUser: (state, { payload }) => {
      state.token = payload.token
      state.user = payload.user
      state.email = payload.user.email
      state.name = payload.user.name
      localStorage.setItem('im-user', payload.token)
    },
    setRecoveryCode: (state, { payload }) => {
      state.recoveryCode = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoadingRegister = true
      state.registerErrors = null
    })
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      const { user, token } = payload
      state.isLoadingRegister = false
      state.registerErrors = null
      state.isLoading = false
      state.token = token
      state.user = user
      state.email = user.email
      state.firstName = user.firstName
      state.lastName = user.lastName
      localStorage.setItem('im-user', token)
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoadingRegister = false
    })
    //get users tables
    builder.addCase(usersList.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(usersList.fulfilled, (state, action) => {
      const {
        payload: { content }
      } = action
      state.loading = false
      state.users = [...content]
    })
    builder.addCase(usersList.rejected, (state, action) => {
      state.loading = true
    })
    //create user
    builder.addCase(sendNewUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(sendNewUser.fulfilled, (state, { payload }) => {
      const newUser = payload.content
      const values = [...state.users, newUser]
      state.isLoading = false
      state.users = values
    })
    builder.addCase(sendNewUser.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(sendPasswordVerificationCode.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(sendPasswordVerificationCode.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(sendPasswordVerificationCode.rejected, (state, action) => {
      state.isLoading = false
    })
    //update user
    builder.addCase(updateUser.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const updatedUser = payload?.content
      state.users = state.users.filter(usr => usr.id !== updatedUser.id).concat(updatedUser)
    })
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.users = payload.content
    })
    builder.addCase(createContract.pending, (state, { payload }) => {
      state.isLoadingRegister = true
    })
    builder.addCase(createContract.fulfilled, (state, { payload }) => {
      state.contract = payload
      state.isLoadingRegister = false
    })
    builder.addCase(createContract.rejected, (state, { payload }) => {
      state.isLoadingRegister = false
    })
    //get info user
    builder.addCase(getUserInfo.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      const { content } = payload
      state.isLoading = false
      state.userInfo = content
    })
    builder.addCase(getNetworkById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(getNetworkById.fulfilled, (state, { payload }) => {
      const { content } = payload
      state.isLoading = false
      state.network = content
    })
    builder.addCase(getNetworkById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(getNetworkDetails.pending, (state, action) => {
      state.loadingDetails[action.meta.arg] = true
    })
    builder.addCase(getNetworkDetails.fulfilled, (state, { payload }) => {
      state.loadingDetails[payload.content.user.id] = false
      state.networkDetails[payload.content.user.id] = payload.content
    })
    builder.addCase(getNetworkDetails.rejected, (state, { payload }) => {})
    //Recover password
    builder.addCase(recoverPassword.pending, state => {
      state.isLoading = true
    })
    builder.addCase(recoverPassword.fulfilled, state => {
      state.isLoading = false
    })
    builder.addCase(recoverPassword.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(validatePasswordRecoveryCode.pending, state => {
      state.isLoading = true
    })
    builder.addCase(validatePasswordRecoveryCode.fulfilled, state => {
      state.isLoading = false
    })
    builder.addCase(validatePasswordRecoveryCode.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createPartner.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createPartner.fulfilled, (state, { payload }) => {
      const { content } = payload

      state.isLoading = false
      state.userInfo = content
    })
    builder.addCase(createPartner.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(validateVerificationCode.pending, state => {
      state.isLoading = true
    })
    builder.addCase(validateVerificationCode.fulfilled, state => {
      state.isLoading = false
      state.patchPassword = true
    })
    builder.addCase(validateVerificationCode.rejected, state => {
      state.isLoading = false
      state.patchPassword = false
    })
    //Validate new user
    builder.addCase(validateNewUser.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(validateNewUser.fulfilled, (state, { payload }) => {
      const { content } = payload
      state.user = content
      state.isLoading = false
    })
    builder.addCase(validateNewUser.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    //Taxinfo
    builder.addCase(getTaxInfo.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getTaxInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.commissionInvoice = payload.content.commissionInvoice
      state.orderInvoice = payload.content.orderInvoice
    })

    builder.addCase(getTaxInfo.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(createTaxInfoCommission.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createTaxInfoCommission.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.commissionInvoice = payload.content.commissionInvoice
    })

    builder.addCase(createTaxInfoCommission.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(createTaxInfoOrder.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createTaxInfoOrder.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.orderInvoice = payload.content.orderInvoice
    })
    builder.addCase(createTaxInfoOrder.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  }
})

export default usersSlice.reducer

export const {
  setErrors,
  setModal,
  setModalRow,
  setModalDelete,
  setUser,
  setShowConfirmModal,
  setShowRedirectModal,
  setRecoveryCode,
  setIsAffiliated
} = usersSlice.actions
