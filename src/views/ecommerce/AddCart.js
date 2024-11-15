// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import Image from 'next/image'

//**next imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled, alpha, useTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styles
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { React } from 'mdi-material-ui'
import { setAddress, setPayment, updateCart } from 'src/store/cart'
import CustomSnackbar from '../components/snackbar/CustomSnackbar'
import { closeSnackBar, openSnackBar } from 'src/store/notifications'
import { getMonthlyPurchase } from 'src/store/monthlypurchase'
import { setCvv } from 'src/store/orders'
import { getConstants } from 'src/store/constants'
import { isDataLoaded } from 'src/store/dashboard/generalSlice'

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const now = new Date()

const AddCard = props => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** Selectors
  const monthlyPaymentProducts = useSelector(state => state.monthlyPurchase.products)
  const { total, products, id, selectedPayment, selectedAddress } = useSelector(state => state.cart)
  const { selectedPaymentMethod } = useSelector(state => state.paymentMethods)
  const { selectedAddressInCart } = useSelector(state => state.address)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { user } = useSelector(state => state.session)
  const { constants } = useSelector(state => state.constants)

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  // ** Deletes form
  const deleteForm = idProduct => {
    const body = {
      id: idProduct,
      quantity: 0
    }

    dispatch(updateCart({ id, body }))
  }

  useEffect(() => {
    dispatch(setPayment(selectedPaymentMethod))
    dispatch(setAddress(selectedAddressInCart))
  }, [selectedPaymentMethod, selectedAddressInCart])

  useEffect(() => {
    dispatch(getConstants())
    dispatch(isDataLoaded(true))
  }, [])

  // useEffect(() => {
  //   if (products.filter(product => !product.canBeRemoved).length > 0) {
  //     dispatch(getMonthlyPurchase(user.id))
  //     dispatch(
  //       openSnackBar({
  //         open: true,
  //         message: 'No es posible eliminar algunos productos porque forman parte de tu compra mínima inicial.',
  //         severity: 'info'
  //       })
  //     )
  //   }
  // }, [dispatch])

  useEffect(() => {
    dispatch(setCvv(''))
  }, [])

  const handleUpdate = (idProduct, quantity, canBeRemoved) => {
    const parsedQuantity = parseInt(quantity, 10)
    const updatedQuantity = parsedQuantity

    const body = {
      id: idProduct,
      quantity: updatedQuantity
    }

    dispatch(updateCart({ id, body }))
  }

  // const getMinQuantity = (idProduct, canBeRemoved) => {
  //   const monthlyProduct = monthlyPaymentProducts.find(product => product.id === idProduct)
  //   if (!canBeRemoved && monthlyProduct != null) {
  //     return monthlyProduct.quantity
  //   } else {
  //     return 0
  //   }
  // }

  const handleKeyDown = event => {
    // Evitar la entrada directa de texto
    event.preventDefault()
  }

  const handleKeyPress = event => {
    // Permitir solo teclas de flecha
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xl={12} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant='h6'
                      sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                    >
                      {themeConfig.templateName}
                    </Typography>
                  </Box>
                  <Image src='/images/logos/openpay.png' alt='OpenPay Logo' layout='fixed' width={75} height={25} />
                </Grid>
              </Box>
            </Grid>
            <Grid item xl={12} xs={12}>
              <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
                <Box>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant='h6' sx={{ mr: 2, width: '105px' }}>
                      Carrito
                    </Typography>
                  </Box>
                  <Typography variant='body2'>
                    Los pagos son procesados de manera segura por medio de Openpay
                  </Typography>
                </Box>
              </DatePickerWrapper>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='body1' sx={{ mb: 3.5, fontWeight: 600 }}>
                Método de pago:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Tarjeta: {selectedPayment?.cardType}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Alias: {selectedPayment?.alias}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Nombre: {selectedPayment?.nameOnCard}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Numero: {selectedPayment?.cardNumber}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Fecha: {selectedPayment?.expDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <div>
                <Typography variant='body1' sx={{ mb: 3.5, fontWeight: 600 }}>
                  Dirección:
                </Typography>
                <CalcWrapper>
                  <Typography variant='body2'>Calle: {selectedAddress?.street}</Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Núm. Ext: {selectedAddress?.extNumber}</Typography>
                </CalcWrapper>
                {selectedAddress?.intNumber ? (
                  <CalcWrapper>
                    <Typography variant='body2'>Núm. Int: {selectedAddress?.intNumber}</Typography>
                  </CalcWrapper>
                ) : null}
                <CalcWrapper>
                  <Typography variant='body2'>Colonia: {selectedAddress?.neighborhood}</Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>CP: {selectedAddress?.zipCode}</Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Ciudad: {selectedAddress?.city}</Typography>
                </CalcWrapper>
              </div>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <RepeaterWrapper>
          {products.map((product, index) => {
            const Tag = index === 0 ? Box : Collapse

            return (
              <Tag key={product.id} className='repeater-wrapper' {...(index !== 0 ? { in: true } : {})}>
                <Grid container>
                  <RepeatingContent item xs={12}>
                    <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                      <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          Artículo
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Image width={40} height={50} alt='img' src={product.urlImage} />
                          <Typography sx={{ ml: 3 }}>{product.product}</Typography>
                        </Box>
                      </Grid>
                      <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          Precio
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ ml: 3 }}>${product.price}</Typography>
                        </Box>
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          Cantidad
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='1'
                          defaultValue={product.quantity}
                          InputProps={{
                            inputProps: { min: 0 },
                            onKeyDown: handleKeyDown,
                            onKeyPress: handleKeyPress
                          }}
                          onChange={ev => handleUpdate(product.id, ev.target.value, product.canBeRemoved)}
                        />
                      </Grid>
                      <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          Total
                        </Typography>
                        <Typography>${product.total}</Typography>
                      </Grid>
                    </Grid>
                    <InvoiceAction>
                      <IconButton size='small' onClick={e => deleteForm(product.id)}>
                        <Close fontSize='small' />
                      </IconButton>
                    </InvoiceAction>
                  </RepeatingContent>
                </Grid>
              </Tag>
            )
          })}

          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} sx={{ px: 0 }}>
              <Button
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={() => router.push('/ecommerce/products/')}
              >
                Agregar artículos
              </Button>
            </Grid>
          </Grid>
        </RepeaterWrapper>

        <Divider />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={9} sx={{ order: { sm: 1, xs: 2 } }}></Grid>
            <Grid item xs={12} sm={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <CalcWrapper>
                <Typography variant='body2'>Subtotal:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.subtotal}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Monto de envío:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.subtotal > 0 ? total.shippingCost ?? 0 : 0}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>IVA:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.iva}
                </Typography>
              </CalcWrapper>
              <Divider />
              <CalcWrapper>
                <Typography variant='body2'>Total:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.subtotal > 0 ? total.total : 0}
                </Typography>
              </CalcWrapper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default AddCard
