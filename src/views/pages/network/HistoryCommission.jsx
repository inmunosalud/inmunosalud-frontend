import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, Tabs, Box, Tab, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

export const HistoryCommission = () => {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const theme = useTheme()
  const { network } = useSelector(state => state.users)
  const [selectedCommissionsYear, setSelectedCommissionsYear] = useState(new Date().getFullYear().toString())
  const [dataSeriesCommissionsHistory, setDataSeriesCommissionsHistory] = useState([
    {
      name: new Date().getFullYear(),
      data: []
    }
  ])
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

  useEffect(() => {
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

  return (
    <CardContent
      sx={{
        textAlign: 'center'
      }}
    >
      <Box>
        <Box>
          <Tabs
            value={selectedCommissionsYear}
            onChange={(event, newValue) => handleCommissionsYearChange(event, newValue)}
            indicatorColor='primary'
            textColor='primary'
            centered
            sx={{
              mt: '10px'
            }}
          >
            {Object.keys(network?.commissionHistory || {}).map(year => {
              return <Tab id={year} key={year} label={year} value={year} />
            })}
          </Tabs>
        </Box>
        <Box
          sx={{
            mt: '70px'
          }}
        >
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
