// ** React Import
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { DataGrid } from '@mui/x-data-grid'
import { Pencil } from 'mdi-material-ui'
import { Typography } from '@mui/material'
import { closeSnackBar } from 'src/store/notifications'

import { getOrders, setUpdatedOrder } from 'src/store/orders'

const columns = [
  {
    minWidth: 180,
    field: 'c',
    headerName: 'Usuario',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.userEmail}
      </Typography>
    )
  },
  {
    minWidth: 110,
    field: 'paymentMethodMapped',
    headerName: 'Método de Pago',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.paymentMethodMapped}
      </Typography>
    )
  },
  {
    minWidth: 110,
    field: 'shipmentMapped',
    headerName: 'Envio',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.shipmentMapped}
      </Typography>
    )
  },
  {
    minWidth: 100,
    field: 'totalProducts',
    headerName: 'Productos',
    renderCell: params => {}
  },
  {
    minWidth: 140,
    field: 'total',
    headerName: 'Total del pedido',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        ${params.row.total}
      </Typography>
    )
  },
  {
    minWidth: 180,
    field: 'deliveryStatus',
    headerName: 'Estatus de envio',
    renderCell: params => {}
  },
  {
    minWidth: 180,
    headerName: 'Fecha de compra',
    field: 'purchaseDate',
    renderCell: params => {}
  },
  {
    minWidth: 160,
    headerName: 'Fecha estimada de envio',
    field: 'deliveryEstimateDate',
    renderCell: params => {}
  },
  {
    minWidth: 120,
    headerName: 'Fecha de entrega',
    field: 'deliveryDate',
    renderCell: params => {}
  }
]

const AdminOrders = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.session)
  const { users } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { ordersAll } = useSelector(state => state.orders)
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
          <Pencil sx={{ margin: '5px', cursor: 'pointer' }} color='warning' onClick={() => handleOpenModalEdit(row)} />
        )
      }
    }
  ]

  return (
    <>
      <Card>
        <CardHeader title='Pedidos' />
        <DataGrid autoHeight pageSize={50} rows={ordersAll} columns={config} sx={{ width: '100%' }} />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default AdminOrders
