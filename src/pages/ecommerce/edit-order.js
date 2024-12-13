// ** React Imports
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from 'src/store/orders'

import { format } from 'date-fns'

import { useRouter } from 'next/router'
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
import { InputLabel, MenuItem, Select } from '@mui/material'

const CustomInput = React.forwardRef(({ ...props }, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const defaultOrdersValues = {
  trackingUrl: '',
  id: '',
  company: '',
  validDeliveryDate: '',
  deliveryStatus: ''
}

//TODO: Validacion dinamica falta ajustar la validacion y disabled a inputss notrequired
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
  validDeliveryDate: yup.string().when('deliveryStatus', {
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

const EditOrder = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { itemUpdated } = useSelector(state => state.orders)

  const {
    reset,
    control,
    handleSubmit,
    watch,
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
        validDeliveryDate: itemUpdated.validDeliveryDate,
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
      deliveryDate: values.validDeliveryDate ? format(new Date(values.validDeliveryDate), 'yyyy-MM-dd') : '',
      idParam: itemUpdated?.id
    }
    dispatch(updateOrder(body))
  }

  return (
    <Card>
      <CardHeader title='Editar' titleTypographyProps={{ variant: 'h6' }} />
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
                  Estatus de Envio
                </InputLabel>
                <Controller
                  name='deliveryStatus'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select fullWidth value={value} onChange={onChange} label='Estatus de envio'>
                      <MenuItem value='Confirmando el Pago'>Confirmando el Pago</MenuItem>
                      <MenuItem value='Preparando el Pedido'>Preparando el Pedido</MenuItem>
                      <MenuItem value='Está en camino'>Está en camino</MenuItem>
                      <MenuItem value='Entregado'>Entregado</MenuItem>
                      <MenuItem value='Cancelado'>Cancelado</MenuItem>
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
                  name='trackingUrl'
                  control={control}
                  render={({ field: { value, onChange } }) => (
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
                  )}
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
                  name='company'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Compañía de entrega'
                      disabled={
                        watch('deliveryStatus') === 'Está en camino' || watch('deliveryStatus') === 'Entregado'
                          ? false
                          : true
                      }
                      onChange={onChange}
                      aria-describedby='validation-basic-last-name'
                      //error={Boolean(ordersErrors.company)}
                    />
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
                  name='validDeliveryDate'
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <DatePickerWrapper>
                        <DatePicker
                          selected={value}
                          onChange={onChange}
                          disabled={
                            watch('deliveryStatus') === 'Está en camino' || watch('deliveryStatus') === 'Entregado'
                              ? false
                              : true
                          }
                          placeholderText='YYYY-MM-DD'
                          dateFormat='yyyy-MM-dd'
                          customInput={<CustomInput label='Fecha de entrega' />}
                        />
                      </DatePickerWrapper>
                    )
                  }}
                />

                {ordersErrors.validDeliveryDate && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    {ordersErrors.validDeliveryDate.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', gap: '8px' }}>
              <Button size='large' variant='contained' type='submit'>
                Enviar
              </Button>
              <Button size='large' variant='outlined' onClick={() => router.push('/orders/admin-orders')}>
                Regresar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditOrder
