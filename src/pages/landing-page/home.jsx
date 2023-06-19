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
import Link from 'next/link'

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
    answer: 'No, nuestros productos no son medicamentos. Son suplementos naturales respaldados por estudios científicos que se pueden encontrar en ',
    link: 'https://pubmed.ncbi.nlm.nih.gov/'
  },
  {
    id: 'Q2',
    question: '¿Es de confianza? ¿Cómo sé que es de confianza?',
    answer: 'Realizamos análisis de calidad de las materias primas que utilizamos y seguimos rigurosos estándares de buenas prácticas de manufactura. Además, nuestras fórmulas se basan en investigaciones científicas sobre los beneficios para la salud de los ingredientes utilizados.'
  },
  {
    id: 'Q3',
    question: '¿En dónde lo puedo conseguir? ¿Cuánto tiempo tardan en entregarlo?',
    answer: 'Puedes adquirir nuestros productos exclusivamente a través de nuestra página web. Trabajamos con paqueterías nacionales e internacionales para el envío, y el tiempo estimado de entrega es de 2 a 3 días.'
  },
  {
    id: 'Q4',
    question: '¿Qué se necesita para afiliarte?',
    answer: 'Simplemente debes adquirir nuestro paquete inicial. Este es el pedido mínimo para mantener tu afiliación activa el cual contiene las dosis necesarias para consumir en el mes. Es necesario hacer el pedido mínimo cada mes para mantener tu cuenta activa.'
  },
  {
    id: 'Q5',
    question: '¿Cómo garantizamos la calidad de nuestros productos?',
    answer: 'Mediante el análisis de todas nuestras materias primas y el cumplimiento de rigurosos estándares de calidad respaldados por buenas prácticas de manufactura.'
  }
];


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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '2rem'
              }}
            >
              <Typography variant='h4' align='center' gutterBottom>
                Acerca de Inmunosalud
              </Typography>
              <Typography variant='body2' align='justify' paragraph>
                Somos un equipo especializado en el desarrollo de suplementos alimenticios diseñados para satisfacer las
                necesidades de tu mente y cuerpo. Nuestra atención se centra en la salud cardiovascular, muscular y
                cerebral, así como en fortalecer el sistema inmunológico y la salud integral en general. Nuestro
                compromiso es poner a tu alcance las mejores formulaciones científicas para que disfrutes de tu día a
                día y goces de una vida plena y digna. En Inmunosalud, creemos que cada persona merece llevar una vida
                digna y saludable. Por eso, nuestro objetivo es ayudar a miles de individuos a mejorar su calidad de
                vida. Inmunosalud es el camino hacia tu mejor salud.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box sx={{  margin: '1rem' }}>
              <Image src={Banner} alt='aboutUs'/>
            </Box>
          </Grid>
        </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
              <Link href='/landing-page/join' passHref>
                <Button variant='outlined' size='large'>
                  AFÍLIATE A NOSOTROS
                </Button>
              </Link>
            </Box>
          </Grid>
      </Card>

      <FAQs data={questions} />
      {/* <Footer /> */}
    </>
  )
}

export default Pricing
