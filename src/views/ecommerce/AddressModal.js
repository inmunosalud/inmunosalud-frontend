// ** React Imports
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
// ** MUI Imports
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import DialogContentText from '@mui/material/DialogContentText'
import { AddressList } from './AddressList'
import { addressList, createAddress, setModal } from 'src/store/address'

import Plus from 'mdi-material-ui/Plus'
import DialogAddress from '../components/dialogs/DialogAddress'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconButton } from '@mui/material'
import { Close } from 'mdi-material-ui'
import { setOpenAddressesModal } from 'src/store/cart'

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
    .length(5)
    .matches(/^[0-9]{5}/)
    .required(),
  extNumber: yup.string().required(),
  intNumber: yup.string(),
  street: yup.string().required(),
  refer: yup.string().required()
})

const AddressModal = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.session)
  const { showModal, selectedColony, isLoading } = useSelector(state => state.address)
  const { isAddressesModalOpen } = useSelector(state => state.cart)

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

  // ** Ref
  const descriptionElementRef = useRef(null)

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
    dispatch(createAddress({ body: body, uuid: user.id }))
    handleAddressClose(false)
  }

  const handleAddressClose = () => {
    dispatch(setModal(false))
    reset(defaultAddressValues)
  }

  const handleCloseModal = () => {
    dispatch(setOpenAddressesModal(false))
  }

  const handleAddAddress = () => {
    reset({})
    dispatch(setModal(true))
  }

  useEffect(() => {
    if (isAddressesModalOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isAddressesModalOpen])

  return (
    <Box>
      <Dialog
        open={isAddressesModalOpen}
        scroll='paper'
        keepMounted={false} // Prevents DOM mounting when closed
        PaperProps={{
          sx: {
            width: { xs: '90vw', md: '600px' },
            maxHeight: '90vh', // Limits dialog height
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
        onClose={handleCloseModal}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <IconButton size='small' onClick={handleCloseModal} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <DialogTitle id='scroll-dialog-title'>Direcciones</DialogTitle>
        <DialogContent
          dividers
          sx={{
            flex: 1, // Fills available space
            overflowY: 'auto' // Adds vertical scrollbar
          }}
        >
          {isLoading ? (
            <Box
              maxWidth='md'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                width: '400px'
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <AddressList />
              <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1} />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ display: 'flex' }}>
          {!isLoading && (
            <Button onClick={handleAddAddress}>
              <Plus />
              Nueva Dirección
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <DialogAddress
        openAddressCard={showModal}
        handleAddressClose={() => dispatch(setModal(false))}
        handleSubmit={handleSubmit}
        setValue={setValue}
        addressControl={addressControl}
        addressErrors={addressErrors}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

export default AddressModal
