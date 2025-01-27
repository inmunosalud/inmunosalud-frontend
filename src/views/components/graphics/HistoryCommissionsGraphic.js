import React, { useMemo } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

export const HistoryCommissionGraphic = ({ dataSeriesCommissionsHistory }) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))

  const chartOptionsCommissionsHistoryY = useMemo(
    () => ({
      chart: { id: 'commissions-chart-Y', toolbar: { show: false } },
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
      plotOptions: { bar: { horizontal: false, columnWidth: '90%', endingShape: 'rounded' } },
      dataLabels: {
        formatter: val => `$${val}`,
        background: { enabled: true },
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
      stroke: { show: true, width: 0, colors: ['transparent'] },
      yaxis: { show: false }
    }),
    [theme]
  )

  const chartOptionsCommissionsHistoryX = useMemo(
    () => ({
      chart: { id: 'commissions-chart-X', toolbar: { show: false } },
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
        labels: { show: false }
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
      plotOptions: { bar: { horizontal: true, columnWidth: '90%', endingShape: 'rounded' } },
      dataLabels: {
        formatter: val => `$${val}`,
        background: { enabled: true },
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
      stroke: { show: true, width: 0, colors: ['transparent'] }
    }),
    [theme]
  )

  return (
    <ReactApexcharts
      options={!mobile ? chartOptionsCommissionsHistoryY : chartOptionsCommissionsHistoryX}
      series={dataSeriesCommissionsHistory}
      type='bar'
      height={350}
      key={`${mobile}-${dataSeriesCommissionsHistory[0]?.name}`} // Doble clave para cambios de vista y datos
    />
  )
}
