// ** MUI Imports
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
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

const JoinInformation = () => {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <>
      <Card>
        <Grid container spacing={20}>
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: 'center' }}>
              <CardHeader title={<Typography variant='h4'>Conviertete en socio</Typography>} />
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
                      recomendar. Para recibir comisiones, es necesario realizar compras de al menos $800 en productos
                      durante el mes.
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
                  5%
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
              <Typography variant='h6'>Obtienes el 5% de la compra total de las personas que recomiendes.</Typography>
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
                  10%
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
                Si sus recomendados invitan a mas personas ganas el 10% de sus compras.
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
                  15%
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
                En caso de que los nuevos recomendados inviten a alguien mas recibes el 15% de sus compras.
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
                  15%
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
                Y si estos recomendados traen más personas, recibirás el 15% de sus compras por cada uno de ellos.
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
                  PARA RECIBIR COMISIONES POR TUS REFERENCIAS SOLO TIENES QUE HACER EL CONSUMO MINIMO MENSUAL, LAS
                  COMISIONES SE PAGAN DE MANERA MENSUAL, LOS MESES QUE NO COMPRES EL MINIMO NO RECIBES LA COMISION
                  GENERADA DE ESE MES.
                </b>
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Box sx={{ mt: '50px', mb: '50px' }}>
                <Link href={'/join/register'} passHref>
                  <Button variant='outlined' size='large' disabled>
                    {'Convertirme en socio'}
                  </Button>
                </Link>
              </Box>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default JoinInformation
