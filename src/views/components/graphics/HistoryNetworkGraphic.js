import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, Tabs, Box, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
export const HistoryNetworkGraphic = ({ dataSeriesNetworkHistory }) => {
  const theme = useTheme()
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
  return (
    <ReactApexcharts options={chartOptionsNetworkHistory} series={dataSeriesNetworkHistory} type='line' height={350} />
  )
}
