import { Button, Card } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import PageHeader from 'src/@core/components/page-header'
import { AddProduct } from 'src/views/dashboards/products/addProduct'
import { ProductItem } from 'src/views/dashboards/products/ProductItem'

import TableUsers from 'src/views/dashboards/users/TableUsers'

const Products = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>Productos</Typography>} />

      <Grid item display='flex' justifyContent='flex-end' xs={12}>
        <Button
          variant='contained'
          sx={{ mb: 3, whiteSpace: 'nowrap' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          Alta de producto
        </Button>
      </Grid>
      <Grid item alignSelf='flex-end' xs={12}>
        <ProductItem />
      </Grid>
    </Grid>
  )
}

export default Products
