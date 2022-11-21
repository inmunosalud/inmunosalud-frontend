import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const CustomSnackbar = ({
  open = false,
  autoHideDuration = 6000,
  message = '',
  severity = 'success',
  positioned = { vertical: 'top', horizontal: 'right' },
  handleClose = () => {}
}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={positioned}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar
