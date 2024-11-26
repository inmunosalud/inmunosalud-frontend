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
  trackingID: '',
  company: '',
  validDeliveryDate: null,
  deliveryStatus: ''
}

const ordersSchema = yup.object().shape({
  trackingUrl: yup.string(),
  trackingID: yup.string().required(),
  company: yup.string().required(),
  validDeliveryDate: yup.string().required(),
  deliveryStatus: yup.string().required()
})

const EditOrder = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { itemUpdated } = useSelector(state => state.orders)

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors: ordersErrors }
  } = useForm({
    defaultValues: defaultOrdersValues,
    resolver: yupResolver(ordersSchema)
  })

  React.useEffect(() => {
    if (itemUpdated && Object.keys(itemUpdated).length) {
      reset({
        trackingUrl: itemUpdated.shipment?.trackingUrl,
        trackingID: itemUpdated.shipment?.trackingID,
        company: itemUpdated.shipment?.company,
        validDeliveryDate: itemUpdated.validDeliveryDate,
        deliveryStatus: itemUpdated.deliveryStatus
      })
    }
  }, [])

  const onSubmit = values => {
    let body
    const formattedDate = format(new Date(values.validDeliveryDate), 'dd/MM/yyyy')

    body = {
      shipment: {
        trackingUrl: values.trackingUrl,
        trackingID: values.trackingID,
        company: values.company,
        id: itemUpdated?.id
      },
      deliveryStatus: values.deliveryStatus,
      deliveryDate: formattedDate,
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
                <Controller
                  name='validDeliveryDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <DatePickerWrapper>
                        <DatePicker
                          selected={value}
                          onChange={onChange}
                          placeholderText='DD/MM/YYYY'
                          dateFormat='dd/MM/yyyy'
                          customInput={<CustomInput label='Fecha de entrega' />}
                        />
                      </DatePickerWrapper>
                    )
                  }}
                />

                {ordersErrors.validDeliveryDate && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    This field is required
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
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {ordersErrors.trackingUrl && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  name='trackingID'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='ID de rastreo'
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {ordersErrors.trackingID && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  name='company'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Compania de entrega'
                      onChange={onChange}
                      aria-describedby='validation-basic-last-name'
                      //error={Boolean(ordersErrors.company)}
                    />
                  )}
                />
                {ordersErrors.company && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

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
                  rules={{ required: true }}
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
                    This field is required
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
