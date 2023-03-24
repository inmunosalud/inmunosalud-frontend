import * as React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PageHeader from 'src/@core/components/page-header'
import Typography from '@mui/material/Typography'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { ProductItem } from 'src/views/dashboards/products/ProductItem'
import { Button } from '@mui/material'
import {
  getProducts
} from 'src/store/products'
import { PROFILES_USER } from 'src/configs/profiles'
import { closeSnackBar } from 'src/store/notifications'

const Products = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { products, isLoading } = useSelector(state => state.products)
  const { user } = useSelector(state => state.session)
  const { open, message, severity } = useSelector(state => state.notifications)
  const isProductAdmin = user.profile === PROFILES_USER['productsAdmin']
  const isAdmin = user.profile === PROFILES_USER['admin']

  const handleAddProduct = () => {
    router.push('/ecommerce/add-product')
  }

  //load products
  React.useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex',justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
        <Typography>Cargando productos...</Typography>
      </Box>
    )
  }


  const showAddProductButton = () => {
    if (isProductAdmin || isAdmin) {
    return (
        <Button
          variant='contained'
          sx={{ mb: 3, whiteSpace: 'nowrap' }}
          onClick={handleAddProduct}
        >
          Alta de producto
        </Button>
      )
    }
  }
  
  const displayMapProducts = () => {
    const { content } = products
    return (
    <React.Fragment>
      {content?.map((product, i) => (
      <div key={i} style={{marginTop: '25px'}}>
          <ProductItem
            isEdit={(isProductAdmin || isAdmin) ? true: false}
            {...product}
        />
      </div>
      ))}
    </React.Fragment>
    )
  }

  return (
    <React.Fragment>
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>Productos</Typography>} />
      <Grid item display='flex' justifyContent='flex-end' xs={12}>
        {showAddProductButton()}
      </Grid>
      <Grid item alignSelf='flex-end' xs={12}>
        {displayMapProducts()}
      </Grid>
    </Grid>
    <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </React.Fragment>
  )
}

export default Products
