import { AccountCheckOutline, AccountCancelOutline } from 'mdi-material-ui'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import GraphRow from './GraphRow'

export const columns = [
  {
    flex: 0.125,
    field: 'firstName',
    minWidth: 80,
    headerName: 'Usuario',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.firstName}
      </Typography>
    )
  },
  {
    flex: 0.195,
    field: 'efficiency',
    minWidth: 80,
    headerName: 'Efectividad',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.efficiency}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'weight',
    minWidth: 80,
    headerName: 'Peso Cartera',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row?.portfolio?.weight}
      </Typography>
    )
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
    minWidth: 140,
    headerName: 'B',
    field: 'B',
    renderCell: params => {
      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type='B' params={params} />
        </Box>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'C',
    field: 'C',
    renderCell: params => {
      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type='C' params={params} />
        </Box>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'D',
    field: 'D',
    renderCell: params => {
      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type='D' params={params} />
        </Box>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'E',
    field: 'E',
    renderCell: params => {
      return (
        <Box sx={{ height: '80px' }}>
          <GraphRow type='E' params={params} />
        </Box>
      )
    }
  },
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
