import react, { useMemo } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Account } from 'mdi-material-ui'

const NumberUsers = ({ data = null }) => {
  // ** Hook
  const theme = useTheme()

  const options = useMemo(
    () => ({
      chart: {
        sparkline: { enabled: true }
      },
      colors: [theme.palette.primary.main, theme.palette.customColors.bodyBg],
      stroke: { width: 0 },
      legend: { show: false },
      dataLabels: { enabled: false },
      labels: ['Activos', 'Inactivos'],
      states: {
        hover: {
          filter: { type: 'none' }
        },
        active: {
          filter: { type: 'none' }
        }
      },
      plotOptions: {
        pie: {
          customScale: 0.9,
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                offsetY: 25,
                color: theme.palette.text.primary
              },
              value: {
                offsetY: -15,
                formatter: value => `${value}`,
                color: theme.palette.text.primary
              },
              total: {
                show: true,
                label: 'Usuarios',
                formatter: value => `${value.globals.seriesTotals.reduce((total, num) => total + num)}`,
                color: theme.palette.text.primary
              }
            }
          }
        }
      }
    }),
    [theme]
  )

  const getSeries = () => {
    if (!data) {
      return [0, 0]
    }

    return [data.valid, data.invalid]
  }

  return (
    <Card>
      <CardHeader
        title='Usuarios'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent
        sx={{
          '& .apexcharts-datalabel-label': {
            lineHeight: '1.313rem',
            letterSpacing: '0.25px',
            fontSize: '0.875rem !important',
            fill: `${theme.palette.text.secondary} !important`
          },
          '& .apexcharts-datalabel-value': {
            letterSpacing: 0,
            lineHeight: '2rem',
            fontWeight: '500 !important'
          }
        }}
      >
        <Grid container sx={{ my: [0, 4, 1.625] }}>
          <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={180} series={getSeries()} options={options} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' sx={{ mr: 3 }} variant='rounded'>
                <Account sx={{ color: 'primary.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2'>Número de usuarios</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6'>{data?.total ?? 0}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                Administradores Generales: <b>{data?.byProfile.admin ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                Administradores de Productos: <b>{data?.byProfile.productsAdmin ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                Administradores de Usuarios: <b>{data?.byProfile.usersManager ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                Consumidores: <b>{data?.byProfile.consumerUser ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                Afiliados: <b>{data?.byProfile.affiliatedUser ?? 0}</b>
              </Typography>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Grid container>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: 'primary.main' }} />
                  <Typography variant='body2'>Activos</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>{data?.valid}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Circle
                    sx={{ mr: 1.5, fontSize: '0.75rem', color: hexToRGBA(theme.palette.customColors.bodyBg, 0.7) }}
                  />
                  <Typography variant='body2'>Inactivos</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>{data?.invalid}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NumberUsers
