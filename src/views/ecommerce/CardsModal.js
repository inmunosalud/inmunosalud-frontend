// ** React Imports
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import Close from 'mdi-material-ui/Close'
import Plus from 'mdi-material-ui/Plus'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import { PaymentMethods } from './PaymentMethods'
import { setModal, createMethod } from 'src/store/paymentMethods'
import DialogBilling from '../components/dialogs/DialogBilling'
import { setOpenPaymentsModal } from 'src/store/cart'

const defaultPaymentValues = {
  alias: '',
  expiry: '',
  cardUse: 'Pago',
  nameOnCard: '',
  cardNumber: '',
  cvc: ''
}

const paymentSchema = yup.object().shape({
  alias: yup.string().required(),
  expiry: yup.string().required(),
  cardUse: yup.string().required(),
  cardNumber: yup
    .string()
    .required()
    .matches(/^[\d*]+$/, 'Solo dígitos o *')
    .min(15, 'Deben ser al menos 15 dígitos (solo American Express)')
    .max(16, 'Deben ser maximo 16 dígitos'),
  nameOnCard: yup.string().required(),
  cvc: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(3, 'Deben ser 3 dígitos mínimo')
    .max(4, 'Deben ser 4 dígitos máximo')
})

const CardsModal = () => {
  const dispatch = useDispatch()

  const {
    reset,
    control: paymentControl,
    handleSubmit,
    getValues,
    formState: { errors: paymentErrors }
  } = useForm({
    defaultValues: defaultPaymentValues,
    resolver: yupResolver(paymentSchema)
  })

  // ** Ref
  const descriptionElementRef = useRef(null)

  const { isOpen, isLoading } = useSelector(state => state.paymentMethods)
  const { isPaymentsModalOpen } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.session)

  useEffect(() => {
    if (isPaymentsModalOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isPaymentsModalOpen])

  const handleNewPayment = () => {
    reset(defaultPaymentValues)
    dispatch(setModal(true))
  }

  const handleEditCardClose = () => {
    dispatch(setModal(false))
  }

  const onPaymentSubmit = values => {
    const body = {
      ...values,
      expDate: values.expiry
    }
    dispatch(createMethod({ body, uuid: user.id }))
    handleEditCardClose()
  }

  const handleCloseModal = () => {
    dispatch(setOpenPaymentsModal(false))
  }

  // const handleSubmitCustom = e => {
  //   e.preventDefaults()
  //   console.log(e)
  // }

  return (
    <Box>
      <Dialog
        open={isPaymentsModalOpen}
        onClose={handleCloseModal}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        keepMounted={false} // Prevents DOM mounting when closed
        PaperProps={{
          sx: {
            width: { xs: '90vw', md: '600px' },
            maxHeight: '90vh', // Limits dialog height
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <DialogTitle id='scroll-dialog-title'>Métodos de pago</DialogTitle>
        <IconButton size='small' onClick={handleCloseModal} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            flex: 1, // Fills available space
            overflowY: 'auto' // Adds vertical scrollbar
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                width: '400px'
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <PaymentMethods onClose={handleCloseModal} />
              <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1} />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ display: 'flex' }}>
          {!isLoading && (
            <Button onClick={handleNewPayment} sx={{ mt: 5 }}>
              <Plus />
              Nuevo Método
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <DialogBilling
        isOpen={isOpen}
        onHandleEditCardClose={handleEditCardClose}
        paymentControl={paymentControl}
        getValues={getValues}
        paymentErrors={paymentErrors}
        handleSubmit={handleSubmit}
        onPaymentSubmit={onPaymentSubmit}
      />
    </Box>
  )
}

export default CardsModal
