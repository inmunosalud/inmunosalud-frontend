import * as React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { Box } from '@mui/material'

import BlankLayout from 'src/@core/layouts/BlankLayout'

function PAGE() {
  return `/register/register-07`
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

const Register06 = () => {
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
          <Grid item>
            <HeadingStyled>Creaste tu contraseña</HeadingStyled>

            <TextStyled>Asegurate de recordarla, la necesitaras para ingresar a tu cuenta.</TextStyled>
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
    </Box>
  )
}

Register06.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register06
