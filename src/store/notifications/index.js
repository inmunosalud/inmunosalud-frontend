import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  message: '',
  severity: '',
  handleClose: () => {}
}

export const snackbarsSlice = createSlice({
  name: 'snackbars',
  initialState,
  reducers: {
    openSnackBar(state, action) {
      const {
        payload: { message, open, severity }
      } = action

      state.message = message
      state.open = open
      state.severity = severity
    },
    closeSnackBar(state, action) {
      state.open = false
    }
  },
  extraReducers: builder => {}
})

export const { openSnackBar, closeSnackBar } = snackbarsSlice.actions

export default snackbarsSlice.reducer
