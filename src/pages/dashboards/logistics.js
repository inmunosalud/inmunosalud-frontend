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
import { isDataLoaded } from 'src/store/dashboard/generalSlice'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { setModal } from 'src/store/contactus'
import ProblemFormModal from 'src/views/ecommerce/ProblemFormModal'
import { esES } from '@mui/x-data-grid/locales'

import { getLogisticsOrders } from 'src/store/orders'

const columns = [
  {
    minWidth: 180,
    field: 'date',
    headerName: 'Fecha',
    valueGetter: params => params.row.purchaseDate
  },
  {
    minWidth: 240,
    field: 'contact',
    headerName: 'Contacto',
    valueGetter: params => params.row.user.name ?? 'Sin Datos'
  },
  {
    minWidth: 240,
    field: 'address',
    headerName: 'Dirección',
    valueGetter: params => params.row.address.streetAndNumber
  },
  {
    minWidth: 240,
    field: 'colony',
    headerName: 'Colonia',
    valueGetter: params => params.row.address.colony
  },
  {
    minWidth: 130,
    field: 'city',
    headerName: 'Ciudad',
    valueGetter: params => params.row.address.city
  },
  {
    minWidth: 140,
    field: 'zipCode',
    headerName: 'Código Postal',
    valueGetter: params => params.row.address.zipCode
  },
  {
    minWidth: 120,
    field: 'state',
    headerName: 'Estado',
    valueGetter: params => params.row.address.federalEntity
  },
  {
    minWidth: 120,
    field: 'phone',
    headerName: 'Teléfono',
    valueGetter: params => params.row.user.phone ?? 'Sin Datos'
  },
  {
    minWidth: 260,
    field: 'reference',
    headerName: 'Referencia',
    valueGetter: params => params.row.address.refer
  },
  {
    minWidth: 240,
    field: 'email',
    headerName: 'Correo Electrónico',
    valueGetter: params => params.row.user.email
  }
]

const AdminLogistics = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = React.useState(5)

  const { user } = useSelector(state => state.session)
  const { users } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { logisticsOrdersAll, isLoading } = useSelector(state => state.orders)

  React.useEffect(() => {
    dispatch(getLogisticsOrders())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(isDataLoaded(true))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('im-user')
    location.reload()
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
      <Card sx={{ m: 10 }}>
        <CardHeader
          title='Pedidos'
          action={
            <>
              <Button sx={{ mr: 4 }} variant='contained' color='secondary' onClick={() => dispatch(setModal(true))}>
                Tengo un problema
              </Button>
              <Button variant='contained' onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          }
        />
        <DataGrid
          autoHeight
          loading={isLoading}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={logisticsOrdersAll}
          disableColumnMenu={true}
          columns={columns}
          rowsPerPageOptions={[5, 10, 25]}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          components={{
            Toolbar: CustomToolbar
          }}
        />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      <ProblemFormModal />
    </>
  )
}

AdminLogistics.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AdminLogistics
