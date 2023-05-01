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
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import { PaymentMethods } from './PaymentMethods'
import { setModal, createMethod } from 'src/store/paymentMethods'
import DialogBilling from '../components/dialogs/DialogBilling'

const defaultPaymentValues = {
  alias: '',
  month: '',
  year: '',
  cardUse: '',
  nameOnCard: '',
  cardNumber: '',
  cvc: ''
}

const paymentSchema = yup.object().shape({
  alias: yup.string().required(),
  month: yup.string().required(),
  cardUse: yup.string().required(),
  year: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo digitos')
    .min(4, 'Deben ser 4 digitos')
    .max(4, 'Deben ser 4 digitos'),
  cardNumber: yup
    .string()
    .required()
    .matches(/^[\d*]+$/, 'Solo digitos o *')
    .min(16, 'Deben ser 16 digitos')
    .max(16, 'Deben ser 16 digitos'),
  nameOnCard: yup.string().required(),
  cvc: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo digitos')
    .min(3, 'Deben ser 3 digitos')
    .max(3, 'Deben ser 3 digitos')
})

const CardsModal = ({ open = false, onClose = () => {} }) => {
  const dispatch = useDispatch()

  const {
    control: paymentControl,
    handleSubmit,
    formState: { errors: paymentErrors }
  } = useForm({
    defaultValues: defaultPaymentValues,
    resolver: yupResolver(paymentSchema)
  })

  // ** Ref
  const descriptionElementRef = useRef(null)

  const { isOpen } = useSelector(state => state.paymentMethods)
  const { user } = useSelector(state => state.session)

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleNewPayment = () => {
    dispatch(setModal(true))
  }

  const handleEditCardClose = () => {
    dispatch(setModal(false))
  }

  const onPaymentSubmit = values => {
    const body = {
      ...values,
      expDate: `${values.month}/${values.year}`
    }
    dispatch(createMethod({ body, uuid: user.id }))
    handleEditCardClose()
  }

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
        <DialogTitle id='scroll-dialog-title'>Metodos de pago</DialogTitle>
        <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <DialogContent dividers='paper'>
          <PaymentMethods />
          <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1} />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleNewPayment}>
            <Plus />
            Nuevo Metodo
          </Button>
          <Button onClick={onClose}>Confirmar</Button>
        </DialogActions>
      </Dialog>
      <DialogBilling
        isOpen={isOpen}
        onHandleEditCardClose={handleEditCardClose}
        paymentControl={paymentControl}
        paymentErrors={paymentErrors}
        handleSubmit={handleSubmit}
        onPaymentSubmit={onPaymentSubmit}
      />
    </div>
  )
}

export default CardsModal
