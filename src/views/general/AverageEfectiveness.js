// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles';

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const AverageEfectiveness = ({ score = 0 }) => {
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const theme = useTheme();

  const options = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',

        colors: {},
        horizontal: true,
        startingShape: 'rounded'
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.background.default],
    stroke: {
      show: true,
      colors: ['transparent']
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: ['General'],
      max: 10
    },
    fill: {
      opacity: 1
    }
  }

  const series = [
    {
      name: 'Score',
      data: [score]
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Score'
        titleTypographyProps={{ variant: 'h6' }}
        subheader="Suma del peso de la cartera y la fuerza de la cartera"
        subheaderTypographyProps={{ variant: 'caption' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts options={options} series={series} type='bar' height={180} />
      </CardContent>
    </Card>
  )
}

export default AverageEfectiveness
