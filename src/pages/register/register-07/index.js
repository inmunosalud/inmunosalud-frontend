import * as React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AccountCircleOutline from 'mdi-material-ui/AccountCircleOutline'
import CellphoneCheck from 'mdi-material-ui/CellphoneCheck'
import AccountTie from 'mdi-material-ui/AccountTie'
import { Box } from '@mui/material'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import IconText from 'src/pages/components/IconText/IconText'

function PAGE() {
  return `/login`
}

const HeadingStyled = styled.h1`
  text-align: center;
`

const TextStyled = styled.p`
  text-align: center;
`
const IconStyled = styled.span`
  display: flex;
  justify-content: center;
`

const Register07 = () => {
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
            <IconStyled>
              <AccountCircleOutline />
            </IconStyled>
            <HeadingStyled>Alejandro, ya puedes usar tu cuenta</HeadingStyled>

            <IconText
              icon={<CellphoneCheck />}
              content='Podras iniciar sesion ingresando tu numero de telefono o e-mail y tu contraseña.'
            />
            <IconText icon={<AccountTie />} content='Si necesitas cambiar tus datos haz click aqui.' />
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
            Ir al Inicio
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

Register07.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register07
