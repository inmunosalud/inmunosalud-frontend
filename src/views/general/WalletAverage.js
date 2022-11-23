// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#32baff',
  series5: '#ffa1a1'
}

const WalletAverage = ({ title = '', subtitle = '', percentage = 0 }) => {
  //   const options = {
  //     legend: {
  //       show: true,
  //       position: 'bottom'
  //     },
  //     stroke: { width: 0 },
  //     labels: ['Operational', 'Networking', 'Hiring', 'R&D'],
  //     colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
  //     dataLabels: {
  //       enabled: true,
  //       formatter(val) {
  //         return `${parseInt(val, 10)}%`
  //       }
  //     },
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           labels: {
  //             show: true,
  //             name: {
  //               fontSize: '2rem',
  //               fontFamily: 'Montserrat'
  //             },
  //             value: {
  //               fontSize: '1rem',
  //               fontFamily: 'Montserrat',
  //               formatter(val) {
  //                 return `${parseInt(val, 10)}`
  //               }
  //             },
  //             total: {
  //               show: true,
  //               fontSize: '1.5rem',
  //               label: 'Operational',
  //               formatter() {
  //                 return '31%'
  //               }
  //             }
  //           }
  //         }
  //       }
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 992,
  //         options: {
  //           chart: {
  //             height: 380
  //           },
  //           legend: {
  //             position: 'bottom'
  //           }
  //         }
  //       },
  //       {
  //         breakpoint: 576,
  //         options: {
  //           chart: {
  //             height: 320
  //           },
  //           plotOptions: {
  //             pie: {
  //               donut: {
  //                 labels: {
  //                   show: true,
  //                   name: {
  //                     fontSize: '1.5rem'
  //                   },
  //                   value: {
  //                     fontSize: '1rem'
  //                   },
  //                   total: {
  //                     fontSize: '1.5rem'
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   }

  const options = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#32baff',
          strokeWidth: '97%',
          margin: 5 // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '22px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        gradientToColors: ['#ffa1a1'],
        shadeIntensity: 0.4,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    labels: ['Average Results']
  }
  const series = [percentage]

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={subtitle}
        subheaderTypographyProps={{ variant: 'caption', sx: { color: 'text.disabled' } }}
      />
      <CardContent
        sx={{
          '& .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-label, & .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-value':
            { fontSize: '1.2rem' }
        }}
      >
        <ReactApexcharts options={options} series={series} type='radialBar' height={350} />
      </CardContent>
    </Card>
  )
}

export default WalletAverage
