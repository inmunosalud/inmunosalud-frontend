// ** React Imports
import { forwardRef, useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
//mui components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import { CircularProgress } from '@mui/material'

import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Styled Components
import { useDispatch, useSelector } from 'react-redux'
import { sendNewUser } from 'src/store/users'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import GoBackButton from 'src/views/components/goback/GoBack'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Custom Components Imports
// import StepperCustomDot from './StepperCustomDot'

// // ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

import { closeSnackBar } from 'src/store/notifications'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

const defaultValues = {
  colony: '',
  profile: '',
  number: '',
  state: '',
  city: '',
  street: '',
  recommenderId: ''
}

const steps = [
  {
    title: 'Direccion',
    subtitle: 'Ingresa tu direccion'
  },
  {
    title: 'Forma de pago',
    subtitle: 'Ingresa la informacion de tu forma de pago'
  }
]

const defaultAddressValues = {
  colony: '',
  profile: '',
  number: '',
  state: '',
  city: '',
  street: '',
  recommenderId: ''
}

const defaultPaymentValues = {
  alias: '',
  month: '',
  year: '',
  cardNumber: '',
  cardName: ''
}

const addressSchema = yup.object().shape({
  colony: yup.string().required(),
  zipCode: yup.string().required(),
  number: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  country: yup.string().required()
})

const paymentSchema = yup.object().shape({
  alias: yup.string().required(),
  month: yup.string().required(),
  year: yup.string().required(),
  cardNumber: yup.string().required(),
  cardName: yup.string().required()
})

function PAGE() {
  return `/register/register-02`
}

export default function Address() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoading } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)

  const [activeStep, setActiveStep] = useState(1)

  // ** Hooks
  const {
    reset: addressReset,
    control: addressControl,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors }
  } = useForm({
    defaultValues: defaultAddressValues,
    resolver: yupResolver(addressSchema)
  })

  const {
    reset: paymentReset,
    control: paymentControl,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors }
  } = useForm({
    defaultValues: defaultPaymentValues,
    resolver: yupResolver(paymentSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    addressReset({ email: '', username: '', password: '', 'confirm-password': '' })
    paymentReset({ country: '', language: [], 'last-name': '', 'first-name': '' })
  }

  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAddressSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='street'
                    control={addressControl}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Calle'
                        onChange={onChange}
                        placeholder='Calle'
                        error={Boolean(addressErrors.street)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {addressErrors.street?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='number'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número Exterior'
                        onChange={onChange}
                        placeholder='No. Ext'
                        error={Boolean(addressErrors.number)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {addressErrors.number && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='number'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número Interior'
                        onChange={onChange}
                        placeholder='No. Int'
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='colony'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Colonia'
                        onChange={onChange}
                        error={Boolean(addressErrors.colony)}
                        placeholder='Colonia'
                        aria-describedby='validation-basic-colony'
                      />
                    )}
                  />
                  {addressErrors.colony && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-colony'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='city'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='tel'
                        value={value}
                        label='Ciudad'
                        onChange={onChange}
                        error={Boolean(addressErrors.city)}
                        placeholder='Ciudad'
                        aria-describedby='validation-basic-city'
                      />
                    )}
                  />
                  {addressErrors.city?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-city'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='state'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Estado'
                        onChange={onChange}
                        error={Boolean(addressErrors.state)}
                        placeholder='Entidad Federativa'
                        aria-describedby='validation-basic-state'
                      />
                    )}
                  />
                  {addressErrors.state?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-state'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='zipCode'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código Postal'
                        onChange={onChange}
                        error={Boolean(addressErrors.zipCode)}
                        placeholder='Código Postal'
                        aria-describedby='validation-basic-zipCode'
                      />
                    )}
                  />
                  {addressErrors.zipCode?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-zipCode'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='country'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='País'
                        onChange={onChange}
                        error={Boolean(addressErrors.country)}
                        placeholder='País'
                        aria-describedby='validation-basic-country'
                      />
                    )}
                  />
                  {addressErrors.country?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-country'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='reference'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Referencia'
                        onChange={onChange}
                        placeholder='Referencia. Ej. Fachada blanca, herrería negra'
                        aria-describedby='validation-basic-reference'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Atras
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePaymentSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='alias'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Alias'
                        onChange={onChange}
                        placeholder='Alias'
                        error={Boolean(paymentErrors['alias'])}
                        aria-describedby='stepper-linear-payment-alias'
                      />
                    )}
                  />
                  {paymentErrors['alias'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-alias'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-payment-country'
                    error={Boolean(paymentErrors.country)}
                    htmlFor='stepper-linear-payment-country'
                  >
                    MM
                  </InputLabel>
                  <Controller
                    name='month'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='MM'
                        onChange={onChange}
                        error={Boolean(paymentErrors.month)}
                        labelId='stepper-linear-payment-month'
                        aria-describedby='stepper-linear-payment-month-helper'
                      >
                        <MenuItem value='01'>01</MenuItem>
                        <MenuItem value='02'>02</MenuItem>
                        <MenuItem value='03'>03</MenuItem>
                        <MenuItem value='04'>04</MenuItem>
                        <MenuItem value='05'>05</MenuItem>
                        <MenuItem value='06'>06</MenuItem>
                        <MenuItem value='07'>07</MenuItem>
                        <MenuItem value='08'>08</MenuItem>
                        <MenuItem value='09'>09</MenuItem>
                        <MenuItem value='10'>10</MenuItem>
                        <MenuItem value='11'>11</MenuItem>
                        <MenuItem value='12'>12</MenuItem>
                      </Select>
                    )}
                  />
                  {paymentErrors.month && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-month-helper'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='year'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='AA'
                        onChange={onChange}
                        placeholder='AA'
                        error={Boolean(paymentErrors['year'])}
                        aria-describedby='stepper-linear-payment-year'
                      />
                    )}
                  />
                  {paymentErrors['year'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-year'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='cardNumber'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Numero de la tarjeta'
                        onChange={onChange}
                        placeholder='XXXX-XXXX-XXXX-XXXX'
                        error={Boolean(paymentErrors['cardNumber'])}
                        aria-describedby='stepper-linear-payment-cardNumber'
                      />
                    )}
                  />
                  {paymentErrors['cardNumber'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-cardNumber'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='cardName'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Titular de la tarjeta'
                        onChange={onChange}
                        placeholder='Titular de la tarjeta'
                        error={Boolean(paymentErrors['cardName'])}
                        aria-describedby='stepper-linear-payment-cardName'
                      />
                    )}
                  />
                  {paymentErrors['cardName'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-cardName'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Atras
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </form>
        )

      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>Todos los pasos han sido completados</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reiniciar
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  useEffect(() => {
    isLoading === 'resolved' && resetValues()
  }, [isLoading])
  return (
    <>
      <Box
        container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '3rem' }}
      >
        <Card>
          <CardContent>
            <StepperWrapper>
              <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                  const labelProps = {}
                  if (index === activeStep) {
                    labelProps.error = false
                    if (
                      (addressErrors.street ||
                        addressErrors.number ||
                        addressErrors.colony ||
                        addressErrors.state ||
                        addressErrors.zipCode ||
                        addressErrors.country ||
                        addressErrors.city) &&
                      activeStep === 0
                    ) {
                      labelProps.error = true
                    } else if (
                      (paymentErrors.alias ||
                        paymentErrors.month ||
                        paymentErrors.year ||
                        paymentErrors.cardNumber ||
                        paymentErrors.cardName) &&
                      activeStep === 1
                    ) {
                      labelProps.error = true
                    }
                  }

                  return (
                    <Step key={index}>
                      <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                        <div className='step-label'>
                          <Typography className='step-number'>0{index + 1}</Typography>
                          <div>
                            <Typography className='step-title'>{step.title}</Typography>
                            <Typography className='step-subtitle'>{step.subtitle}</Typography>
                          </div>
                        </div>
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </StepperWrapper>
          </CardContent>

          <Divider sx={{ m: 0 }} />

          <CardContent>{renderContent()}</CardContent>
        </Card>
      </Box>

      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

Address.getLayout = page => <BlankLayout>{page}</BlankLayout>
Address.guestGuard = true
