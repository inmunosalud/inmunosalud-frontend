// ** MUI Imports

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import PageHeader from 'src/@core/components/page-header'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Button, Card } from '@mui/material'

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
        <PageHeader title={<Typography variant='h5'>Productos</Typography>} />

        <Grid item display='flex' justifyContent='flex-end' xs={12}>
          <Button
            variant='contained'
            sx={{ mb: 3, whiteSpace: 'nowrap' }}
            onClick={() => {
              handleClickOpen()
              setDialogTitle('Add')
            }}
          >
            Alta de producto
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
