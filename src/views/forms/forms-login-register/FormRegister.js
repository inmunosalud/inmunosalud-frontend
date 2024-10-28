import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import moment from 'moment'
import {
  TextField,
  FormHelperText,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { createUser } from 'src/store/users'
import { useDispatch } from 'react-redux'

const schema = yup.object().shape({
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
  firstName: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  recommenderId: yup.string().required('El código de recomendado es requerido'),
  birthdate: yup.date().required('La fecha de nacimiento es requerida'),
  genre: yup.string().required('El género es requerido'),
  acceptTerms: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones').required()
})

export default function FormRegister() {
  const [showPassword, setShowPassword] = React.useState(false)
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      recommenderId: '',
      birthdate: null,
      genre: '',
      acceptTerms: false
    }
  })

  const onSubmit = data => {
    console.log(data)
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      recommenderId: data.recommenderId,
      birthdate: moment(data.birthdate).format('YYYY-MM-DD'),
      genre: data.genre
    }

    dispatch(createUser(body))
  }

  return (
    <Card>
      <CardHeader title='Registrarse' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Nombre'
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Apellidos'
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Correo electrónico'
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label='Contraseña'
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setShowPassword(!showPassword)}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='recommenderId'
                control={control}
                render={({ field }) => (
                  <TextField {...field} label='Código de recomendado' fullWidth error={!!errors.recommenderId} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Controller
                  name='birthdate'
                  control={control}
                  defaultValue={null}
                  render={({ field }) => <DatePicker {...field} label='Fecha de nacimiento' />}
                />
              </LocalizationProvider>
              {errors.birthdate && <FormHelperText error>{errors.birthdate.message}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='genre'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} select fullWidth label='Género' error={!!error} helperText={error?.message}>
                    <MenuItem value='male'>Masculino</MenuItem>
                    <MenuItem value='female'>Femenino</MenuItem>
                    <MenuItem value='other'>Otro</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='acceptTerms'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} color='primary' />}
                    label='He leído y acepto los términos y condiciones'
                  />
                )}
              />
              {errors.acceptTerms && <FormHelperText error>{errors.acceptTerms.message}</FormHelperText>}
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary' fullWidth>
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
