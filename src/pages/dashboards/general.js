import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import { Button, Box, CardHeader, Card, Typography } from '@mui/material'
import NumberUsers from 'src/views/general/NumberUsers'
import CardNumber from 'src/views/general/CardNumber'
import SalesCard from 'src/views/general/SalesCard'
import GeneralHistoryCard from 'src/views/general/GeneralHistoryCard'
import CommissionCard from 'src/views/general/CommissionCard'
import AverageEfectiveness from 'src/views/general/AverageEfectiveness'
import WalletAverage from 'src/views/general/WalletAverage'
import TableUsers from 'src/views/dashboards/users/TableUsers'
import { loadGeneralData } from 'src/store/dashboard/generalSlice'
import NumberOrders from 'src/views/general/NumberOrders'

const subtitle = 'Porcentaje de usuarios activos en el aplicación'
const getFullMonth = cutoffDate => {
  const monthNames = {
    ene: 'enero',
    feb: 'febrero',
    mar: 'marzo',
    abr: 'abril',
    may: 'mayo',
    jun: 'junio',
    jul: 'julio',
    ago: 'agosto',
    sep: 'septiembre',
    oct: 'octubre',
    nov: 'noviembre',
    dic: 'diciembre'
  }

  const [day, monthAbbr] = cutoffDate.split(' ')
  return `${day} de ${monthNames[monthAbbr.toLowerCase()] || monthAbbr}`
}
const General = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.dashboard.general)
  const dashResponse = {
    users: {
      total: 55,
      valid: 22,
      invalid: 35,
      byProfile: {
        admin: 1,
        productsAdmin: 0,
        consumerUser: 5,
        affiliatedUser: 50,
        logistics: 1,
        usersManager: 1
      },
      antiquity: '2 meses'
    },
    cutoffDate: '28 ene',
    commissions: {
      totals: {
        count: 310,
        amount: 5225
      },
      currentCutoff: {
        count: 10,
        amount: 1225
      },
      byYear: {
        2024: {
          monthly: [
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 12,
              amount: 4000
            },
            {
              count: 4,
              amount: 1200
            }
          ],
          totals: {
            count: 16,
            amount: 5200
          }
        },
        2025: {
          monthly: [
            {
              count: 10,
              amount: 3000
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            }
          ],
          totals: {
            count: 10,
            amount: 3000
          }
        }
      }
    },
    sales: {
      totals: {
        count: 310,
        amount: 22225
      },
      currentCutoff: {
        count: 10,
        amount: 2225
      },
      byYear: {
        2024: {
          monthly: [
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 12,
              amount: 6000
            },
            {
              count: 4,
              amount: 2000
            }
          ],
          totals: {
            count: 16,
            amount: 8000
          }
        },
        2025: {
          monthly: [
            {
              count: 10,
              amount: 5000
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            },
            {
              count: 0,
              amount: 0
            }
          ],
          totals: {
            count: 10,
            amount: 5000
          }
        }
      }
    },
    orders: {
      total: 0,
      currentCutoff: {
        total: 100,
        byStatus: {
          confirmingPayment: 20,
          preparingOrder: 20,
          onWay: 20,
          delivered: 20,
          cancelled: 20
        }
      },
      delivered: {
        total: 0,
        byYear: {
          2024: {
            monthly: [8, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            total: 11
          },
          2025: {
            monthly: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            total: 5
          }
        }
      }
    }
  }

  const historyData = {
    commissions: {
      title: 'Comisiones',
      categories: Object.keys(dashResponse.commissions.byYear),
      series: Object.entries(dashResponse.commissions.byYear).map(([year, data]) => ({
        year: year,
        counts: data.monthly.map(m => m.count),
        amounts: data.monthly.map(m => m.amount)
      }))
    },
    sales: {
      title: 'Ventas',
      categories: Object.keys(dashResponse.sales.byYear),
      series: Object.entries(dashResponse.sales.byYear).map(([year, data]) => ({
        year: year,
        counts: data.monthly.map(m => m.count),
        amounts: data.monthly.map(m => m.amount)
      }))
    },
    orders: {
      title: 'Pedidos Entregados',
      categories: Object.keys(dashResponse.orders.delivered.byYear),
      series: Object.entries(dashResponse.orders.delivered.byYear).map(([year, data]) => ({
        year: year,
        counts: data.monthly, // Solo counts (ejemplo: [8,3,0,...])
        amounts: [] // No hay amount en esta categoría
      }))
    },
    users: {
      title: 'Usuarios Activos',
      categories: [], // Agregar lógica si tienes datos históricos de usuarios
      series: [] // Ejemplo vacío (no hay datos mensuales en tu response actual)
    }
  }

  useEffect(() => {
    dispatch(loadGeneralData())
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader
            title='Dashboard General'
            subheader={
              <>
                Fecha de corte:{' '}
                <Typography variant='body' color='primary'>
                  {getFullMonth(dashResponse.cutoffDate)}
                </Typography>
              </>
            }
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ width: '100%' }}>
          <SalesCard data={dashResponse.sales} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ width: '100%' }}>
          <CommissionCard data={dashResponse.commissions} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberUsers data={dashResponse.users} />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberOrders data={dashResponse.orders} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Box sx={{ width: '100%' }}>
          <GeneralHistoryCard data={historyData} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default General
