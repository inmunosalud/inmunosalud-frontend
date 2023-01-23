import * as React from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import Alert from '@mui/material/Alert'
import { CircularProgress } from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

//actions
import { createUser, setErrors } from 'src/store/users'
import { openSnackBar, closeSnackBar } from 'src/store/notifications'
import { PROFILES_USER } from 'src/configs/profiles'

const BASIC_ERRORS = {
  email: {
    value: '',
    msg: 'El correo electrónico ingresado es una dirección invalida.',
    param: 'email',
    location: 'body'
  },

  password: {
    value: '',
    msg: 'La contraseña debe ser ingresada y debe contener mínimo 8 caracteres para completar la solicitud.',
    param: 'password',
    location: 'body'
  }
}

const FormRegister = props => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { isLoadingRegister: isLoading, registerErrors: errors } = useSelector(state => state.users)
  const { open, message, positioned, severity } = useSelector(state => state.notifications)

  // ** States
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    recommenderId: '',
    showPassword: false
  })
  const [checkedProfile, setCheckedProfile] = React.useState(false)

  const handleChangeProfile = event => {
    setCheckedProfile(event.target.checked)
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const submitRegister = async () => {
    const { email, password, recommenderId } = values
    const errors = []

    if (!email) {
      errors.push(BASIC_ERRORS.email)
      dispatch(setErrors(errors))
      return
    }
    if (!password) {
      errors.push(BASIC_ERRORS.password)
      dispatch(setErrors(errors))
      return
    }

    const body = { email, password, recommenderId }

    if (checkedProfile) {
      body.profile = PROFILES_USER.associatedUser
    }
    dispatch(createUser(body))
  }

  React.useEffect(() => {
    if (query && query.id) {
      setValues({
        ...values,
        ['recommenderId']: query.id
      })
    }
  }, [query?.id])

  return (
    <>
      <Card>
        <CardHeader title='Registrarse' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={values.email}
                  onChange={handleChange('email')}
                  type='text'
                  label='Correo electrónico'
                  placeholder='carterleonard@gmail.com'
                  helperText='Puedes usar letras, números y puntos'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='form-layouts-basic-password'>Contraseña</InputLabel>
                  <OutlinedInput
                    label='Contraseña'
                    value={values.password}
                    id='form-layouts-basic-password'
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    aria-describedby='form-layouts-basic-password-helper'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id='form-layouts-basic-password-helper'></FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={values.recommenderId}
                  type='text'
                  label='Código de recomendado'
                  onChange={handleChange('recommenderId')}
                  placeholder='85e3b573-84ec-495f-982f-8dc7063e30f8'
                  helperText='(Opcional)'
                />

                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={checkedProfile} onChange={handleChangeProfile} />}
                    label='Ser Socio'
                  />
                </FormGroup>
                {errors ? (
                  <Alert variant='outlined' sx={{ mt: 3 }} severity='error'>
                    {errors[0]?.msg}
                  </Alert>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    gap: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Button type='submit' variant='contained' size='large' onClick={submitRegister}>
                      Registrarse
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <CustomSnackbar
        open={open}
        message={message}
        severity={severity}
        positioned={positioned}
        handleClose={() => dispatch(closeSnackBar())}
      />
    </>
  )
}
export default FormRegister
