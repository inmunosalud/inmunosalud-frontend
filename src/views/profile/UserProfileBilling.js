// ** React Imports
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Delete from 'mdi-material-ui/Delete'
import CustomSnackbar from '../components/snackbar/CustomSnackbar'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { createMethod, setModal, updateMethod, setModalDelete, deleteMethod } from 'src/store/paymentMethods'
import { closeSnackBar } from 'src/store/notifications'
import DialogBilling from '../components/dialogs/DialogBilling'

const CARD_LOGOS = {
  VISA: '/images/logos/visa.png',
  AMEX: '/images/logos/american-express.png',
  MASTERCARD: '/images/logos/mastercard.png'
}

const defaultPaymentValues = {
  alias: '',
  month: '',
  year: '',
  cardUse: '',
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
  cardUse: yup.string().required(),
  year: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo digitos')
    .min(4, 'Deben ser 4 digitos')
    .max(4, 'Deben ser 4 digitos'),
  cardNumber: yup
    .string()
    .required()
    .matches(/^[\d*]+$/, 'Solo digitos o *')
    .min(16, 'Deben ser 16 digitos')
    .max(16, 'Deben ser 16 digitos'),
  nameOnCard: yup.string().required(),
  cvc: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo digitos')
    .min(3, 'Deben ser 3 digitos')
    .max(3, 'Deben ser 3 digitos')
})

const paymentSchemaEdit = yup.object().shape({
  alias: yup.string().required(),
  month: yup.string().required(),
  year: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo digitos')
    .min(4, 'Deben ser 4 digitos')
    .max(4, 'Deben ser 4 digitos'),
  nameOnCard: yup.string().required()
})

const UserProfileBilling = ({ methods = [] }) => {
  const dispatch = useDispatch()
  // ** States

  const [editItem, setEditItem] = useState(null)
  const [deleteID, setDeleteID] = useState(null)

  const { user } = useSelector(state => state.dashboard.general)
  const { isOpen, isOpenDelete } = useSelector(state => state.paymentMethods)
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
      dispatch(deleteMethod(deleteID))
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

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader
          title='Metodos de Pago'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <Button variant='contained' onClick={handleAddCardClickOpen}>
              <Plus sx={{ mr: 1, fontSize: '1.125rem' }} />
              Agregar
            </Button>
          }
        />
        <CardContent>
          {methods.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 5,
                display: 'flex',
                borderRadius: 1,
                flexDirection: ['column', 'row'],
                justifyContent: ['space-between'],
                alignItems: ['flex-start', 'center'],
                mb: index !== methods.length - 1 ? 4 : undefined,
                border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <div>
                <img height='25' alt={item.imgAlt} src={CARD_LOGOS[item.cardcardUse]} />
                <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 500 }}>{item.alias}</Typography>
                </Box>
                <Typography variant='body2'>{item.cardNumber}</Typography>
              </div>

              <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                <Button variant='outlined' sx={{ mr: 3 }} onClick={() => handleEditCardClickOpen(item)}>
                  Editar
                </Button>
                <Button onClick={() => handleModalDelete(item)}>
                  <Delete sx={{ mr: 1, fontSize: '1.125rem' }} />
                </Button>
                <Typography variant='body2' sx={{ mt: 5 }}>
                  Expira el {item.expDate}
                </Typography>
              </Box>
            </Box>
          ))}
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
