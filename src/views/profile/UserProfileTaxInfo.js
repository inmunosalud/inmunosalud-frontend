import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import { MenuItem } from '@mui/material'
import { onZipCodeChange } from 'src/utils/functions'
import CircularProgress from '@mui/material/CircularProgress'
import { createTaxInfoCommission, createTaxInfoOrder, getTaxInfo } from 'src/store/users'
import { closeSnackBar } from 'src/store/notifications'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import DialogTaxInfo from '../components/dialogs/DialogTaxInfo'

const defaultTaxInfoValues = {
  rfc: '',
  curp: '',
  zipCode: '',
  street: '',
  extNumber: '',
  intNumber: '',
  neighborhood: '',
  city: '',
  state: ''
}

const taxInfoSchema = yup.object().shape({
  rfc: yup
    .string()
    .required('RFC es requerido')
    .matches(/^([A-ZÑ&]{3,4})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([A-Z\d]{2})([A\d])$/, 'RFC inválido')
    .test('exact-length', 'RFC debe tener 13 caracteres', value => value?.length === 13),
  curp: yup
    .string()
    .required('CURP es requerido')
    .matches(
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      'CURP inválido'
    )
    .test('exact-length', 'CURP debe tener 18 caracteres', value => value?.length === 18),
  zipCode: yup.string().required('Código Postal es requerido'),
  street: yup.string().required('Calle es requerida'),
  extNumber: yup.string().required('Número exterior es requerido'),
  intNumber: yup.string(),
  neighborhood: yup.string().required('Colonia es requerida'),
  city: yup.string().required('Ciudad es requerida'),
  state: yup.string().required('Estado es requerido')
})

const UserProfileTaxInfo = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [type, setType] = useState(null)
  const [colonies, setColonies] = useState([])

  const { user } = useSelector(state => state.session)
  const { commissionInvoice, orderInvoice, isLoading } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)

  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: defaultTaxInfoValues,
    resolver: yupResolver(taxInfoSchema)
  })

  const onTaxInfoSubmit = values => {
    const body = {
      curp: values.curp,
      rfc: values.rfc,
      taxAddress: {
        street: values.street,
        extNumber: values.extNumber,
        intNumber: values.intNumber || '',
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode
      }
    }
    if (type === 'commission') {
      dispatch(createTaxInfoCommission({ body, uuid: user.id }))
    } else if (type === 'order') {
      dispatch(createTaxInfoOrder({ body, uuid: user.id }))
    }
    handleEditTaxInfoClose()
  }

  const handleEditTaxInfoClickOpen = type => {
    if (type === 'commission') {
      reset({
        curp: commissionInvoice?.curp || '',
        rfc: commissionInvoice?.rfc || '',
        street: commissionInvoice?.taxAddress?.street || '',
        extNumber: commissionInvoice?.taxAddress?.extNumber || '',
        intNumber: commissionInvoice?.taxAddress?.intNumber || '',
        neighborhood: commissionInvoice?.taxAddress?.neighborhood || '',
        city: commissionInvoice?.taxAddress?.city || '',
        state: commissionInvoice?.taxAddress?.state || '',
        zipCode: commissionInvoice?.taxAddress?.zipCode || ''
      })
    }
    if (type === 'order') {
      reset({
        curp: orderInvoice?.curp || '',
        rfc: orderInvoice?.rfc || '',
        street: orderInvoice?.taxAddress?.street || '',
        extNumber: orderInvoice?.taxAddress?.extNumber || '',
        intNumber: orderInvoice?.taxAddress?.intNumber || '',
        neighborhood: orderInvoice?.taxAddress?.neighborhood || '',
        city: orderInvoice?.taxAddress?.city || '',
        state: orderInvoice?.taxAddress?.state || '',
        zipCode: orderInvoice?.taxAddress?.zipCode || ''
      })
    }

    setType(type)
    setModal(true)
  }

  const handleEditTaxInfoClose = () => {
    reset(defaultTaxInfoValues)
    setModal(false)
  }

  useEffect(() => {
    if (colonies.length > 0) {
      setValue('city', colonies[0].city)
      setValue('state', colonies[0].federalEntity)
    } else {
      setValue('city', '')
      setValue('state', '')
    }
  }, [colonies])

  useEffect(() => {
    if (type === 'order' && orderInvoice && Object.keys(orderInvoice).length) {
      onZipCodeChange(orderInvoice.taxAddress.zipCode, null, setColonies)
    } else if (type === 'commission' && commissionInvoice && Object.keys(commissionInvoice).length) {
      onZipCodeChange(commissionInvoice.taxAddress.zipCode, null, setColonies)
    }
  }, [commissionInvoice, orderInvoice, type])

  useEffect(() => {
    dispatch(getTaxInfo({ id: user.id }))
  }, [])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          minHeight: '50vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='Información para recibir tus comisiones' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Box
            sx={{
              p: 5,
              display: 'flex',
              borderRadius: 1,
              flexDirection: ['column', 'row'],
              justifyContent: ['space-between'],
              alignItems: ['flex-start', 'center'],
              mb: 12,
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <div>
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>RFC: </Typography>
              </Box>
              <Typography variant='body2'>{commissionInvoice?.rfc}</Typography>
              <Divider />
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>CURP:</Typography>
              </Box>
              <Typography variant='body2'>{commissionInvoice?.curp}</Typography>
              <Divider />
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>Dirección:</Typography>
              </Box>
              <Typography variant='body2'>
                {Object.keys(commissionInvoice || {}).length > 0 &&
                  `${commissionInvoice?.taxAddress?.street} ${commissionInvoice?.taxAddress?.extNumber}, ${commissionInvoice?.taxAddress?.neighborhood}, ${commissionInvoice?.taxAddress?.city}, ${commissionInvoice?.taxAddress?.state}, CP ${commissionInvoice?.taxAddress?.zipCode}`}
              </Typography>
            </div>

            <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
              <Button
                variant='contained'
                sx={{ mr: 3 }}
                onClick={() => handleEditTaxInfoClickOpen('commission')}
                color='primary'
              >
                {!commissionInvoice ? 'Agregar' : 'Editar'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='Información para facturar tus compras' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Box
            sx={{
              p: 5,
              display: 'flex',
              borderRadius: 1,
              flexDirection: ['column', 'row'],
              justifyContent: ['space-between'],
              alignItems: ['flex-start', 'center'],
              mb: 12,
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <div>
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>RFC: </Typography>
              </Box>
              <Typography variant='body2'>{orderInvoice?.rfc}</Typography>
              <Divider />
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>CURP:</Typography>
              </Box>
              <Typography variant='body2'>{orderInvoice?.curp}</Typography>
              <Divider />
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>Dirección:</Typography>
              </Box>
              <Typography variant='body2'>
                {Object.keys(orderInvoice || {}).length > 0 &&
                  `${orderInvoice?.taxAddress?.street} ${orderInvoice?.taxAddress?.extNumber}, ${orderInvoice?.taxAddress?.neighborhood}, ${orderInvoice?.taxAddress?.city}, ${orderInvoice?.taxAddress?.state}, CP ${orderInvoice?.taxAddress?.zipCode}`}
              </Typography>
            </div>

            <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
              <Button
                variant='contained'
                sx={{ mr: 3 }}
                onClick={() => handleEditTaxInfoClickOpen('order')}
                color='primary'
              >
                {!orderInvoice ? 'Agregar' : 'Editar'}
              </Button>
            </Box>
          </Box>
        </CardContent>

        <DialogTaxInfo
          open={modal}
          handleClose={handleEditTaxInfoClose}
          type={type}
          onSubmit={handleSubmit(onTaxInfoSubmit)}
          control={control}
          colonies={colonies}
          setColonies={setColonies}
        />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default UserProfileTaxInfo
