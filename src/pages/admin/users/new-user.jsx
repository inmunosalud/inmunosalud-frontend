// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import { CircularProgress } from '@mui/material'

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

import { closeSnackBar } from 'src/store/notifications'

const defaultValues = {
  email: '',
  profile: '',
  lastName: '',
  password: '',
  phone: '',
  firstName: '',
  recommenderId: ''
}

const NewUser = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoading } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)

  const [state, setState] = useState({
    password: '',
    showPassword: false
  })

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const onSubmit = values => {
    dispatch(sendNewUser(values))
  }

  const handleChangePage = () => {
    router.push('/dashboards/general/')
  }

  const resetValues = () => {
    reset({
      email: '',
      profile: '',
      lastName: '',
      password: '',
      phone: '',
      firstName: '',
      recommenderId: ''
    })
  }

  useEffect(() => {
    isLoading === 'resolved' && resetValues()
  }, [isLoading])

  return (
    <>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardHeader title='Nuevo Administrador' titleTypographyProps={{ variant: 'h6' }} />
          <GoBackButton onChangePage={handleChangePage} />
        </div>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Nombre'
                        onChange={onChange}
                        placeholder='Leonard'
                        error={Boolean(errors.firstName)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.firstName?.type === 'required' && (
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
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Apellido'
                        onChange={onChange}
                        placeholder='Carter'
                        error={Boolean(errors.lastName)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {errors.lastName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        value={value}
                        label='Correo electrónico'
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder='carterleonard@gmail.com'
                        aria-describedby='validation-basic-email'
                      />
                    )}
                  />
                  {errors.email && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: false, maxLength: 10 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='tel'
                        value={value}
                        label='Teléfono'
                        onChange={onChange}
                        error={Boolean(errors.phone)}
                        placeholder='4434343434'
                        aria-describedby='validation-basic-phone'
                      />
                    )}
                  />
                  {errors.phone?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-phone'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                  {errors.phone?.type === 'maxLength' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El telefono debe tener 10 caracteres
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
                    Contraseña
                  </InputLabel>
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true, minLength: 8 }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        value={value}
                        label='Password'
                        onChange={onChange}
                        id='validation-basic-password'
                        error={Boolean(errors.password)}
                        type={state.showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              {state.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.password?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                      La contraseña debe contener al menos 8 caracteres
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    htmlFor='validation-basic-select'
                  >
                    Perfil
                  </InputLabel>
                  <Controller
                    name='profile'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Perfil'
                        onChange={onChange}
                        error={Boolean(errors.profile)}
                        labelId='validation-basic-profile'
                        aria-describedby='validation-basic-profile'
                      >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='productsAdmin'>Admin de Productos</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.select && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='recommenderId'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código de recomendado'
                        onChange={onChange}
                        placeholder='32u4234-234234-234234-422'
                        aria-describedby='validation-basic-recommenderId'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {isLoading === 'pending' ? (
                  <CircularProgress size={20} />
                ) : (
                  <Button size='large' type='submit' variant='contained'>
                    Crear
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default NewUser
