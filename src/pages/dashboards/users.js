import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
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
import { object } from 'yup'

const data = [
  {
    stats: '01/05/2023',
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

function getOverAllConsumptionCategories({ overallConsumption = {} }) {
  if (!overallConsumption | (Object.keys(overallConsumption).length === 0)) return []

  const keys = Object?.keys(overallConsumption?.monthly)
  return keys
}

function getOverAllConsumptionSeries({ overallConsumption = {} }) {
  if (!overallConsumption | (Object.keys(overallConsumption).length === 0)) return []
  return [{ data: Object?.values(overallConsumption?.monthly) }]
}

function getProductConsumptionCategories({ productsConsumption = {} }) {
  if (!productsConsumption) return []

  const categories = new Array(0)
  for (const [key, values] of Object.entries(productsConsumption)) {
    categories.push(Object.keys(values))
  }

  return Array.from(new Set(categories.flat()))
}

function getProductConsumptionSeries(userInfo) {
  const categories = getProductConsumptionCategories(userInfo)

  if (!categories) return []

  const series = []

  for (const [key, values] of Object.entries(userInfo.productsConsumption)) {
    let data = []
    const months = Object.keys(values)
    for (let i = 0; i < categories.length; i++) {
      const match = months.find(month => month === categories[i])

      if (match) {
        data.push(values[match])
      } else data.push(0)
    }
    series.push({ data, name: key })
  }
  return series
}

const Users = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.users)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const { user } = useSelector(state => state.dashboard.general)

  React.useEffect(() => {
    dispatch(getUserInfo(user?.id))
    if (user.profile === "Socio") {
      getMonthlyCountdown(data[0].stats)
    }
  }, [dispatch])

  React.useEffect(() => {
    if (userInfo != '') setIsLoaded(true)
  })

  const handlePaste = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_PATH_PROYECT}/register?id=${user?.id}`)
  }

  const getMonthlyCountdown = (date) => {
    const diffDays = moment(date, 'DD/MM/YYYY').diff(moment(), 'days')
    data[0].stats = `${date} - Faltan ${diffDays} para el siguiente corte`
  }

  const renderCharts = () => {
    if (userInfo.profile !== 'Consumidor') {
      return (
        <>
          <Grid item xs={12} md={3}>
            <NumberUsersGraph title='Número de Usuarios en Red' user={userInfo} />
          </Grid>
          <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} md={9}>
            <CardNumber data={{ title: 'Proximo Corte', stats: userInfo?.cutoffDate }} userInfo={userInfo} />
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
    <>
      {isLoaded && (
        <ApexChartWrapper>
          <Grid container spacing={6}>
            {renderCharts()}
            <Grid item xs={12} sm={6}>
              <LinearChart
                title='Consumo general'
                series={getOverAllConsumptionSeries(userInfo)}
                categories={getOverAllConsumptionCategories(userInfo)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LinearChart
                title='Consumo por producto'
                series={getProductConsumptionSeries(userInfo)}
                categories={getProductConsumptionCategories(userInfo)}
              />
            </Grid>
          </Grid>
        </ApexChartWrapper>
      )}
    </>
  )
}

export default Users
