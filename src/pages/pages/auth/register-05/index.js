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

import CheckList from '../../../components/CheckList/CheckList'
//utils
const textValidations = [
  'Minimo 8 caracteres con letras y numeros',
  'Minimo 1 signo o simbolo ?-!*$#.',
  'No incluyas tu nombre o apellido',
  'Sin secuencias como 1234 o ABCD',
  'Sin caracteres repetidos consecutivos como aa'
]

function PAGE() {
  return `/pages/auth/register-06`
}
export default function Register05() {
  const router = useRouter()
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        <CardContent
          sx={{
            width: '400px'
          }}
        >
          <h1>Crea tu contraseña</h1>
          <h4>Ingresa una contraseñna segura que no uses en otras plataformas</h4>
          <TextField fullWidth label='Contraseña' />
          <CheckList textValidations={textValidations} />
          <TextField fullWidth label='Confirma tu contraseña' />
        </CardContent>
        <CardActions>
          <Button
            onClick={() => router.push(PAGE())}
            size='large'
            type='submit'
            variant='contained'
            sx={{ backgroundColor: '#3483fa' }}
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
