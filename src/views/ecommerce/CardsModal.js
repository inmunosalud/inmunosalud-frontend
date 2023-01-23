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

const CardsModal = () => {
  // ** States
  const [open, setOpen] = useState(false)

  // ** Ref
  const descriptionElementRef = useRef(null)

  const handleClickOpen = scrollType => () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
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
      <Button variant='outlined' onClick={handleClickOpen('paper')}>
        scroll=paper
      </Button>

      <Dialog
        open={open}
        scroll='paper'
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Metodos de pago</DialogTitle>
        <DialogContent dividers={'paper'}>
          <PaymentMethods />
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CardsModal
