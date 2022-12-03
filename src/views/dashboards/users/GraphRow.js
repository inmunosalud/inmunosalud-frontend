// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

//util
const useGrapConfig =
  (network = {}) =>
  (type = '') => {
    return network[type]
  }

const columnColors = {
  bg: '#f8d3ff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const GraphRow = ({ type, params = {} }) => {
  const { network } = params?.row
  const values = useGrapConfig(network)(type)

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
      categories: [''],
      maxHeight: 100,
      labels: {
        style: {
          //   fontSize: '10px'
        }
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
    }
  }

  const series = [
    {
      name: 'Activos',
      data: [values?.valid || 1]
    },
    {
      name: 'Inactivos',
      data: [values?.invalid || 1]
    }
  ]
  return <ReactApexcharts options={options} series={series} type='bar' height={75} />
}

export default GraphRow
