import { useEffect } from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import Image from 'next/image'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { createPartner, setIsAffiliated } from 'src/store/users'
import { useSearchParams } from 'next/navigation'
import { FormHelperText } from '@mui/material'

const JoinInformation = ({ profile }) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { constants, isLoading } = useSelector(state => state.constants)
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const { user } = useSelector(state => state.session)
  const submitPartner = values => {
    dispatch(createPartner({ id: user.id }))
  }

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
      <Grid container justifyContent='center' alignItems='center' style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <>
      <Card>
        <Grid container spacing={20}>
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: 'center' }}>
              <CardHeader
                title={
                  user.profile === 'Consumidor' ? (
                    <Button onClick={submitPartner} variant='contained'>
                      AFÍLIATE ya!
                    </Button>
                  ) : (
                    mobile && (
                      <Link href={'/ecommerce/products/'} passHref>
                        <Button variant='contained'>Conoce nuestros productos</Button>
                      </Link>
                    )
                  )
                }
                subheader={user.profile === 'Consumidor' && 'Aquí abajo puedes leer como funciona…'}
              />
            </Box>
            <CardMedia
              sx={{
                height: mobile ? 300 : 500,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: '16px',
                overflow: 'hidden',
                mx: mobile ? '20px' : '40px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              image={'/images/banners/banner-31.jpg'}
              alt='Descripción'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <CardContent>
                    <Typography variant='h6'>
                      Creemos que la mejor manera de llegar a más personas es a través de nuestros consumidores por lo
                      cual a nuestros socios los remuneramos con comisión al recomendar nuestros productos.
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    margin: 'auto'
                  }}
                >
                  <Image
                    src={'/images/cards/undraw_travel_together_re_kjf2.svg'}
                    alt='Sample Image 1'
                    width={500}
                    height={500}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    margin: 'auto'
                  }}
                >
                  <Image
                    src={'/images/cards/undraw_true_friends_c-94-g.svg'}
                    alt='Sample Image 2'
                    width={500}
                    height={500}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <CardContent>
                    <Typography variant='h6'>
                      Para convertirte en socio de Inmunosalud, solo necesitas registrarte y podrás empezar a
                      recomendar. Para recibir comisiones, es necesario realizar compras de al menos $
                      {constants?.minimalAmountOfPurchase} en productos durante el mes.
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <CardContent>
                    <Typography variant='h6'>
                      Ser socio no implica la obligación de realizar compras constantes. En los meses en que no alcances
                      el consumo mínimo, no recibirás la comisión generada en ese periodo pero si seguirás siendo socio.
                      Si cumples con el consumo mínimo el mes siguiente, volverás a recibir comisiones de ese mes.
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <Image src={'/images/cards/undraw_workout_gcgu.svg'} alt='Sample Image 3' width={500} height={500} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: 'center' }}>
              <CardHeader title={<Typography variant='h4'>El esquema de comisiones es el siguiente:</Typography>} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '75%',
                height: '120px',
                marginLeft: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto' }) // Establecer marginLeft solo en dispositivos md o menores
              }}
            >
              <Button
                sx={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                variant='contained'
                aria-text='Más información'
              >
                <Typography variant='h5' fontWeight='bold' color='#fff'>
                  {`${(parseFloat(constants?.commissionPercentagePerLevel[1]) * 100).toFixed(0)}%`}
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '75%',
                height: '120px',
                marginRight: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto', textAlign: 'center' })
              }}
            >
              <Typography variant='h6'>
                Obtienes el {`${(parseFloat(constants?.commissionPercentagePerLevel[1]) * 100).toFixed(0)}%`} de la
                compra total de las personas que recomiendes.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginX: 'auto', marginY: '25px' }}>
              <ArrowDownward sx={{ fontSize: '4rem' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '75%',
                height: '120px',
                marginLeft: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto' }) // Establecer marginLeft solo en dispositivos md o menores
              }}
            >
              <Button
                sx={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                variant='contained'
                aria-text='Más información'
              >
                <Typography variant='h5' fontWeight='bold' color='#fff'>
                  {`${(parseFloat(constants?.commissionPercentagePerLevel[2]) * 100).toFixed(0)}%`}
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '75%',
                height: '120px',
                marginRight: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto', textAlign: 'center' })
              }}
            >
              <Typography variant='h6'>
                Si sus recomendados invitan a mas personas ganas el{' '}
                {`${(parseFloat(constants?.commissionPercentagePerLevel[2]) * 100).toFixed(0)}%`} de sus compras.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginX: 'auto', marginY: '25px' }}>
              <ArrowDownward sx={{ fontSize: '4rem' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '75%',
                height: '120px',
                marginLeft: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto' })
              }}
            >
              <Button
                sx={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                variant='contained'
                aria-text='Más información'
              >
                <Typography variant='h5' fontWeight='bold' color='#fff'>
                  {`${(parseFloat(constants?.commissionPercentagePerLevel[3]) * 100).toFixed(0)}%`}
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '75%',
                height: '120px',
                marginRight: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto', textAlign: 'center' })
              }}
            >
              <Typography variant='h6'>
                En caso de que los nuevos recomendados inviten a alguien mas recibes el{' '}
                {`${(parseFloat(constants?.commissionPercentagePerLevel[3]) * 100).toFixed(0)}%`} de sus compras.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginX: 'auto', marginY: '25px' }}>
              <ArrowDownward sx={{ fontSize: '4rem' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '75%',
                height: '120px',
                marginLeft: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto' })
              }}
            >
              <Button
                sx={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                variant='contained'
                aria-text='Más información'
              >
                <Typography variant='h5' fontWeight='bold' color='#fff'>
                  {`${(parseFloat(constants?.commissionPercentagePerLevel[4]) * 100).toFixed(0)}%`}
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '75%',
                height: '120px',
                marginRight: 'auto',
                marginY: '25px',
                ...(mobile && { marginX: 'auto', textAlign: 'center' })
              }}
            >
              <Typography variant='h6'>
                Y si estos recomendados traen más personas, recibirás el{' '}
                {`${(parseFloat(constants?.commissionPercentagePerLevel[4]) * 100).toFixed(0)}%`} de sus compras por
                cada uno de ellos.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <CardContent>
              <Typography
                variant='body1'
                sx={{
                  width: { md: '75%', xs: '100%' },
                  textAlign: 'center',
                  marginX: 'auto'
                }}
              >
                <b>
                  PARA RECIBIR COMISIONES POR TUS REFERENCIAS SOLO TIENES QUE HACER EL CONSUMO MÍNIMO MENSUAL, LAS
                  COMISIONES SE PAGAN DE MANERA MENSUAL, LOS MESES QUE NO COMPRES EL MÍNIMO NO RECIBES LA COMISIÓN
                  GENERADA DE ESE MES.
                </b>
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Box sx={{ mt: '50px', mb: '50px' }}>
                {profile === 'Consumidor' ? (
                  <Button variant='contained' size='large' onClick={submitPartner}>
                    {'Convertirme en afiliado'}
                  </Button>
                ) : (
                  profile !== 'Afiliado' && (
                    <>
                      {!sessionStorage.getItem('recommenderId') && !searchParams.get('id') ? (
                        <Link
                          href='https://wa.me/523334173934?text=¡Quiero%20un%20código!'
                          passHref
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button variant='contained' size='large'>
                            Obtén un código para registrarte
                          </Button>
                        </Link>
                      ) : (
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Box
                              sx={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <Button
                                variant='contained'
                                size='large'
                                color='secondary'
                                sx={{ width: '100%' }}
                                onClick={() => {
                                  dispatch(setIsAffiliated(false))
                                  router.push('/register')
                                }}
                              >
                                Registrarme como consumidor
                              </Button>

                              <FormHelperText sx={{ textAlign: 'center' }}>
                                Podrás afiliarte en cualquier momento para contar con estos beneficios.
                              </FormHelperText>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box
                              sx={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <Button
                                variant='contained'
                                size='large'
                                sx={{ width: '100%' }}
                                onClick={() => {
                                  dispatch(setIsAffiliated(true))
                                  router.push('/register')
                                }}
                              >
                                Registrarme como afiliado
                              </Button>

                              <FormHelperText sx={{ textAlign: 'center' }}>
                                Empieza a recomendar, obtendrás increíbles beneficios y descuentos.
                              </FormHelperText>
                            </Box>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  )
                )}
              </Box>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default JoinInformation
