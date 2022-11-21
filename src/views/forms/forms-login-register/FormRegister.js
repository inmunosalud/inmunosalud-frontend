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

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

//actions
import { createUser } from 'src/store/users'
import { openSnackBar, closeSnackBar } from 'src/store/notifications'

const FormRegister = props => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading } = useSelector(state => state.users)
  const { open, message, positioned, severity } = useSelector(state => state.notifications)

  // ** States
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    recommenderID: '',
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
    const { email, password, recommenderID } = values
    if (!email && !password) {
      dispatch(
        openSnackBar({
          open: true,
          message: 'usuario o contraseña inválidos',
          severity: 'error'
        })
      )
      return
    }

    try {
      await dispatch(createUser({ email, password, recommenderID }))
      router.push('/dashboards/general/')
    } catch (error) {
      dispatch(
        openSnackBar({
          open: true,
          message: 'error..',
          severity: 'error'
        })
      )
    }
  }
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
                  label='Correo electronico'
                  placeholder='carterleonard@gmail.com'
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
                <TextField
                  fullWidth
                  type='text'
                  label='ID recomendado'
                  onChange={handleChange('recommenderID')}
                  placeholder='85e3b573-84ec-495f-982f-8dc7063e30f8'
                  helperText='(Opcional)'
                />

                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={checkedProfile} onChange={handleChangeProfile} />}
                    label='Cambiar Perfil'
                  />
                </FormGroup>
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
