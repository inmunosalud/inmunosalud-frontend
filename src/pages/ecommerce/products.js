import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

import PageHeader from 'src/@core/components/page-header'
import { ProductItem } from 'src/views/dashboards/products/ProductItem'

//import mocked data
import mockProducts from './mockData.json'


const Products = () => {
  console.log(mockProducts)
  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>Productos</Typography>} />

      <Grid item display='flex' justifyContent='flex-end' xs={12}>
        <Button
          variant='contained'
          sx={{ mb: 3, whiteSpace: 'nowrap' }}
          onClick={() => {
            /* handleClickOpen()
            setDialogTitle('Add') */
          }}
        >
          Alta de producto
        </Button>
      </Grid>
      <Grid item alignSelf='flex-end' xs={12}>
        {mockProducts.content.map((product) => (
          <div style={{marginTop: '25px'}}>
            <ProductItem {...product} />
          </div>
        ))}
      </Grid>
    </Grid>
  )
}

export default Products
