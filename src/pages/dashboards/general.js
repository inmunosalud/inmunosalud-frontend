// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import NumberUsers from 'src/views/general/NumberUsers'
import CardNumber from 'src/views/general/CardNumber'
import AverageEfectiveness from 'src/views/general/AverageEfectiveness'
import WalletAverage from 'src/views/general/WalletAverage'
import TableUsers from 'src/views/dashboards/users/TableUsers'
import SimpleBarCard from 'src/views/general/SimpleBarCard'

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
        <Grid item xs={12} md={4}>
          <SimpleBarCard title='C' />
        </Grid>
        <Grid item xs={12} md={4}>
          <SimpleBarCard title='D' />
        </Grid>
        <Grid item xs={12} md={4}>
          <SimpleBarCard title='D' />
        </Grid>
        <Grid item xs={12} md={6}>
          <AverageEfectiveness />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardNumber data={data[2]} />
        </Grid>

        {/* <Grid item xs={12}>
          <TableUsers />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default General
