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

  /*************  ✨ Codeium Command ⭐  *************/
  const dummyProducts = [
    {
      urlImage: '/images/mockups/2ComplejoBRutina.png',
      id: 1
    },
    {
      urlImage: '/images/mockups/3VitaminaC.png',
      id: 2
    },
    {
      urlImage: '/images/mockups/4Omega3.png',
      id: 3
    },
    {
      urlImage: '/images/mockups/6DHA.png',
      id: 4
    }
  ]
  /******  2eadc040-713d-485e-a087-cb200f4ca684  *******/

  return (
    <Card>
      <CardHeader title='Nuevos productos' subheader='Inmunosalud' />
      {isLoading ? (
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </CardContent>
      ) : (
        <>
          <CardContent>
            <Carousel products={dummyProducts} />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <RedirectButton path={'/ecommerce/products'} text={'Productos'} />
          </CardActions>
        </>
      )}
    </Card>
  )
}

export default Products
