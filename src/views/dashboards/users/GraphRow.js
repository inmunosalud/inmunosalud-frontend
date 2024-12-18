// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useTheme } from '@mui/material/styles';

//util



const GraphRow = ({ type, value }) => {
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
    tooltip: {
      enabled: false
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
      enabled: false,
      style: {
        fontSize: '10px'
      }
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left'
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.background.default],
    stroke: {
      show: true,
      colors: ['transparent']
    },
    grid: {},
    xaxis: {
      categories: [''],
      maxHeight: 100,
      max: type === 4 ? 100 : null,
      tickAmount: 2,
      labels: {
        formatter: function (val) {
          return type === 4 ? `${val}%` : val.toFixed(1)
        },
      }
    },
    yaxis: {
      maxHeight: 100,
      labels: {
        fontSize: '8px'
      }
    },

    fill: {
      opacity: 1
    },
    noData: {
      text: undefined,
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '8px',
        fontFamily: undefined
      }
    }
  }

  const series = [
    {
      name: 'Activos',
      data: value ? [value] : [0]
    }
    // {
    //   name: 'Inactivos',
    //   data: invalidUsers ? [invalidUsers] : []
    // }
  ]
  return <ReactApexcharts options={options} series={series} type='bar' height={75} />
}

export default GraphRow
