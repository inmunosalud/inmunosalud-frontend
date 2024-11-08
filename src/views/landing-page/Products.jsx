import { useEffect, useState } from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
// ** Custom Components Imports
import RedirectButton from 'src/views/components/buttons/RedirectButton'
import Carousel from 'src/views/components/swiper/Carousel'

const Products = props => {
  const { products, isLoading } = useSelector(state => state.products)

  return (
    <Card>
      <CardHeader title='Nuevos productos' subheader='Inmunosalud' />

      <CardContent>
        <Carousel products={products} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <RedirectButton path={'/ecommerce/products'} text={'Productos'} />
      </CardActions>
    </Card>
  )
}

export default Products
