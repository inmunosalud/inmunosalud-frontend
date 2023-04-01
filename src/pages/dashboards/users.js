import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardNumber from 'src/views/general/CardNumber'
import NumberUsersGraph from 'src/views/dashboards/users/NumberUsersGraph'
import NextComision from 'src/views/dashboards/users/NextComision'
import LinearChart from 'src/views/dashboards/users/LinearChart'

//actions
import { getUserInfo } from 'src/store/users'
import { Card, CardContent, Button } from '@mui/material'
import CustomizedTooltip from '../components/tooltip/Tooltip'

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
      data: [5, 10, 15]
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
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.users)
  const { user } = useSelector(state => state.dashboard.general)

  React.useEffect(() => {
    dispatch(getUserInfo(user?.id))
  }, [dispatch])

  const handlePaste = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_PATH_PROYECT}/register?id=${user?.id}`)
  }

  const renderCharts = () => {
    if (userInfo.profile !== 'Consumidor') {
      return (
        <>
          <Grid item xs={12} md={3}>
            <NumberUsersGraph title='Número de Usuarios en Red' user={userInfo} />
          </Grid>
          <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} md={9}>
            <CardNumber data={data[0]} userInfo={userInfo} />
            <NextComision />
          </Grid>
          <Grid item xs={12} md={12} sx={{ margin: '10px auto' }}>
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '10px' }}>
                <CustomizedTooltip title='Copy to clipboard'>
                  <Button
                    fullWidth
                    style={{ color: 'white' }}
                    variant='outlined'
                    onClick={() => navigator.clipboard.writeText(`${user?.id}`)}
                  >
                    Copiar código de recomendado
                  </Button>
                </CustomizedTooltip>

                <Button style={{ color: 'white' }} variant='outlined' onClick={handlePaste}>
                  Copiar liga para registro de un recomendado
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </>
      )
    }
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {renderCharts()}
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
      </Grid>
    </ApexChartWrapper>
  )
}

export default Users
