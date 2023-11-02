// ** React Imports
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Script from 'next/script'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Delete from 'mdi-material-ui/Delete'
import CustomSnackbar from '../components/snackbar/CustomSnackbar'
import { Cart, CartOutline, Pencil } from 'mdi-material-ui'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import {
  createMethod,
  setModal,
  updateMethod,
  setModalDelete,
  deleteMethod,
  setMonthlyPaymentMethod,
  setDeviceSessionId,
  setOpenPay
} from 'src/store/paymentMethods'
import { closeSnackBar } from 'src/store/notifications'
import DialogBilling from '../components/dialogs/DialogBilling'
import FallbackSpinner from 'src/@core/components/spinner'

const CARD_LOGOS = {
  visa: '/images/logos/visa.png',
  amex: '/images/logos/american-express.png',
  mastercard: '/images/logos/mastercard.png'
}

const defaultPaymentValues = {
  alias: '',
  month: '',
  year: '',
  cardUse: 'Pago',
  nameOnCard: '',
  cardNumber: '',
  cvc: ''
}
const defautlPaymentEditValues = {
  alias: '',
  month: '',
  year: '',
  nameOnCard: ''
}

const paymentSchema = yup.object().shape({
  alias: yup.string().required(),
  month: yup.string().required(),
  year: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(4, 'Deben ser 4 dígitos')
    .max(4, 'Deben ser 4 dígitos'),
  cardNumber: yup
    .string()
    .required()
    .matches(/^[\d*]+$/, 'Solo dígitos o *')
    .min(15, 'Deben ser al menos 15 dígitos (solo American Express)')
    .max(16, 'Deben ser maximo 16 dígitos'),
  nameOnCard: yup.string().required(),
  cvc: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(3, 'Deben ser 3 dígitos mínimo')
    .max(4, 'Deben ser 4 dígitos máximo')
})

const paymentSchemaEdit = yup.object().shape({
  alias: yup.string().required(),
  month: yup.string().required(),
  year: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo dígitos')
    .min(4, 'Deben ser 4 dígitos')
    .max(4, 'Deben ser 4 dígitos'),
  nameOnCard: yup.string().required()
})

const UserProfileBilling = () => {
  const dispatch = useDispatch()
  // ** States

  const [editItem, setEditItem] = useState(null)
  const [deleteID, setDeleteID] = useState(null)

  const { user } = useSelector(state => state.dashboard.general)
  const { isOpen, isOpenDelete, paymentMethods, isLoading } = useSelector(state => state.paymentMethods)
  const { open, message, severity } = useSelector(state => state.notifications)
  const {
    reset,
    control: paymentControl,
    handleSubmit,
    formState: { errors: paymentErrors }
  } = useForm({
    defaultValues: editItem && Object.keys(editItem).length ? defautlPaymentEditValues : defaultPaymentValues,
    resolver: yupResolver(editItem && Object.keys(editItem).length ? paymentSchemaEdit : paymentSchema)
  })

  const isFormEditing = Boolean(editItem)

  const onPaymentSubmit = values => {
    const body = {
      ...values,
      expDate: `${values.month}/${values.year}`
    }
    if (editItem && Object.keys(editItem).length) {
      dispatch(updateMethod({ body, uuid: user.id, idPaymentMethod: editItem?.id }))
    } else {
      dispatch(createMethod({ body, uuid: user.id }))
    }
    handleEditCardClose()
  }

  // Handle Edit Card dialog and get card ID
  const handleEditCardClickOpen = item => {
    setEditItem(item)
    reset({
      alias: item.alias,
      month: item.expDate.split('/')[0],
      year: item.expDate.split('/')[1],
      nameOnCard: item.nameOnCard
    })

    dispatch(setModal(true))
  }

  const handleAddCardClickOpen = () => {
    dispatch(setModal(true))
  }

  const handleEditCardClose = () => {
    setEditItem(null)
    reset(defaultPaymentValues)
    dispatch(setModal(false))
  }

  const sendDelete = () => {
    if (deleteID) {
      dispatch(deleteMethod({ id: deleteID, uuid: user.id }))
    }
  }

  const handleModalDelete = method => {
    setDeleteID(method?.id)
    dispatch(setModalDelete(true))
  }

  const handleCloseModal = () => {
    reset(defaultPaymentValues)
    dispatch(setModalDelete(false))
  }

  const handleSelectMonthlyPaymentMethod = addressItem => {
    dispatch(setMonthlyPaymentMethod(addressItem.id))
  }

  const setOpenPayObject = openPay => {
    dispatch(setOpenPay(openPay))
  }

  const setDeviceData = deviceSessionId => {
    dispatch(setDeviceSessionId(deviceSessionId))
  }

  return (
    <Fragment>
      <Script
        src='https://resources.openpay.mx/lib/openpay-js/1.2.38/openpay.v1.min.js'
        onLoad={() => {
          setOpenPayObject(OpenPay)
        }}
      />
      <Script
        src='https://resources.openpay.mx/lib/openpay-data-js/1.2.38/openpay-data.v1.min.js'
        onLoad={() => {
          OpenPay.setSandboxMode(true)
          const deviceSessionId = OpenPay.deviceData.setup()
          setDeviceData(deviceSessionId)
        }}
      />
      <Card sx={{ mb: 6 }}>
        <CardHeader
          title='Métodos de Pago'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <Button variant='contained' onClick={handleAddCardClickOpen}>
              <Plus sx={{ mr: 1, fontSize: '1.125rem' }} />
              Agregar
            </Button>
          }
        />
        <CardContent>
          {isLoading ? (
            <FallbackSpinner />
          ) : (
            paymentMethods.map((item, index) => (
              <Box
                key={index}
                sx={{
                  p: 5,
                  display: 'flex',
                  borderRadius: 1,
                  flexDirection: ['column', 'row'],
                  justifyContent: ['space-between'],
                  alignItems: ['flex-start', 'center'],
                  mb: index !== paymentMethods.length - 1 ? 4 : undefined,
                  border: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                <div>
                  <img height='25' alt={item.imgAlt} src={CARD_LOGOS[item.cardType]} />
                  <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 500 }}>{item.alias}</Typography>
                  </Box>
                  <Typography variant='body2'>Titular: {item.nameOnCard}</Typography>
                  <Typography variant='body2'>{item.cardNumber}</Typography>
                </div>

                <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                  <Tooltip title='Editar' placement='top'>
                    <Button
                      variant='outlined'
                      sx={{ mr: 3 }}
                      onClick={() => handleEditCardClickOpen(item)}
                      color='warning'
                    >
                      <Pencil sx={{ fontSize: '1.125rem' }} />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Eliminar' placement='top'>
                    <Button
                      variant='outlined'
                      sx={{ mr: 3, fontSize: '1.125rem' }}
                      onClick={() => handleModalDelete(item)}
                      color='error'
                    >
                      <Delete sx={{ fontSize: '1.125rem' }} />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Predeterminado Pedido Mensual' placement='top'>
                    <Button variant='outlined' onClick={() => handleSelectMonthlyPaymentMethod(item)} color='error'>
                      {item.shippingPayment ? (
                        <Cart sx={{ fontSize: '1.125rem' }} />
                      ) : (
                        <CartOutline sx={{ fontSize: '1.125rem' }} />
                      )}
                    </Button>
                  </Tooltip>
                  <Typography variant='body2' sx={{ mt: 5 }}>
                    Expira el {item.expDate}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </CardContent>

        <DialogBilling
          isOpen={isOpen}
          onHandleEditCardClose={handleEditCardClose}
          editItem={editItem}
          isFormEditing={isFormEditing}
          paymentControl={paymentControl}
          paymentErrors={paymentErrors}
          onPaymentSubmit={onPaymentSubmit}
          handleSubmit={handleSubmit}
        />
      </Card>
      <Dialog
        open={isOpenDelete}
        onClose={handleCloseModal}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 450, p: [2, 5] } }}
      >
        <DialogContent>Seguro de eliminar el método seleccionado?</DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 1 }} onClick={sendDelete}>
            Eliminar
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleCloseModal}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default UserProfileBilling
