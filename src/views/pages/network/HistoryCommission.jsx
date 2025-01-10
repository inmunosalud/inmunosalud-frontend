import React, { useState, useEffect } from 'react'
import { CardContent, Tabs, Box, Tab, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

export const HistoryCommission = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { network } = useSelector(state => state.users)

  const today = new Date()
  const cutoffDay = 18

  const calculateDefaultYearMonth = () => {
    if (today.getDate() < cutoffDay) {
      const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1)
      return previousMonth.getFullYear().toString()
    }
    return today.getFullYear().toString()
  }

  const defaultYear = calculateDefaultYearMonth()

  const [selectedCommissionsYear, setSelectedCommissionsYear] = useState(defaultYear)
  const [dataSeriesCommissionsHistory, setDataSeriesCommissionsHistory] = useState([
    {
      name: defaultYear,
      data: []
    }
  ])

  const chartOptionsCommissionsHistoryY = {
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
    dataLabels: { enabled: true, formatter: val => `$${val}`, background: { enabled: true } },
    stroke: { show: true, width: 0, colors: ['transparent'] },
    yaxis: { show: false }
  }

  const chartOptionsCommissionsHistoryX = {
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
    dataLabels: { enabled: true, formatter: val => `$${val}`, background: { enabled: true } },
    stroke: { show: true, width: 0, colors: ['transparent'] }
  }

  const handleCommissionsYearChange = (event, newValue) => {
    if (network.commissionHistory && newValue) {
      setSelectedCommissionsYear(newValue)
      const data = [{ name: newValue, data: network.commissionHistory[newValue] }]
      setDataSeriesCommissionsHistory(data)
    }
  }

  useEffect(() => {
    if (network) {
      const data = [
        { name: selectedCommissionsYear, data: network?.commissionHistory?.[selectedCommissionsYear] || [] }
      ]
      setDataSeriesCommissionsHistory(data)
    }
  }, [network, selectedCommissionsYear])

  return (
    <CardContent sx={{ textAlign: 'center' }}>
      <Box>
        <Box>
          <Tabs
            value={selectedCommissionsYear}
            onChange={(event, newValue) => handleCommissionsYearChange(event, newValue)}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            {Object.keys(network?.commissionHistory || {}).map(year => (
              <Tab id={year} key={year} label={year} value={year} />
            ))}
          </Tabs>
        </Box>
        <Box>
          <ReactApexcharts
            options={!mobile ? chartOptionsCommissionsHistoryY : chartOptionsCommissionsHistoryX}
            series={dataSeriesCommissionsHistory}
            type='bar'
            height={350}
          />
        </Box>
      </Box>
    </CardContent>
  )
}
