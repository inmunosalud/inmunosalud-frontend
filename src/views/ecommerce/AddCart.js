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
  const { user } = useSelector(state => state.dashboard.general)

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  // ** Deletes form
  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  useEffect(() => {
    console.log('carrito', selectedPayment, selectedAddress)
    if (selectedPayment == null || selectedAddress == null) {
      dispatch(setPayment(selectedPaymentMethod))
      dispatch(setAddress(selectedAddressInCart))
    }
  }, [selectedPaymentMethod, selectedAddressInCart])

  useEffect(() => {
    if (products.filter(product => !product.canBeRemoved).length > 0) {
      dispatch(getMonthlyPurchase(user.id))
      dispatch(
        openSnackBar({
          open: true,
          message: 'No es posible eliminar algunos productos porque forman parte de tu compra mínima inicial.',
          severity: 'info'
        })
      )
    }
  }, [dispatch])

  const handleUpdate = (idProduct, quantity, canBeRemoved) => {
    const body = {
      id: idProduct,
      quantity
    }

    dispatch(updateCart({ id, body }))
  }

  const getMinQuantity = (idProduct, canBeRemoved) => {
    const monthlyProduct = monthlyPaymentProducts.find(product => product.id === idProduct)
    if (!canBeRemoved && monthlyProduct != null) {
      return monthlyProduct.quantity
    } else {
      return 0
    }
  }

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                    <svg
                      width={30}
                      height={25}
                      version='1.1'
                      viewBox='0 0 30 23'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                        <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                          <g id='logo' transform='translate(95.000000, 50.000000)'>
                            <path
                              id='Combined-Shape'
                              fill={theme.palette.primary.main}
                              d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                              transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                            />
                            <polygon
                              id='Rectangle'
                              opacity='0.077704'
                              fill={theme.palette.common.black}
                              points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                              transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                            />
                            <path
                              id='Rectangle'
                              fillOpacity='0.15'
                              fill={theme.palette.common.white}
                              d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                            />
                            <path
                              id='Rectangle'
                              fillOpacity='0.35'
                              fill={theme.palette.common.white}
                              transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                              d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    <Typography
                      variant='h6'
                      sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                    >
                      {themeConfig.templateName}
                    </Typography>
                  </Box>
                  <Image src='/images/logos/openpay.png' alt='OpenPay Logo' layout='fixed' width={130} height={50} />
                </Grid>
              </Box>
            </Grid>
            <Grid item xl={6} xs={12}>
              <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}
                >
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
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
            <Grid item xs={12} sm={9} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='body1' sx={{ mb: 3.5, fontWeight: 600 }}>
                Método de pago:
              </Typography>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  {selectedPayment?.cardType}
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  {selectedPayment?.cardNumber}
                </Typography>
              </div>

              <Typography variant='body2' sx={{ mb: 2 }}>
                {selectedPayment?.nameOnCard}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {selectedPayment?.expDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <div>
                <Typography variant='body1' sx={{ mb: 3.5, fontWeight: 600 }}>
                  Dirección:
                </Typography>
                <CalcWrapper>
                  <Typography variant='body2'>Calle:</Typography>
                  <Typography variant='body2'>{selectedAddress?.street}</Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Núm. Ext:</Typography>
                  <Typography variant='body2'>{selectedAddress?.extNumber}</Typography>
                </CalcWrapper>
                {selectedAddress?.intNumber ? (
                  <CalcWrapper>
                    <Typography variant='body2'>Núm. Int:</Typography>
                    <Typography variant='body2'>{selectedAddress?.intNumber}</Typography>
                  </CalcWrapper>
                ) : null}
                <CalcWrapper>
                  <Typography variant='body2'>Colonia:</Typography>
                  <Typography variant='body2'>{selectedAddress?.colony}</Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>CP:</Typography>
                  <Typography variant='body2'>{selectedAddress?.zipCode}</Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Ciudad:</Typography>
                  <Typography variant='body2'>{selectedAddress?.city}</Typography>
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
                          <img width={40} height={50} alt='Apple iPhone 11 Pro' src={product.urlImage} />
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
                          InputProps={{ inputProps: { min: getMinQuantity(product.id, product.canBeRemoved) } }}
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
                      {product.canBeRemoved ? (
                        <IconButton size='small' onClick={deleteForm}>
                          <Close fontSize='small' />
                        </IconButton>
                      ) : null}
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

        <Divider />

        <CardContent>
          <InputLabel htmlFor='invoice-note' sx={{ mb: 2 }}>
            Nota:
          </InputLabel>
          <TextField rows={2} fullWidth multiline id='invoice-note' />
        </CardContent>
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default AddCard
