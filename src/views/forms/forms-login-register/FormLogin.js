// React y Next
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import BlancoIotipo from '/public/images/logos/Blanco-Isotipo.png'
import BlancoLogotipo from 'public/images/logos/Blanco-Logotipo.png'
import NegroIotipo from '/public/images/logos/Negro-Isotipo.png'
import NegroLogotipo from 'public/images/logos/Negro-Logotipo.png'
// Material-UI
import {
  CircularProgress,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
  Avatar
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// React Hook Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// React Redux
import { useDispatch, useSelector } from 'react-redux'

// React i18next
import { useTranslation } from 'react-i18next'

// Iconos
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// Componentes
import { closeSnackBar } from 'src/store/notifications'
import { useSettings } from 'src/@core/hooks/useSettings'

// Endpoints
import { loginCall } from 'src/store/session'

const FormLogin = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('login')
  const { open, message, severity } = useSelector(state => state.notifications)
  const [showPassword, setShowPassword] = React.useState(false)

  const theme = useTheme()
  const { settings } = useSettings()
  const isDarkMode = theme.palette.mode === 'dark'
  const { skin } = settings
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required(t('common:error.required_field')),
    password: Yup.string().min(8, 'Contraseña inválida').required('La contraseña es requerida')
  })

  const defaultValues = {
    email: '',
    password: ''
  }

  const { control: loginControl, handleSubmit } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(loginSchema)
  })

  const submitLogin = values => {
    dispatch(loginCall(values))
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Box maxWidth={isMobile ? '90vw' : '600px'} mx='auto'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{ margin: '0 auto', pb: '1rem' }}>
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
        <form onSubmit={handleSubmit(submitLogin)}>
          <Card sx={{ overflow: 'auto', maxHeight: isMobile ? 'calc(100vh - 150px)' : 'auto' }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3.5} sx={{ display: 'flex', alignItems: 'center' }}>
                      <InputLabel sx={{ mb: { md: '20px' } }}>{'Correo Electronico'}:</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8.5}>
                      <FormControl fullWidth>
                        <Controller
                          name='email'
                          control={loginControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <>
                              <TextField
                                value={value}
                                onChange={onChange}
                                type='text'
                                error={!!error}
                                helperText={error ? error.message : ' '}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3.5} sx={{ display: 'flex', alignItems: 'center' }}>
                      <InputLabel sx={{ mb: { md: '20px' } }}>{'Contraseña'}:</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8.5}>
                      <FormControl fullWidth>
                        <Controller
                          name='password'
                          control={loginControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <>
                              <TextField
                                id='password-input'
                                value={value}
                                onChange={onChange}
                                type={showPassword ? 'text' : 'password'}
                                error={!!error}
                                helperText={error ? error.message : ' '}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                      <IconButton edge='end' onClick={handleShowPassword}>
                                        {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      mt: '10px',
                      flexDirection: { xs: 'column-reverse', md: 'row' }
                    }}
                  >
                    <Grid item xs={12} md={6}>
                      <Link passHref href='/register'>
                        <Button variant='outlined' fullWidth>
                          Registrarse
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button type='submit' variant='contained' fullWidth>
                        Iniciar Sesión
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <Link passHref href='/login/recover-password'>
                      <Button variant='outlined' color='secondary' sx={{ width: '100%' }}>
                        Olvide mi contraseña
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </Box>
    </>
  )
}
export default FormLogin
