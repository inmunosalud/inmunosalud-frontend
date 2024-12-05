import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import { Box, CircularProgress, Grid, Card, CardHeader, CardContent } from '@mui/material'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
// ** Actions
import { getNetworkById } from 'src/store/users'

// ** Views
import { Commission } from 'src/views/pages/network/Commission'
import { HistoryCommission } from 'src/views/pages/network/HistoryCommission'
import { HistoryNetwork } from 'src/views/pages/network/HistoryNetwork'
import { NetworkDetails } from 'src/views/pages/network/NetworkDetails'
import { NetworkUsers } from 'src/views/pages/network/NetworkUsers.jsx'
import { ReferCode } from 'src/views/pages/network/ReferCode'

const Network = () => {
  const dispatch = useDispatch()
  const { isLoading, network } = useSelector(state => state.users)
  const { isLoading: isLoadingCommissions } = useSelector(state => state.comissions)
  const { user } = useSelector(state => state.session)

  React.useEffect(() => {
    if (user.id && !isLoadingCommissions) {
      dispatch(getNetworkById(user.id))
    }
  }, [user.id, isLoadingCommissions])

  return !isLoading || !isLoadingCommissions ? (
    <>
      <Grid xs={12} justifyContent='center'>
        <ApexChartWrapper>
          <Grid container spacing={2}>
            {/* Fila 1 */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ReferCode />
            </Grid>

            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Commission />
            </Grid>

            {/* Fila 2 */}

            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <NetworkUsers />
            </Grid>
          </Grid>
          {/* Fila 3 */}
          <Grid container spacing={2} sx={{ mt: '2px' }}>
            {/* Columna 1 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card
                sx={{
                  height: {
                    md: '550px'
                  }
                }}
              >
                <CardContent>
                  <CardHeader sx={{ textAlign: 'center' }} title='Crecimiento de la red' />
                </CardContent>
                <HistoryNetwork network={network.growingYourNetwork} />
              </Card>
            </Grid>
            {/* Columna 2 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card
                sx={{
                  height: {
                    md: '550px'
                  }
                }}
              >
                <CardContent>
                  <CardHeader sx={{ textAlign: 'center' }} title='Historial de comisiones' />
                </CardContent>
                <HistoryCommission />
              </Card>
            </Grid>
          </Grid>
          {/* Fila 4 */}
          <Grid item xs={12} md={12}>
            <NetworkDetails />
          </Grid>
        </ApexChartWrapper>
      </Grid>
    </>
  ) : (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Network
