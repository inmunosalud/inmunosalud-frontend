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

const columns = [
  {
    flex: 0.125,
    field: 'first_name',
    minWidth: 80,
    headerName: 'Nombre',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.first_name}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'last_name',
    minWidth: 80,
    headerName: 'Apellido',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.last_name}
      </Typography>
    )
  },
  {
    flex: 0.195,
    field: 'email',
    minWidth: 80,
    headerName: 'Correo',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.email}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'zipcode',
    minWidth: 80,
    headerName: 'Códigos Postal',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.zipcode}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'genre',
    minWidth: 80,
    headerName: 'Género',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.genre}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'state',
    minWidth: 80,
    headerName: 'Estado Civil',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.state}
      </Typography>
    )
  },

  {
    flex: 0.1,
    minWidth: 90,
    field: 'is_active',
    headerName: 'Activo',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={row.active} />
        </Box>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Registrado',
    field: 'start_date',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.start_date}
      </Typography>
    )
  },

  {
    flex: 0.125,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    renderCell: params => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton aria-label='capture screenshot'>
            <Pencil color='success' />
          </IconButton>
          <IconButton aria-label='capture screenshot'>
            <CloseCircle color='error' />
          </IconButton>
        </Box>
      )
    }
  }
]

const rows = [
  {
    id: 1,
    active: true,
    first_name: 'Miguel',
    last_name: 'Valdes',
    email: 'mvaldes@vainilladev.com',
    zipcode: '44128',
    start_date: '09/23/2016',
    genre: 'Femenino',
    age: '61',
    state: 'Soltero',
    status: 2
  },
  {
    id: 7,
    active: true,
    first_name: 'Daniel',
    last_name: 'Robles',
    email: 'drobles@vainilladev.com',
    zipcode: '44128',
    start_date: '10/15/2017',
    genre: 'Masculino',
    age: '59',
    state: 'Soltero',
    status: 3
  },
  {
    id: 11,
    active: false,
    first_name: 'Julio',
    last_name: 'Garcia',
    email: 'jgarcia@vainilladev.com',
    zipcode: '44128',
    start_date: '06/12/2018',
    genre: 'Masculino',
    age: '30',
    state: 'Soltero',
    status: 4
  },
  {
    id: 3,
    active: true,
    first_name: 'Ricardo',
    last_name: 'Navarro',
    email: 'rnavarro@vainilladev.com',
    zipcode: '44128',
    start_date: '03/24/2018',
    genre: 'Masculino',
    age: '66',
    state: 'Soltero',
    status: 5
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
