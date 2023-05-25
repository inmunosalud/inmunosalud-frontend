// ** React Imports
import Image from 'next/image'
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiCardContent from '@mui/material/CardContent'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Imports
import PricingPlans from 'src/views/pages/pricing/PricingPlans'
import PricingHeader from 'src/views/pages/pricing/PricingHeader'
import PricingFooter from 'src/views/pages/pricing/PricingFooter'
import { Box, Button, Grid, Typography } from '@mui/material'

import Banner from 'public/images/banners/banner.webp'
import BannerPrincipal from 'public/images/banners/ImagenBanner.webp'
import Logo from 'public/images/logos/LogoBlanco.webp'
import { PlusMinus } from 'mdi-material-ui'
import NewProducts from 'src/views/landing-page/NewProducts'
import AboutUs from 'src/views/landing-page/AboutUs'
import FAQs from 'src/views/landing-page/FAQs'
import Footer from 'src/views/landing-page/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from 'src/store/products'
import Router from 'next/router'

// ** Styled Components
const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(17.5, 36, 28.25),

  [theme.breakpoints.down('xl')]: {
    padding: theme.spacing(12.5, 20, 20)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 5)
  }
}))

// const products = [
//   {
//     imgWidth: 264,
//     title: 'Producto 1',
//     imgHeight: 163,
//     monthlyPrice: 0,
//     currentPlan: true,
//     popularPlan: false,
//     subtitle: 'A simple start for everyone',
//     imgSrc: '/images/pages/pricing-tree-1.png'
//   },
//   {
//     imgWidth: 264,
//     imgHeight: 163,
//     monthlyPrice: 49,
//     title: 'Producto 2',
//     popularPlan: true,
//     currentPlan: false,
//     subtitle: 'For small to medium businesses',
//     imgSrc: '/images/pages/pricing-tree-2.png'
//   },
//   {
//     imgWidth: 264,
//     imgHeight: 163,
//     monthlyPrice: 99,
//     popularPlan: false,
//     currentPlan: false,
//     title: 'Producto 3',
//     subtitle: 'Solution for big organizations',
//     imgSrc: '/images/pages/pricing-tree-3.png'
//   }
// ]

const questions = [
  {
    id: 'Q1',
    question: '¿Es un medicamento?',
    answer:
      'Sesame snaps tart bonbon tiramisu jelly beans lemon drops bear claw candy gummi bears. Caramels pudding sweet donut tootsie roll gummies macaroon. Lemon drops caramels sesame snaps dessert jujubes. Cupcake chocolate bonbon cake tiramisu. Gummies candy canes ice cream biscuit. Jelly gummies wafer danish chupa chups sugar plum cookie.'
  },
  {
    id: 'Q2',
    question: '¿Es de confianza? ¿Cómo sé que es de confianza?',
    answer:
      'Chocolate sweet roll lemon drops chocolate cake candy canes halvah. Donut fruitcake sweet roll brownie carrot cake cake. Donut jujubes pudding candy macaroon. Gummies gingerbread croissant bonbon. Cookie toffee cupcake cotton candy candy canes dessert cotton candy liquorice. Jelly beans gummi bears toffee chocolate bar chocolate cake.'
  },
  {
    id: 'Q3',
    question: '¿En dónde lo puedo conseguir? ¿Cuánto tiempo tardan en entregarlo?',
    answer:
      'Liquorice pie donut tootsie roll marzipan liquorice topping pie. Muffin sweet roll soufflé croissant cookie cotton candy toffee. Tootsie roll chocolate cake wafer jelly beans soufflé danish tart. Halvah dragée chocolate bar gingerbread apple pie ice cream ice cream fruitcake. Chocolate bar pudding apple pie cheesecake dragée topping ice cream cookie.'
  },
  {
    id: 'Q4',
    question: '¿Qué se necesita para afiliarte?',
    answer:
      'Halvah liquorice pastry marshmallow sugar plum. Dessert chocolate pastry gummi bears pastry. Gingerbread bonbon pudding oat cake jujubes pie wafer tart brownie. Soufflé jujubes icing powder liquorice. Sweet donut toffee liquorice dessert dragée. Topping cake danish chupa chups chupa chups gummies. Cotton candy gummies chocolate cake oat cake.'
  },
  {
    id: 'Q5',
    question: '¿Cómo garantizamos la calidad de nuestros productos?',
    answer:
      'Halvah liquorice pastry marshmallow sugar plum. Dessert chocolate pastry gummi bears pastry. Gingerbread bonbon pudding oat cake jujubes pie wafer tart brownie. Soufflé jujubes icing powder liquorice. Sweet donut toffee liquorice dessert dragée. Topping cake danish chupa chups chupa chups gummies. Cotton candy gummies chocolate cake oat cake.'
  }
]

const Pricing = () => {
  // ** States
  const [plan, setPlan] = useState('monthly')
  const { products, isLoading } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const handleChange = e => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }

  const handleSeeMoreProducts = () => {
    Router.push('/ecommerce/products')
  }

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Image src={BannerPrincipal} height={600} />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Image src={Logo} height={150} width={230} />
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
            Nuevos Productos
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {products ? <NewProducts plan={plan} data={products.content} /> : null}
        </Grid>
        <Grid container justifyContent='center' sx={{ mb: 6 }} xs={12}>
          <Button color='primary' variant='contained' onClick={handleSeeMoreProducts}>
            Ver Mas Productos
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ padding: '2rem' }}>
                <AboutUs />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Image src={Banner} alt='aboutUs' style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <FAQs data={questions} />
      {/* <Footer /> */}
    </>
  )
}

export default Pricing
