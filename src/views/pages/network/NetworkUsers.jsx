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
            <CardHeader title='Usuarios en tu red' />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box
              sx={{
                textAlign: 'center'
              }}
            >
              <Typography variant='h6' color='textPrimary'>
                <strong>
                  {' '}
                  Total de usuarios en tu red:{' '}
                  <span style={{ color: theme.palette.primary.main }}> {network.network?.totalUsers || '0'} </span>{' '}
                </strong>
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <h2>
                    Nivel 1:{' '}
                    <span
                      style={{
                        color: theme.palette.primary.main
                      }}
                    >
                      {network?.network?.['1']?.length || 0}
                    </span>
                  </h2>
                  {network?.network?.['1'] && <NetworkList firstLevel={true} users={network?.network?.['1']} />}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <h2>
                    Nivel 2:{' '}
                    <span
                      style={{
                        color: theme.palette.primary.main
                      }}
                    >
                      {network?.network?.['2']?.length || 0}
                    </span>
                  </h2>
                  {network?.network?.['2'] && <NetworkList users={network?.network?.['2']} />}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <h2>
                    Nivel 3:{' '}
                    <span
                      style={{
                        color: theme.palette.primary.main
                      }}
                    >
                      {network?.network?.['3']?.length || 0}{' '}
                    </span>
                  </h2>
                  {network?.network?.['3'] && <NetworkList users={network?.network?.['3']} />}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <h2>
                    Nivel 4:{' '}
                    <span
                      style={{
                        color: theme.palette.primary.main
                      }}
                    >
                      {network?.network?.['4']?.length || 0}{' '}
                    </span>
                  </h2>
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
