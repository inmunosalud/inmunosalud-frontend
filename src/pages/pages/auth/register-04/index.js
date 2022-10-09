import * as React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
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

function PAGE() {
  return `/pages/auth/register-05`
}

const HeadingStyled = styled.h1`
  text-align: center;
`
const NumberStyled = styled.h3`
  text-align: center;
  color: #05a95b;
`

const TextStyled = styled.p`
  text-align: center;
`

const Register02 = () => {
  const router = useRouter()
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        <CardContent
          sx={{
            width: '400px'
          }}
        >
          <Grid item>
            <HeadingStyled>Validamos tu telefono</HeadingStyled>
            <NumberStyled>+52 33347686578</NumberStyled>
            <TextStyled>
              Te servira para ingresar a tu cuenta y para que podamos confirmar que eres tu cuando sea necesario
            </TextStyled>
          </Grid>
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
            Continuar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default Register02
