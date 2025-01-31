// ** React Imports
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from 'src/store/orders'
import { format } from 'date-fns'

import { router } from 'next/router'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputLabel, MenuItem, Select, Box, CircularProgress } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CustomInput = React.forwardRef(({ ...props }, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const defaultOrdersValues = {
  trackingUrl: '',
  id: '',
  company: '',
  deliveryDate: '',
  deliveryStatus: ''
}

const validationSchema = yup.object().shape({
  deliveryStatus: yup.string().required('El estado de entrega es obligatorio'),
  trackingUrl: yup
    .string()
    .url('Debe ser una URL válida')
    .when('deliveryStatus', {
      is: val => val === 'Está en camino',
      then: schema => schema.required('La URL de seguimiento es obligatoria'),
      otherwise: schema => schema.nullable()
    }),
  id: yup.string().when('deliveryStatus', {
    is: val => val === 'Está en camino',
    then: schema => schema.required('El ID es obligatorio'),
    otherwise: schema => schema.nullable()
  }),
  company: yup.string().when('deliveryStatus', {
    is: val => val === 'Está en camino',
    then: schema => schema.required('La compañía es obligatoria'),
    otherwise: schema => schema.nullable()
  }),
  deliveryDate: yup.string().when('deliveryStatus', {
    is: val => val === 'Entregado',
    then: schema =>
      schema
        .required('La fecha de entrega es obligatoria')
        .test(
          'is-valid-date',
          'Debe ser una fecha válida en formato YYYY-MM-DD',
          value => !value || !isNaN(new Date(value).getTime())
        ),
    otherwise: schema => schema.nullable()
  })
})

const EditOrderLogistic = () => {
  const dispatch = useDispatch()
  const { itemUpdated, isLoading } = useSelector(state => state.orders)
  const {
    reset,
    control,
    handleSubmit,
    watch,
    setValue: setOrderValue,
    formState: { errors: ordersErrors }
  } = useForm({
    defaultValues: defaultOrdersValues,
    resolver: yupResolver(validationSchema)
  })

  React.useEffect(() => {
    if (itemUpdated && Object.keys(itemUpdated).length) {
      reset({
        trackingUrl: itemUpdated.shipment?.trackingUrl,
        id: itemUpdated.shipment?.id,
        company: itemUpdated.shipment?.company,
        deliveryDate: itemUpdated.deliveryDate,
        deliveryStatus: itemUpdated.deliveryStatus
      })
    }
  }, [])

  const onSubmit = values => {
    let body

    body = {
      shipment: {
        trackingUrl: values.trackingUrl,
        id: values.id,
        company: values.company
      },
      deliveryStatus: values.deliveryStatus,
      deliveryDate: values.deliveryDate ? format(new Date(values.deliveryDate), 'yyyy-MM-dd') : '',
      idParam: itemUpdated?.id
    }
    dispatch(updateOrder(body))
  }

  React.useEffect(() => {
    const deliveryStatus = watch('deliveryStatus')
    const company = watch('company')

    if (deliveryStatus === 'Está en camino') {
      setOrderValue('company', 'DHL')
    }

    if (company === 'DHL') {
      const id = watch('id')
      setOrderValue('trackingUrl', `https://www.dhl.com/mx-es/home/rastreo.html?tracking-id=${id}`)
    }
  }, [watch('deliveryStatus'), watch('company'), watch('id')])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Card sx={{ m: 10 }}>
      <CardHeader
        title='Editar'
        action={
          <Button variant='contained' onClick={() => router.back()}>
            Volver
          </Button>
        }
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-payment-country'
                  error={Boolean(ordersErrors.deliveryStatus)}
                  htmlFor='stepper-linear-payment-country'
                >
                  Estatus de Envió
                </InputLabel>
                <Controller
                  name='deliveryStatus'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select fullWidth value={value} onChange={onChange} label='Estatus de envió'>
                      <MenuItem disabled value='Preparando el Pedido'>
                        Preparando el Pedido
                      </MenuItem>
                      <MenuItem
                        disabled={
                          itemUpdated.deliveryStatus === 'Entregado' || itemUpdated.deliveryStatus === 'Está en camino'
                            ? true
                            : false
                        }
                        value='Está en camino'
                      >
                        Está en camino
                      </MenuItem>
                      <MenuItem
                        disabled={itemUpdated.deliveryStatus === 'Está en camino' ? false : true}
                        value='Entregado'
                      >
                        Entregado
                      </MenuItem>
                    </Select>
                  )}
                />
                {ordersErrors.deliveryStatus && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    {ordersErrors.deliveryStatus.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  name='id'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='ID de rastreo'
                      disabled={
                        watch('deliveryStatus') === 'Está en camino' || watch('deliveryStatus') === 'Entregado'
                          ? false
                          : true
                      }
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {ordersErrors.id && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    {ordersErrors.id.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  name='trackingUrl'
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextField
                        value={value}
                        label='URL de rastreo'
                        onChange={onChange}
                        disabled={
                          watch('deliveryStatus') === 'Está en camino' || watch('deliveryStatus') === 'Entregado'
                            ? false
                            : true
                        }
                        aria-describedby='validation-basic-first-name'
                      />
                    )
                  }}
                />
                {ordersErrors.trackingUrl && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    {ordersErrors.trackingUrl.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='stepper-linear-payment-country'
                  error={Boolean(ordersErrors.company)}
                  htmlFor='stepper-linear-payment-country'
                  sx={{
                    color:
                      watch('deliveryStatus') === 'Preparando el Pedido'
                        ? theme => theme.palette.action.disabled
                        : undefined
                  }}
                >
                  Compañía de envió
                </InputLabel>
                <Controller
                  name='company'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Compañía de envió'
                      disabled={
                        watch('deliveryStatus') === 'Está en camino' || watch('deliveryStatus') === 'Entregado'
                          ? false
                          : true
                      }
                    >
                      <MenuItem value='DHL'>DHL</MenuItem>
                    </Select>
                  )}
                />
                {ordersErrors.company && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    {ordersErrors.company.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  name='deliveryDate'
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <DatePickerWrapper>
                        <DatePicker
                          selected={value}
                          onChange={onChange}
                          disabled={watch('deliveryStatus') === 'Entregado' ? false : true}
                          placeholderText='YYYY-MM-DD'
                          dateFormat='yyyy-MM-dd'
                          customInput={<CustomInput label='Fecha de entrega' />}
                        />
                      </DatePickerWrapper>
                    )
                  }}
                />

                {ordersErrors.deliveryDate && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    {ordersErrors.deliveryDate.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button size='large' variant='contained' type='submit'>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

EditOrderLogistic.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default EditOrderLogistic
