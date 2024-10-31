import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PROYECT, api_post, api_get } from '../../services/api'
import { setUser } from '../users'

//actions
export const loadSession = createAsyncThunk('general/loadSession', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${PROYECT}/users/data-user`, auth)

    return response.content
  } catch (error) {
    const data = error.response.data

    if (!data.content.errors) {
      const newErrors = []
      newErrors.push({ msg: data.message })
    }

    return thunkApi.rejectWithValue('error')
  }
})
export const loadGeneralData = createAsyncThunk('general/loadGeneralData', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${PROYECT}/users/dashboard`, auth)

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

const initialState = {
  isLoading: false,
  errors: null,
  data: null,
  isLoadingSession: false,
  dataLoaded: false,
  user: {}
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    isDataLoaded: (state, { payload }) => {
      state.dataLoaded = payload
    },
    updateGeneralUser: (state, { payload }) => {
      state.user = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(loadGeneralData.pending, (state, action) => {
      state.isLoading = true
      state.errors = null
    })
    builder.addCase(loadGeneralData.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.errors = null
      state.data = payload.content
    })
    builder.addCase(loadGeneralData.rejected, (state, action) => {
      state.isLoading = false
    })
    // session
    builder.addCase(loadSession.pending, (state, action) => {
      state.isLoadingSession = true
      state.errors = null
    })
    builder.addCase(loadSession.fulfilled, (state, { payload }) => {
      state.isLoadingSession = false
      state.errors = null
      state.user = payload.user
    })
    builder.addCase(loadSession.rejected, (state, action) => {
      state.isLoadingSession = false
    })
  }
})

export default generalSlice.reducer

export const { setErrors, isDataLoaded, updateGeneralUser } = generalSlice.actions
