// ** React Imports
import * as React from 'react'
import { useDispatch } from 'react-redux'
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import DialogContentText from '@mui/material/DialogContentText'
import { deleteUser } from 'src/store/users'
const DialogDelete = props => {
  const dispatch = useDispatch()

  const handleDialogSubmit = () => {
    dispatch(deleteUser(props.item))
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={props.handleClose}>Cancelar</Button>
          <Button onClick={handleDialogSubmit}>{props.buttonText}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DialogDelete
