import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Rating
} from '@mui/material'
import CarouselProducts from 'src/views/components/swiper/CarouselProducts'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getProductById } from 'src/store/products'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const { currentProduct, isLoading } = useSelector(state => state.products)

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id))
    }
  }, [dispatch, id])

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Product details and carousel */}
        <Grid item xs={12} md={6}>
          <Typography variant='h4'>{currentProduct?.product}</Typography>
          <Typography variant='subtitle1' sx={{ marginTop: 10 }}>
            {currentProduct?.content}
          </Typography>
          <Typography variant='subtitle1' sx={{ marginTop: 10 }}>
            Ingredientes activos: {currentProduct?.ingredients}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CarouselProducts images={currentProduct?.urlImages} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h5' sx={{ marginTop: 4 }}>
              ${currentProduct?.price}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button variant='contained' color='primary' sx={{ marginBottom: 2, width: '50%' }}>
              Comprar Ahora
            </Button>
            <Button variant='outlined' color='primary' sx={{ marginBottom: 2, width: '50%' }}>
              Agregar al Carrito
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 20 }}>
        {/* Conoce más del producto */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Conoce más del producto
          </Typography>
          <Typography variant='body1'>
            <div dangerouslySetInnerHTML={{ __html: currentProduct?.description }} />
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ marginTop: 30 }}>
        {/* Beneficios */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h5' gutterBottom sx={{ textAlign: 'left', width: '40%' }}>
              Beneficios de consumir este producto
            </Typography>
            <Typography variant='h5' sx={{ marginTop: 2, width: '60%' }}>
              <ul>
                {currentProduct?.benefits?.map(benefit => (
                  <li key={benefit.title}>{benefit.title}</li>
                ))}
              </ul>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ marginTop: 30 }}>
        {/* Más información sobre los beneficios */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom sx={{ textAlign: 'left', width: '50%' }}>
            Más información sobre los beneficios
          </Typography>
          <Typography variant='body1'>
            <ul>
              {currentProduct?.benefits?.map(benefit => (
                <li key={benefit.detail}>{benefit.detail}</li>
              ))}
            </ul>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {/* Estudios */}
        {currentProduct?.studies?.map((estudio, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <CardHeader title={estudio.title} />
              <CardContent>
                {estudio.pageName.toLowerCase() === 'pubmed' ? (
                  <img
                    loading='lazy'
                    src='/images/studies/pubmed-logo-blue.svg'
                    alt='Estudio'
                    style={{ width: '200px', margin: 'auto' }}
                  />
                ) : (
                  <Typography
                    variant='h4'
                    sx={{
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: 'primary.main',
                      margin: 'auto',
                      fontSize: estudio.pageName.length > 10 ? 24 : 32
                    }}
                  >
                    {estudio.pageName}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ marginTop: 'auto' }}>
                <Button variant='outlined' href={estudio.url} target='_blank' rel='noopener noreferrer'>
                  Ver estudio
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* <Grid container spacing={4} sx={{ marginTop: 30 }}>
          
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            Reseñas
          </Typography>

          <Grid container spacing={2}>
            {currentProduct?.reviews?.map((review, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle1'>{review.userName}</Typography>
                      <Rating
                        value={review.rating}
                        color='primary'
                        readOnly
                        sx={{ ml: 'auto', color: 'primary.main' }}
                      />
                    </Box>
                    <Typography color={'warning.main'} variant='body2'>
                      {review.userProfile}
                    </Typography>
                    <Typography variant='body2'>{review.review}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
       */}
    </Container>
  )
}
