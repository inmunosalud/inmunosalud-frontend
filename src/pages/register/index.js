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

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { isLoading } = useSelector(state => state.session)

  React.useEffect(() => {
    dispatch(isDataLoaded(false))
  }, [])

  // ** State

  return isLoading ? (
    <FallbackSpinner />
  ) : (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} display='flex' justifyContent='flex-end' style={{ marginBottom: '1rem' }}>
            <Box display='flex' justifyContent='center' alignItems='center' style={{ margin: '0 auto' }}>
              <Link href='/' passHref style={{ textDecoration: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}>
                  <Image src={theme.palette.mode === 'dark' ? BlancoLogotipo : NegroLogotipo} alt='Logo' height={50} />
                </Box>
              </Link>
              <Link href='/' passHref style={{ textDecoration: 'none' }}>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  sx={{ p: 0, color: 'text.primary', backgroundColor: 'transparent !important' }}
                >
                  <Image src={theme.palette.mode === 'dark' ? BlancoIotipo : NegroIotipo} alt='Isotipo' height={60} />
                </IconButton>
              </Link>
            </Box>
            <GoBackButton onChangePage={() => router.back()} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Form />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormRegister />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
