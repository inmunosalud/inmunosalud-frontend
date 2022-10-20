// ** React Imports
import { forwardRef, useState } from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Icons Imports

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Box } from '@mui/material'

function PAGE() {
  return `/register/register-03`
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de nacimiento' autoComplete='off' />
})

const Register02 = () => {
  const router = useRouter()
  // ** States
  const [date, setDate] = useState(null)
  const [language, setLanguage] = useState([])

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  return (
    <Box
      container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '3rem' }}
    >
      <Card>
        <CardHeader title='Ingresa tus datos' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ m: 0 }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Nombre/s' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Apellido' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Segundo apellido' />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  selected={date}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput />}
                  id='form-layouts-separator-date'
                  onChange={date => setDate(date)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Lugar de nacimiento' placeholder='Ciudad de Mexico' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-multiple-select-label'>Sexo</InputLabel>
                  <Select
                    multiple
                    value={language}
                    onChange={handleSelectChange}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                  >
                    <MenuItem value='English'>Masculino</MenuItem>
                    <MenuItem value='French'>Femenino</MenuItem>
                    <MenuItem value='Spanish'>Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: 0 }} />
          <CardActions>
            <Button
              onClick={() => router.push(PAGE())}
              size='large'
              type='submit'
              sx={{ mr: 2, backgroundColor: '#3483fa' }}
              variant='contained'
            >
              Continuar
            </Button>
            {/*circle back button */}
          </CardActions>
        </form>
      </Card>
    </Box>
  )
}

Register02.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register02
