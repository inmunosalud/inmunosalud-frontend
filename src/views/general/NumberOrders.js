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
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
const NumberOrders = ({ data = null }) => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      theme.palette.secondary.main,
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.success.main,
      theme.palette.error.main
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: ['Confirmación de pago', 'Preparación de pedido', 'En camino', 'Entregado', 'Cancelado'],
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
              offsetY: 25
            },
            value: {
              offsetY: -15,
              formatter: value => `${value}`
            },
            total: {
              show: true,
              label: 'Pedidos',
              formatter: value => `${value.globals.seriesTotals.reduce((total, num) => total + num)}`
            }
          }
        }
      }
    }
  }

  const getSeries = () => {
    if (!data) {
      return [0, 0, 0, 0, 0]
    }

    return [
      data.currentCutoff.byStatus.confirmingPayment,
      data.currentCutoff.byStatus.preparingOrder,
      data.currentCutoff.byStatus.onWay,
      data.currentCutoff.byStatus.delivered,
      data.currentCutoff.byStatus.cancelled
    ]
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title='Pedidos'
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
                <LocalShippingIcon sx={{ color: 'primary.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2'>Numero de Pedidos</Typography>
                <Typography variant='h6'>{data?.currentCutoff.total ?? 0}</Typography>
              </Box>
            </Box>
            <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>
                <Circle sx={{ mr: 1, fontSize: '0.5rem', color: theme.palette.secondary.main }} /> Confirmación de pago:{' '}
                <b>{data?.currentCutoff.byStatus.confirmingPayment ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                <Circle sx={{ mr: 1, fontSize: '0.5rem', color: theme.palette.primary.main }} /> Preparación de pedido:{' '}
                <b>{data?.currentCutoff.byStatus.preparingOrder ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                <Circle sx={{ mr: 1, fontSize: '0.5rem', color: theme.palette.info.main }} /> En camino:{' '}
                <b>{data?.currentCutoff.byStatus.onWay ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                <Circle sx={{ mr: 1, fontSize: '0.5rem', color: theme.palette.success.main }} /> Entregado:{' '}
                <b>{data?.currentCutoff.byStatus.delivered ?? 0}</b>
              </Typography>
              <Typography variant='body2'>
                <Circle sx={{ mr: 1, fontSize: '0.5rem', color: theme.palette.error.main }} /> Cancelado:{' '}
                <b>{data?.currentCutoff.byStatus.cancelled ?? 0}</b>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NumberOrders
