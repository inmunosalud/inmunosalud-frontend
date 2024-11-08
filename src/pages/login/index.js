import * as React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FallbackSpinner from 'src/@core/components/spinner'
import FormLogin from 'src/views/forms/forms-login-register/FormLogin'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import { loadSession } from 'src/store/session'
import Router from 'next/router'
import { useSettings } from 'src/@core/hooks/useSettings'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import GoBackButton from 'src/views/components/goback/GoBack'
import { Whatsapp } from 'mdi-material-ui'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import BlancoIotipo from '/public/images/logos/Blanco-Isotipo.png'
import BlancoLogotipo from 'public/images/logos/Blanco-Logotipo.png'
import NegroIotipo from '/public/images/logos/Negro-Isotipo.png'
import NegroLogotipo from 'public/images/logos/Negro-Logotipo.png'
const Login = () => {
  const dispatch = useDispatch()
  const { settings, saveSettings } = useSettings()
  const { isLoading, user } = useSelector(state => state.session)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(() => {
    const usuarioLocalStorage = localStorage.getItem('im-user')
    if (usuarioLocalStorage && !user && usuarioLocalStorage !== 'undefined') {
      dispatch(loadSession())
      Router.push('/home')
    } else if (usuarioLocalStorage && user && usuarioLocalStorage !== 'undefined') {
      Router.push('/home')
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <BlankLayout>
          <Grid container spacing={5} sx={{ overflow: 'hidden' }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px', mr: '20px', ml: '20px' }}>
                <GoBackButton onChangePage={'/landing-page/home'} />
                <ModeToggler settings={settings} saveSettings={saveSettings} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={5}>
                <FormLogin />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box maxWidth={isMobile ? '90vw' : '600px'} mx='auto'>
                {isMobile ? (
                  <Card>
                    <CardHeader
                      title='¿Tienes ningún problema? '
                      subheader={
                        <Typography variant='body2' color='textSecondary'>
                          Comunícate con nosotros enviando un mensaje por WhatsApp.
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton href='https://wa.me/523334173934'>
                          <Typography variant='h6' fontWeight='bold' color='textPrimary' mr={1}>
                            +52 33 3417 3934
                          </Typography>
                          <Whatsapp color='primary' sx={{ fontSize: '3rem' }} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader
                      action={
                        <IconButton href='https://wa.me/523334173934'>
                          <Typography variant='h6' fontWeight='bold' color='textPrimary' mr={1}>
                            +52 33 3417 3934
                          </Typography>
                          <Whatsapp color='primary' sx={{ fontSize: '3rem' }} />
                        </IconButton>
                      }
                      title='¿Tienes algún problema? '
                      subheader={
                        <Typography variant='body2' color='textSecondary'>
                          Comunícate con nosotros enviándonos un mensaje por WhatsApp.
                        </Typography>
                      }
                    />
                  </Card>
                )}
              </Box>
            </Grid>
          </Grid>
        </BlankLayout>
      )}
    </>
  )
}

Login.getLayout = page => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true

export default Login
