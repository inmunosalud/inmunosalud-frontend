import * as React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import PageHeader from 'src/@core/components/page-header'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { ProductItem } from 'src/views/dashboards/products/ProductItem'
import { Button } from '@mui/material'
import { getProducts } from 'src/store/products'
import { PROFILES_USER } from 'src/configs/profiles'
import { closeSnackBar } from 'src/store/notifications'

const Store = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { products, isLoading } = useSelector(state => state.products)
  const { user } = useSelector(state => state.session)
  const isProductAdmin = user?.profile === PROFILES_USER['productsAdmin']
  const isAdmin = user?.profile === PROFILES_USER['admin']

  const handleAddProduct = () => {
    router.push('/ecommerce/add-product')
  }

  //load products
  React.useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [products, dispatch])

  const loading = () => {
    return (
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
          <CircularProgress />
        </Box>
      </Grid>
    )
  }

  const showAddProductButton = () => {
    if (isProductAdmin || isAdmin) {
      return (
        <Button variant='contained' sx={{ whiteSpace: 'nowrap' }} onClick={handleAddProduct}>
          Alta de producto
        </Button>
      )
    }
  }

  const displayMapProducts = () => {
    return (
      <React.Fragment>
        {products?.map((product, i) => (
          <div key={i} style={{ marginTop: '25px' }}>
            <ProductItem
              isEdit={isProductAdmin || isAdmin ? true : false}
              {...product}
              cartId={user?.id}
              id={product?.id}
            />
          </div>
        ))}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Card sx={{ textAlign: 'center' }}>
            <CardHeader
              title='Productos'
              action={
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  {showAddProductButton()}
                </Box>
              }
            />
          </Card>
        </Grid>
        {isLoading ? (
          loading()
        ) : (
          <>
            <Grid item xs={12} alignSelf='flex-end'>
              {products.length > 0 && displayMapProducts()}
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default Store
