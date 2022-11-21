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
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

//actions
import { loginCall } from 'src/store/session'
import { openSnackBar, closeSnackBar } from 'src/store/notifications'

const Form = props => {
  /*hooks */
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading } = useSelector(state => state.session)
  const { open, message, positioned, severity } = useSelector(state => state.notifications)
  // ** States
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const submitLogin = async () => {
    const { email, password } = values
    if (!email && !password) {
      dispatch(
        openSnackBar({
          open: true,
          message: 'usuario o contraseña inválidos',
          severity: 'error',
          positioned: { vertical: 'top', horizontal: 'right' }
        })
      )
      return
    }
    try {
      await dispatch(loginCall({ email, password }))
      router.push('/dashboards/general/')
    } catch (error) {
      console.log('error', error)
      dispatch(
        openSnackBar({
          open: true,
          message: 'usuario o contraseña inválidos',
          severity: 'error',
          positioned: { vertical: 'top', horizontal: 'right' }
        })
      )
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Acceder' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={values.email}
                  onChange={handleChange('email')}
                  type='text'
                  label='Cuenta o correo electronico'
                  placeholder='joe@gmail.com'
                  helperText='Puedes usar letras, números y puntos'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
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
                <Box
                  sx={{
                    gap: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {loading === 'pending' ? (
                    <div>enviando...</div>
                  ) : (
                    <Button type='submit' variant='contained' size='large' onClick={submitLogin}>
                      Acceder
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
export default Form
