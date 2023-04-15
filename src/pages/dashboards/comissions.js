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
  DialogContentText
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getComissions, liquidationComisions, setOpenModal } from 'src/store/comissions'

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
        ${" "}{params.row.commission}
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
  const {
    comissions,
    isLoading,
    openModal,
  } = useSelector(state => state.comissions)

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  
  React.useEffect(() => {
     dispatch(getComissions())
  }, [dispatch])

  const handleAction = () => {
    dispatch(setOpenModal(true))
  }

  const confirmSubmit = () => {
    console.log({rowSelectionModel});
    dispatch(liquidationComisions(rowSelectionModel))
  }
  
  return (
    <React.Fragment>
    <Card>
      <CardHeader
        title='Comisiones'
        action={
          <Box>
            <Button variant='contained' disabled={!rowSelectionModel.length} onClick={handleAction}>Liquidar Comisiones</Button>
          </Box>
        } />
        <DataGrid
          autoHeight
          loading={isLoading}
          rows={comissions}
          columns={COLUMNS}
          pageSize={10}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setRowSelectionModel(newSelection);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      
    </Card>
      <Dialog
        maxWidth="md"
        open={openModal}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Estas seguro de liquidar las comisiones seleccionadas?.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='contained' onClick={() => dispatch(setOpenModal(false))}>Regresar</Button>
          <Button variant='contained'onClick={confirmSubmit}>Liquidar</Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  )
}

export default Comissions