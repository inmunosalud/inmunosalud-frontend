import * as React from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { Box } from '@mui/material'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import CheckList from 'src/pages/components/CheckList/CheckList'

//utils
const textValidations = [
  'Minimo 8 caracteres con letras y numeros',
  'Minimo 1 signo o simbolo ?-!*$#.',
  'No incluyas tu nombre o apellido',
  'Sin secuencias como 1234 o ABCD',
  'Sin caracteres repetidos consecutivos como aa'
]

function PAGE() {
  return `/register/register-06`
}
export default function Register05() {
  const router = useRouter()
  return (
    <Box
      container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '3rem' }}
    >
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
    </Box>
  )
}

Register05.getLayout = page => <BlankLayout>{page}</BlankLayout>
