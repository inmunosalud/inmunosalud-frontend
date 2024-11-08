// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import GoBackButton from 'src/views/components/goback/GoBack'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import { useSettings } from 'src/@core/hooks/useSettings'

// Iconos
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendPasswordVerificationCode, validatePasswordRecoveryCode, recoverPassword } from 'src/store/users'
import VerificationInput from 'react-verification-input'
import { closeSnackBar } from 'src/store/notifications'

// ** Form and Validation Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

// ** Validation Schemas
const emailSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido')
})

const codeSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .length(6, 'El código debe tener 6 dígitos')
    .required('Código de verificación es requerido')
})

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(/[0-9]/, 'La contraseña debe tener al menos un número')
    .matches(/[@$!%*?&]/, 'La contraseña debe tener al menos un carácter especial (@, $, !, %, *, ?, &)')
    .required('La contraseña es requerida')
})

const RecoverPassword = () => {
  const [step, setStep] = useState(1)
  const { open, message, severity } = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoading } = useSelector(state => state.users)
  const [showPassword, setShowPassword] = useState(false)
  const { settings, saveSettings } = useSettings()
  const {
    control: emailControl,
    watch: watchEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors }
  } = useForm({
    resolver: yupResolver(emailSchema)
  })

  const {
    control: codeControl,
    watch: watchCode,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors }
  } = useForm({
    resolver: yupResolver(codeSchema)
  })

  const {
    control: passwordControl,
    watch: watchPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors }
  } = useForm({
    resolver: yupResolver(passwordSchema)
  })

  const email = watchEmail('email')
  const verificationCode = watchCode('verificationCode')

  const onSubmitEmail = async value => {
    const body = {
      email: value.email
    }
    try {
      console.log('si entro')
      await dispatch(sendPasswordVerificationCode(body)).unwrap()
      setStep(2)
    } catch (error) {
      console.log('no entro')

      console.error(error)
    }
  }

  const onSubmitVerification = async value => {
    const body = {
      email,
      code: value.verificationCode
    }

    try {
      await dispatch(validatePasswordRecoveryCode(body)).unwrap()
      setStep(3)
    } catch (error) {
      console.error(error)
      // Handle error appropriately here
    }
  }

  const onSubmitPassword = async value => {
    const body = {
      email,
      code: verificationCode,
      password: value.password
    }

    try {
      await dispatch(recoverPassword(body)).unwrap()
      router.push('/login')
    } catch (error) {
      console.error(error)
      // Handle error appropriately here
    }
  }

  const resendVerificationCode = () => {
    dispatch(sendPasswordVerificationCode({ email }))
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px', mr: '20px', ml: '20px' }}>
        <GoBackButton onChangePage={'/login'} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px', mr: '20px', ml: '20px' }}>
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BoxWrapper>
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Card>
                <CardHeader
                  title='Recupera tu Contraseña'
                  subheader={
                    step === 1
                      ? 'Ingresa tu correo electrónico para recibir un código de verificación.'
                      : step === 2
                        ? 'Te enviamos un código a tu correo para verificar tu cuenta.'
                        : step === 3 && 'Ingresa tu nueva contraseña.'
                  }
                  sx={{ textAlign: 'center' }}
                />
                <CardContent>
                  {step === 1 && (
                    <form noValidate autoComplete='off' onSubmit={handleEmailSubmit(onSubmitEmail)}>
                      <Controller
                        name='email'
                        control={emailControl}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            value={value}
                            onChange={onChange}
                            label='Correo Electrónico'
                            sx={{ mb: 3 }}
                            error={!!emailErrors.email}
                            helperText={emailErrors.email ? emailErrors.email.message : ' '}
                          />
                        )}
                      />
                      <Button type='submit' variant='contained' sx={{ ml: 2.5, pl: 5.5, pr: 5.5 }}>
                        Enviar Código
                      </Button>
                    </form>
                  )}
                  {step === 2 && (
                    <form noValidate autoComplete='off' onSubmit={handleCodeSubmit(onSubmitVerification)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controller
                          name='verificationCode'
                          control={codeControl}
                          render={({ field: { value, onChange } }) => (
                            <VerificationInput
                              value={value}
                              classNames={{
                                container: 'container',
                                character: 'character',
                                characterInactive: 'character--inactive',
                                characterSelected: 'character--selected'
                              }}
                              onChange={onChange}
                              validChars='0-9'
                              inputProps={{ inputMode: 'numeric' }}
                            />
                          )}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Button type='submit' variant='contained' sx={{ ml: 2.5, pl: 5.5, pr: 5.5 }}>
                          Verificar
                        </Button>
                        <Button
                          type='button'
                          variant='outlined'
                          sx={{ ml: 2.5, pl: 5.5, pr: 5.5 }}
                          onClick={resendVerificationCode}
                        >
                          Reenviar Código
                        </Button>
                      </Box>
                    </form>
                  )}
                  {step === 3 && (
                    <form noValidate autoComplete='off' onSubmit={handlePasswordSubmit(onSubmitPassword)}>
                      <Controller
                        name='password'
                        control={passwordControl}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label='Nueva Contraseña'
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            sx={{ mb: 3 }}
                            error={!!passwordErrors.password}
                            helperText={passwordErrors.password ? passwordErrors.password.message : ' '}
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
                        )}
                      />
                      <Button type='submit' variant='contained' sx={{ ml: 2.5, pl: 5.5, pr: 5.5 }}>
                        Restablecer Contraseña
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}
          </BoxWrapper>
        </Box>
      </Box>
    </>
  )
}

RecoverPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
RecoverPassword.guestGuard = true

export default RecoverPassword
