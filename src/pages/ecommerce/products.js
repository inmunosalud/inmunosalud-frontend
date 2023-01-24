import * as React from 'react'
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

import PageHeader from 'src/@core/components/page-header'
import { ProductItem } from 'src/views/dashboards/products/ProductItem'

//import mocked data
import mockProducts from './mockData.json'
import { useDispatch, useSelector } from 'react-redux'

import {
  getProducts
} from 'src/store/products'


const Products = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {products} = useSelector(state => state.products)
  console.log('products from store', products)
  const handleAddProduct = () => {
    router.push('/ecommerce/add-product')
  }

  //load data
  React.useEffect(() => {
    console.log('entro')
    dispatch(getProducts())
  }, [dispatch])


  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>Productos</Typography>} />

      <Grid item display='flex' justifyContent='flex-end' xs={12}>
        <Button
          variant='contained'
          sx={{ mb: 3, whiteSpace: 'nowrap' }}
          onClick={handleAddProduct}
        >
          Alta de producto
        </Button>
      </Grid>
      <Grid item alignSelf='flex-end' xs={12}>
        {products?.content?.map((product, i) => (
          <div style={{marginTop: '25px'}}>
            <ProductItem
              key={i}
              {...product}
            />
          </div>
        ))}
      </Grid>
    </Grid>
  )
}

export default Products
