import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PROJECT_ADDRESS, api_post, api_get, api_put, api_delete } from '../../services/api'

import { openSnackBar } from '../notifications'

const initialState = {
  activeStep: 0
}

export const addressSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setActiveStep: (state, { payload }) => {
      state.activeStep = payload
    },
    nextStep: (state, { payload }) => {
      state.activeStep = state.activeStep + 1
    }
  },
  extraReducers: builder => {}
})

export default addressSlice.reducer

export const { setActiveStep, nextStep } = addressSlice.actions
