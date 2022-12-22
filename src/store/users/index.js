import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
//api
import { PROYECT, api_post, api_get, api_put, api_delete } from '../../services/api'
import { setLogin } from '../session'

import { openSnackBar } from '../notifications'
import { PROFILES_USER } from 'src/configs/profiles'

//actions
export const createUser = createAsyncThunk('user/newUser', async (body, thunkApi) => {
  try {
    const response = await api_post(`${PROYECT}/users`, body)
    const newUser = {
      user: {
        profile: response.content.profile,
        recommenderId: response.content.recommenderId,
        email: response.content.email,
        id: response.content.id
      },
      token: response.content.token
    }

    thunkApi.dispatch(setLogin(newUser))

    if (body.profile === PROFILES_USER.associatedUser) {
      Router.push('/register/address')
    } else {
      Router.push('/register/welcome')
    }

    return response
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

export const updateUser = createAsyncThunk('user/updateUser', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_put(`${PROYECT}/users/${body.id}`, body, auth)
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    thunkApi.dispatch(usersList())
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(setModal(false))
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_delete(`${PROYECT}/users/${body.id}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    console.log(response)
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
  newUser: {},
  //edit user
  showModal: false,
  modalRow: null,

  //user info
  userInfo: ''
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
    }
  },
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoadingRegister = true
      state.registerErrors = null
    })
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoadingRegister = false
      state.registerErrors = null
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
      const users = state.users.filter(usr => usr.id !== updatedUser.id)
      const values = [...users, updateUser]
      state.users = values
    })
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.users = payload.content
    })
    //get info user
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      console.log('payload user info', payload)
      const { content } = payload
      state.userInfo = content
    })
  }
})

export default usersSlice.reducer

export const { setErrors, setModal, setModalRow } = usersSlice.actions
