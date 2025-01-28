import {
  CardHeader,
  Divider,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Backdrop,
  CircularProgress,
  FormHelperText
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Delete from 'mdi-material-ui/Delete'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getConstants, setModalUpdate, setShowConfirmModal } from 'src/store/constants'
import { closeSnackBar } from 'src/store/notifications'
import { getProducts } from 'src/store/products'
import DialogConstants from 'src/views/components/dialogs/DialogConstants'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

const Constants = () => {
  const { constants, loading, isLoading, showModal } = useSelector(state => state.constants)
  const { products } = useSelector(state => state.products)
  const { message, severity, open } = useSelector(state => state.notifications)
  const [associateProductList, setAssociateProductList] = useState([])
  const [addProductDisabled, isAddProductDisabled] = useState(false)
  const [body, setBody] = useState({})
  const dispatch = useDispatch()
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      cutoffDay: '',
      iva: 0,
      1: 0.0,
      2: 0.0,
      3: 0.0,
      4: 0.0,
      shippingCost: 0,
      minimalAmountOfPurchase: 0,
      maintenanceCost: 0,
      shippingCostFreeFor: 0
    }
  })

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getConstants())
    } else if (loading === 'finished') {
      reset({
        cutoffDay: constants.cutoffDay,
        iva: constants.iva,
        1: (constants.commissionPercentagePerLevel[1] * 100).toFixed(2) ?? 0,
        2: (constants.commissionPercentagePerLevel[2] * 100).toFixed(2) ?? 0,
        3: (constants.commissionPercentagePerLevel[3] * 100).toFixed(2) ?? 0,
        4: (constants.commissionPercentagePerLevel[4] * 100).toFixed(2) ?? 0,
        shippingCost: constants.shippingCost,
        minimalAmountOfPurchase: constants.minimalAmountOfPurchase,
        maintenanceCost: constants.maintenanceCost ?? 0,
        shippingCostFreeFor: constants.shippingCostFreeFor
      })
    }
  }, [loading])
  const generateRandomCharacters = () => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const handleAddProduct = () => {
    setAssociateProductList([...associateProductList, { id: generateRandomCharacters(), product: '', quantity: 0 }])
    isAddProductDisabled(associateProductList.length + 1 === products.content.length)
  }

  const handleDeleteProduct = productToRemove => {
    setAssociateProductList(associateProductList.filter(product => product.id !== productToRemove.id))
    isAddProductDisabled(associateProductList.length - 1 === products.content.length)
  }

  const handleProductSelected = (index, productSelectedId) => {
    const newProducts = associateProductList.map((associateProduct, associateProductIndex) => {
      if (associateProductIndex === index) {
        const productSelected = products.content.find(item => item.id === productSelectedId)
        return productSelected
      } else {
        return associateProduct
      }
    })
    setAssociateProductList(newProducts)
  }

  const handleQuantityField = (index, value) => {
    const regex = /^[0-9\b]+$/
    if (value > 0 && regex.test(value)) {
      const newProducts = associateProductList.map((associateProduct, associateProductIndex) => {
        if (index === associateProductIndex) {
          return { ...associateProduct, quantity: value }
        } else {
          return associateProduct
        }
      })
      setAssociateProductList(newProducts)
    }
  }

  const handleModalClose = () => {
    dispatch(setModalUpdate(true))
    dispatch(setShowConfirmModal(false))
  }

  const handleModalConfirm = () => {
    dispatch(setModalUpdate(true))
  }

  const onSubmit = (data, event) => {
    event.preventDefault()

    setBody({
      cutoffDay: data.cutoffDay,
      iva: data.iva,
      commissionPercentagePerLevel: {
        1: (data[1] / 100).toFixed(4),
        2: (data[2] / 100).toFixed(4),
        3: (data[3] / 100).toFixed(4),
        4: (data[4] / 100).toFixed(4)
      },
      shippingCost: data.shippingCost,
      maintenanceCost: data.maintenanceCost,
      shippingCostFreeFor: data.shippingCostFreeFor
    })
    handleModalConfirm()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader title={'Editar constantes del sistema'} titleTypographyProps={{ variant: 'h6' }} />
        <Divider />

        {isLoading ? (
          <Backdrop open={isLoading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='cutoffDay'
                    rules={{ required: true, min: 1, max: 31 }}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.cutoffDay}
                        label='Dia de corte'
                        fullWidth
                        disabled
                        {...field}
                        helperText={errors.cutoffDay && 'Debe de elegir un dia entre 1 y 31'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='iva'
                    rules={{ required: true, min: 0, max: 100 }}
                    render={({ field }) => (
                      <TextField
                        label='IVA'
                        fullWidth
                        required
                        type='number'
                        error={!!errors.iva}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                        helperText={errors.iva && 'Debe colocar un porcentaje correcto entre 0 a 100'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='shippingCost'
                    rules={{
                      required: 'Este campo es requerido',
                      min: { value: 0, message: 'No se aceptan valores negativos' }
                    }}
                    render={({ field }) => (
                      <TextField
                        label='Costo de envio'
                        fullWidth
                        required
                        type='number'
                        error={!!errors.shippingCost}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                        {...field}
                        helperText={errors.shippingCost && errors.shippingCost.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='minimalAmountOfPurchase'
                    rules={{
                      required: 'Este campo es requerido',
                      min: { value: 0, message: 'No se aceptan valores negativos' }
                    }}
                    render={({ field }) => (
                      <TextField
                        label='Compra mínima'
                        fullWidth
                        required
                        type='number'
                        error={!!errors.minimalAmountOfPurchase}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                        {...field}
                        helperText={errors.minimalAmountOfPurchase && errors.minimalAmountOfPurchase.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='maintenanceCost'
                    rules={{
                      required: 'Este campo es requerido',
                      min: { value: 0, message: 'No se aceptan valores negativos' }
                    }}
                    render={({ field }) => (
                      <TextField
                        label='Costo de mantenimiento'
                        fullWidth
                        required
                        type='number'
                        error={!!errors.maintenanceCost}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                        {...field}
                        helperText={errors.maintenanceCost && errors.maintenanceCost.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='shippingCostFreeFor'
                    rules={{
                      required: 'Este campo es requerido',
                      min: { value: 0, message: 'No se aceptan valores negativos' }
                    }}
                    render={({ field }) => (
                      <TextField
                        label='Costo para envió gratis '
                        fullWidth
                        required
                        type='number'
                        error={!!errors.shippingCostFreeFor}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                        {...field}
                        helperText={errors.shippingCostFreeFor && errors.shippingCostFreeFor.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>Porcentaje de comisión</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name='1'
                    rules={{ required: true, min: 0, max: 100 }}
                    render={({ field }) => (
                      <TextField
                        label='1'
                        type='number'
                        fullWidth
                        required
                        error={!!errors[1]}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                        helperText={errors[1] && 'Debe colocar un porcentaje correcto entre 0 a 100'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name='2'
                    rules={{ required: true, min: 0, max: 100 }}
                    render={({ field }) => (
                      <TextField
                        label='2'
                        type='number'
                        fullWidth
                        required
                        error={!!errors[2]}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                        helperText={errors[2] && 'Debe colocar un porcentaje correcto entre 0 a 100'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name='3'
                    rules={{ required: true, min: 0, max: 100 }}
                    render={({ field }) => (
                      <TextField
                        label='3'
                        type='number'
                        fullWidth
                        required
                        error={!!errors[3]}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                        helperText={errors[3] && 'Debe colocar un porcentaje correcto entre 0 a 100'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name='4'
                    rules={{ required: true, min: 0, max: 100 }}
                    render={({ field }) => (
                      <TextField
                        label='4'
                        type='number'
                        fullWidth
                        error={!!errors[4]}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                        helperText={errors[4] && 'Debe colocar un porcentaje correcto entre 0 a 100'}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item display={'flex'} justifyContent={'flex-end'} xs={12}>
                  <Button variant='contained' type='submit' size='large'>
                    Guardar Cambios
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        )}
      </Card>
      <DialogConstants open={showModal} body={body} />
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Constants
