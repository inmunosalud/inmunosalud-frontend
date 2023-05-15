// ** React Imports
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import DialogContentText from '@mui/material/DialogContentText'
import { setModalUpdate, setShowConfirmModal, updateConstants } from 'src/store/constants'
import DialogForm from './DialogForm'
const DialogConstants = ({ open = false, body = {} }) => {
  const { showConfirmModal } = useSelector(state => state.constants)

  const [authPassword, setAuthPassword] = React.useState('')

  const dispatch = useDispatch()

  const handleDialogSubmit = () => {
    dispatch(updateConstants({ body: body, headers: { password: authPassword } }))
    dispatch(setShowConfirmModal(false))
  }

  const handleClose = () => dispatch(setModalUpdate(false))

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {'Estás seguro que quieres editar las constantes del sistema'}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button onClick={() => dispatch(setShowConfirmModal(true))}>{'Confirmar'}</Button>
        </DialogActions>
      </Dialog>
      <DialogForm
        onClick={handleDialogSubmit}
        open={showConfirmModal}
        handleClose={() => {
          dispatch(setModalUpdate(false))
          dispatch(setShowConfirmModal(false))
        }}
        setAuthPass={setAuthPassword}
      ></DialogForm>
    </React.Fragment>
  )
}

export default DialogConstants
