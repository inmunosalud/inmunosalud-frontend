import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Chart from 'react-apexcharts'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { FileUpload } from 'mdi-material-ui'
import { ContentCopy } from 'mdi-material-ui'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import CardNumber from 'src/views/general/CardNumber'
import NextComision from 'src/views/dashboards/users/NextComision'
import LinearChart from 'src/views/dashboards/users/LinearChart'
import { useTheme } from '@mui/material/styles'

//actions
import { getUserInfo } from 'src/store/users'
import {
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import { InputBase } from '@mui/material'
import CustomizedTooltip from '../components/tooltip/Tooltip'
import GraphBar from 'src/views/dashboards/users/GraphBar'
import NumberUsersTable from 'src/views/dashboards/users/NumberUsersTable'
import { loadSession } from 'src/store/dashboard/generalSlice'
import { getComissionsByUser } from 'src/store/comissions'

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

const dataList = {
  nivel1: [
    { nombre: 'Juan Ignacio', referencia: 'Alberto Ruiz' },
    { nombre: 'Carlos Villalobos', referencia: 'Pedro Rodriguez' }
  ],
  nivel2: [
    { nombre: 'Nivel 2A', referencia: 'Nivel 1A' },
    { nombre: 'Nivel 2B', referencia: 'Nivel 1A' },
    { nombre: 'Nivel 2C', referencia: 'Nivel 1B' }
  ],
  nivel3: [
    { nombre: 'Nivel 3A', referencia: 'Nivel 2A' },
    { nombre: 'Nivel 3B', referencia: 'Nivel 2A' },
    { nombre: 'Nivel 3C', referencia: 'Nivel 2B' },
    { nombre: 'Nivel 3D', referencia: 'Nivel 2C' }
  ],
  nivel4: [
    { nombre: 'Nivel 4A', referencia: 'Nivel 3A' },
    { nombre: 'Nivel 4B', referencia: 'Nivel 3A' },
    { nombre: 'Nivel 4C', referencia: 'Nivel 3B' },
    { nombre: 'Nivel 4D', referencia: 'Nivel 3C' },
    { nombre: 'Nivel 4E', referencia: 'Nivel 3D' }
  ]
}

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

// function getProductConsumptionSeries(userInfo) {
//   const categories = getProductConsumptionCategories(userInfo)

//   if (!categories) return []

//   const series = []

//   try {
//     for (const [key, values] of Object.entries(userInfo.productsConsumption)) {
//       let data = []
//       const months = Object.keys(values)
//       for (let i = 0; i < categories.length; i++) {
//         const match = months.find(month => month === categories[i])

//         if (match) {
//           data.push(values[match])
//         } else data.push(0)
//       }
//       series.push({ data, name: key })
//     }
//   } catch (error) {
//     return console.error(error)
//   }
//   return series
// }

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
  const { comissionsHistory, isLoading: isLoadingComisions } = useSelector(state => state.comissions)
  const [cutoffDate, setCutoffDate] = React.useState('')
  const [chartSeriesCommissionsHistory, setChartSeriesCommissionsHistory] = React.useState([])
  const [dataSeriesCommissionsHistory, setDataSeriesCommissionsHistory] = React.useState([
    {
      name: new Date().getFullYear(),
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ])
  const [availableYears, setAvailableYears] = React.useState([])
  const { user } = useSelector(state => state.dashboard.general)
  // Estados para usuarios activos e inactivos
  const [totalUsuariosActivos, setTotalUsuariosActivos] = React.useState(0)
  const [totalUsuariosInactivos, setTotalUsuariosInactivos] = React.useState(0)

  // Estado para almacenar el conteo por nivel
  const [conteoPorNivel, setConteoPorNivel] = React.useState({
    1: { valid: 0, invalid: 0 },
    2: { valid: 0, invalid: 0 },
    3: { valid: 0, invalid: 0 },
    4: { valid: 0, invalid: 0 }
  })

  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear())

  const theme = useTheme()

  const chartOptionsCommissionsHistory = {
    chart: {
      id: 'commissions-chart',
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ]
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return `$${val.toFixed(2)}`
      },
      position: 'bottom'
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    yaxis: {
      title: {
        text: 'Monto de Comisiones'
      },
      labels: {
        formatter: function (value) {
          return `$${value.toFixed(2)}`
        }
      }
    },
    fill: {
      opacity: 1
    }
  }

  const optionsUsers = {
    labels: ['Usuarios Activos', 'Usuarios Inactivos'],
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      show: false
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.background.default],
    stroke: {
      show: true,
      colors: ['transparent']
    }
  }
  const seriesUsers = [totalUsuariosActivos, totalUsuariosInactivos]

  const optionsCommissions = {
    labels: ['Recompensa por usuarios inactivos', 'Recompensa por usuarios activos'],
    colors: [theme.palette.secondary.main, '#008000'],
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      show: false
    },
    stroke: {
      show: true,
      colors: ['transparent']
    }
  }
  const seriesCommissions = [userInfo?.commission?.nextLost ?? 0, userInfo?.commission?.nextReal ?? 0]

  const renderList = nivel => {
    if (!userInfo || !userInfo.network || !userInfo.network[nivel]) {
      return null
    }
    return (
      <Box elevation={3} style={{ padding: '10px', margin: '10px', maxHeight: '200px', overflowY: 'auto' }}>
        <List sx={{ minHeight: '180px' }}>
          {userInfo.network[nivel]?.users?.map(
            user =>
              !user.valid && (
                <ListItem key={user.name}>
                  <ListItemText primary={user.name} secondary={`Referido por: ${user.recommenderName || 'N/A'}`} />
                </ListItem>
              )
          )}
        </List>
      </Box>
    )
  }

  React.useEffect(() => {
    // Contar usuarios activos e inactivos en cada nivel
    if (userInfo) {
      for (let nivel in userInfo.network) {
        contarUsuariosPorNivel(nivel)
      }
    }
  }, [userInfo])

  React.useEffect(() => {
    if (Object.keys(comissionsHistory).length === 0) dispatch(getComissionsByUser(user.id))
  }, [])

  // React.useEffect(() => {
  //   console.log(
  //     comissionsHistory,
  //     chartSeriesCommissionsHistory,
  //     chartSeriesCommissionsHistory[selectedYear],
  //     availableYears,
  //     selectedYear
  //   )
  // }, [comissionsHistory])

  React.useEffect(() => {
    if (!comissionsHistory || Object.keys(comissionsHistory).length === 0) {
      return
    }

    const initialData = [
      { month: '01', amount: 0 },
      { month: '02', amount: 0 },
      { month: '03', amount: 0 },
      { month: '04', amount: 0 },
      { month: '05', amount: 0 },
      { month: '06', amount: 0 },
      { month: '07', amount: 0 },
      { month: '08', amount: 0 },
      { month: '09', amount: 0 },
      { month: '10', amount: 0 },
      { month: '11', amount: 0 },
      { month: '12', amount: 0 }
    ]

    const commissionDataByMonth = {}
    const years = []

    for (const yearMonth in comissionsHistory) {
      const [year, month] = yearMonth.split('-')

      if (!years.includes(year)) {
        years.push(year)
        commissionDataByMonth[year] = initialData.map(item => ({ ...item }))
      }

      const liquidatedCommissions =
        comissionsHistory[yearMonth]?.filter(commission => commission.status === 'Comisión liquidada') || []

      const totalCommissionAmount = liquidatedCommissions.reduce(
        (total, commission) => total + commission.commission,
        0
      )

      // Actualizar el valor del mes correspondiente
      const monthData = commissionDataByMonth[year].find(data => data.month === month)
      if (monthData) {
        monthData.amount = totalCommissionAmount
      }
    }

    setChartSeriesCommissionsHistory(commissionDataByMonth)
    setAvailableYears(years)
    setSelectedYear(years[0])
    const firstData = [
      {
        name: years[0],
        data: commissionDataByMonth[years[0]].map(item => item.amount)
      }
    ]
    setDataSeriesCommissionsHistory(firstData)
  }, [isLoading])

  React.useEffect(() => {
    if (localStorage.getItem('im-user') != '' && Object.keys(user).length === 0) {
      dispatch(loadSession())
    }
    if (userInfo === null && user.id != null) {
      dispatch(getUserInfo(user.id))
    }
  }, [])

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

  const handlePaste = () => {
    navigator.clipboard.writeText(`https://www.inmunosalud.mx/register?id=${user?.id}`)
  }

  const handleYearChange = (event, newValue) => {
    if (chartSeriesCommissionsHistory && newValue) {
      setSelectedYear(newValue)

      const data = [
        {
          name: newValue,
          data: chartSeriesCommissionsHistory[newValue].map(item => item.amount)
        }
      ]

      setDataSeriesCommissionsHistory(data)
    }
  }

  const getMonthlyCountdown = date => {
    const diffDays = moment(date, 'DD/MM/YYYY').diff(moment(), 'days')
    data[0].stats = `${date} - Faltan ${diffDays} para el siguiente corte`
  }

  // Función para contar usuarios activos e inactivos en un nivel específico
  const contarUsuariosPorNivel = nivel => {
    const nivelInfo = userInfo.network[nivel]

    if (nivelInfo && nivelInfo.users && nivelInfo.users.length > 0) {
      // Contar usuarios activos e inactivos en el nivel actual
      const usuariosActivos = nivelInfo.valid || 0
      const usuariosInactivos = nivelInfo.invalid || 0

      setTotalUsuariosActivos(prevTotal => prevTotal + usuariosActivos)
      setTotalUsuariosInactivos(prevTotal => prevTotal + usuariosInactivos)

      setConteoPorNivel(prevConteo => ({
        ...prevConteo,
        [nivel]: { valid: usuariosActivos, invalid: usuariosInactivos }
      }))
    }
  }

  return !isLoading || !isLoadingComisions ? (
    <>
      <Grid xs={12} justifyContent='center'>
        <ApexChartWrapper>
          <Grid container spacing={2}>
            {/* Columna 1 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: '600px' }}>
                <CardContent>
                  <Grid container spacing={2} sx={{ height: '200px' }}>
                    <Grid item xs={12} md={8}>
                      <CardHeader
                        title='INVITA A TUS AMIGOS Y GANA DINERO'
                        subheader='Comparte el enlace de registro o copia tu código para compartirlo a tus amigos'
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ mt: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '30%' }}
                    >
                      <Button
                        startIcon={<ContentCopy />}
                        variant='contained'
                        size='small'
                        onClick={() => navigator.clipboard.writeText(`${user?.id}`)}
                      >
                        Copiar tu codigo
                      </Button>
                      <Button
                        startIcon={<ContentCopy />}
                        variant='contained'
                        sx={{ mt: '10px' }}
                        size='small'
                        onClick={handlePaste}
                      >
                        Copiar tu enlace
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <CardContent sx={{ mt: '-50px' }}>
                        <Typography variant='h6' color='textPrimary'>
                          Usuarios en tu red: {userInfo?.network?.totalUsers ?? 0}
                        </Typography>
                        <Typography variant='h6' color='textPrimary' sx={{ mt: '20px' }}>
                          Nivel 1: {conteoPorNivel[1].invalid + conteoPorNivel[1].valid}
                        </Typography>
                        <Typography variant='h6' color='textPrimary' sx={{ mt: '5px' }}>
                          Nivel 2: {conteoPorNivel[2].invalid + conteoPorNivel[2].valid}
                        </Typography>
                        <Typography variant='h6' color='textPrimary' sx={{ mt: '5px' }}>
                          Nivel 3: {conteoPorNivel[3].invalid + conteoPorNivel[3].valid}
                        </Typography>
                        <Typography variant='h6' color='textPrimary' sx={{ mt: '5px' }}>
                          Nivel 4: {conteoPorNivel[4].invalid + conteoPorNivel[4].valid}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <ReactApexcharts options={optionsUsers} series={seriesUsers} type='donut' width='300' />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <Typography variant='h5' color='primary' sx={{ mr: '20px' }}>
                            Activos: {totalUsuariosActivos}
                          </Typography>
                          <Typography variant='h5' color='secondary'>
                            Inactivos: {totalUsuariosInactivos}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Columna 2 */}

            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: '600px' }}>
                <CardContent>
                  <Grid container spacing={2} sx={{ height: '200px' }}>
                    <Grid item xs={12} md={7}>
                      <Box sx={{ mt: '5px', display: 'flex', width: '100%' }}>
                        <CardHeader title={'Próximo corte: ' + cutoffDate} />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={5}
                      sx={{ mt: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <Box>
                        <Link href='/ecommerce/billing' passHref>
                          <Button size='small' variant='contained' startIcon={<FileUpload />}>
                            Carga tu factura
                          </Button>
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <CardHeader title={'Tu siguiente comisión'} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <ReactApexcharts
                          options={optionsCommissions}
                          series={seriesCommissions}
                          type='donut'
                          width='300'
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box>
                        <Typography sx={{ mt: '20px' }} variant='h6' color='primary'>
                          Recompensa proyectada:
                        </Typography>
                        <Typography sx={{ mb: '20px' }} variant='h5' color='primary'>
                          ${userInfo?.commission?.nextTotal}
                        </Typography>
                        <Typography sx={{ mt: '100px' }} variant='caption'>
                          La comisión proyectada es el monto pagadero si todos tus usuarios se encuentran activos
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <CardContent>
                        <Box sx={{ alignItems: 'center' }}>
                          <Typography variant='h7' sx={{ mt: '20px' }} color='#008000'>
                            Comisión a pagar por usuarios activos:
                          </Typography>
                          <Typography variant='h5' color='#008000'>
                            ${userInfo?.commission?.nextReal}
                          </Typography>
                          <Box sx={{ mt: '20px' }}>
                            <Typography color='secondary' variant='h7'>
                              Comisión no pagadera por usuarios inactivos:
                            </Typography>
                            <Typography variant='h5' color='secondary'>
                              ${userInfo?.commission?.nextLost}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CardContent>
                        <Box sx={{ justifyContent: 'flex-end' }}>
                          <Typography variant='h7' color='textPrimary'>
                            Recuérdele a sus referidos inactivos que hagan su compra para recibir la comisión
                            proyectada.
                          </Typography>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: '2px' }}>
            {/* Columna 1 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: '700px' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CardHeader title='Usuarios inactivos en tu red' />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <h2>{'Nivel 1'}</h2>
                      {renderList(1)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h2>{'Nivel 2'}</h2>
                      {renderList(2)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h2>{'Nivel 3'}</h2>
                      {renderList(3)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h2>{'Nivel 4'}</h2>
                      {renderList(4)}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* Columna 2 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: '700px' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CardHeader title='Historial de comisiones' />
                  <Box>
                    <Box>
                      <Tabs
                        value={selectedYear}
                        onChange={handleYearChange}
                        indicatorColor='primary'
                        textColor='primary'
                        centered
                        sx={{ mt: '10px' }}
                      >
                        {availableYears.map(year => (
                          <Tab id={year} key={year} label={year} value={year} />
                        ))}
                      </Tabs>
                    </Box>
                    <Box sx={{ mt: '70px' }}>
                      <ReactApexcharts
                        options={chartOptionsCommissionsHistory}
                        series={dataSeriesCommissionsHistory}
                        type='bar'
                        height={350}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* 
            <Grid item display='flex' container direction='column' justifyContent='space-between' xs={12} md={9}>
              <CardNumber data={{ title: 'Proximo Corte', stats: cutoffDate }} userInfo={userInfo} />
              <NextComision />
            </Grid>
            <Grid item xs={12} md={12} sx={{ margin: '10px auto' }}></Grid>
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
          </Grid> */}
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

export default Users
