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
  const [open, setOpen] = useState(isOpen)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    dispatch(openSnackBar({ open: false, message: '', severity: '' }))
  }

  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
      <Alert variant='filled' elevation={3} onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
