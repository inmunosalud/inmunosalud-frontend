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
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Delete from 'mdi-material-ui/Delete'
import { Pencil } from 'mdi-material-ui'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

import {
  createAddress,
  updateAddress,
  deleteAddress,
  setModal,
  getColonies,
  cleanColonies,
  selectColony
} from 'src/store/address'
import { closeSnackBar } from 'src/store/notifications'
import DialogAddress from '../components/dialogs/DialogAddress'

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
  zipCode: yup
    .string()
    .length(5)
    .matches(/^[0-9]{5}/)
    .required(),
  extNumber: yup.string().required(),
  intNumber: yup.string(),
  street: yup.string().required(),
  refer: yup.string().required()
})

const UserProfileAddress = ({ addresses = [] }) => {
  const dispatch = useDispatch()
  // ** States
  const [openAddressCard, setOpenAddressCard] = useState(false)
  const [openDeleteCard, setOpenDeleteCard] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteID, setDeleteID] = useState(null)

  const { user } = useSelector(state => state.dashboard.general)
  const { open, message, severity } = useSelector(state => state.notifications)

  const { showModal, selectedColony } = useSelector(state => state.address)

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

  const onSubmit = data => {
    if (selectedColony.colony != null) {
      let body = {
        street: data.street,
        extNumber: data.extNumber,
        intNumber: data?.intNumber,
        zipCode: data.zipCode,
        colony: data.colony.colony,
        city: data.colony.city,
        federalEntity: data.colony.federalEntity,
        country: 'Mexico',
        refer: data.refer
      }
      if (editItem && Object.keys(editItem).length) {
        body.id = editItem.id
        dispatch(updateAddress({ body: body }))
      } else {
        dispatch(createAddress({ body: body, uuid: user.id }))
      }
      handleAddressClose(false)
    }
  }

  // Handle Edit Card dialog and get card ID
  const handleEditAddressClickOpen = address => {
    setEditItem(address)
    dispatch(getColonies(address.zipCode)).then(colonies => {
      const colony = colonies.payload.find(zipCode => zipCode.colony === address.colony)
      dispatch(selectColony(colony))
      setEditItem(prevState => ({ ...prevState, colony: selectedColony }))
    })
    dispatch(setModal(true))
    reset(address)
  }

  const sendDelete = () => {
    if (deleteID) dispatch(deleteAddress(deleteID))
  }

  const handleAddressClose = () => {
    dispatch(setModal(false))
    reset(defaultAddressValues)
  }

  const handleDeleteModal = address => {
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
            <Button
              variant='contained'
              onClick={() => {
                setEditItem(null)
                reset({})
                dispatch(cleanColonies())
                dispatch(setModal(true))
              }}
            >
              <Plus sx={{ mr: 1, fontSize: '1.125rem' }} />
              Agregar
            </Button>
          }
        />
      </Card>
      {addresses.length
        ? addresses.map(address => (
            <Card key={address.id} sx={{ margin: '20px 0px' }}>
              <CardHeader
                title='Dirección'
                titleTypographyProps={{ variant: 'h6' }}
                action={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <Tooltip title='Editar' placement='top'>
                      <Button variant='outlined' onClick={() => handleEditAddressClickOpen(address)} color='warning'>
                        <Pencil />
                      </Button>
                    </Tooltip>
                    <Tooltip title='Eliminar' placement='top'>
                      <Button onClick={() => handleDeleteModal(address)} color='error' variant='outlined'>
                        <Delete sx={{ mr: 1, fontSize: '1.125rem' }} />
                      </Button>
                    </Tooltip>
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
                                País:
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
      <DialogAddress
        openAddressCard={showModal}
        handleAddressClose={() => dispatch(setModal(false))}
        editItem={editItem}
        handleSubmit={handleSubmit}
        addressControl={addressControl}
        addressErrors={addressErrors}
        onSubmit={onSubmit}
      />
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
