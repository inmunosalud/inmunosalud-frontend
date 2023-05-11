// ** React Imports
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import DialogContentText from '@mui/material/DialogContentText'
import { deleteUser, setModalDelete, setShowConfirmModal } from 'src/store/users'
import DialogForm from './DialogForm'
const DialogDelete = props => {
  const { showConfirmModal } = useSelector(state => state.users)

  const [authPasword, setAuthPassword] = React.useState('')

  const dispatch = useDispatch()

  const handleDialogSubmit = () => {
    dispatch(setShowConfirmModal(false))
    dispatch(deleteUser({ body: props.item, headers: { password: authPasword } }))
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
          <Button onClick={() => dispatch(setShowConfirmModal(true))}>{props.buttonText}</Button>
        </DialogActions>
      </Dialog>
      <DialogForm
        onClick={handleDialogSubmit}
        open={showConfirmModal}
        handleClose={() => {
          dispatch(setModalDelete(false))
          dispatch(setShowConfirmModal(false))
        }}
        setAuthPass={setAuthPassword}
      ></DialogForm>
    </React.Fragment>
  )
}

export default DialogDelete
