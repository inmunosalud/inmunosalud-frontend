// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import { PaymentMethods } from './PaymentMethods'
import { AddressList } from './AddressList'

const AddressModal = ({ open = false, onClose = () => {} }) => {
  // ** Ref
  const descriptionElementRef = useRef(null)

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div className='demo-space-x'>
      <Dialog
        open={open}
        scroll='paper'
        maxWidth='md'
        onClose={onClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Direcciones</DialogTitle>
        <DialogContent dividers={'paper'}>
          <AddressList />
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddressModal
