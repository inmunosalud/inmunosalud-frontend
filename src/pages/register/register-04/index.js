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
  return `/register/register-05`
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

const Register04 = () => {
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
    </Box>
  )
}

Register04.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register04
