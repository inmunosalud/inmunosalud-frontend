import * as React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
//mui components
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Account from 'mdi-material-ui/Account'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box } from '@mui/material'

function PAGE() {
  return `/register/register-02`
}

const HeadingStyled = styled.h2`
  text-align: center;
`
const SpanStyled = styled.span`
  display: flex;
  justify-content: center;
`

const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 50px;
`

export default function Register01() {
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
          <SpanStyled>
            <Account />
          </SpanStyled>
          <HeadingStyled>Para agregar tu nombre deberas completar este registro</HeadingStyled>
          <WrapperButton>
            <Button variant='contained' sx={{ backgroundColor: '#3483fa' }} onClick={() => router.push(PAGE())}>
              Continuar
            </Button>
          </WrapperButton>
        </CardContent>
      </Card>
    </Box>
  )
}

Register01.getLayout = page => <BlankLayout>{page}</BlankLayout>
