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
import { deleteComission, getComissions, liquidationComisions, setOpenModal } from 'src/store/comissions'


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
    field: 'commissionLost',
    headerName: 'Comision perdida',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.comissionLost}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'commissionReal',
    headerName: 'Comision Real',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.commissionReal}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'commissionTotal',
    headerName: 'Comision Total',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.commissionTotal}
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

  const [pageSize, setPageSize] = React.useState(10)
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const [actionSelected, setActionSelected] = React.useState('')
  
  React.useEffect(() => {
     dispatch(getComissions())
  }, [])

  const handleAction = (e) => {
    const value = e.target.value
    setActionSelected(value)
    dispatch(setOpenModal(true))
  }

  const confirmSubmit = () => {
      console.log({rowSelectionModel});
    if (actionSelected === 'liquidation') {
      dispatch(liquidationComisions(rowSelectionModel))
    } else {
      dispatch(deleteComission(rowSelectionModel))
    }
  }
  
  return (
    <React.Fragment>
    <Card>
      <CardHeader
        title='Comisiones'
        action={
          <Box>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Acciones</InputLabel>
              <Select
                  disabled={!rowSelectionModel.length ? true: false}
                  sx={{width: "200px"}}
                  label="Acciones"
                  value={actionSelected}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={handleAction}
                >
                  <MenuItem value='liquidation'>Liquidar comisiones </MenuItem>
                  <MenuItem value='delete'>Eliminar comisiones</MenuItem>
                </Select>
              </FormControl>
          </Box>
        }/>
      <DataGrid
        autoHeight
        loading={isLoading}
        rows={comissions}
        columns={COLUMNS}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
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
          <Button variant='contained'onClick={confirmSubmit}>{actionSelected === "liquidar" ? "Liquidar" : "Eliminar"}</Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  )
}

export default Comissions