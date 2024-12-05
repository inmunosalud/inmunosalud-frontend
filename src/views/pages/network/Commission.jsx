import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

// MUI Components
import { Card, CardContent, Grid, CardHeader, Button, Box, Typography } from '@mui/material'

export const Commission = () => {
  const { network } = useSelector(state => state.users)

  return (
    <Card
      sx={{
        height: {
          md: '450px'
        }
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={12}>
            <CardHeader
              title={'Tu siguiente comisión'}
              action={
                <Link href='/profile/?=&tab=banks'>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-word'
                    }}
                  >
                    Agregar datos <br /> bancarios
                  </Button>
                </Link>
              }
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box>
              <CardHeader
                title={
                  <Typography variant='h6' fontWeight='bold' color='primary'>
                    Recompensa proyectada:
                  </Typography>
                }
              />
            </Box>
            <Box
              sx={{
                mb: '20px',
                mt: '-20px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Typography variant='h1' fontWeight='bold' color='primary'>
                ${network.nextCommission || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box display='flex' alignItems='center' justifyContent='center' height='100%' width='100%'>
              <Typography
                sx={{
                  width: '70%',
                  textAlign: 'center'
                }}
                variant='caption'
              >
                Este monto es la cantidad que se esta generando de las compras que hacen tus referidos
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                mt: '46px'
              }}
            >
              <CardHeader
                title={'Próximo corte: ' + (network.cutoffDate || '')}
                subheader={'El pago se vera reflejado durante los siguientes 7 días hábiles'}
                action={
                  <Link href='/profile/?=&tab=tax'>
                    <Button
                      variant='contained'
                      size='small'
                      sx={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-word'
                      }}
                    >
                      Actualiza tus datos <br /> fiscales
                    </Button>
                  </Link>
                }
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
