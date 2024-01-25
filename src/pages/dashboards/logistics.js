// ** React Import
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { Pencil } from 'mdi-material-ui'
import { Typography } from '@mui/material'
import { closeSnackBar } from 'src/store/notifications'
import { Button } from '@mui/material'

import { getOrders, setUpdatedOrder } from 'src/store/orders'

const columns = [
  {
    minWidth: 80,
    field: 'date',
    headerName: 'Fecha',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.userEmail}
      </Typography>
    )
  },
  {
    minWidth: 140,
    field: 'contact',
    headerName: 'Contacto',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.userEmail}
      </Typography>
    )
  },
  {
    minWidth: 110,
    field: 'address',
    headerName: 'Dirección',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.paymentMethodMapped}
      </Typography>
    )
  },
  {
    minWidth: 110,
    field: 'colony',
    headerName: 'Colonia',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.shipmentMapped}
      </Typography>
    )
  },
  {
    minWidth: 100,
    field: 'city',
    headerName: 'Ciudad',
    renderCell: params => {}
  },
  {
    minWidth: 20,
    maxWidth: 60,
    field: 'pc',
    headerName: 'CP',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        ${params.row.total}
      </Typography>
    )
  },
  {
    minWidth: 120,
    field: 'state',
    headerName: 'Estado',
    renderCell: params => {}
  },
  {
    minWidth: 120,
    field: 'phone',
    headerName: 'Teléfono',
    renderCell: params => {}
  },
  {
    minWidth: 160,
    field: 'reference',
    headerName: 'Referencia',
    renderCell: params => {}
  },
  {
    minWidth: 190,
    field: 'email',
    headerName: 'Correo Electrónico',
    renderCell: params => {}
  }
]

const AdminLogistics = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = React.useState(5)

  const { user } = useSelector(state => state.session)
  const { users } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { ordersAll, isLoading } = useSelector(state => state.orders)
  React.useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const handleOpenModalEdit = item => {
    dispatch(setUpdatedOrder(item))
    router.push('/ecommerce/edit-order')
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            utf8WithBom: true
          }}
        />
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Card>
        <CardHeader title='Pedidos' />
        <DataGrid
          autoHeight
          loading={isLoading}
          rows={ordersAll}
          disableColumnMenu={true}
          columns={columns}
          sx={{ width: '100%' }}
          rowsPerPageOptions={[5, 10, 25]}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          components={{
            Toolbar: CustomToolbar
          }}
        />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default AdminLogistics
