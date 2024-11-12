// ** React Imports
import Image from 'next/image'
import { useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// ** Third Party Imports

// ** Demo Imports
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import Certifications from 'src/views/landing-page/Certifications'
import Products from 'src/views/landing-page/Products'

import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import Router from 'next/router'
import Banner from 'public/images/banners/banner.webp'
import { useDispatch, useSelector } from 'react-redux'
import { PROFILES_USER } from 'src/configs/profiles'
import { closeSnackBar } from 'src/store/notifications'
import { getProducts } from 'src/store/products'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import FAQs from 'src/views/landing-page/FAQs'
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
      'No, nuestros productos no son medicamentos. Son suplementos naturales respaldados por estudios científicos que se pueden encontrar en ',
    link: 'https://pubmed.ncbi.nlm.nih.gov/'
  },
  {
    id: 'Q2',
    question: '¿Es de confianza? ¿Cómo sé que es de confianza?',
    answer:
      'Realizamos análisis de calidad de las materias primas que utilizamos y seguimos rigurosos estándares de buenas prácticas de manufactura. Además, nuestras fórmulas se basan en investigaciones científicas sobre los beneficios para la salud de los ingredientes utilizados.'
  },
  {
    id: 'Q3',
    question: '¿En dónde lo puedo conseguir? ¿Cuánto tiempo tardan en entregarlo?',
    answer:
      'Puedes adquirir nuestros productos exclusivamente a través de nuestra página web. Trabajamos con paqueterías nacionales e internacionales para el envío, y el tiempo estimado de entrega es de 2 a 3 días.'
  },
  {
    id: 'Q4',
    question: '¿Qué se necesita para afiliarte?',
    answer: 'Solo necesitas un código de recomendación por uno de nuestros afiliados.'
  },
  {
    id: 'Q5',
    question: '¿Cómo garantizamos la calidad de nuestros productos?',
    answer:
      'Mediante el análisis de todas nuestras materias primas y el cumplimiento de rigurosos estándares de calidad respaldados por buenas prácticas de manufactura.'
  }
]

const Pricing = () => {
  // ** States
  const { products, isLoading } = useSelector(state => state.products)
  const { user } = useSelector(state => state.session)
  const dispatch = useDispatch()
  const { open, message, severity } = useSelector(state => state.notifications)
  const theme = useTheme()
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [products, dispatch])
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const handleSeeMoreProducts = () => {
    Router.push('/ecommerce/products')
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '0',
              paddingTop: '40%', // Ajusta este valor para cambiar la altura del banner
              overflow: 'hidden'
            }}
          >
            <Image
              src='/images/banners/ImagenBanner.webp'
              alt='Banner'
              layout='fill'
              objectFit='cover'
              quality={100}
              priority
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 'auto',
                maxWidth: '80%',
                maxHeight: '80%'
              }}
            >
              {isMobile ? (
                <Image src='/images/logos/LogoBlanco.webp' alt='Logo' width={150} height={100} objectFit='contain' />
              ) : (
                <Image src='/images/logos/LogoBlanco.webp' alt='Logo' width={230} height={150} objectFit='contain' />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {user.profile != PROFILES_USER.affiliatedUser && (
        <Card
          sx={{
            mt: '2rem'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ p: '2rem' }}>
                <Typography variant='h2'>¡Únete a Nuestra Comunidad!</Typography>
                <Typography variant='h5' color='text.primary' sx={{ mb: 3, mt: 5 }}>
                  Recibe beneficios al convertirte en afiliado
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        p: 4,
                        height: '100%',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: '10px'
                      }}
                    >
                      <Typography variant='h4' color='primary'>
                        ¡Obten Descuentos Exclusivos!
                      </Typography>
                      <Typography variant='h4' color='primary'>
                        Recibe descuentos en todos nuestros productos.
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        p: 4,
                        height: '100%',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: '10px'
                      }}
                    >
                      <Typography variant='h4' color='primary'>
                        ¡Obten Beneficios!
                      </Typography>
                      <Typography variant='h4' color='primary'>
                        Recibe comision al recomendar mas personas.
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height: '100%',
                        mt: 2
                      }}
                    >
                      <Link href='/landing-page/join' passHref>
                        <Button variant='contained' size='large' color='primary'>
                          AFÍLIATE A NOSOTROS
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              pt: '2rem',
              pb: '2rem'
            }}
          >
            <Products />
          </Box>
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
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '0',
                paddingTop: '60%', // Ajusta este valor para cambiar la altura del banner
                overflow: 'hidden'
              }}
            >
              <Image src={Banner} alt='aboutUs' layout='fill' objectFit='cover' quality={100} />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
      </Card>

      <Card sx={{ mt: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                height: '100%',
                padding: '2rem'
              }}
            >
              <Typography variant='h4' align='center' gutterBottom>
                Nuestra Historia
              </Typography>
              <Typography variant='body2' paragraph>
                Somos una empresa mexicana con 6 años de experiencia en la fabricación de productos de origen natural.
                Desde el inicio, tuvimos un sueño: acercar productos que no solo fueran de alta calidad, sino que
                realmente impactaran la vida de cada persona.
              </Typography>
              <Typography variant='body2' paragraph>
                Nuestro equipo de especialistas se esfuerza día a día en crear productos con tecnología innovadora,
                diseñados para que el cuerpo aproveche al máximo cada nutriente. Queremos que los beneficios de nuestro
                trabajo realmente lleguen a quienes confían en nosotros.
              </Typography>
              <Typography variant='body2' paragraph>
                Sin embargo, nos dimos cuenta de algo muy importante. Podíamos llevar nuestros productos a grandes
                cadenas y supermercados, pero en ese camino se perdería algo esencial: el contacto directo y la
                posibilidad de ver, en cada persona que confía en nosotros, a un miembro valioso de nuestra familia.
                Pensamos en lo mucho que podemos construir juntos y en el poder de que seas tú, y no una gran tienda,
                quien se convierta en nuestra voz y en nuestra conexión con cada hogar.
              </Typography>
              <Typography variant='body2' paragraph>
                Decidimos entonces que lo mejor sería crear un modelo en el que el beneficio de nuestros productos
                también pudiera transformarse en una oportunidad para quienes los consumen. Sabemos que, al igual que
                nosotros, buscas mejorar tu calidad de vida y la de tu familia. Para nosotros, no hay mayor satisfacción
                que saber que cada uno de nuestros productos llega a través de personas apasionadas y comprometidas,
                quienes son la esencia de esta gran familia.
              </Typography>
              <Typography variant='body2' paragraph>
                Queremos caminar junto a ti y apoyar a tu familia con productos en los que puedes confiar. Nuestro
                compromiso es que te sientas acompañado(a), escuchado(a) y valorado(a) en cada paso. Porque, para
                nosotros, cada persona que forma parte de esta historia no es solo un cliente, es alguien especial. Y
                sabemos que, juntos, podemos lograr mucho más de lo que podríamos alcanzar solos.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
      </Card>

      <Card sx={{ mt: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                height: '100%',
                padding: '2rem'
              }}
            >
              <Typography variant='h4' align='center' gutterBottom>
                Políticas de Remuneración y Consumo
              </Typography>
              <Typography variant='body2' paragraph>
                1. <strong>Compromiso de la empresa:</strong> Valoramos a cada consumidor y afiliado, creemos que cada
                persona es importante en nuestra comunidad, y por eso buscamos retribuir el esfuerzo y la confianza que
                depositan en nuestra empresa.
              </Typography>
              <Typography variant='body2' paragraph>
                2. <strong>Remuneración a afiliados:</strong> Los afiliados que comparten nuestros productos y los
                llevan a más personas reciben una remuneración económica como agradecimiento por su compromiso y
                trabajo.
              </Typography>
              <Typography variant='body2' paragraph>
                3. <strong>Requisito de consumo:</strong> Para recibir las comisiones generadas en el mes, pedimos a
                cada afiliado un consumo mínimo de $800 pesos en productos. En caso de no cumplir con este consumo, el
                afiliado no pierde su estatus en la empresa, solo la comisión generada en ese mes.
              </Typography>
              <Typography variant='body2' paragraph>
                4. <strong> Compromiso mutuo: </strong> Al consumir nuestros productos, los afiliados no solo disfrutan
                de sus beneficios, sino que contribuyen a una comunidad de bienestar que beneficia a todos los
                involucrados.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              pt: '2rem',
              pb: '2rem'
            }}
          >
            <Certifications />
          </Box>
        </Grid>
      </Grid>
      <FAQs data={questions} />
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      {/* <Footer /> */}
    </>
  )
}

export default Pricing
