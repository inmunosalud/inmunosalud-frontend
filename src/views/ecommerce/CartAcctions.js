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

// ** Icons Imports
import SendOutline from 'mdi-material-ui/SendOutline'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { openSnackBar } from 'src/store/notifications'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const CartActions = ({ onMethodClick = () => {}, onAddressClick = () => {} }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { selectedPaymentMethod } = useSelector(state => state.paymentMethods)
  const { selectedAddressInCard } = useSelector(state => state.address)

  const handleCheckout = () => {
    if (selectedPaymentMethod && selectedAddressInCard) router.push('/ecommerce/checkout')
    else dispatch(openSnackBar({ open: true, message: 'Selecciona tu dirección y método de pago', severity: 'error' }))
  }

  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<SendOutline />} onClick={handleCheckout}>
            Checkout
          </Button>

          <Button fullWidth sx={{ mb: 3.5 }} variant='outlined' onClick={onMethodClick}>
            Seleccionar metodo de pago
          </Button>

          <Button fullWidth variant='outlined' sx={{ mb: 3.5 }} onClick={onAddressClick}>
            Seleccionar direccion
          </Button>
        </CardContent>
      </Card>
      {/* <Select fullWidth defaultValue='Internet Banking' sx={{ mb: 4 }}>
        <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
        <MenuItem value='Debit Card'>Debit Card</MenuItem>
        <MenuItem value='Credit Card'>Credit Card</MenuItem>
        <MenuItem value='Paypal'>Paypal</MenuItem>
        <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
      </Select> */}
    </Box>
  )
}

export default CartActions
