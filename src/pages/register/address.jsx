// ** React Imports
import React, { forwardRef, useState, useEffect, Fragment, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Components Imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Step,
  Stepper,
  StepLabel,
  TextField,
  Typography,
  CircularProgress,
  Button
} from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { CardsPlayingSpade } from 'mdi-material-ui'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import SignatureCanvas from 'react-signature-canvas'

// ** Custom Components Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import GoBackButton from 'src/views/components/goback/GoBack'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

// ** Store Imports
import { sendNewUser, updateUser } from 'src/store/users'
import { closeSnackBar } from 'src/store/notifications'
import { createAddress, getColonies, selectColony } from 'src/store/address'
import { setActiveStep, nextStep } from 'src/store/register'
import { createMethod } from 'src/store/paymentMethods'
import { PROFILES_USER } from 'src/configs/profiles'
import { loadSession } from 'src/store/dashboard/generalSlice'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { BANKS } from 'src/configs/banks'

const steps = [
  {
    title: 'Datos personales',
    subtitle: 'Ingresa tus datos personales'
  },
  {
    title: 'Dirección',
    subtitle: 'Ingresa tu dirección'
  },
  {
    title: 'Forma de pago',
    subtitle: 'Ingresa la información de tu forma de pago'
  },
  {
    title: 'Datos Bancarios',
    subtitle: 'Ingresa la información para recibir tu pago de comisiones'
  },
  {
    title: 'Contrato de Adhesión',
    subtitle: 'Ingresa la información para la elaboración del contrato'
  }
]

const defaultDataValues = {
  firstName: '',
  lastName: '',
  phone: ''
}

const defaultAddressValues = {
  street: '',
  extNumber: '',
  intNumber: '',
  colony: '',
  federalEntity: '',
  zipCode: '',
  country: '',
  city: '',
  refer: ''
}

const defaultPaymentValues = {
  alias: '',
  month: '',
  year: '',
  nameOnCard: '',
  cardNumber: '',
  cvc: ''
}

const defaultBankInfoValues = {
  beneficiary: '',
  clabe: '',
  bank: ''
}

const defaultTaxInfoValues = {
  rfc: '',
  identificationType: '',
  otherIdentification: '',
  signature: ''
}

const dataSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(10, 'Deben ser 10 dígitos')
    .max(10, 'Deben ser 10 dígitos')
  // birthDate: yup.date()
})

const addressSchema = yup.object().shape({
  zipCode: yup.string().required(),
  extNumber: yup.string().required(),
  intNumber: yup.string(),
  street: yup.string().required(),
  refer: yup.string().required()
})

const paymentSchema = yup.object().shape({
  alias: yup.string().required(),
  month: yup.string().required(),
  year: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(4, 'Deben ser 4 dígitos')
    .max(4, 'Deben ser 4 dígitos'),
  cardNumber: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(16, 'Deben ser 16 dígitos')
    .max(16, 'Deben ser 16 dígitos'),

  nameOnCard: yup.string().required(),
  cvc: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(3, 'Deben ser 3 dígitos')
    .max(4, 'Deben ser 4 dígitos')
})

const bankInfoSchema = yup.object().shape({
  beneficiary: yup.string().required(),
  clabe: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(18, 'Deben ser 18 dígitos')
    .max(18, 'Deben ser 18 dígitos'),
  bank: yup.string().required()
})

const taxInfoSchema = yup.object().shape({
  rfc: yup.string().required('El campo es requerido'),
  identificationType: yup.string().required('El campo es requerido'),
  otherIdentification: yup.string().when('identificationType', {
    is: 'Otro',
    then: yup.string().required('El campo es requerido'),
    otherwise: yup.string().notRequired()
  }),
  signature: yup.string().required('La firma electrónica es requerida')
})

function PAGE() {
  return `/register/register-02`
}

export default function Address() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector(state => state.dashboard.general)
  const { isLoading } = useSelector(state => state.users)
  const { colonies, selectedColony } = useSelector(state => state.address)
  const { activeStep } = useSelector(state => state.register)
  const { open, message, severity } = useSelector(state => state.notifications)
  const [showOtherIdentification, setShowOtherIdentification] = useState(false)
  const [idType, setIdType] = useState('')
  const signatureRef = useRef(null)

  // Get the current year
  const currentYear = new Date().getFullYear()

  // Generate an array of options for the next 6 years
  const options = Array.from({ length: 6 }, (_, i) => ({
    value: currentYear + i,
    label: `${currentYear + i}`.slice(-2)
  }))

  useEffect(() => {
    dispatch(loadSession())
  }, [])

  // ** Hooks
  const {
    reset: dataReset,
    control: dataControl,
    handleSubmit: handleDataSubmit,
    formState: { errors: dataErrors }
  } = useForm({
    defaultValues: defaultDataValues,
    resolver: yupResolver(dataSchema)
  })
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

  const {
    reset: bankInfoReset,
    control: bankInfoControl,
    handleSubmit: handleBankInfoSubmit,
    formState: { errors: bankInfoErrors }
  } = useForm({
    defaultValues: defaultBankInfoValues,
    resolver: yupResolver(bankInfoSchema)
  })

  const {
    reset: taxInfoReset,
    control: taxInfoControl,
    handleSubmit: handleTaxInfoSubmit,
    formState: { errors: taxInfoErrors }
  } = useForm({
    defaultValues: defaultTaxInfoValues,
    resolver: yupResolver(taxInfoSchema)
  })

  const handleTaxInfoChange = event => {
    const value = event.target.value
    setIdType(value)
    if (value === 'Otro') {
      setShowOtherIdentification(true)
    } else {
      setShowOtherIdentification(false)
    }
  }

  // Handle Stepper
  const handleBack = () => {
    const newStep = activeStep - 1
    if (newStep >= 0) {
      dispatch(setActiveStep(newStep))
    }
  }

  const handleReset = () => {
    router.push({ pathname: '/ecommerce/cart', query: { type: 'affiliated' } })
  }

  const onDataSubmit = values => {
    values.profile = PROFILES_USER.affiliatedUser
    dispatch(updateUser({ body: values, uuid: user.id }))
  }

  const onAddressSubmit = values => {
    if (selectColony.colony != '') {
      const body = {
        street: values.street,
        extNumber: values.extNumber,
        intNumber: values?.intNumber,
        zipCode: values.zipCode,
        colony: selectedColony.colony,
        city: selectedColony.city,
        federalEntity: selectedColony.federalEntity,
        country: 'Mexico',
        refer: values.refer
      }
      dispatch(createAddress({ body: body, uuid: user.id }))
    }
  }

  const onPaymentSubmit = values => {
    const body = {
      ...values,
      cardUse: 'Pago',
      expDate: `${values.month}/${values.year}`
    }

    dispatch(createMethod({ body, uuid: user.id }))
  }

  const onBankInfoSubmit = values => {
    const body = {
      ...values,
      cardUse: 'Cobro'
    }

    dispatch(createMethod({ body, uuid: user.id }))
  }

  const onTaxInfoSubmit = values => {
    const signatureData = signatureRef.current.toDataURL() // Obtiene la imagen de la firma
    const body = {
      ...values
    }

    dispatch(createMethod({ body, uuid: user.id }))
  }

  const getValidDate = () => {
    const date = new Date()
    const year = date.getFullYear() - 18
    const month = date.getMonth()
    const day = date.getDate()
    const date18YearsAgo = new Date(year, month, day)
    return date18YearsAgo.toISOString().substr(0, 10)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleDataSubmit(onDataSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='firstName'
                    control={dataControl}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Nombre'
                        onChange={onChange}
                        placeholder='Nombre'
                        error={Boolean(dataErrors.firstName)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {dataErrors.name?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={dataControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Apellido'
                        onChange={onChange}
                        placeholder='Apellido'
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={dataControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Teléfono'
                        onChange={onChange}
                        error={Boolean(dataErrors.phone)}
                        placeholder='Teléfono'
                        aria-describedby='validation-basic-number'
                      />
                    )}
                  />
                  {addressErrors.colony && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-number'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='birthdate'
                    control={dataControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='date'
                        value={value}
                        label='Fecha de Nacimiento'
                        onChange={onChange}
                        error={Boolean(dataErrors.birthDate)}
                        aria-describedby='validation-basic-date'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { max: getValidDate() } }}
                        defaultDate={`${currentYear - 18}-01-01`}
                      />
                    )}
                  />
                  {addressErrors.city?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-date'>
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
      case 1:
        return (
          <form key={1} onSubmit={handleAddressSubmit(onAddressSubmit)}>
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
                    name='extNumber'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número Exterior'
                        onChange={onChange}
                        placeholder='No. Ext'
                        error={Boolean(addressErrors.extNumber)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {addressErrors.extNumber?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='intNumber'
                    control={addressControl}
                    rules={{ required: false }}
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

              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='zipCode'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código Postal'
                        onChange={event => {
                          const newValue = event.target.value
                          if (newValue.length <= 5) {
                            onChange(newValue)
                          }
                          if (newValue.length === 5) {
                            dispatch(getColonies(newValue))
                            dispatch(selectColony({}))
                          }
                        }}
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

              <Grid item xs={12} sm={9}>
                <FormControl fullWidth>
                  <InputLabel id='colony-label'>Colonia</InputLabel>
                  <Select
                    labelId='colony-label'
                    label='Colonia'
                    value={selectedColony}
                    required
                    onChange={event => {
                      const newValue = event.target.value
                      dispatch(selectColony(newValue))
                    }}
                  >
                    {colonies.map(zipCodeData => (
                      <MenuItem value={zipCodeData}>{zipCodeData.colony}</MenuItem>
                    ))}
                  </Select>
                  {!selectedColony.colony && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-colony'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='city'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={selectedColony && selectedColony.city ? selectedColony.city : ' '}
                        label='Ciudad'
                        onChange={null}
                        error={Boolean(addressErrors.city)}
                        placeholder='Ciudad'
                        aria-describedby='validation-basic-city'
                        disabled
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
                    name='federalEntity'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={selectedColony && selectedColony.federalEntity ? selectedColony.federalEntity : ' '}
                        label='Estado'
                        onChange={null}
                        error={Boolean(addressErrors.federalEntity)}
                        placeholder='Entidad Federativa'
                        aria-describedby='validation-basic-state'
                        disabled
                      />
                    )}
                  />
                  {addressErrors.federalEntity?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-state'>
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
                        value={'México'}
                        label='País'
                        onChange={null}
                        error={Boolean(addressErrors.country)}
                        placeholder='País'
                        aria-describedby='validation-basic-country'
                        disabled
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
                    name='refer'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Referencia'
                        onChange={onChange}
                        placeholder='Referencia. Ejemplo: "Fachada blanca, herrería negra"'
                        aria-describedby='validation-basic-reference'
                      />
                    )}
                  />
                  {addressErrors.refer?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-refer'>
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
      case 2:
        return (
          <form key={2} onSubmit={handlePaymentSubmit(onPaymentSubmit)}>
            <Grid container spacing={5}>
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
                      <>
                        <InputLabel id='demo-simple-select-label'>AA</InputLabel>
                        <Select
                          value={value}
                          label='AA'
                          onChange={onChange}
                          placeholder='AA'
                          error={Boolean(paymentErrors['year'])}
                          aria-describedby='stepper-linear-payment-year'
                        >
                          {options.map((year, _) => {
                            return <MenuItem value={year.value}>{year.label}</MenuItem>
                          })}
                        </Select>
                      </>
                    )}
                  />
                  {paymentErrors['year'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-year'>
                      {paymentErrors['year'] ? paymentErrors['year'].message : 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                  <Controller
                    name='cardNumber'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número de la tarjeta'
                        onChange={onChange}
                        placeholder='XXXX-XXXX-XXXX-XXXX'
                        error={Boolean(paymentErrors['cardNumber'])}
                        aria-describedby='stepper-linear-payment-cardNumber'
                      />
                    )}
                  />
                  {paymentErrors['cardNumber'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-cardNumber'>
                      {paymentErrors['cardNumber'] ? paymentErrors['cardNumber'].message : 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='cvc'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='CVV'
                        onChange={onChange}
                        placeholder='000'
                        error={Boolean(paymentErrors['cvc'])}
                        aria-describedby='stepper-linear-payment-cvc'
                      />
                    )}
                  />
                  {paymentErrors['cvc'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-cvc'>
                      {paymentErrors['cvc'] ? paymentErrors['cvc'].message : 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='nameOnCard'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Titular de la tarjeta'
                        onChange={onChange}
                        placeholder='Titular de la tarjeta'
                        error={Boolean(paymentErrors['nameOnCard'])}
                        aria-describedby='stepper-linear-payment-nameOnCard'
                      />
                    )}
                  />
                  {paymentErrors['nameOnCard'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-nameOnCard'>
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
      case 3:
        return (
          <form key={3} onSubmit={handleBankInfoSubmit(onBankInfoSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='beneficiary'
                    control={bankInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Beneficiario'
                        onChange={onChange}
                        placeholder='Juan Lopez'
                        error={Boolean(bankInfoErrors['beneficiary'])}
                        aria-describedby='stepper-linear-bankInfo-beneficiary'
                      />
                    )}
                  />
                  {bankInfoErrors['beneficiary'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-bankInfo-beneficiary'>
                      {bankInfoErrors['beneficiary'].message ?? 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='clabe'
                    control={bankInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='CLABE Interbancaria'
                        onChange={onChange}
                        placeholder='XXXXXXXXXXXXXXXXXX'
                        error={Boolean(bankInfoErrors['clabe'])}
                        aria-describedby='stepper-linear-bankinfo-clabe'
                      />
                    )}
                  />
                  {bankInfoErrors['clabe'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-bankinfo-clabe'>
                      {bankInfoErrors['clabe'] ? bankInfoErrors['clabe'].message : 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='bank'
                    control={bankInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Fragment>
                        <InputLabel id='product-label'>Banco</InputLabel>
                        <Select labelId='product-label' label='Bank' value={value} required={true} onChange={onChange}>
                          {BANKS.map(item => (
                            <MenuItem value={item}>{item}</MenuItem>
                          ))}
                        </Select>
                      </Fragment>
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
      case 4:
        return (
          <form onSubmit={handleTaxInfoSubmit(onTaxInfoSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='identification'
                    control={taxInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='RFC'
                        onChange={onChange}
                        placeholder='RFC'
                        error={Boolean(taxInfoErrors['identification'])}
                      />
                    )}
                  />
                  {taxInfoErrors['identification'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-taxInfo-identification'>
                      {taxInfoErrors['identification'].message ?? 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id='identificationType-label'>Tipo de Identificación Oficial</InputLabel>
                <FormControl component='fieldset' fullWidth>
                  <Controller
                    name='identificationType'
                    control={taxInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <RadioGroup value={idType} onChange={handleTaxInfoChange}>
                        <FormControlLabel value='INE' control={<Radio />} label='INE' />
                        <FormControlLabel value='Pasaporte' control={<Radio />} label='Pasaporte' />
                        <FormControlLabel value='Otro' control={<Radio />} label='Otro' />
                      </RadioGroup>
                    )}
                  />
                  {taxInfoErrors['identificationType'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-taxInfo-identificationType'>
                      {taxInfoErrors['identificationType']?.message || 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {showOtherIdentification && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='otherIdentification'
                      control={taxInfoControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Otro tipo de identificación'
                          onChange={onChange}
                          placeholder='Otro tipo de identificación'
                          error={Boolean(taxInfoErrors['otherIdentification'])}
                        />
                      )}
                    />
                    {taxInfoErrors['otherIdentification'] && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-taxInfo-otherIdentification'>
                        {taxInfoErrors['otherIdentification'].message ?? 'El campo es requerido'}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                <InputLabel id='signature-label' sx={{ mb: 2 }}>
                  Firma
                </InputLabel>
                <FormControl sx={{ backgroundColor: 'white', border: '2px solid black' }}>
                  <SignatureCanvas ref={signatureRef} canvasProps={{ width: 500, height: 200 }} />
                  <Button variant='outlined' onClick={() => signatureRef.current.clear()}>
                    Limpiar
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={() => {}}>
                  Atrás
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
              Continuar
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
                        addressErrors.extNumber ||
                        addressErrors.intNumber ||
                        addressErrors.colony ||
                        addressErrors.federalEntity ||
                        addressErrors.refer ||
                        addressErrors.zipCode ||
                        addressErrors.country ||
                        addressErrors.city) &&
                      activeStep === 1
                    ) {
                      labelProps.error = true
                    } else if (
                      (paymentErrors.alias ||
                        paymentErrors.month ||
                        paymentErrors.year ||
                        paymentErrors.cvc ||
                        paymentErrors.cardNumber ||
                        paymentErrors.cardName) &&
                      activeStep === 2
                    ) {
                      labelProps.error = true
                    } else if (bankInfoErrors.clabe && activeStep === 3) {
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
