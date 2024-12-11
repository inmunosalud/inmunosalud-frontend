// ** React Import
import { useRouter } from 'next/router'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Card from '@mui/material/Card'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { Pencil } from 'mdi-material-ui'
import { closeSnackBar } from 'src/store/notifications'
import { getOrders, setUpdatedOrder } from 'src/store/orders'
import { BasicDataGrid } from 'src/views/components/data-grid/BasicDataGrid'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
const columns = [
  {
    width: 160,
    headerName: 'Fecha de compra',
    field: 'purchaseDate'
  },
  {
    minWidth: 300,
    field: 'userEmail',
    headerName: 'Usuario'
  },
  {
    width: 180,
    field: 'deliveryStatus',
    headerName: 'Estatus',
    renderCell: params => {
      if (params.row.deliveryStatus === 'Está en camino') {
        return (
          <Button
            variant='contained'
            color='info'
            size='small'
            startIcon={<LocalShippingIcon />}
            onClick={() => window.open(params.row.shipment.trackingUrl, '_blank')}
          >
            En camino
          </Button>
        )
      }
      return params.row.deliveryStatus
    }
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
    width: 140,
    field: 'type',
    headerName: 'Tipo de pago',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.type === 'store' ? 'En tienda' : 'Con tarjeta'}
      </Typography>
    )
  },
  {
    width: 240,
    field: 'paymentMethodMapped',
    headerName: 'Método de Pago',
    renderCell: params =>
      typeof params.row.paymentMethod === 'string' && params.row.paymentMethod.startsWith('http') ? (
        <Tooltip title='Descargar'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <IconButton href={params.row.paymentMethod} target='_blank' sx={{ color: 'red' }}>
              <PictureAsPdfIcon />
            </IconButton>
          </Box>
        </Tooltip>
      ) : (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.paymentMethod}
        </Typography>
      )
  }
]

const AdminOrders = () => {
  const router = useRouter()
  const dispatch = useDispatch()

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
        <BasicDataGrid isLoading={isLoading} data={ordersAll} columns={config} title='Pedidos' />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default AdminOrders
