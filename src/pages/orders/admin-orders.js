// ** React Import
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid'
import { Pencil } from 'mdi-material-ui'
import { Typography } from '@mui/material'
import { closeSnackBar } from 'src/store/notifications'
import { Button } from '@mui/material'
import { esES } from '@mui/x-data-grid/locales'

import { getOrders, setUpdatedOrder } from 'src/store/orders'

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

const columns = [
  {
    width: 160,
    headerName: 'Fecha de compra',
    field: 'purchaseDate',
    renderCell: params => {}
  },
  {
    width: 200,
    field: 'c',
    headerName: 'Usuario',
    renderCell: params => params.row.userEmail
  },
  {
    width: 180,
    field: 'deliveryStatus',
    headerName: 'Estatus',
    renderCell: params => {}
  },
  {
    width: 250,
    headerName: 'Fecha estimada de envió',
    field: 'deliveryEstimateDate',
    renderCell: params => {}
  },
  {
    width: 160,
    field: 'shipmentMapped',
    headerName: 'Numero de Guía',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.shipment.id}
      </Typography>
    )
  },

  {
    width: 180,
    headerName: 'Fecha de entrega',
    field: 'deliveryDate',
    renderCell: params => {}
  },

  {
    width: 310,
    field: 'address',
    headerName: 'Dirección',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {`${params.row.address.street} ${params.row.address.extNumber}, ${params.row.address.neighborhood}, ${params.row.address.city}, ${params.row.address.federalEntity}, ${params.row.address.country}, ${params.row.address.zipCode}`}
      </Typography>
    )
  },
  {
    width: 300,
    field: 'totalProducts',
    headerName: 'Productos',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.products.map(p => `${p.product} (${p.quantity})`).join(', ')}
      </Typography>
    )
  },

  {
    width: 160,
    field: 'total',
    headerName: 'Total del pedido',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        ${params.row.total}
      </Typography>
    )
  },
  {
    width: 240,
    field: 'type',
    headerName: 'Tipo de pago',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.type}
      </Typography>
    )
  },
  {
    width: 240,
    field: 'paymentMethodMapped',
    headerName: 'Método de Pago',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {typeof params.row.paymentMethod === 'string' ? params.row.paymentMethod : ''}
      </Typography>
    )
  }
]

const AdminOrders = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = React.useState(100)

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

  const config = [
    ...columns,
    {
      minWidth: 20,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Button onClick={() => handleOpenModalEdit(row)} color='warning' size='small'>
            <Pencil />
          </Button>
        )
      }
    }
  ]

  return (
    <>
      <Card>
        <CardHeader title='Pedidos' />
        <DataGrid
          getRowHeight={() => 'auto'}
          checkboxSelection
          disableRowSelectionOnClick
          loading={isLoading}
          includeOutliers
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={ordersAll}
          disableColumnMenu={true}
          columns={config}
          rowsPerPageOptions={[5, 10, 25]}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          components={{
            Toolbar: CustomToolbar
          }}
          sx={{
            height: '67vh',
            [`& .${gridClasses.cell}`]: {
              py: 0.5
            }
          }}
        />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default AdminOrders
