// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

//util

const columnColors = {
  bg: '#f8d3ff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const GraphRow = ({ type, value }) => {
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
    grid: {},
    xaxis: {
      categories: [''],

      maxHeight: 100,

      labels: {
        formatter: function (val) {
          console.log(val.toFixed(1))
          return val.toFixed(1)
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
