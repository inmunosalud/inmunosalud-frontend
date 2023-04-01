// ** React Imports
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from 'src/store/orders'
import { format } from "date-fns";

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = React.forwardRef(({ ...props }, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const EditOrder = () => {
  const dispatch = useDispatch()
  const { itemUpdated } = useSelector(state => state.orders)
  // ** Hooks
  const [errors, setErrors] = React.useState({})
   const [values, setValues] = React.useState({
    trackingUrl: '',
    company: '',
    deliveryStatus: '',
  })
  const [date, setDate] = React.useState(null)

  const handleSubmit = () => {
    let body

    body = {
      shipment: {
        trackingUrl : values.trackingUrl,
        company : values.company,
        id: itemUpdated?.id,
      },
      deliveryStatus: values.deliveryStatus,
      deliveryDate: format(date, "dd/MM/yyyy"),
      idParam: itemUpdated?.id
    } 

    console.log({body});

    dispatch(updateOrder(body))
  }

  const handleChange = (name, {target: {value}}) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleDate = (date) => {
    setDate(date)
  }

  return (
    <Card>
      <CardHeader title='Editar' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <TextField
                  value={values.trackingUrl}
                  label='Guia del pedido'
                  onChange={(e) => handleChange('trackingUrl', e)}
                  
                  error={Boolean(errors.trackingUrl)}
                  aria-describedby='validation-basic-first-name'
                />
                {errors.trackingUrl && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <TextField
                  value={values.company}
                  label='Compania de entrega'
                  onChange={(e) => handleChange('company', e)}
                  
                  error={Boolean(errors.company)}
                  aria-describedby='validation-basic-last-name'
                />
                {errors.company && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <TextField
                  type='text'
                  value={values.deliveryStatus}
                  label='Estatus del pedido'
                  onChange={(e) => handleChange('deliveryStatus', e)}
                  error={Boolean(errors.email)}
                  aria-describedby='validation-basic-email'
                />
                {errors.deliveryStatus && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            

            <Grid item xs={12} sm={12}>

              <DatePickerWrapper>
                <DatePicker
                  selected={date}
                  showYearDropdown
                  showMonthDropdown
                  onChange={handleDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText='MM/DD/YYYY'
                  customInput={
                    <CustomInput label="Fecha de entrega"/>
                  }
                />

              </DatePickerWrapper>
              
              {errors.deliveryDate && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </Grid>


            <Grid item xs={12}>
              <Button size='large' variant='contained' onClick={handleSubmit}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditOrder



