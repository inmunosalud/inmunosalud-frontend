import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** MUI Imports
import {
  Button,
  Box,
  CardHeader,
  Typography,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  Tabs,
  Tab
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getComissions, liquidationComisions, setOpenModal } from 'src/store/comissions'
import SnackbarAlert from 'src/views/components/snackbar/SnackbarAlert'
import { set } from 'nprogress'
import { getLocaleText } from 'src/configs/defaultLocaleText'

const COLUMNS = [
  {
    width: 200,
    field: 'folio',
    headerName: 'Folio'
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'userEmail',
    headerName: 'Correo electrónico',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.userEmail}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'commission',
    headerName: 'Comision',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        $ {params.row.commission}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'status',
    headerName: 'Estatus',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.status}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'generatedOn',
    headerName: 'Fecha de generacion',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.generatedOn}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'liquidationDay',
    headerName: 'Fecha de liquidacion',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.liquidationDay}
      </Typography>
    )
  }
]

const COMMISSION_STATUS_SP = {
  confirming: 'Confirmando',
  liquidate: 'Comisión liquidada',
  pendingPayment: 'Pago pendiente',
  cancelled: 'Comisión cancelada'
}

const Comissions = () => {
  const dispatch = useDispatch()
  const { comissions, isLoading, openModal } = useSelector(state => state.comissions)

  const { message, open, severity } = useSelector(state => state.notifications)
  const [rowSelectionModel, setRowSelectionModel] = React.useState([])
  const [authActionModal, setAuthActionModal] = React.useState(false)
  const [AuthPasword, setAuthPassword] = React.useState('')
  const [showNotification, setShowNotification] = React.useState(open)
  const [pendingPaymentComissions, setPendingPaymentComissions] = React.useState([])
  const [confirmingComissions, setConfirmingComissions] = React.useState([])
  const [finishedComissions, setFinishedComissions] = React.useState([])
  const [tabValue, setTabValue] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(5)

  React.useEffect(() => {
    dispatch(getComissions())
  }, [dispatch])

  React.useEffect(() => {
    setPendingPaymentComissions([])
    setConfirmingComissions([])
    setFinishedComissions([])

    if (typeof comissions === 'object' && comissions !== null) {
      Object.values(comissions).forEach(comissionArray => {
        comissionArray.forEach(comission => {
          switch (comission.status) {
            case COMMISSION_STATUS_SP.pendingPayment:
              setPendingPaymentComissions(prevState => [...prevState, comission])
              break
            default:
              if (comission.status.includes(COMMISSION_STATUS_SP.confirming)) {
                setConfirmingComissions(prevState => [...prevState, comission])
              } else {
                setFinishedComissions(prevState => [...prevState, comission])
              }
              break
          }
        })
      })
    }
  }, [comissions])

  const handleAction = () => {
    dispatch(setOpenModal(true))
  }

  React.useEffect(() => {
    setShowNotification(open)
  }, [open])

  const confirmSubmit = password => {
    dispatch(liquidationComisions({ rowsId: rowSelectionModel, password }))
  }

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <React.Fragment>
      <Tabs value={tabValue} onChange={handleChangeTab} centered>
        <Tab label={COMMISSION_STATUS_SP.confirming} />
        <Tab label={COMMISSION_STATUS_SP.pendingPayment} />
        <Tab label='Finalizadas' />
      </Tabs>
      <Box mt={5}>
        <Card>
          <CardHeader
            title='Comisiones'
            action={
              tabValue === 1 ? (
                <Box>
                  <Button
                    variant='contained'
                    size='small'
                    disabled={!rowSelectionModel.length}
                    onClick={() => setAuthActionModal(true)}
                  >
                    Liquidar Comisiones
                  </Button>
                </Box>
              ) : null
            }
          />
          <DataGrid
            autoHeight
            loading={isLoading}
            rows={
              tabValue === 0 ? confirmingComissions : tabValue === 1 ? pendingPaymentComissions : finishedComissions
            }
            columns={COLUMNS}
            checkboxSelection={tabValue === 1}
            onSelectionModelChange={newSelection => {
              setRowSelectionModel(newSelection)
            }}
            rowSelectionModel={rowSelectionModel}
            rowsPerPageOptions={[5, 10, 25]}
            pageSize={pageSize}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Box>
      {showNotification && (
        <SnackbarAlert severity={severity} isOpen={showNotification} message={message}></SnackbarAlert>
      )}

      <Dialog open={authActionModal}>
        <DialogTitle>Confirmar Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>Para poder liquidar las comisiones es necesario escribir su contraseña</DialogContentText>
          <TextField
            onChange={e => setAuthPassword(e.target.value)}
            fullWidth
            label='Contraseña'
            autoFocus={true}
            type='password'
            variant='standard'
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuthActionModal(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              setAuthActionModal(false)
              confirmSubmit(AuthPasword)
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Comissions
