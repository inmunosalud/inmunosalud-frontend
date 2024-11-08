import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Form from 'src/views/forms/forms-login-register/Form'
import FormRegister from 'src/views/forms/forms-login-register/FormRegister'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import GoBackButton from 'src/views/components/goback/GoBack'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import { isDataLoaded } from 'src/store/dashboard/generalSlice'
import BlancoIotipo from '/public/images/logos/Blanco-Isotipo.png'
import BlancoLogotipo from 'public/images/logos/Blanco-Logotipo.png'
import NegroIotipo from '/public/images/logos/Negro-Isotipo.png'
import NegroLogotipo from 'public/images/logos/Negro-Logotipo.png'
import { styled, useTheme } from '@mui/material/styles'
import { Card, CardHeader, Typography, CardContent } from '@mui/material'
import { Whatsapp } from 'mdi-material-ui'
import useMediaQuery from '@mui/material/useMediaQuery'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import { useSettings } from 'src/@core/hooks/useSettings'

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { isLoading } = useSelector(state => state.session)
  const { isLoadingRegister } = useSelector(state => state.users)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { settings, saveSettings } = useSettings()

  React.useEffect(() => {
    dispatch(isDataLoaded(false))
  }, [])

  // ** State

  return isLoading || isLoadingRegister ? (
    <FallbackSpinner />
  ) : (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px', mr: '20px', ml: '20px' }}>
            <GoBackButton onChangePage={'/login'} />
            <ModeToggler settings={settings} saveSettings={saveSettings} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display='flex' justifyContent='center' alignItems='center' sx={{ margin: '0 auto' }}>
            <Link href='/landing-page/home' passHref style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: '2rem' }}>
                <Image
                  src={theme.palette.mode === 'dark' ? BlancoLogotipo : NegroLogotipo}
                  alt='Logo'
                  height={isMobile ? 30 : 50}
                  priority
                />
              </Box>
            </Link>
            <Link href='/landing-page/home' passHref style={{ textDecoration: 'none' }}>
              <IconButton
                disableRipple
                disableFocusRipple
                sx={{ p: 0, color: 'text.primary', backgroundColor: 'transparent !important' }}
              >
                <Image
                  src={theme.palette.mode === 'dark' ? BlancoIotipo : NegroIotipo}
                  alt='Isotipo'
                  priority
                  height={isMobile ? 30 : 60}
                />
              </IconButton>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box maxWidth={isMobile ? '90vw' : '600px'} mx='auto'>
            <FormRegister />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
