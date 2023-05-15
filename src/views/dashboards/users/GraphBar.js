// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useTheme } from '@mui/material/styles'

const columnColors = {
  bg: '#f8d3ff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const GraphBar = ({ title = '', series = [], categories = [] }) => {
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: [theme.palette.primary.main, columnColors.series1, columnColors.series2, columnColors.bg],
      strokeColors: ['#fff']
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    colors: [theme.palette.primary.main, columnColors.series1, columnColors.series2, columnColors.bg],
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: -10
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart'>
              <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
            </div>`
      }
    },
    xaxis: {
      categories: categories
    }
  }

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
      <ReactApexcharts type='bar' series={series} options={options}></ReactApexcharts>
    </Card>
  )
}

export default GraphBar
