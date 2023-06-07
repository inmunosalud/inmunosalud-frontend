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
      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type={4} value={params.row.efficiency} />
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
      const value = params.row?.portfolio?.weight
      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type='W' value={value} />
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
    flex: 0.175,
    minWidth: 120,
    headerName: 'Perfil',
    field: 'profile',
    renderCell: params => {
      const { row } = params

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.profile}
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
    headerName: "Nivel 1",
    field: 1,
    renderCell: params => {
      const value = getValidUsers(params.row, 1)

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
    headerName: "Nivel 2",
    field: 2,
    renderCell: params => {
      const value = getValidUsers(params.row, 2)

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
    headerName: "Nivel 3",
    field: 3,
    renderCell: params => {
      const value = getValidUsers(params.row, 3)

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
    headerName: "Nivel 4",
    field: 4,
    renderCell: params => {
      const value = getValidUsers(params.row, 4)

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
  //   headerName: 4,
  //   field: 4,
  //   renderCell: params => {
  //     return (
  //       <Box sx={{ height: '80px' }}>
  //         <GraphRow type={4} params={params} />
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
  },
  {
    flex: 0.125,
    minWidth: 140,
    field: 'balance',
    headerName: 'Saldo a favor',
    renderCell: params => {
      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          ${params.row.balance}
        </Typography>
      )
    }
  }
]
