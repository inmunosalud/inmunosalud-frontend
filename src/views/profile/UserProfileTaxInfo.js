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

import { createTaxInfo, updateTaxInfo } from 'src/store/billing'
import { closeSnackBar } from 'src/store/notifications'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

const defaultFiscalInfoValues = {
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

const fiscalInfoSchema = yup.object().shape({
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
  const [fiscalInfoIsEmpty, setFiscalInfoIsEmpty] = useState(true)
  const [modal, setModal] = useState(false)
  const [type, setType] = useState(null)
  const [colonies, setColonies] = useState([])

  const { user } = useSelector(state => state.session)
  const { commissionInvoice, orderInvoice } = useSelector(state => state.billing)
  const { open, message, severity } = useSelector(state => state.notifications)

  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: defaultFiscalInfoValues,
    resolver: yupResolver(fiscalInfoSchema)
  })

  const onFiscalInfoSubmit = values => {
    const body = {
      ...values
    }
    if (type === 'commission') {
      dispatch(
        commissionInvoice
          ? createTaxInfo({ body, uuid: user.id })
          : updateTaxInfo({ body, uuid: user.id, taxInfoId: commissionInvoice?.id })
      )
    } else if (type === 'order') {
      dispatch(
        orderInvoice
          ? createTaxInfo({ body, uuid: user.id })
          : updateTaxInfo({ body, uuid: user.id, taxInfoId: orderInvoice?.id })
      )
    }
    handleEditFiscalInfoClose()
  }

  const handleEditFiscalInfoClickOpen = type => {
    if (type === 'commission') reset(commissionInvoice || defaultFiscalInfoValues)
    if (type === 'order') reset(orderInvoice || defaultFiscalInfoValues)
    setType(type)
    setModal(true)
  }

  const handleEditFiscalInfoClose = () => {
    reset(defaultFiscalInfoValues)
    setModal(false)
  }

  useEffect(() => {
    if (colonies.length > 0) {
      setValue('city', colonies[0].city)
      setValue('federalEntity', colonies[0].federalEntity)
    } else {
      setValue('city', '')
      setValue('federalEntity', '')
    }
  }, [colonies, setValue])

  const DialogFiscalInfo = () => (
    <Dialog
      open={modal}
      onClose={handleEditFiscalInfoClose}
      aria-labelledby='edit-fiscal-info-dialog'
      fullWidth
      maxWidth='lg'
    >
      <DialogTitle id='edit-fiscal-info-dialog'>
        {type === 'commission'
          ? commissionInvoice
            ? 'Editar factura de comisiones'
            : 'Crear factura de comisiones'
          : orderInvoice
            ? 'Editar factura de ordenes'
            : 'Crear factura de ordenes'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onFiscalInfoSubmit)}>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography variant='h5' align='center'>
                    {'Información personal'}
                  </Typography>
                  <Typography variant='body2' align='center' mb={2}>
                    {'Checa que estos datos sean igual a tu constancia de situación fiscal'}
                  </Typography>
                </Grid>
                {/* RFC */}
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='rfc'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          label={'RFC*'}
                          value={value}
                          onInput={e => {
                            e.target.value = e.target.value.toUpperCase()
                            onChange(e)
                          }}
                          type='text'
                          error={!!error}
                          helperText={error ? error.message : ' '}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* CURP */}
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='curp'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'CURP*'}
                          value={value}
                          onChange={onChange}
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {/* Domicilio Fiscal */}
                <Grid item xs={12} md={12}>
                  <Typography variant='h5' align='center'>
                    {'Domicilio Fiscal'}
                  </Typography>
                  <Typography variant='body2' align='center' mb={2}>
                    {'Checa que estos datos sean igual a tu constancia de situación fiscal'}
                  </Typography>
                </Grid>
                {/* Código Postal */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='zipCode'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'Código Postal*'}
                          value={value}
                          onChange={onChange}
                          onBlur={e => onZipCodeChange(e.target.value, null, setColonies)}
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* Calle */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='calle'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'Calle*'}
                          value={value}
                          onChange={onChange}
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* Número */}
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <Controller
                      name='numeroExt'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'Núm. ext*'}
                          value={value}
                          onChange={onChange}
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <Controller
                      name='numeroInt'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'Núm. int'}
                          value={value}
                          onChange={onChange}
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* Colonia */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='neighborhood'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          select
                          disabled={colonies.length === 0}
                          value={value}
                          label={'Colonias*'}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : ' '}
                        >
                          {colonies?.map((item, id) => (
                            <MenuItem key={id} value={item.colony}>
                              {item.colony}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </FormControl>
                </Grid>

                {/* Ciudad */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='city'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'Ciudad*'}
                          value={value}
                          onChange={onChange}
                          type='text'
                          InputLabelProps={{
                            shrink: colonies.length > 0
                          }}
                          disabled
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* Estado */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='federalEntity'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'Estado*'}
                          value={value}
                          onChange={onChange}
                          type='text'
                          InputLabelProps={{
                            shrink: colonies.length > 0
                          }}
                          disabled
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={0} mx='auto' alignItems='center' sx={{ justifyContent: 'flex-end' }}>
              <Grid item xs={1.15} md={3}></Grid>
              <Grid item xs={10.85} md={6}>
                <Typography align='center' variant='body1' mb={10} mt={10} style={{ fontWeight: 'bold' }}>
                  {type === 'commission'
                    ? 'Estos datos se requieren para generar tu comprobante al momento de pagar las comisiones, asegúrate que la información sea correcta.'
                    : 'Estos datos se requieren para generar el comprobante de tus compras, asegúrate que la información sea correcta.'}
                </Typography>
              </Grid>
              <Grid item xs={0} md={3}></Grid>

              <Grid item xs={1.15} md={4}></Grid>
              <Grid item xs={10.85} md={4}>
                <Button type='submit' variant='contained' sx={{ width: '100%' }}>
                  Guardar
                </Button>
              </Grid>
              <Grid item xs={0} md={4}></Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Dialog>
  )

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
              <Typography variant='body1'>{commissionInvoice?.rfc}</Typography>
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
                {commissionInvoice &&
                  `${commissionInvoice?.street} ${commissionInvoice?.extNumber}, ${commissionInvoice?.neighborhood}, ${commissionInvoice?.city}, ${commissionInvoice?.state}, CP ${commissionInvoice?.zipCode}`}
              </Typography>
            </div>

            <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
              <Button
                variant='contained'
                sx={{ mr: 3 }}
                onClick={() => handleEditFiscalInfoClickOpen('commission')}
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
              <Typography variant='body1'>{orderInvoice?.rfc}</Typography>
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
                {orderInvoice &&
                  `${orderInvoice?.street} ${orderInvoice?.extNumber}, ${orderInvoice?.neighborhood}, ${orderInvoice?.city}, ${orderInvoice?.state}, CP ${orderInvoice?.zipCode}`}
              </Typography>
            </div>

            <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
              <Button
                variant='contained'
                sx={{ mr: 3 }}
                onClick={() => handleEditFiscalInfoClickOpen('order')}
                color='primary'
              >
                {!orderInvoice ? 'Agregar' : 'Editar'}
              </Button>
            </Box>
          </Box>
        </CardContent>

        <DialogFiscalInfo />
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default UserProfileTaxInfo
