import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { FileUpload } from 'mdi-material-ui'
import { ContentCopy } from 'mdi-material-ui'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardNumber from 'src/views/general/CardNumber'
import NextComision from 'src/views/dashboards/users/NextComision'
import LinearChart from 'src/views/dashboards/users/LinearChart'

//actions
import { getUserInfo } from 'src/store/users'
import { Card, CardContent, Button, CircularProgress, Box } from '@mui/material'
import CustomizedTooltip from '../components/tooltip/Tooltip'
import GraphBar from 'src/views/dashboards/users/GraphBar'
import NumberUsersTable from 'src/views/dashboards/users/NumberUsersTable'
import { loadSession } from 'src/store/dashboard/generalSlice'

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

function getOverAllConsumptionCategories({ overallConsumption = {} }) {
  if (!overallConsumption || Object.keys(overallConsumption).length === 0) return []

  const keys = Object.keys(overallConsumption.monthly)

  keys.sort((a, b) => {
    const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    const [monthA, yearA] = a
      .split('-')
      .map((part, index) => (index === 0 ? monthNames.indexOf(part) : parseInt(part) + 2000))
    const [monthB, yearB] = b
      .split('-')
      .map((part, index) => (index === 0 ? monthNames.indexOf(part) : parseInt(part) + 2000))
    return new Date(yearA, monthA) - new Date(yearB, monthB)
  })

  return keys
}

function getOverAllConsumptionSeries({ overallConsumption = {} }) {
  if (!overallConsumption || Object.keys(overallConsumption).length === 0) return []

  const categories = getOverAllConsumptionCategories({ overallConsumption })
  const values = categories.map(key => overallConsumption.monthly[key])

  return [{ data: values }]
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

  try {
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
  } catch (error) {
    return console.error(error)
  }
  return series
}

function getNextMonth(date) {
  const spanishMonths = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]

  const dateParts = date.split(' ')
  const day = parseInt(dateParts[0])
  const currentMonth = dateParts[1].toLowerCase()

  const currentMonthIndex = spanishMonths.findIndex(month => month.startsWith(currentMonth))

  let nextMonthIndex = currentMonthIndex + 1
  if (nextMonthIndex === 12) {
    nextMonthIndex = 0
  }

  const nextMonth = `${day} de ${spanishMonths[nextMonthIndex]}`

  return nextMonth
}

const Users = () => {
  const dispatch = useDispatch()
  const { userInfo, isLoading } = useSelector(state => state.users)
  const [cutoffDate, setCutoffDate] = React.useState('')
  const { user } = useSelector(state => state.dashboard.general)

  React.useEffect(() => {
    if (user.profile === 'Afiliado') {
      getMonthlyCountdown(data[0].stats)
    }
  }, [user, userInfo])

  React.useEffect(() => {
    if (userInfo?.cutoffDate) {
      setCutoffDate(getNextMonth(userInfo.cutoffDate))
    }
  }, [userInfo])

  React.useEffect(() => {
    dispatch(getUserInfo(user.id))
  }, [])

  const handlePaste = () => {
    const baseUrl =
      window.location.origin === 'http://localhost:3000' ? 'https://inmunosalud.vercel.app' : window.location.origin
    const url = `${baseUrl}/register?id=${user?.id}`

    navigator.clipboard.writeText(url)
  }

  const getMonthlyCountdown = date => {
    const diffDays = moment(date, 'DD/MM/YYYY').diff(moment(), 'days')
    data[0].stats = `${date} - Faltan ${diffDays} para el siguiente corte`
  }

  const renderCharts = () => {
    console.log('userInfo a', userInfo.profile)

    if (userInfo.profile !== 'Consumidor') {
      return (
        <>
          <Grid item xs={12} md={3}>
            <NumberUsersTable title='Número de Usuarios en tu Red' user={userInfo} />
          </Grid>
          <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} md={9}>
            <CardNumber data={{ title: 'Proximo Corte', stats: cutoffDate }} userInfo={userInfo} />
            <NextComision />
          </Grid>
          <Grid item xs={12} md={12} sx={{ margin: '10px auto' }}>
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Link href='/ecommerce/billing' passHref>
                  <Button variant='contained' startIcon={<FileUpload />}>
                    Carga tu factura
                  </Button>
                </Link>
                <CustomizedTooltip title='Copy to clipboard'>
                  <Button
                    fullWidth
                    startIcon={<ContentCopy />}
                    variant='contained'
                    onClick={() => navigator.clipboard.writeText(`${user?.id}`)}
                  >
                    Copiar código de recomendado
                  </Button>
                </CustomizedTooltip>
                <Button startIcon={<ContentCopy />} variant='contained' onClick={handlePaste}>
                  Copiar liga para registro de un recomendado
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </>
      )
    }
  }

  return isLoading === false ? (
    <>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          {renderCharts()}
          <Grid item xs={12} sm={6}>
            <GraphBar
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

export default Users
