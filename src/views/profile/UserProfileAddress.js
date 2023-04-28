// ** React Imports
import { Fragment, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LinearProgress from '@mui/material/LinearProgress'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Delete from 'mdi-material-ui/Delete'


// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'


import { createAddress, updateAddress, deleteAddress } from 'src/store/address'
import { closeSnackBar } from 'src/store/notifications'
import { FormHelperText } from '@mui/material'

const defaultAddressValues = {
  street: '',
  extNumber: '',
  intNumber: '',
  colony: '',
  federalEntity: '',
  zipCode: '',
  country: '',
  city: '',
  refer: ''
}

const addressSchema = yup.object().shape({
  colony: yup.string().required(),
  zipCode: yup.string().length(5).matches(/^[0-9]{5}/).required(),
  extNumber: yup.string().required(),
  intNumber: yup.string(),
  federalEntity: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  country: yup.string().required(),
  refer: yup.string().required()
})

const UserProfileAddress = ({ addresses = [] }) => {
  const dispatch = useDispatch()
  // ** States
  const [openAddressCard, setOpenAddressCard] = useState(false)
  const [openDeleteCard, setOpenDeleteCard] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteID, setDeleteID] = useState(null)

  const { user } = useSelector(state => state.session)
  const { open, message, severity } = useSelector(state => state.notifications)

  // ** Hooks
  const {
    reset,
    control: addressControl,
    handleSubmit,
    formState: { errors: addressErrors }
  } = useForm({
    defaultValues: defaultAddressValues,
    resolver: yupResolver(addressSchema)
  })


  const onSubmit = (data) => {
    if (editItem && Object.keys(editItem).length) {
      dispatch(updateAddress({ body: data }))
    } else {
      dispatch(createAddress({ body: data, uuid: user.id }))
    }
    handleAddressClose(false)
  }

  // Handle Edit Card dialog and get card ID
  const handleEditAddressClickOpen = (address) => {
    setEditItem(address)
    setOpenAddressCard(true)
    reset(address)
  }

  const sendDelete = () => {
    if (deleteID) {
      dispatch(deleteAddress(deleteID))
    }
  }

  const handleAddAddressClickOpen = () => {
    setOpenAddressCard(true)
  }

  const handleAddressClose = () => {
    setOpenAddressCard(false)
    reset(defaultAddressValues)
  }

  const handleDeleteModal = (address) => {
    console.log({address});
    setDeleteID(address?.id)
    setOpenDeleteCard(true)
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader
          title='Direcciones'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <Button variant='contained' onClick={handleAddAddressClickOpen}>
              <Plus sx={{ mr: 1, fontSize: '1.125rem' }} />
              Agregar
            </Button>
          }
        />
      </Card>
      {addresses.length
        ? addresses.map(address => (
            <Card key={address.id} sx={{margin: "20px 0px"}}>
              <CardHeader
                title='Direcciones'
                titleTypographyProps={{ variant: 'h6' }}
                action={
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px"
                  }}>
                  <Button variant='outlined' onClick={() => handleEditAddressClickOpen(address)}>
                    Editar
                  </Button>
                  <Button onClick={() => handleDeleteModal(address)}>
                    <Delete sx={{ mr: 1, fontSize: '1.125rem' }} />
                  </Button>
                  </div>
                }
              />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={6}>
                    <TableContainer>
                      <Table size='small' sx={{ width: '95%' }}>
                        <TableBody
                          sx={{
                            '& .MuiTableCell-root': {
                              border: 0,
                              pt: 2,
                              pb: 2,
                              pl: '0 !important',
                              pr: '0 !important',
                              '&:first-of-type': {
                                width: 148
                              }
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Calle:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.street}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Número Exterior
                              </Typography>
                            </TableCell>
                            <TableCell>{address.extNumber}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Número Interior
                              </Typography>
                            </TableCell>
                            <TableCell>{address.intNumber}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Colonia:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.colony}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <TableContainer>
                      <Table size='small'>
                        <TableBody
                          sx={{
                            '& .MuiTableCell-root': {
                              border: 0,
                              pt: 2,
                              pb: 2,
                              pl: '0 !important',
                              pr: '0 !important',
                              '&:first-of-type': {
                                width: 148
                              }
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Ciudad:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.city}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Estado:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.federalEntity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Código Postal:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.zipCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Pais:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.country}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Referencia:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.refer}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        : null}
      <Dialog
        open={openAddressCard}
        onClose={handleAddressClose}
        aria-labelledby='user-view-billing-edit-card'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-view-billing-edit-card-description'
      >
        <DialogTitle id='user-view-billing-edit-card' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          {editItem && Object.keys(editItem).length ?  "Editar Dirección": "Nuevo Dirección"}
        </DialogTitle>
        <DialogContent style={{paddingTop: "5px"}}>
          <form key={0} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5} >
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='street'
                    control={addressControl}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Calle'
                        onChange={onChange}
                        placeholder='Calle'
                        error={Boolean(addressErrors.street)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {addressErrors.street?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='extNumber'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número Exterior'
                        onChange={onChange}
                        placeholder='No. Ext'
                        error={Boolean(addressErrors.extNumber)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {addressErrors.extNumber?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='intNumber'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número Interior'
                        onChange={onChange}
                        placeholder='No. Int'
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='colony'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Colonia'
                        onChange={onChange}
                        error={Boolean(addressErrors.colony)}
                        placeholder='Colonia'
                        aria-describedby='validation-basic-colony'
                      />
                    )}
                  />
                  {addressErrors.colony && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-colony'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='city'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='tel'
                        value={value}
                        label='Ciudad'
                        onChange={onChange}
                        error={Boolean(addressErrors.city)}
                        placeholder='Ciudad'
                        aria-describedby='validation-basic-city'
                      />
                    )}
                  />
                  {addressErrors.city?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-city'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='federalEntity'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Estado'
                        onChange={onChange}
                        error={Boolean(addressErrors.federalEntity)}
                        placeholder='Entidad Federativa'
                        aria-describedby='validation-basic-state'
                      />
                    )}
                  />
                  {addressErrors.federalEntity?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-state'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='zipCode'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código Postal'
                        onChange={onChange}
                        error={Boolean(addressErrors.zipCode)}
                        placeholder='Código Postal'
                        aria-describedby='validation-basic-zipCode'
                      />
                    )}
                  />
                  {addressErrors.zipCode?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-zipCode'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='country'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='País'
                        onChange={onChange}
                        error={Boolean(addressErrors.country)}
                        placeholder='País'
                        aria-describedby='validation-basic-country'
                      />
                    )}
                  />
                  {addressErrors.country?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-country'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='refer'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Referencia'
                        onChange={onChange}
                        placeholder='Referencia. Ejemplo: "Fachada blanca, herrería negra"'
                        aria-describedby='validation-basic-reference'
                      />
                    )}
                  />
                  {addressErrors.refer?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-refer'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"center", marginTop: "20px" }}>
              <Button variant='contained' sx={{ mr: 1 }} type="submit">
                Agregar
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleAddressClose}>
                Cancelar
              </Button>
            </Grid>

          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDeleteCard}
        onClose={() => setOpenDeleteCard(false)}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 450, p: [2, 5] } }}
      >
        <DialogContent>Seguro de eliminar la direccion seleccionada?</DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 1 }} onClick={sendDelete}>
                Eliminar
              </Button>
              <Button variant='outlined' color='secondary' onClick={() => setOpenDeleteCard(false)}>
                Cancelar
              </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default UserProfileAddress
