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
import { Cart, CartOutline, Pencil } from 'mdi-material-ui'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
// ** Styles Import

import {
  createAddress,
  updateAddress,
  deleteAddress,
  setModal,
  getColonies,
  cleanColonies,
  selectColony,
  setMonthlyPaymentAddress
} from 'src/store/address'
import { closeSnackBar } from 'src/store/notifications'
import DialogAddress from '../components/dialogs/DialogAddress'
import FallbackSpinner from 'src/@core/components/spinner'

const defaultAddressValues = {
  street: '',
  extNumber: '',
  intNumber: '',
  neighborhood: '',
  federalEntity: '',
  zipCode: '',
  country: '',
  city: '',
  refer: ''
}

const addressSchema = yup.object().shape({
  zipCode: yup
    .string()
    .matches(/^[0-9]{4,5}$/, 'Codigo Postal Invalido')
    .required(),
  extNumber: yup.string().required(),
  intNumber: yup.string(),
  street: yup.string().required(),
  refer: yup.string().required()
})

const UserProfileAddress = () => {
  const dispatch = useDispatch()
  // ** States
  const [openAddressCard, setOpenAddressCard] = useState(false)
  const [openDeleteCard, setOpenDeleteCard] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteID, setDeleteID] = useState(null)

  const { user } = useSelector(state => state.session)
  const { open, message, severity } = useSelector(state => state.notifications)

  const { showModal, selectedColony, address, isLoading } = useSelector(state => state.address)

  const [addressItems, setAddressItems] = useState([])
  // ** Hooks
  const {
    reset,
    control: addressControl,
    handleSubmit,
    setValue,
    formState: { errors: addressErrors }
  } = useForm({
    defaultValues: defaultAddressValues,
    resolver: yupResolver(addressSchema)
  })

  const onSubmit = data => {
    let body = {
      street: data.street,
      extNumber: data.extNumber,
      intNumber: data?.intNumber,
      zipCode: data.zipCode,
      neighborhood: data.neighborhood,
      city: data.city,
      federalEntity: data.federalEntity,
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

  // Handle Edit Card dialog and get card ID
  const handleEditAddressClickOpen = addressItem => {
    setEditItem(addressItem)
    dispatch(getColonies(addressItem.zipCode)).then(colonies => {
      const neighborhood = colonies.payload.find(zipCode => zipCode.neighborhood === addressItem.neighborhood)
      dispatch(selectColony(neighborhood))
      setEditItem(prevState => ({ ...prevState, neighborhood: selectedColony }))
    })
    dispatch(setModal(true))
    reset(addressItem)
  }

  const sendDelete = () => {
    if (deleteID) {
      dispatch(deleteAddress(deleteID))
    }
    setOpenDeleteCard(false)
  }

  const handleAddressClose = () => {
    dispatch(setModal(false))
    reset(defaultAddressValues)
  }

  const handleDeleteModal = addressItem => {
    setDeleteID(addressItem.id)
    setOpenDeleteCard(true)
  }

  const handleSelectMonthlyPaymentAddress = addressItem => {
    dispatch(setMonthlyPaymentAddress(addressItem.id))
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
      {isLoading ? (
        <Card>
          <Box
            sx={{
              width: '100%',
              height: '63.5vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FallbackSpinner />
          </Box>
        </Card>
      ) : (
        Array.isArray(address) &&
        address.map(item => (
          <Card sx={{ mb: '1rem' }}>
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
                    <Button variant='outlined' onClick={() => handleEditAddressClickOpen(item)} color='primary'>
                      <Pencil sx={{ mr: 1, fontSize: '1.125rem' }} />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Eliminar' placement='top'>
                    <Button onClick={() => handleDeleteModal(item)} color='error' variant='outlined'>
                      <Delete sx={{ mr: 1, fontSize: '1.125rem' }} />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Predeterminado' placement='top'>
                    <Button variant='outlined' onClick={() => handleSelectMonthlyPaymentAddress(item)} color='info'>
                      {item.shippingAddress ? (
                        <Cart sx={{ fontSize: '1.125rem' }} />
                      ) : (
                        <CartOutline sx={{ fontSize: '1.125rem' }} />
                      )}
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
                          <TableCell>{item.street}</TableCell>
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
                          <TableCell>{item.extNumber}</TableCell>
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
                          <TableCell>{item.intNumber}</TableCell>
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
                          <TableCell>{item.neighborhood}</TableCell>
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
                          <TableCell>{item.city}</TableCell>
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
                          <TableCell>{item.federalEntity}</TableCell>
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
                          <TableCell>{item.zipCode}</TableCell>
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
                          <TableCell>{item.country}</TableCell>
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
                          <TableCell>{item.refer}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
      <DialogAddress
        openAddressCard={showModal}
        handleAddressClose={() => dispatch(setModal(false))}
        editItem={editItem}
        handleSubmit={handleSubmit}
        setValue={setValue}
        addressControl={addressControl}
        addressErrors={addressErrors}
        onSubmit={onSubmit}
      />
      <Dialog
        open={openDeleteCard}
        onClose={() => setOpenDeleteCard(false)}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 450, p: [2, 5] } }}
      >
        <DialogContent>¿Estas seguro de eliminar la dirección seleccionada?</DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 1 }} onClick={() => sendDelete()}>
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
