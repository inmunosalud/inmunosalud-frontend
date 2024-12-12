import React from 'react'
import { useTheme } from '@mui/material/styles'

import { useSelector } from 'react-redux'
import { NetworkList } from 'src/views/components/list/NetworkList.js'
// MUI Components
import { Card, CardContent, Grid, CardHeader, Box, Typography } from '@mui/material'

export const NetworkUsers = () => {
  const { network } = useSelector(state => state.users)
  const theme = useTheme()
  return (
    <Card
      sx={{
        height: {
          md: '600px'
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <CardHeader title={`Usuarios en tu red: ${network.network?.totalUsers || '0'}`} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box
              sx={{
                textAlign: 'center'
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Typography fontWeight='bold' variant='h5'>
                    Nivel 1
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Usuarios:</b> {network?.network?.['1']?.length || 0}
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Consumo:</b> ${network?.network?.totalConsumptions?.['1'] || 0}
                  </Typography>
                  <Typography sx={{ mb: 1 }} variant='body2' color='textPrimary'>
                    <b>Comision:</b> ${network?.network?.totalCommissions?.['1'] || 0}
                  </Typography>
                  {network?.network?.['1'] && <NetworkList firstLevel={true} users={network?.network?.['1']} />}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography fontWeight='bold' variant='h5'>
                    Nivel 2
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Usuarios:</b> {network?.network?.['2']?.length || 0}
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Consumo:</b> ${network?.network?.totalConsumptions?.['2'] || 0}
                  </Typography>
                  <Typography sx={{ mb: 2 }} variant='body2' color='textPrimary'>
                    <b>Comision:</b> ${network?.network?.totalCommissions?.['2'] || 0}
                  </Typography>
                  {network?.network?.['2'] && <NetworkList users={network?.network?.['2']} />}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography fontWeight='bold' variant='h5'>
                    Nivel 3
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Usuarios:</b> {network?.network?.['3']?.length || 0}
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Consumo:</b> ${network?.network?.totalConsumptions?.['3'] || 0}
                  </Typography>
                  <Typography sx={{ mb: 3 }} variant='body2' color='textPrimary'>
                    <b>Comision:</b> ${network?.network?.totalCommissions?.['3'] || 0}
                  </Typography>
                  {network?.network?.['3'] && <NetworkList users={network?.network?.['3']} />}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography fontWeight='bold' variant='h5'>
                    Nivel 4
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Usuarios:</b> {network?.network?.['4']?.length || 0}
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    <b>Consumo:</b> ${network?.network?.totalConsumptions?.['4'] || 0}
                  </Typography>
                  <Typography sx={{ mb: 4 }} variant='body2' color='textPrimary'>
                    <b>Comision:</b> ${network?.network?.totalCommissions?.['4'] || 0}
                  </Typography>
                  {network?.network?.['4'] && <NetworkList users={network?.network?.['4']} />}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
