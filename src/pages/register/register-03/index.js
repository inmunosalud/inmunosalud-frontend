import * as React from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { Box } from '@mui/material'

import BlankLayout from 'src/@core/layouts/BlankLayout'

function PAGE() {
  return `/register/register-04`
}
const Register03 = () => {
  const router = useRouter()
  return (
    <Box
      container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '3rem' }}
    >
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
    </Box>
  )
}

Register03.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register03
