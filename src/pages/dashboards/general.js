import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import { Button } from '@mui/material'

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

  const handleClick = () => {
    router.push('/admin/users/new-user')
  }

  const antiquity = {
    stats: data?.antiquity,
    title: 'Antigüedad promedio'
  }
  const performance = {
    stats: data?.performance,
    title: 'Rendimiento'
  }
  const nextConsumption = {
    stats: data?.nextConsumption,
    title: 'Saldo por cobrar'
  }
  const nextComission = {
    stats: data?.nextConsumption,
    title: 'Saldo por entregar'
  }

  useEffect(() => {
    dispatch(loadGeneralData())
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <NumberUsers data={data?.users} />
        </Grid>
        <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} sm={6} md={3}>
          <CardNumber data={performance} />

          <CardNumber data={antiquity} />
        </Grid>
        <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} sm={6} md={3}>
          <CardNumber data={nextConsumption} />

          <CardNumber data={nextComission} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <WalletAverage title='Estatus' subtitle={subtitle} percentage={data?.status} />
        </Grid>
        <Grid item xs={12} md={8}>
          <AverageEfectiveness score={data?.score} />
        </Grid>

        <Grid item display='flex' justifyContent='flex-end' xs={12}>
          <Button variant='contained' sx={{ mb: 0, whiteSpace: 'nowrap' }} onClick={() => handleClick()}>
            Nuevo administrador
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableUsers />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default General
