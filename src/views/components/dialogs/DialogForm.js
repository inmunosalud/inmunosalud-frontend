// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogForm = ({ text, onClick, title, open, handleClose, setAuthPass }) => {
  // ** State

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Confirmar Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Ingrese su contraseña para continuar</DialogContentText>
          <TextField
            id='contraseña'
            autoFocus
            fullWidth
            type='password'
            label='Contraseña'
            onChange={e => setAuthPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={onClick}>Continuar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogForm
