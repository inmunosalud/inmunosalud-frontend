import React, { useMemo } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useTheme } from '@mui/material/styles'

// Paleta de colores extensa para múltiples series
const COLOR_PALETTE = [
  '#fcc419',
  '#008FFB',
  '#00E396',
  '#FF4560',
  '#775DD0',
  '#3F51B5',
  '#546E7A',
  '#D4526E',
  '#8D5B4C',
  '#F86624',
  '#662E9B',
  '#EA5545'
]

export const HistoryLineMultipleGraphic = ({ dataSeriesHistory }) => {
  const theme = useTheme()

  const chartOptionsNetworkHistory = useMemo(
    () => ({
      chart: {
        id: 'dynamic-series-chart',
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
      colors: COLOR_PALETTE,
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
      yaxis: { show: true, labels: { style: { colors: theme.palette.text.secondary } } },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        itemMargin: { horizontal: 10 },
        markers: { radius: 4 },
        labels: { colors: theme.palette.text.primary }
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: { fontSize: '12px' },
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
      },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 5,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.3,
          gradientToColors: [''],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 1,
          stops: [0, 100]
        }
      }
    }),
    [theme]
  )

  return <ReactApexcharts options={chartOptionsNetworkHistory} series={dataSeriesHistory} type='line' height={350} />
}
