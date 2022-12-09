// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const columnColors = {
  bg: '#f8d3ff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const NumberUsersGraph = ({ title = '', user = {} }) => {
  const { network } = user

  const AllNetwork = { network }

  const sumValid = () => {
    let totalValid = 0
    let totalInvalid = 0
    for (const property in AllNetwork) {
      totalValid += AllNetwork[property]?.valid ?? 0
      totalInvalid += AllNetwork[property]?.invalid ?? 0
    }
    return { totalValid, totalInvalid }
  }

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
      horizontalAlign: 'left',
      show: false
    },
    colors: [columnColors.series1, columnColors.series2, columnColors.bg],
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
      categories: ['B']
    },
    fill: {
      opacity: 1
    }
  }

  const optionsC = {
    ...options,
    xaxis: {
      categories: ['C']
    }
  }

  const optionsD = {
    ...options,
    xaxis: {
      categories: ['D']
    }
  }

  const optionsE = {
    ...options,
    xaxis: {
      categories: ['E']
    }
  }

  const series = [
    {
      name: 'Activos',
      data: sumValid().totalValid ? [sumValid().totalValid] : []
    },
    {
      name: 'Inactivos',
      data: sumValid().totalInvalid ? [sumValid().totalInvalid] : []
    }
  ]

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts options={options} series={series} type='bar' height={80} />
        <ReactApexcharts options={optionsC} series={series} type='bar' height={80} />
        <ReactApexcharts options={optionsD} series={series} type='bar' height={80} />
        <ReactApexcharts options={optionsE} series={series} type='bar' height={80} />
      </CardContent>
    </Card>
  )
}

export default NumberUsersGraph
