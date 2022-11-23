import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PROYECT, api_post, api_get } from '../../services/api'

//actions
export const loadGeneralData = createAsyncThunk('general/loadGeneralData', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${PROYECT}/users/dashboard`, auth)

    console.log(response)

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
  data: null
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload
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
  }
})

export default generalSlice.reducer

export const { setErrors } = generalSlice.actions
