// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FallbackSpinner from 'src/@core/components/spinner'
import CardActions from '@mui/material/CardActions'

import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styles
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMonthlyPurchase,
  setModal,
  updateMonthlyPurchase,
  setUpdatedProducts,
  setChanges
} from 'src/store/monthlypurchase'
import CustomSnackbar from '../components/snackbar/CustomSnackbar'
import { closeSnackBar } from 'src/store/notifications'

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

const AddMonthlyPurchase = () => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** Selectors
  const { total, products, id, isLoading, updatedProducts, changes } = useSelector(state => state.monthlyPurchase)
  const { user } = useSelector(state => state.session)
  const { open, message, severity } = useSelector(state => state.notifications)

  // ** Hook
  const theme = useTheme()

  const [totalUpdate, setTotalUpdate] = useState(total)

  useEffect(() => {
    if (user.id != null && products.length === 0) {
      dispatch(getMonthlyPurchase(user.id))
    }
    return () => {
      dispatch(setUpdatedProducts(products))
    }
  }, [])

  useEffect(() => {
    dispatch(setUpdatedProducts(products))
    setTotalUpdate(total)
  }, [isLoading])

  useEffect(() => {
    if (changes) {
      const totalPriceProducts = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)
      const subtotal = +(totalPriceProducts / (1 + total.ivaValue)).toFixed(2)
      const iva = +(subtotal * total.ivaValue).toFixed(2)
      const totalPrice = +(totalPriceProducts + total.shippingCost).toFixed(2)

      setTotalUpdate({
        subtotal,
        iva,
        total: totalPrice
      })
      dispatch(setUpdatedProducts(updatedProducts))
    }
  }, [updatedProducts])

  const handleUpdate = (id, newQuantity) => {
    if (+newQuantity === 0) {
      const updatedProductsCopy = updatedProducts.filter(product => product.id !== id)
      dispatch(setUpdatedProducts(updatedProductsCopy))
    } else {
      const newProducts = updatedProducts.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: newQuantity
          }
        }
        return product
      })

      dispatch(setUpdatedProducts(newProducts))

      // Verificar si todas las cantidades son iguales a las cantidades originales
      const allQuantitiesEqual = newProducts.every((product, index) => {
        if (index < products.length) {
          return parseInt(product.quantity, 10) === parseInt(products[index].quantity, 10)
        } else {
          return false // Si index es mayor o igual a la longitud de products, devuelve falso
        }
      })

      // Actualizar el estado de cambios y totalUpdate
      dispatch(setChanges(!allQuantitiesEqual))
      if (allQuantitiesEqual) {
        setTotalUpdate({
          subtotal: total.subtotal,
          iva: total.iva,
          total: total.total
        })
      }
    }
  }

  const handleSave = () => {
    const missingProducts = products.filter(product => {
      return !updatedProducts.some(updatedProduct => updatedProduct.id === product.id)
    })

    const updatedProductsCopy = [...updatedProducts]
    missingProducts.forEach(missingProduct => {
      updatedProductsCopy.push({ ...missingProduct, quantity: 0 })
    })

    dispatch(setChanges(false))
    dispatch(updateMonthlyPurchase({ id: user.id, body: updatedProductsCopy }))
  }

  return (
    <Fragment>
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <Grid container>
          <Grid item xl={8} xs={12} m={'10px'}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant='h6'
                          sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                        >
                          Actualiza tu compra mensual
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xl={6} xs={12}>
                    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: { xl: 'flex-end', xs: 'flex-start' }
                        }}
                      ></Box>
                    </DatePickerWrapper>
                  </Grid>
                </Grid>
              </CardContent>

              <Divider />

              <RepeaterWrapper>
                {updatedProducts.map((product, index) => {
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
                                Articulo
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Image width={40} height={50} alt='img' src={product.urlImage} />
                                <Typography sx={{ ml: 3, mt: 0.5 }}>{product.product}</Typography>
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
                                <Typography sx={{ ml: 3, mt: 3.5 }}>${product.price}</Typography>
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
                                key={product.id}
                                size='small'
                                type='number'
                                placeholder='1'
                                sx={{ mt: 1.5 }}
                                defaultValue={product.quantity}
                                value={updatedProducts[index]?.quantity}
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={ev =>
                                  handleUpdate(product.id, ev.target.value, product.canBeRemoved, product.quantity)
                                }
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
                              <Typography sx={{ ml: 3, mt: 3.5 }}>
                                $
                                {changes
                                  ? parseFloat((product?.price * product?.quantity).toFixed(2))
                                  : parseFloat(product.total.toFixed(2))}
                              </Typography>
                            </Grid>
                          </Grid>
                          <InvoiceAction>
                            <IconButton
                              sx={{ mt: 4.5 }}
                              size='small'
                              color='error'
                              onClick={ev => {
                                handleUpdate(product.id, 0, product.canBeRemoved)
                                dispatch(setChanges(true))
                              }}
                            >
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
                      onClick={() => dispatch(setModal(true))}
                    >
                      Agregar artículos
                    </Button>
                  </Grid>
                </Grid>
              </RepeaterWrapper>
            </Card>
          </Grid>

          <Grid item xl={3} xs={12} m={'10px'}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <CalcWrapper>
                      <Typography variant='body2'>Subtotal:</Typography>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        ${totalUpdate.subtotal}
                      </Typography>
                    </CalcWrapper>
                    <CalcWrapper>
                      <Typography variant='body2'>IVA:</Typography>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        ${totalUpdate.iva}
                      </Typography>
                    </CalcWrapper>
                    <CalcWrapper>
                      <Typography variant='body2'>Envio:</Typography>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        ${total.shippingCost}
                      </Typography>
                    </CalcWrapper>
                    <Divider />
                    <CalcWrapper>
                      <Typography variant='body2'>Total:</Typography>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        ${totalUpdate.total}
                      </Typography>
                    </CalcWrapper>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CardActions sx={{ justifyContent: 'center', m: '-20px' }}>
                      <Button
                        sx={{ justifyContent: 'center' }}
                        size='large'
                        variant='contained'
                        onClick={handleSave}
                        disabled={!changes}
                      >
                        Guardar
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default AddMonthlyPurchase
