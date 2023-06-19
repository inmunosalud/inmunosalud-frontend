// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'

import { useDispatch } from 'react-redux'
import { openSnackBar } from 'src/store/notifications'

const SnackbarAlert = ({ severity, isOpen, message }) => {
  // ** State
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(openSnackBar({ open: false, message: '', severity: '' }))
  }

  return (
    <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={3000}>
      <Alert variant='filled' elevation={3} onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
