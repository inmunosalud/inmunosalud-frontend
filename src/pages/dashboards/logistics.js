// ** React Import
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses, useGridApiRef } from '@mui/x-data-grid'
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
import { BasicDataGridHistory } from 'src/views/components/data-grid/BasicDataGridHistory'
import { getOrders, setUpdatedOrder } from 'src/store/orders'

const columns = [
  {
    width: 200,
    field: 'folio',
    headerName: 'Folio'
  },
  {
    width: 200,
    field: 'date',
    headerName: 'Fecha',
    valueGetter: params => params.row.purchaseDate
  },
  {
    width: 200,
    field: 'contact',
    headerName: 'Contacto',
    valueGetter: params => params.row.user.name || 'Sin Datos'
  },
  {
    width: 150,
    field: 'address',
    headerName: 'Dirección',
    valueGetter: params => params.row.address.streetAndNumber
  },
  {
    width: 200,
    field: 'description',
    headerName: 'Descripción',
    valueGetter: params => params.row.description
  },
  {
    width: 200,
    field: 'neighborhood',
    headerName: 'Colonia',
    valueGetter: params => params.row.address.neighborhood
  },
  {
    width: 150,
    field: 'city',
    headerName: 'Ciudad',
    valueGetter: params => params.row.address.city
  },
  {
    width: 100,
    field: 'zipCode',
    headerName: 'CP',
    valueGetter: params => params.row.address.zipCode
  },
  {
    width: 100,
    field: 'state',
    headerName: 'Estado',
    valueGetter: params => params.row.address.federalEntity
  },
  {
    width: 150,
    field: 'phone',
    headerName: 'Teléfono',
    valueGetter: params => params.row.user.phone || 'Sin Datos'
  },
  {
    width: 200,
    field: 'reference',
    headerName: 'Referencia',
    valueGetter: params => params.row.address.refer
  },
  {
    width: 350,
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
    dispatch(isDataLoaded(true))
  }, [])

  const fetchData = queryParam => {
    console.log('fetchData', queryParam)
    dispatch(getLogisticsOrders(queryParam))
  }

  const handleLogout = () => {
    localStorage.removeItem('im-user')
    location.reload()
  }

  const handleOpenModalEdit = item => {
    dispatch(setUpdatedOrder(item))
    router.push('/ecommerce/edit-order-logistic')
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

  const autosizeOptions = {
    includeOutliers: true
  }

  const apiRef = React.useRef()
  React.useEffect(() => {
    if (apiRef.current) {
      apiRef.current.autosizeColumns(autosizeOptions)
    }
  }, [apiRef, autosizeOptions])

  const config = [
    {
      width: 150,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Button onClick={() => handleOpenModalEdit(row)} color='info' size='small' variant='contained'>
            Actualizar
          </Button>
        )
      }
    },
    ...columns
  ]

  return (
    <>
      <Card sx={{ m: 10 }}>
        <CardHeader
          title='Pedidos'
          action={
            <>
              {user.profile === 'Administrador General' ? (
                <Button
                  sx={{ mr: 4 }}
                  variant='contained'
                  color='primary'
                  onClick={() => router.push('/landing-page/home')}
                >
                  Volver
                </Button>
              ) : (
                <>
                  <Button sx={{ mr: 4 }} variant='contained' color='secondary' onClick={() => dispatch(setModal(true))}>
                    Tengo un problema
                  </Button>
                  <Button variant='contained' onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </>
              )}
            </>
          }
        />
        <BasicDataGridHistory
          loading={isLoading}
          data={logisticsOrdersAll}
          columns={config}
          title='Logística'
          fetchData={fetchData}
        />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      <ProblemFormModal />
    </>
  )
}

AdminLogistics.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AdminLogistics
