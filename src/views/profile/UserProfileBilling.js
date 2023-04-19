// ** React Imports
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'

// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'
import Delete from 'mdi-material-ui/Delete'
import CustomSnackbar from '../components/snackbar/CustomSnackbar'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { createMethod , setModal, updateMethod, setModalDelete, deleteMethod} from 'src/store/paymentMethods'
import { closeSnackBar } from 'src/store/notifications'

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
  .matches(/^[\d*]+$/, "Solo digitos o *")
  .min(16, "Deben ser 16 digitos")
  .max(16, "Deben ser 16 digitos"),
  nameOnCard: yup.string().required(),
  cvc: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Solo digitos')
    .min(3, 'Deben ser 3 digitos')
    .max(3, 'Deben ser 3 digitos')
})

const UserProfileBilling = ({ methods = [] }) => {
  const dispatch = useDispatch()
  // ** States

  const [editItem, setEditItem] = useState(null)
  const [deleteID, setDeleteID] = useState(null)

  const { user } = useSelector(state => state.session)
  const { isOpen, isOpenDelete } = useSelector(state => state.paymentMethods)
  const { open, message, severity } = useSelector(state => state.notifications)
  const {
    reset,
    control: paymentControl,
    handleSubmit,
    formState: { errors: paymentErrors , isSubmitting}
  } = useForm({
    defaultValues: defaultPaymentValues,
    resolver: yupResolver(paymentSchema)
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
      month: item.expDate.split("/")[0],
      year: item.expDate.split("/")[1],
      cardUse: item.cardUse,
      nameOnCard: item.nameOnCard,
      cardNumber: item.cardNumber,
      cvc: item.cvc
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

  const handleModalDelete = (method) => {
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

        <Dialog
          open={isOpen}
          onClose={handleEditCardClose}
          aria-labelledby='user-view-billing-edit-card'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
          aria-describedby='user-view-billing-edit-card-description'
        >
          <DialogTitle id='user-view-billing-edit-card' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            {editItem && Object.keys(editItem).length ?  "Editar Metodo de Pago": "Nuevo Metodo de Pago"}
          </DialogTitle>
          <DialogContent style={{paddingTop: "5px"}}>
            <form key={1} onSubmit={handleSubmit(onPaymentSubmit)}>
              <Grid container spacing={5}>
                  {!isFormEditing ? (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='alias'
                        control={paymentControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Alias'
                            onChange={onChange}
                            placeholder='Alias'
                            error={Boolean(paymentErrors['alias'])}
                            aria-describedby='stepper-linear-payment-alias'
                          />
                        )}
                      />
                      {paymentErrors['alias'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-alias'>
                          El campo es requerido
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                ): null}
                

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='stepper-linear-payment-country'
                      error={Boolean(paymentErrors.country)}
                      htmlFor='stepper-linear-payment-country'
                    >
                      MM
                    </InputLabel>
                    <Controller
                      name='month'
                      control={paymentControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='MM'
                          onChange={onChange}
                          error={Boolean(paymentErrors.month)}
                          labelId='stepper-linear-payment-month'
                          aria-describedby='stepper-linear-payment-month-helper'
                        >
                          <MenuItem value='01'>01</MenuItem>
                          <MenuItem value='02'>02</MenuItem>
                          <MenuItem value='03'>03</MenuItem>
                          <MenuItem value='04'>04</MenuItem>
                          <MenuItem value='05'>05</MenuItem>
                          <MenuItem value='06'>06</MenuItem>
                          <MenuItem value='07'>07</MenuItem>
                          <MenuItem value='08'>08</MenuItem>
                          <MenuItem value='09'>09</MenuItem>
                          <MenuItem value='10'>10</MenuItem>
                          <MenuItem value='11'>11</MenuItem>
                          <MenuItem value='12'>12</MenuItem>
                        </Select>
                      )}
                    />
                    {paymentErrors.month && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-month-helper'>
                        El campo es requerido
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='year'
                      control={paymentControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='AAAA'
                          onChange={onChange}
                          placeholder='AAAA'
                          error={Boolean(paymentErrors['year'])}
                          aria-describedby='stepper-linear-payment-year'
                        />
                      )}
                    />
                    {paymentErrors['year'] && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-year'>
                        {paymentErrors['year'] ? paymentErrors['year'].message : 'El campo es requerido'}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {!isFormEditing ? (
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <Controller
                      name="cardNumber"
                      control={paymentControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Numero de la tarjeta"
                          onChange={onChange}
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          error={Boolean(paymentErrors['cardNumber'])}
                          aria-describedby="stepper-linear-payment-cardNumber"                          
                        />
                      )}
                    />
                    {paymentErrors['cardNumber'] && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-cardNumber'>
                        {paymentErrors['cardNumber'] ? paymentErrors['cardNumber'].message : 'El campo es requerido'}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                ): null}
                
                {!isFormEditing ? (
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <Controller
                        name='cvc'
                        control={paymentControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='CVV'
                            onChange={onChange}
                            placeholder='000'
                            error={Boolean(paymentErrors['cvc'])}
                            aria-describedby='stepper-linear-payment-cvc'
                          />
                        )}
                      />
                      {paymentErrors['cvc'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-cvc'>
                          {paymentErrors['cvc'] ? paymentErrors['cvc'].message : 'El campo es requerido'}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                ): null}
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='nameOnCard'
                      control={paymentControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Titular de la tarjeta'
                          onChange={onChange}
                          placeholder='Titular de la tarjeta'
                          error={Boolean(paymentErrors['nameOnCard'])}
                          aria-describedby='stepper-linear-payment-nameOnCard'
                        />
                      )}
                    />
                    {paymentErrors['nameOnCard'] && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-nameOnCard'>
                        El campo es requerido
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {!isFormEditing ? (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='stepper-linear-payment-country'
                      error={Boolean(paymentErrors.country)}
                      htmlFor='stepper-linear-payment-country'
                    >
                      Tipo
                    </InputLabel>
                    <Controller
                      name='cardUse'
                      control={paymentControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='Tipo'
                          onChange={onChange}
                          error={Boolean(paymentErrors.cardUse)}
                          labelId='stepper-linear-payment-cardUse'
                          aria-describedby='stepper-linear-payment-cardUse-helper'
                        >
                          <MenuItem value='Cobro'>Cobro</MenuItem>
                          <MenuItem value='Pago'>Pago</MenuItem>
                        </Select>
                      )}
                    />
                    {paymentErrors.cardUse && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-cardUse-helper'>
                        El campo es requerido
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                ) : null}
                
                </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button variant='contained' sx={{ mr: 1 }} type="submit">
                  Agregar
              </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditCardClose}>
                  Cancelar
                </Button>
              </Grid>
              
            </form>
          </DialogContent>
          
        </Dialog>
      </Card>
      <Dialog
        open={isOpenDelete}
        onClose={handleCloseModal}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 450, p: [2, 5] } }}
      >
        <DialogContent>Seguro de eliminar el metodo seleccionado?</DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 1 }} onClick={sendDelete}>
                Agregar
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
