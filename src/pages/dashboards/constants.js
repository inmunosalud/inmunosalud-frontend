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
  CircularProgress
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getConstants, setModalUpdate, setShowConfirmModal } from 'src/store/constants'
import { getProducts } from 'src/store/products'
import DialogConstants from 'src/views/components/dialogs/DialogConstants'

const Constants = () => {
  const { constants, loading, isLoading, showModal, showConfirmModal } = useSelector(state => state.constants)
  const { products } = useSelector(state => state.products)
  const [associateProductList, setAssociateProductList] = useState([])
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
      b: 0.0,
      c: 0.0,
      d: 0.0,
      e: 0.0,
      shippingCost: 0,
      minimalAmountOfPurchase: 0
    }
  })

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getProducts())
      dispatch(getConstants())
    } else if (loading === 'finished') {
      reset({
        cutoffDay: constants.cutoffDay,
        iva: constants.iva,
        b: (constants.commissionPercentajePerLevel.B * 100).toFixed(2) ?? 0,
        c: (constants.commissionPercentajePerLevel.C * 100).toFixed(2) ?? 0,
        d: (constants.commissionPercentajePerLevel.D * 100).toFixed(2) ?? 0,
        e: (constants.commissionPercentajePerLevel.E * 100).toFixed(2) ?? 0,
        shippingCost: constants.shippingCost,
        minimalAmountOfPurchase: constants.minimalAmountOfPurchase
      })
      setAssociateProductList(constants.associatedPackage)
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

  const handleAddProduct = () =>
    setAssociateProductList([...associateProductList, { id: generateRandomCharacters(), product: '', quantity: 0 }])

  const handleDeleteProduct = productToRemove =>
    setAssociateProductList(associateProductList.filter(product => product.id !== productToRemove.id))

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
    const newProducts = associateProductList.map((associateProduct, associateProductIndex) => {
      if (index === associateProductIndex) {
        return { ...associateProduct, quantity: value }
      } else {
        return associateProduct
      }
    })
    setAssociateProductList(newProducts)
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
    if (associateProductList.length > 0) {
      setBody({
        cutoffDay: data.cutoffDay,
        iva: data.iva,
        commissionPercentajePerLevel: {
          B: (data.b / 100).toFixed(4),
          C: (data.c / 100).toFixed(4),
          D: (data.d / 100).toFixed(4),
          E: (data.e / 100).toFixed(4)
        },
        shippingCost: data.shippingCost,
        minimalAmountOfPurchase: data.minimalAmountOfPurchase,
        associatedPackage: associateProductList
      })
      handleModalConfirm()
    }
  }

  return (
    <>
      <Card>
        <CardHeader title={'Editar constantes del sistema'} titleTypographyProps={{ variant: 'h6' }} />
        <Grid item xs={12}>
          <Divider />
        </Grid>

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
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField error={!!errors.cutoffDay} label='Dia de corte' fullWidth required {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='iva'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='IVA'
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='shippingCost'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='Costo de envio'
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='minimalAmountOfPurchase'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='Compra mínima'
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                        {...field}
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
                    name='b'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='B'
                        type='number'
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name='c'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='C'
                        type='number'
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name='d'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='D'
                        type='number'
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    control={control}
                    name='e'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='E'
                        type='number'
                        fullWidth
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>Paquete de socios</Typography>
                </Grid>
                {associateProductList
                  ? associateProductList.map((product, index) => (
                      <Grid container item xs={12} spacing={5} key={product.id}>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel id='product-label'>Producto *</InputLabel>
                            <Select
                              labelId='product-label'
                              label='Producto'
                              value={product.id}
                              required
                              onChange={e => handleProductSelected(index, e.target.value)}
                            >
                              {products
                                ? products.content.map(item => <MenuItem value={item.id}>{item.product}</MenuItem>)
                                : null}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label='Cantidad'
                            fullWidth
                            type='number'
                            required
                            value={product.quantity}
                            onChange={e => handleQuantityField(index, e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            variant='text'
                            color='error'
                            sx={{ marginTop: 2 }}
                            onClick={() => handleDeleteProduct(product)}
                          >
                            Eliminar
                          </Button>
                        </Grid>
                      </Grid>
                    ))
                  : null}
                <Grid item xs={12}>
                  <Button variant='contained' onClick={() => handleAddProduct()}>
                    Agregar producto
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item alignItems={'end'} xs={12}>
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
    </>
  )
}

export default Constants
