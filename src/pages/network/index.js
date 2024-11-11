import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ContentCopy, FileUpload } from 'mdi-material-ui'
import Link from 'next/link'

// ** Styled Component Import
import { useTheme } from '@mui/material/styles'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

//actions
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  useMediaQuery
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import { getComissionsByUser } from 'src/store/comissions'
import { loadSession } from 'src/store/session'
import { getNetworkById } from 'src/store/users'
import Check from '@mui/icons-material/Check'
const dataList = [
  {
    nivel: 1,
    users: [
      // { name: 'Juan Ignacio', recommenderName: 'Alberto Ruiz' },
      // { name: 'Carlos Villalobos', recommenderName: 'Pedro Rodriguez' }
    ]
  },
  {
    nivel: 2,
    users: [
      // { name: 'Nivel 2A', recommenderName: 'Nivel 1A' },
      // { name: 'Nivel 2B', recommenderName: 'Nivel 1A' },
      // { name: 'Nivel 2C', recommenderName: 'Nivel 1B' }
    ]
  },
  {
    nivel: 3,
    users: [
      // { name: 'Nivel 3A', recommenderName: 'Nivel 2A' },
      // { name: 'Nivel 3B', recommenderName: 'Nivel 2A' },
      // { name: 'Nivel 3C', recommenderName: 'Nivel 2B' },
      // { name: 'Nivel 3D', recommenderName: 'Nivel 2C' }
    ]
  },
  {
    nivel: 4,
    users: [
      // { name: 'Nivel 4A', reference: 'Nivel 3A' },
      // { name: 'Nivel 4B', reference: 'Nivel 3A' },
      // { name: 'Nivel 4C', reference: 'Nivel 3B' },
      // { name: 'Nivel 4D', reference: 'Nivel 3C' },
      // { name: 'Nivel 4E', reference: 'Nivel 3D' }
    ]
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

  const nextMonth = `${day} de ${spanishMonths[currentMonthIndex]}`

  return nextMonth
}

const Network = () => {
  const dispatch = useDispatch()
  const { userInfo, isLoading, network } = useSelector(state => state.users)
  const { comissionsHistory, isLoading: isLoadingCommissions } = useSelector(state => state.comissions)
  const [cutoffDate, setCutoffDate] = React.useState('')
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const [isCopied, setIsCopied] = React.useState(false)
  const [isCopied2, setIsCopied2] = React.useState(false)
  const [chartSeriesCommissionsHistory, setChartSeriesCommissionsHistory] = React.useState([])
  const [dataSeriesCommissionsHistory, setDataSeriesCommissionsHistory] = React.useState([
    {
      name: new Date().getFullYear(),
      data: []
    }
  ])
  const [dataSeriesNetworkHistory, setDataSeriesNetworkHistory] = React.useState([
    {
      name: new Date().getFullYear(),
      data: []
    }
  ])
  const [availableYears, setAvailableYears] = React.useState([])
  const { user } = useSelector(state => state.session)
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

  const [selectedCommissionsYear, setSelectedCommissionsYear] = React.useState(new Date().getFullYear().toString())
  const [selectedNetworkYear, setSelectedNetworkYear] = React.useState(new Date().getFullYear().toString())

  const theme = useTheme()

  const chartOptionsCommissionsHistoryY = {
    chart: {
      id: 'commissions-chart-Y',
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
        columnWidth: '90%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `$${val}`
      },
      background: {
        enabled: true,
        foreColor: theme.palette.mode === 'light' ? '#fff' : '#000',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: theme.palette.mode === 'light' ? '#fff' : '#000',
        opacity: 0.9,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: theme.palette.mode === 'light' ? ['#eee'] : ['#222']
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    yaxis: {
      show: false
    }
  }

  const chartOptionsCommissionsHistoryX = {
    chart: {
      id: 'commissions-chart-X',
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
      ],
      labels: {
        show: false
      }
    },
    yaxis: {
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
        horizontal: true,
        columnWidth: '90%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `$${val}`
      },
      background: {
        enabled: true,
        foreColor: theme.palette.mode === 'light' ? '#fff' : '#000',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: theme.palette.mode === 'light' ? '#fff' : '#000',
        opacity: 0.9,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: theme.palette.mode === 'light' ? ['#eee'] : ['#222']
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    }
  }

  const chartOptionsNetworkHistory = {
    chart: {
      id: 'Network-chart',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    grid: {
      row: {
        // Desactivar las líneas de la cuadrícula en el eje Y
        colors: ['transparent'], // Establecer el color de las líneas de la cuadrícula en transparente
        opacity: 0 // Establecer la opacidad de las líneas de la cuadrícula en 0
      },
      column: {
        // Desactivar las líneas de la cuadrícula en el eje X
        colors: ['transparent'], // Establecer el color de las líneas de la cuadrícula en transparente
        opacity: 0 // Establecer la opacidad de las líneas de la cuadrícula en 0
      }
    },
    colors: [theme.palette.primary.main],
    markers: {
      size: 6, // Tamaño de los marcadores
      colors: [theme.palette.primary.main], // Color de los marcadores
      strokeColors: '#eee', // Color del borde de los marcadores
      strokeWidth: 2, // Ancho del borde de los marcadores
      shape: 'circle' // Forma de los marcadores (circle, square, diamond, triangle, etc.)
    },
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
      ],
      tickAmount: 10,
      labels: {
        offsetX: 4,
        offsetY: 5,
        style: {
          fontSize: '10px'
        }
      }
    },
    dataLabels: {
      offsetY: -10,
      enabled: true,
      background: {
        enabled: true,
        foreColor: theme.palette.mode === 'light' ? '#fff' : '#000',
        padding: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: theme.palette.mode === 'light' ? '#fff' : '#000',
        opacity: 0.9,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: theme.palette.mode === 'light' ? ['#eee'] : ['#222']
      }
    },
    yaxis: {
      show: false
    }
  }

  const renderList = nivel => {
    return (
      <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <Box
          elevation={3}
          sx={{
            padding: '5px',
            margin: '5px',
            height: '350px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '3px',
              scrollbarColor: '#e0e0e0 rgba(0, 0, 0, 0.2)'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#555',
              borderRadius: '2px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#777'
            }
          }}
        >
          <List sx={{ height: '350px' }}>
            {network.network[nivel].map((user, index) => (
              <ListItem key={user.name} divider={index !== network.network[nivel].length - 1}>
                {nivel === '1' ? (
                  <ListItemText
                    primary={`- ${user.name}`}
                    secondary={
                      <>
                        Consumo: <br />${user.lastTotalConsume || '0'}
                      </>
                    }
                  />
                ) : (
                  <ListItemText
                    primary={`- ${user.name}`}
                    secondary={
                      <>
                        Referido por: <br />
                        {user.recommenderName || 'N/A'} <br />
                        Consumo: <br />${user.lastTotalConsume || '0'}
                      </>
                    }
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    )
  }

  React.useEffect(() => {
    if (localStorage.getItem('im-user') != '' && Object.keys(user).length === 0) {
      dispatch(loadSession())
    }
  }, [])

  React.useEffect(() => {
    if (user.id && !isLoadingCommissions) {
      dispatch(getNetworkById(user.id))
    }
  }, [user.id, isLoadingCommissions])

  React.useEffect(() => {
    if (network) {
      const data = [
        {
          name: selectedCommissionsYear,
          data: network?.commissionHistory?.[selectedCommissionsYear] || []
        }
      ]
      setDataSeriesCommissionsHistory(data)
    }
  }, [network])

  React.useEffect(() => {
    if (network) {
      const data = [
        {
          name: selectedNetworkYear,
          data: network?.growingYourNetwork?.[selectedNetworkYear] || []
        }
      ]
      setDataSeriesNetworkHistory(data)
    }
  }, [network])

  const handleCopyCode = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${user?.id}`)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 1000)
    }
  }
  const handleCopyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`https://www.inmunosalud.mx/register/?id=${user?.id}`)
      setIsCopied2(true)
      setTimeout(() => setIsCopied2(false), 1000)
    }
  }

  const handleCommissionsYearChange = (event, newValue) => {
    if (network.commissionHistory && newValue) {
      setSelectedCommissionsYear(newValue)

      const data = [
        {
          name: newValue,
          data: network.commissionHistory[newValue]
        }
      ]
      setDataSeriesCommissionsHistory(data)
    }
  }

  const handleNetworkYearChange = (event, newValue) => {
    if (network.growingYourNetwork && newValue) {
      setSelectedNetworkYear(newValue)

      const data = [
        {
          name: newValue,
          data: network.growingYourNetwork[newValue]
        }
      ]
      setDataSeriesNetworkHistory(data)
    }
  }

  return !isLoading || !isLoadingCommissions ? (
    <>
      <Grid xs={12} justifyContent='center'>
        <ApexChartWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CardHeader
                  title={
                    <Typography sx={{ mt: '20px', textAlign: 'center' }} variant='h5' color='textPrimary'>
                      INVITA A TUS AMIGOS Y GANA DINERO
                    </Typography>
                  }
                  subheader={
                    <Typography sx={{ mt: '20px', textAlign: 'center' }} variant='body2' color='textSecondary'>
                      Comparte el enlace de registro o copia tu código para compartirlo a tus amigos
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                          <Button
                            startIcon={isCopied ? <Check /> : <ContentCopy />}
                            variant='contained'
                            size='large'
                            onClick={handleCopyCode}
                            sx={{
                              animation: isCopied ? 'pulse 1s ease-in-out' : 'none',
                              width: '230px',
                              '@keyframes pulse': {
                                '0%': {
                                  transform: 'scale(1)'
                                },
                                '50%': {
                                  transform: 'scale(1.1)'
                                },
                                '100%': {
                                  transform: 'scale(1)'
                                }
                              }
                            }}
                          >
                            {isCopied ? 'Copiado' : 'Copiar tu código'}
                          </Button>
                          <Button
                            startIcon={isCopied2 ? <Check /> : <ContentCopy />}
                            variant='contained'
                            sx={{
                              mt: '10px',
                              animation: isCopied2 ? 'pulse 1s ease-in-out' : 'none',
                              width: '230px',
                              '@keyframes pulse': {
                                '0%': {
                                  transform: 'scale(1)'
                                },
                                '50%': {
                                  transform: 'scale(1.1)'
                                },
                                '100%': {
                                  transform: 'scale(1)'
                                }
                              }
                            }}
                            size='large'
                            onClick={handleCopyUrl}
                          >
                            {isCopied2 ? 'Copiado' : 'Copiar tu enlace'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            {/* Columna 1 */}
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: { md: '450px' } }}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <CardHeader
                        title={'Tu siguiente comisión'}
                        action={
                          <Link href='/profile/?=&tab=banks'>
                            <Button
                              variant='contained'
                              size='small'
                              sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                            >
                              Agregar datos <br /> bancarios
                            </Button>
                          </Link>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Box>
                        <CardHeader
                          title={
                            <Typography variant='h6' fontWeight='bold' color='primary'>
                              Recompensa proyectada:
                            </Typography>
                          }
                        />
                      </Box>
                      <Box sx={{ mb: '20px', mt: '-20px', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h1' fontWeight='bold' color='primary'>
                          ${network.nextCommission || 0}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box display='flex' alignItems='center' justifyContent='center' height='100%' width='100%'>
                        <Typography sx={{ width: '70%', textAlign: 'center' }} variant='caption'>
                          Este monto es la cantidad que se esta generando de las compras que hacen tus referidos
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box sx={{ mt: '46px' }}>
                        <CardHeader title={'Próximo corte: ' + (network.cutoffDate || '')} />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Columna 2 */}

            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: { md: '600px' } }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <CardHeader title='Usuarios en tu red' />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='h6' color='textPrimary'>
                          <strong> Total de usuarios en tu red: {network.network?.totalUsers || '0'} </strong>
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={3}>
                            <h2>Nivel 1: {network?.network?.['1']?.length || 0}</h2>
                            {network?.network?.['1'] && renderList('1')}
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <h2>Nivel 2: {network?.network?.['2']?.length || 0}</h2>
                            {network?.network?.['2'] && renderList('2')}
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <h2>Nivel 3: {network?.network?.['3']?.length || 0}</h2>
                            {network?.network?.['3'] && renderList('3')}
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <h2>Nivel 4: {network?.network?.['4']?.length || 0}</h2>
                            {network?.network?.['4'] && renderList('4')}
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: '2px' }}>
            {/* Columna 1 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: { md: '550px' } }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CardHeader title='Crecimiento de tu red' />
                  <Box>
                    <Box>
                      <Tabs
                        value={selectedNetworkYear}
                        onChange={(event, newValue) => handleNetworkYearChange(event, newValue)}
                        indicatorColor='primary'
                        textColor='primary'
                        centered
                        sx={{ mt: '10px' }}
                      >
                        {Object.keys(network?.growingYourNetwork || {}).map(year => (
                          <Tab id={year} key={year} label={year} value={year} />
                        ))}
                      </Tabs>
                    </Box>
                    <Box sx={{ mt: '70px' }}>
                      <ReactApexcharts
                        options={chartOptionsNetworkHistory}
                        series={dataSeriesNetworkHistory}
                        type='line'
                        height={350}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {/* Columna 2 */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Card sx={{ height: { md: '550px' } }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CardHeader title='Historial de comisiones' />
                  <Box>
                    <Box>
                      <Tabs
                        value={selectedCommissionsYear}
                        onChange={(event, newValue) => handleCommissionsYearChange(event, newValue)}
                        indicatorColor='primary'
                        textColor='primary'
                        centered
                        sx={{ mt: '10px' }}
                      >
                        {Object.keys(network?.commissionHistory || {}).map(year => {
                          return <Tab id={year} key={year} label={year} value={year} />
                        })}
                      </Tabs>
                    </Box>
                    <Box sx={{ mt: '70px' }}>
                      <ReactApexcharts
                        options={!mobile ? chartOptionsCommissionsHistoryY : chartOptionsCommissionsHistoryX}
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

export default Network
