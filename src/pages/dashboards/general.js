import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import { Button, Box } from '@mui/material'

import NumberUsers from 'src/views/general/NumberUsers'
import CardNumber from 'src/views/general/CardNumber'
import AverageEfectiveness from 'src/views/general/AverageEfectiveness'
import WalletAverage from 'src/views/general/WalletAverage'
import TableUsers from 'src/views/dashboards/users/TableUsers'
import { loadGeneralData } from 'src/store/dashboard/generalSlice'

const subtitle = 'Porcentaje de usuarios activos en el aplicación'

const General = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.dashboard.general)

  const antiquity = {
    stats: data?.antiquity || 0,
    title: 'Antigüedad promedio'
  }
  const performance = {
    stats: `$${data?.performance || 0}`,
    title: 'Rendimiento'
  }

  const nextComission = {
    stats: `$${data?.nextCommission || 0}`,
    title: 'Comisiones por Pagar'
  }

  useEffect(() => {
    dispatch(loadGeneralData())
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <NumberUsers data={data} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: '100%' }}>
              <CardNumber data={performance} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: '100%' }}>
              <CardNumber data={nextComission} />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ width: '100%', mt: 9 }}>
              <CardNumber data={antiquity} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={12}>
        <WalletAverage title='Estatus' subtitle={subtitle} percentage={data?.status} />
      </Grid>
      <Grid item xs={12} md={8}>
        {/* <AverageEfectiveness score={data?.score} /> */}
      </Grid>
    </Grid>
  )
}

export default General
