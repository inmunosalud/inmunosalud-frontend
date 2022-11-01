import * as React from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import Form from 'src/views/forms/forms-login-register/Form'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Register = () => {
  // ** State
  const [isRegister, setIsRegister] = React.useState(true)

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '170px 60px' }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Form />
        </Grid>
        <Grid item xs={12} md={6}>
          <Form isRegister={isRegister} />
        </Grid>
      </Grid>
    </div>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register
