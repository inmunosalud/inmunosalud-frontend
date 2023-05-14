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
  InputAdornment
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getConstants } from 'src/store/constants'

const Constants = () => {
  const { constants } = useSelector(state => state.constants)
  const [associateProductList, setAssociateProductList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConstants())
    setAssociateProductList(constants.associatedPackage)
    console.log(constants)
  }, [dispatch])

  const handleAddProduct = () =>
    setAssociateProductList([...associateProductList, { id: generateRandomCharacters(), product: '', quantity: 0 }])

  const handleDeleteProduct = productToRemove =>
    setAssociateProductList(associateProductList.filter(product => product.id !== productToRemove.id))

  const generateRandomCharacters = () => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  return (
    <>
      <Card>
        <CardHeader title={'Editar constantes del sistema'} titleTypographyProps={{ variant: 'h6' }} />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField label='Dia de corte' fullWidth value={constants.cutoffDay} />
            </Grid>
            <Grid item xs={12}>
              <TextField label='IVA' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Costo de envio' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Compra mínima' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Porcentaje de comisión</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label='B'
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position='start'>%</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label='C' fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label='D' fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label='E' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Paquete de socios</Typography>
            </Grid>
            {associateProductList
              ? associateProductList.map(product => (
                  <Grid container item xs={12} spacing={5} key={product.id}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='product-label'>Producto</InputLabel>
                        <Select labelId='product-label' label='Producto' value={product.id}>
                          <MenuItem value={product.id}>{product.product}</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField label='Cantidad' fullWidth type='number' value={product.quantity} />
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
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Constants
