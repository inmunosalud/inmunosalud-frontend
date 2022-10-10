// ** React Import
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Data Import
import { Checkbox, IconButton } from '@mui/material'
import { CloseCircle, Pencil } from 'mdi-material-ui'
import GraphRow from './GraphRow'

const columns = [
  {
    flex: 0.125,
    field: 'user',
    minWidth: 80,
    headerName: 'Usuario',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.user}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'intake',
    minWidth: 80,
    headerName: 'Consumo',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.intake}
      </Typography>
    )
  },
  {
    flex: 0.195,
    field: 'efectiveness',
    minWidth: 80,
    headerName: 'Efectividad',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.efectiveness}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'walletWeight',
    minWidth: 80,
    headerName: 'Peso Cartera',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.walletWeight}
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
        {params.row.score}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'commision',
    minWidth: 80,
    headerName: 'Comisión',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.commision}
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
          {params.row.performance}
        </Typography>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Estatus',
    field: 'status',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.start_date}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'B',
    field: 'b',
    renderCell: params => (
      <Box sx={{ height: '80px' }}>
        <GraphRow />
      </Box>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'C',
    field: 'c',
    renderCell: params => (
      <Box sx={{ height: '80px' }}>
        <GraphRow />
      </Box>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'D',
    field: 'd',
    renderCell: params => (
      <Box sx={{ height: '80px' }}>
        <GraphRow />
      </Box>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'E',
    field: 'e',
    renderCell: params => (
      <Box sx={{ height: '80px' }}>
        <GraphRow />
      </Box>
    )
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

const rows = [
  {
    id: 1,
    active: true,
    user: 'Miguel Valdes',
    intake: 10_540.56,
    efectiveness: 6,
    walletWeight: 50456.0,
    score: 65,
    commision: 2345.0,
    performance: 8195.56,
    status: 1,
    antiquity: '1 año',
    first_name: 'Miguel',
    last_name: 'Valdes',
    email: 'mvaldes@vainilladev.com',
    zipcode: '44128',
    start_date: '09/23/2016',
    genre: 'Femenino',
    age: '61',
    state: 'Soltero',
    status: 2,
    b: 1,
    c: 1,
    d: 1,
    e: 1
  },
  {
    id: 7,
    active: true,
    user: 'Daniel Robles',
    email: 'drobles@vainilladev.com',
    zipcode: '44128',
    start_date: '10/15/2017',
    genre: 'Masculino',
    antiquity: '1 año',

    age: '59',
    state: 'Soltero',
    status: 3,
    intake: 10_540.56,
    efectiveness: 6,
    walletWeight: 50456.0,
    score: 65,
    commision: 2345.0,
    performance: 8195.56,
    status: 1,
    b: 1,
    c: 1,
    d: 1,
    e: 1
  },
  {
    id: 11,
    active: false,
    user: 'Julio Garcia',
    antiquity: '1 año',

    email: 'jgarcia@vainilladev.com',
    zipcode: '44128',
    start_date: '06/12/2018',
    genre: 'Masculino',
    age: '30',
    state: 'Soltero',
    status: 4,
    intake: 10_540.56,
    efectiveness: 6,
    walletWeight: 50456.0,
    score: 65,
    commision: 2345.0,
    performance: 8195.56,
    status: 1,
    b: 1,
    c: 1,
    d: 1,
    e: 1
  },
  {
    id: 3,
    active: true,
    user: 'Ricardo Navarro',
    email: 'rnavarro@vainilladev.com',
    zipcode: '44128',
    start_date: '03/24/2018',
    antiquity: '1 año',

    genre: 'Masculino',
    age: '66',
    state: 'Soltero',
    status: 5,
    intake: 10_540.56,
    efectiveness: 6,
    walletWeight: 50456.0,
    score: 65,
    commision: 2345.0,
    performance: 8195.56,
    status: 1,
    b: 1,
    c: 1,
    d: 1,
    e: 1
  }
]

const TableUsers = () => {
  const [pageSize, setPageSize] = useState(7)

  return (
    <Card>
      <CardHeader title='Usuarios' />
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
    </Card>
  )
}

export default TableUsers
