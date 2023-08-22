import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { PROJECT_CONTRACT, PROYECT, api_delete, api_get, api_patch, api_post } from '../../services/api'

import { PROFILES_USER } from 'src/configs/profiles'
import { openSnackBar } from '../notifications'
import { nextStep, setActiveStep } from '../register'

async function mergePDFs(pdfs) {
  const mergedPdf = await PDFDocument.create()

  for (const pdfUrl of pdfs) {
    const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer())
    const pdf = await PDFDocument.load(pdfBytes)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach(page => mergedPdf.addPage(page))
  }

  return await mergedPdf.save()
}

//actions
export const createUser = createAsyncThunk('user/newUser', async (body, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users`, body)
    const newUser = {
      user: {
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
    const data = error.response.data

    if (data.content.errors) {
      thunkApi.dispatch(setErrors(data.content.errors.body))
    } else {
      const newErrors = []
      newErrors.push({ msg: data.message })
      thunkApi.dispatch(setErrors(newErrors))
    }
    return thunkApi.rejectWithValue('error')
  }
})

export const usersList = createAsyncThunk('user/list', async () => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const response = await api_get(`${PROYECT}/users`, auth)
  return response
})

export const sendNewUser = createAsyncThunk('user/sendNewUser', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROYECT}/users/admin`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    Router.push('/dashboards/general/')
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async ({ body, uuid, loadUserData }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${PROYECT}/users/${uuid}`, body, auth)
    thunkApi.dispatch(nextStep())
    thunkApi.dispatch(setModal(false))
    // If param loadUserData values is true, load the user info again
    loadUserData && thunkApi.dispatch(getUserInfo(uuid))
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    //thunkApi.dispatch(usersList())
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
    const response = await api_delete(`${PROYECT}/users/${body.id}`, body, auth)
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

export const createContract = createAsyncThunk('contracts/newContract', async ({ body, uuid }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }

  try {
    const response = await api_post(`${PROJECT_CONTRACT}/users/contract/${uuid}`, body, auth)
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

//update Password
export const updatePassword = createAsyncThunk('users/password', async (body, thunkApi) => {
  debugger
  try {
    const response = await api_patch(`${PROYECT}/users/password`, body)
    debugger
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    debugger
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

//Recover Password
export const recoverPassword = createAsyncThunk('users/passwordRecoveryCode', async (body, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users/passwordRecoveryCode`, body)
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

//get user info
export const getUserInfo = createAsyncThunk('user/infoUser', async id => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const response = await api_get(`${PROYECT}/users/${id}`, auth)
  return response
})

//get link to register user in stripe
export const stripeRegister = createAsyncThunk('user/stripeAccountLink', async id => {
  debugger
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const response = await api_get(`${STRIPE}/users/stripeAccountLink/${id}`, auth)

  return response
})

export const sendVerificationCode = createAsyncThunk('user/verificationCode', async (email, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users/verificationCode`, email)
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
    const response = await api_post(`${PROYECT}/users/validateVerificationCode`, body)
    localStorage.setItem('im-user', response.content.token)
    if (response.content.profile === PROFILES_USER.affiliatedUser) {
      thunkApi.dispatch(setActiveStep(0))
      Router.push('/register/address')
    } else {
      Router.push('/ecommerce/products')
    }
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  // register
  isLoadingRegister: false,
  registerErrors: null,
  /* users table */
  users: [],
  loading: false,
  token: null,
  error: false,
  message: '',
  // new user
  isLoading: 'idle',
  user: {},
  //user contract
  contract: {},
  //edit user
  showModal: false,
  modalRow: null,

  //user info
  userInfo: {},
  //email
  email: '',

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
    //create user
    builder.addCase(sendNewUser.pending, (state, action) => {
      state.isLoading = 'pending'
    })
    builder.addCase(sendNewUser.fulfilled, (state, { payload }) => {
      const newUser = payload.content
      const values = [...state.users, newUser]
      state.isLoading = 'resolved'
      state.users = values
    })
    builder.addCase(sendNewUser.rejected, (state, action) => {
      state.isLoading = 'rejected'
    })
    //update user
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const updatedUser = payload?.content
      state.users = state.users.filter(usr => usr.id !== updatedUser.id).concat(updatedUser)
    })
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.users = payload.content
    })
    builder.addCase(createContract.fulfilled, (state, { payload }) => {
      // Llamar a la función mergePDFs para obtener el PDF combinado
      const combinedPdf = mergePDFs(payload.content)

      // Actualizar el estado con el PDF combinado
      state.contract = combinedPdf // Agregar el PDF combinado al estado
    })
    //get info user
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      const { content } = payload
      state.userInfo = content
    })
    //get stripe link
    builder.addCase(stripeRegister.fulfilled, (state, { payload }) => {
      const { content } = payload
      debugger
      state.stripeLink = content.url

      window.open(content.url, '_blank')
    })
    //Recover password
    builder.addCase(recoverPassword.fulfilled, state => {
      state.patchPassword = true
    })
    builder.addCase(recoverPassword.rejected, state => {
      state.patchPassword = false
    })
    //Validate new user
    builder.addCase(validateNewUser.fulfilled, (state, { payload }) => {
      const { content } = payload
      state.user = content
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
  setRecoveryCode
} = usersSlice.actions
