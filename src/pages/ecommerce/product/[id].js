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
  CircularProgress
} from '@mui/material'
import CarouselProducts from 'src/views/components/swiper/CarouselProducts'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getProductById } from 'src/store/products'
import { useTheme } from '@mui/material/styles'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { updateCart } from 'src/store/cart'
import RedirectModal from 'src/pages/components/modals/RedirectModal'
import { setShowConfirmModal, setShowRedirectModal } from 'src/store/users'
import { useSearchParams } from 'next/navigation'
import { Share as ShareIcon } from '@mui/icons-material'
import useMediaQuery from '@mui/material/useMediaQuery'
export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const theme = useTheme()
  const { products } = useSelector(state => state.cart)
  const searchParams = useSearchParams()
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [isAddToCart, setIsAddToCart] = React.useState(false)
  const { showConfirmModal, showRedirectModal } = useSelector(state => state.users)
  const [isCopied, setIsCopied] = React.useState(false)

  const { currentProduct, isLoading } = useSelector(state => state.products)
  const { user } = useSelector(state => state.session)

  const handleShare = async () => {
    const productUrl =
      `${window.location.origin}/ecommerce/product/${id}/?id=${user?.id}` +
      `&fn=${btoa(unescape(encodeURIComponent(user?.firstName)))}` +
      `&ln=${btoa(unescape(encodeURIComponent(user?.lastName)))}`

    try {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 800)
      await navigator.clipboard.writeText(productUrl)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    const id = searchParams.get('id')
    const firstName = searchParams.get('fn')
    const lastName = searchParams.get('ln')
    if (id) {
      sessionStorage.setItem('recommenderId', id)
      sessionStorage.setItem('recommenderFirstName', firstName)
      sessionStorage.setItem('recommenderLastName', lastName)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  const handleAddToCart = () => {
    if (!user.id) {
      dispatch(setShowRedirectModal(true))
      return
    }

    const updatedQuantity = (products.find(product => product.id === currentProduct.id)?.quantity || 0) + 1

    const body = {
      id: currentProduct.id,
      quantity: updatedQuantity
    }

    setIsAddToCart(true)
    setTimeout(() => setIsAddToCart(false), 800)

    dispatch(updateCart({ id: user.id, body }))
  }

  const handlePurchaseNow = () => {
    if (!user.id) {
      dispatch(setShowRedirectModal(true))
      return
    }

    const updatedQuantity = (products.find(product => product.id === currentProduct.id)?.quantity || 0) + 1

    const body = {
      id: currentProduct.id,
      quantity: updatedQuantity
    }

    dispatch(updateCart({ id: user.id, body }))
    router.push('/ecommerce/cart/')
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Product details and carousel */}
        <Grid item xs={12} md={6}>
          <Typography variant='h4'>{currentProduct?.product}</Typography>
          <Typography variant='subtitle1' sx={{ marginTop: 10 }}>
            <div dangerouslySetInnerHTML={{ __html: currentProduct?.content }} />
          </Typography>
          {!currentProduct?.ingredients?.trim() ? null : (
            <Typography variant='subtitle1' sx={{ marginTop: 10 }}>
              Ingredientes activos: {currentProduct?.ingredients}
            </Typography>
          )}
          {user.profile === 'Afiliado' && (
            <Box
              sx={{
                pt: '2rem',
                display: 'flex',
                flexDirection: mobile ? 'column' : 'column',
                justifyContent: mobile ? 'center' : 'flex-end',
                alignItems: mobile ? 'center' : undefined,
                width: mobile ? '100%' : '50%'
              }}
            >
              <Button
                endIcon={<ShareIcon />}
                color='primary'
                size='large'
                variant='outlined'
                onClick={handleShare}
                sx={{
                  gap: 1,
                  width: '100%',
                  mb: 2
                }}
              >
                {isCopied ? 'Copiado' : 'Compartir producto'}
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CarouselProducts images={currentProduct?.urlImages} />
          </Box>
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {user.profile === 'Afiliado' ? (
              <>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant='h5'
                        color='text.secondary'
                        sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}
                      >
                        <span style={{ textDecoration: 'line-through' }}>${currentProduct?.price}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}>
                        <ArrowRightAltIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant='h5' color='primary' sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}>
                        ${currentProduct?.affiliatedPrice || currentProduct?.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={4}>
                    <Typography variant='body2' color='primary' sx={{ display: 'block', textAlign: 'center' }}>
                      Precio para afiliados
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant='h5'
                      color='text.primary'
                      sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}
                    >
                      ${currentProduct?.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}>
                      <ArrowRightAltIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='h5' color='primary' sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}>
                      ${currentProduct?.affiliatedPrice || currentProduct?.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>

          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              onClick={handlePurchaseNow}
              variant='contained'
              color='primary'
              sx={{ marginBottom: 2, width: '50%' }}
            >
              Comprar Ahora
            </Button>
            <Button onClick={handleAddToCart} variant='outlined' color='primary' sx={{ marginBottom: 2, width: '50%' }}>
              {isAddToCart ? 'agregado' : 'Agregar al Carrito'}
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
      {currentProduct?.benefits?.length > 0 && (
        <>
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
                <div dangerouslySetInnerHTML={{ __html: currentProduct?.benefits[0]?.detail }} />
              </Typography>
            </Grid>
          </Grid>
        </>
      )}

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
      <RedirectModal
        open={showRedirectModal}
        handleClose={() => dispatch(setShowRedirectModal(false))}
        pageToRedirect={'/login'}
      ></RedirectModal>
    </Container>
  )
}
