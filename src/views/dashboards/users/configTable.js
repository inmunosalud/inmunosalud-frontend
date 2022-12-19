import { AccountCheckOutline, AccountCancelOutline } from 'mdi-material-ui'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import GraphRow from './GraphRow'

const useGraphConfig =
  (network = {}) =>
  (type = '') => {
    return network[type]
  }

const getValidUsers = (row, type) => {
  if (!row.network || !row.network[type]) return 0

  if (!row.network[type].valid) return 0

  return row.network[type].valid
}
const getNumber = row => {
  if (!row.efficiency) return 0

  return Number(row.efficiency.replace('%', ''))
}

export const columns = [
  {
    flex: 0.125,
    field: 'email',
    minWidth: 140,
    headerName: 'Usuario',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.email}
      </Typography>
    )
  },
  {
    flex: 0.195,
    field: 'efficiency',
    minWidth: 200,
    headerName: 'Efectividad',
    renderCell: params => {
      const value = getNumber(params.row)

      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type='E' params={value} />
        </Box>
      )
    }
  },
  {
    flex: 0.125,
    field: 'weight',
    minWidth: 200,
    headerName: 'Peso Cartera',
    renderCell: params => {
      const value = params.row?.portfolio?.weight ? params.row?.portfolio?.weight : 0
      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type='E' params={value} />
        </Box>
      )
    }
  },
  {
    flex: 0.125,
    field: 'score',
    minWidth: 80,
    headerName: 'Score',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.portfolio?.score}
      </Typography>
    )
  },

  {
    flex: 0.125,
    field: 'last',
    minWidth: 80,
    headerName: 'Comisión',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.commission?.last}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'performance',
    headerName: 'Rendimiento',
    renderCell: params => {
      const { row } = params
      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.performance}
        </Typography>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Perfil',
    field: 'profileText',
    renderCell: params => {
      const { row } = params

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.profileText}
        </Typography>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Estatus',
    field: 'valid',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.valid ? <AccountCheckOutline /> : <AccountCancelOutline />}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 80,
    headerName: 'B',
    field: 'B',
    renderCell: params => {
      const value = getValidUsers(params.row, 'B')

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {value}
        </Typography>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 80,
    headerName: 'C',
    field: 'C',
    renderCell: params => {
      const value = getValidUsers(params.row, 'C')

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {value}
        </Typography>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 80,
    headerName: 'D',
    field: 'D',
    renderCell: params => {
      const value = getValidUsers(params.row, 'D')

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {value}
        </Typography>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 80,
    headerName: 'E',
    field: 'E',
    renderCell: params => {
      const value = getValidUsers(params.row, 'E')

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {value}
        </Typography>
      )
    }
  },
  // {
  //   flex: 0.175,
  //   minWidth: 140,
  //   headerName: 'E',
  //   field: 'E',
  //   renderCell: params => {
  //     return (
  //       <Box sx={{ height: '80px' }}>
  //         <GraphRow type='E' params={params} />
  //       </Box>
  //     )
  //   }
  // },
  {
    flex: 0.125,
    minWidth: 140,
    field: 'antiquity',
    headerName: 'Antigüedad',
    renderCell: params => {
      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.antiquity}
        </Typography>
      )
    }
  }
]
