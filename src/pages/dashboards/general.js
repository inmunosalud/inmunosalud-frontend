import { useRouter } from 'next/router'
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

const data = [
  {
    stats: '$57,300.90',
    title: 'Consumo promedio'
  },
  {
    stats: '1 año 2 meses',
    title: 'Antigüedad promedio'
  },
  {
    stats: '$1,240.56',
    title: 'Rendimiento promedio por cartera'
  }
]

const General = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/admin/users/new-user')
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <NumberUsers />
        </Grid>
        <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} sm={6} md={3}>
          <CardNumber data={data[0]} />

          <CardNumber data={data[1]} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <WalletAverage />
        </Grid>

        <Grid item xs={12} md={6}>
          <AverageEfectiveness />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardNumber data={data[2]} />
        </Grid>
        <Grid item display='flex' justifyContent='flex-end' xs={12}>
          <Button variant='contained' sx={{ mb: 0, whiteSpace: 'nowrap' }} onClick={() => handleClick()}>
            Alta de usuarios
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
