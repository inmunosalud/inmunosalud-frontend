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
import NumberUsersGraph from 'src/views/dashboards/users/NumberUsersGraph'
import NextComision from 'src/views/dashboards/users/NextComision'
import LinearChart from 'src/views/dashboards/users/LinearChart'
import EcommerceDashboard from 'src/views/dashboards/users/EcommerceDashboard'

const data = [
  {
    stats: '7/09/2022',
    title: 'Próximo corte'
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

const intake = {
  series: [
    {
      data: [550, 780, 400, 600, 1000, 800, 900]
    }
  ],
  categories: ['Feb-22', 'Mar-22', 'Apr-22', 'May-22', 'Jun-22', 'Jul-22', 'Aug-22']
}

const intakeProducts = {
  series: [
    {
      data: [550, 780, 400, 600, 1000, 800, 900]
    },
    {
      data: [450, 680, 300, 500, 900, 700, 800]
    },
    {
      data: [350, 580, 200, 400, 800, 600, 700]
    },
    {
      data: [650, 880, 500, 700, 1100, 900, 1000]
    }
  ],
  categories: ['Feb-22', 'Mar-22', 'Apr-22', 'May-22', 'Jun-22', 'Jul-22', 'Aug-22']
}

const Users = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <NumberUsersGraph title='Número de Usuarios en Red' />
        </Grid>
        <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} md={9}>
          <CardNumber data={data[0]} />
          <NextComision />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LinearChart title='Consumo general' series={intake.series} categories={intake.categories} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LinearChart
            title='Consumo por producto'
            series={intakeProducts.series}
            categories={intakeProducts.categories}
          />
        </Grid>

        {/* 
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

        <Grid item xs={12}>
          <TableUsers />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Users
