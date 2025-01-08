import { useState } from 'react'
import { createOrder } from 'src/store/orders'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import SendOutline from 'mdi-material-ui/SendOutline'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { openSnackBar } from 'src/store/notifications'
import { setOpenAddressesModal, setOpenPaymentsModal } from 'src/store/cart'
import { setCvv } from 'src/store/orders'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const CartActions = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { cvv } = useSelector(state => state.orders)
  const { user } = useSelector(state => state.session)
  const [cvvInput, setCvvInput] = useState('')
  const [cvvError, setCvvError] = useState(false)
  const [open, setOpen] = useState(false)
  const { constants } = useSelector(state => state.constants)

  const { selectedPayment, selectedAddress, products, total, isLoading } = useSelector(state => state.cart)

  const handleCheckout = () => {
    if (products.length === 0) {
      dispatch(openSnackBar({ open: true, message: 'Agregue productos al carrito', severity: 'error' }))
      return
    }

    if (!selectedPayment) {
      dispatch(openSnackBar({ open: true, message: 'Selecciona tu dirección y método de pago', severity: 'error' }))
      return
    }
    if (!selectedAddress) {
      dispatch(openSnackBar({ open: true, message: 'Selecciona tu dirección y método de pago', severity: 'error' }))
      return
    }
    if (selectedPayment.id === 'store') {
      router.push('/ecommerce/checkout')
      return
    }
    if (selectedPayment.id === 'mercadoPago') {
      const body = {
        idAddress: selectedAddress.id,
        type: selectedPayment.id,
        products: products.map(product => {
          return { id: product.id, quantity: product.quantity }
        })
      }
      dispatch(createOrder({ idUser: user.id, body }))
      return
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    if (cvv === '') {
      dispatch(openSnackBar({ open: true, message: 'Ingrese el CVV de la tarjeta', severity: 'error' }))
      return
    }
    setOpen(false)
    router.push('/ecommerce/checkout')
  }

  const handleCancel = () => {
    dispatch(setCvv(''))
    setOpen(false)
  }

  const handleCvvChange = event => {
    const inputValue = event.target.value
    setCvvInput(inputValue)
    if (/^\d{3,4}$/.test(inputValue)) {
      dispatch(setCvv(inputValue))
      setCvvError(false)
    } else {
      dispatch(setCvv(''))
      setCvvError(true)
    }
  }

  const handleSelectPaymentMethod = () => {
    dispatch(setOpenPaymentsModal(true))
  }

  const handleSelectAddressMethod = () => {
    dispatch(setOpenAddressesModal(true))
  }

  return (
    <>
      <Box>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Button
              disabled={isLoading}
              fullWidth
              sx={{ mb: 3.5 }}
              variant='contained'
              startIcon={<SendOutline />}
              onClick={handleCheckout}
            >
              Checkout
            </Button>

            <Button fullWidth sx={{ mb: 3.5 }} variant='outlined' onClick={handleSelectPaymentMethod}>
              Seleccionar método de pago
            </Button>

            <Button fullWidth variant='outlined' sx={{ mb: 3.5 }} onClick={handleSelectAddressMethod}>
              Seleccionar dirección
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese el CVV</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 2 }}
            value={cvvInput}
            label='CVV'
            onChange={handleCvvChange}
            placeholder='000'
            aria-describedby='payment-cvc'
            inputProps={{ maxLength: 4, inputMode: 'numeric' }}
          />
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant='contained' sx={{ mr: 1 }} onClick={handleConfirm} color='primary'>
              Confirmar
            </Button>
            <Button variant='outlined' onClick={handleCancel} color='secondary'>
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CartActions
