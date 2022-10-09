import * as React from 'react'
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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
function PAGE() {
  return `/pages/auth/register-04`
}
const Register03 = () => {
  const router = useRouter()
  return (
    <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        <CardHeader title='Ingresa tu telefono' titleTypographyProps={{ variant: 'h3' }} />
        <CardContent
          sx={{
            width: '400px'
          }}
        >
          <h4>Te enviaremos un codigo SMS para confirmarlo. Con este telefono podras entrar a tu cuenta</h4>
          <TextField fullWidth label='Telefono' placeholder='+52-333-486-0660' />
        </CardContent>

        <CardActions>
          <Button
            onClick={() => router.push(PAGE())}
            size='large'
            type='submit'
            variant='contained'
            sx={{ mr: 2, backgroundColor: '#3483fa' }}
            fullWidth
          >
            Enviar codigo por SMS
          </Button>
          {/*circle back button */}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Register03
