import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, Tabs, Box, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
export const HistoryLineDualGraphic = ({ dataSeriesHistory }) => {
  const theme = useTheme()
  // 1. Memoizar opciones del gráfico
  const chartOptionsNetworkHistory = useMemo(
    () => ({
      chart: {
        id: 'Network-chart',
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      grid: {
        row: { colors: [theme.palette.mode === 'light' ? '#fff' : '#000'], opacity: 0 },
        column: { colors: [theme.palette.mode === 'light' ? '#fff' : '#000'], opacity: 0 }
      },
      colors: [theme.palette.primary.main],
      markers: {
        size: 6,
        colors: [theme.palette.primary.main],
        strokeColors: '#eee',
        strokeWidth: 2,
        shape: 'circle'
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
        labels: { offsetX: 4, offsetY: 5, style: { fontSize: '10px' } }
      },
      dataLabels: {
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
      yaxis: { show: false }
    }),
    [theme]
  )

  return <ReactApexcharts options={chartOptionsNetworkHistory} series={dataSeriesHistory} type='line' height={350} />
}
