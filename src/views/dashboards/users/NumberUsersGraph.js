// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const columnColors = {
  bg: '#f8d3ff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const NumberUsersGraph = ({ title = '', user = {} }) => {
  const { network } = user

  const sumValid = (key) => {
    let totalValid = 0
    let totalInvalid = 0
    for (const prop in network) {
      if (key === prop) {
        totalValid += network[key]?.valid ?? 0
        totalInvalid += network[key]?.invalid ?? 0
      }
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
      categories: ["nivel 1"]
    },
    fill: {
      opacity: 1
    }
  }

  const options2 = {
    ...options,
    xaxis: {
      categories: ["nivel 2"]
    }
  }

  const options3 = {
    ...options,
    xaxis: {
      categories: ["nivel 3"]
    }
  }

  const options4 = {
    ...options,
    xaxis: {
      categories: ["nivel 4"]
    }
  }

  const series = [
    {
      name: 'Activos',
      data: sumValid(1).totalValid ? [sumValid(1).totalValid] : []
    },
    {
      name: 'Inactivos',
      data: sumValid(1).totalInvalid ? [sumValid(1).totalInvalid] : []
    }
  ]

  const series2 = [
    {
      name: 'Activos',
      data: sumValid(2).totalValid ? [sumValid(2).totalValid] : []
    },
    {
      name: 'Inactivos',
      data: sumValid(2).totalInvalid ? [sumValid(2).totalInvalid] : []
    }
  ]

  const series3 = [
    {
      name: 'Activos',
      data: sumValid(3).totalValid ? [sumValid(3).totalValid] : []
    },
    {
      name: 'Inactivos',
      data: sumValid(3).totalInvalid ? [sumValid(3).totalInvalid] : []
    }
  ]
  const series4 = [
    {
      name: 'Activos',
      data: sumValid(4).totalValid ? [sumValid(4).totalValid] : []
    },
    {
      name: 'Inactivos',
      data: sumValid(4).totalInvalid ? [sumValid(4).totalInvalid] : []
    }
  ]

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h5' }}
        subheaderTypographyProps={{ variant: 'caption' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <Typography sx={{ mb: 2 }} variant="body1">
          Usuarios totales: {network?.totalUsers}
        </Typography>
        <Typography variant='body2'>
            Número de Usuarios en tu Red por nivel:
        </Typography>
        <ReactApexcharts options={options} series={series} type='bar' height={80} />
        <ReactApexcharts options={options2} series={series2} type='bar' height={80} />
        <ReactApexcharts options={options3} series={series3} type='bar' height={80} />
        <ReactApexcharts options={options4} series={series4} type='bar' height={80} />
      </CardContent>
    </Card>
  )
}

export default NumberUsersGraph
