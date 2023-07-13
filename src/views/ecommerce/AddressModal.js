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
import DialogContentText from '@mui/material/DialogContentText'
import { AddressList } from './AddressList'
import { addressList, createAddress, setModal } from 'src/store/address'

import Plus from 'mdi-material-ui/Plus'
import DialogAddress from '../components/dialogs/DialogAddress'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconButton } from '@mui/material'
import { Close } from 'mdi-material-ui'

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
  zipCode: yup
    .string()
    .length(5)
    .matches(/^[0-9]{5}/)
    .required(),
  extNumber: yup.string().required(),
  intNumber: yup.string(),
  federalEntity: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  country: yup.string().required(),
  refer: yup.string().required()
})

const AddressModal = ({ open = false, onClose = () => {} }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.dashboard.general)
  const { showModal } = useSelector(state => state.address)

  const {
    reset,
    control: addressControl,
    handleSubmit,
    formState: { errors: addressErrors }
  } = useForm({
    defaultValues: defaultAddressValues,
    resolver: yupResolver(addressSchema)
  })

  // ** Ref
  const descriptionElementRef = useRef(null)

  const onSubmit = data => {
    dispatch(createAddress({ body: data, uuid: user.id }))
    handleAddressClose(false)
  }

  const handleAddressClose = () => {
    dispatch(setModal(false))
    reset(defaultAddressValues)
  }

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  useEffect(() => {
    if (!user?.id) return
    dispatch(addressList(user.id))
  }, [dispatch])

  return (
    <div className='demo-space-x'>
      <Dialog
        open={open}
        scroll='paper'
        maxWidth='md'
        onClose={onClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <DialogTitle id='scroll-dialog-title'>Direcciones</DialogTitle>
        <DialogContent dividers={'paper'}>
          <AddressList />
          <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1} />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => dispatch(setModal(true))}>
            <Plus />
            Nueva
          </Button>
          <Button onClick={onClose}>Confirmar</Button>
        </DialogActions>
      </Dialog>
      <DialogAddress
        openAddressCard={showModal}
        handleAddressClose={() => dispatch(setModal(false))}
        handleSubmit={handleSubmit}
        addressControl={addressControl}
        addressErrors={addressErrors}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AddressModal
