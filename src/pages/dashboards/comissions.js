import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** MUI Imports
import {
  Button,
  Box,
  CardHeader,
  Typography,
  Card,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Modal
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getComissions, liquidationComisions, setOpenModal } from 'src/store/comissions'
import SnackbarAlert from 'src/views/components/snackbar/SnackbarAlert'

const COLUMNS = [
  {
    flex: 0.175,
    minWidth: 110,
    field: 'userEmail',
    headerName: 'Correo electronico',
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

const Comissions = () => {
  const dispatch = useDispatch()
  const { comissions, isLoading, openModal } = useSelector(state => state.comissions)

  const { message, open, severity } = useSelector(state => state.notifications)
  const [rowSelectionModel, setRowSelectionModel] = React.useState([])
  const [authActionModal, setAuthActionModal] = React.useState(false)
  const [AuthPasword, setAuthPassword] = React.useState('')
  const [showNotification, setShowNotification] = React.useState(open)

  React.useEffect(() => {
    dispatch(getComissions())
  }, [dispatch])

  const handleAction = () => {
    dispatch(setOpenModal(true))
  }

  React.useEffect(() => {
    setShowNotification(open)
  }, [open])

  const confirmSubmit = password => {
    console.log({ rowSelectionModel })
    dispatch(liquidationComisions({ rowsId: rowSelectionModel, password }))
  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title='Comisiones'
          action={
            <Box>
              <Button variant='contained' disabled={!rowSelectionModel.length} onClick={() => setAuthActionModal(true)}>
                Liquidar Comisiones
              </Button>
            </Box>
          }
        />
        <DataGrid
          autoHeight
          loading={isLoading}
          rows={comissions}
          columns={COLUMNS}
          pageSize={10}
          isRowSelectable={params => {
            return params.row.status != 'Comisión liquidada'
          }}
          checkboxSelection
          onSelectionModelChange={newSelection => {
            setRowSelectionModel(newSelection)
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Card>
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
