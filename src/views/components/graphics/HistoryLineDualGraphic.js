import React, { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useTheme } from '@mui/material/styles'

export const HistoryLineDualGraphic = ({ dataSeriesHistory, category }) => {
  const theme = useTheme()

  const baseChartOptions = useMemo(
    () => ({
      chart: {
        id: 'dynamic-series-chart-1',
        group: category,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: theme.palette.background.paper,
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.1
        },
        family: 'Arial',
        fontSize: '14px',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      markers: {
        size: 6,
        strokeColors: theme.palette.mode === 'dark' ? '#FFF' : '#292e33',
        strokeWidth: 1,
        shape: 'circle',
        hover: { size: 7 }
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        labels: {
          style: { colors: theme.palette.text.secondary }
        },
        axisBorder: { show: false },
        axisTicks: { show: true },
        tooltip: { enabled: true }
      },
      yaxis: {
        show: true,
        labels: { minWidth: 40, style: { colors: theme.palette.text.secondary } },
        min: 0
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: { fontSize: '12px' },
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
      },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 0,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
      },
      colors: [theme.palette.primary.main]
    }),
    [theme, dataSeriesHistory]
  )

  const baseChartOptions2 = useMemo(
    () => ({
      chart: {
        id: 'dynamic-series-chart-2',
        group: category,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: theme.palette.background.paper,
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.1
        },
        family: 'Arial',
        fontSize: '14px',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },

      stroke: {
        curve: 'smooth',
        width: 2
      },
      markers: {
        size: 6,
        strokeColors: theme.palette.mode === 'dark' ? '#FFF' : '#292e33',
        strokeWidth: 1,
        shape: 'circle',
        hover: { size: 7 }
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        labels: {
          style: { colors: theme.palette.text.secondary }
        },
        axisBorder: { show: false },
        axisTicks: { show: true },
        tooltip: { enabled: true }
      },
      yaxis: {
        show: true,
        labels: {
          formatter: value => `${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)}`,
          style: { colors: theme.palette.text.secondary }
        },
        min: 0
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: { fontSize: '12px' },
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
      },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 0,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
      },
      colors: [theme.palette.primary.main]
    }),
    [theme]
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Main charts */}
      <Box>
        {dataSeriesHistory[0] && dataSeriesHistory[0][0] && (
          <>
            <Typography variant='body2'>{dataSeriesHistory[0][0].name}</Typography>
            <ReactApexcharts
              id='main-line'
              key={dataSeriesHistory[0][0]?.group}
              options={baseChartOptions}
              series={dataSeriesHistory?.[0] || []}
              type='line'
              height={160}
            />
          </>
        )}
        <Box sx={{ mt: 4 }}>
          {dataSeriesHistory[1] && dataSeriesHistory[1][0] && (
            <>
              <Typography variant='body2'>{dataSeriesHistory[1][0].name}</Typography>
              <ReactApexcharts
                id='secondary-line'
                key={dataSeriesHistory[1][0].group}
                options={baseChartOptions2}
                series={dataSeriesHistory?.[1] || []}
                type='line'
                height={160}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
