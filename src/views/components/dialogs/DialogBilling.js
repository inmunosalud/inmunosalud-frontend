import * as React from 'react'
import { Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Button,
  Box
} from '@mui/material'

import { OPENPAY_ID, OPENPAY_KEY } from 'src/services/api'
import { openSnackBar, closeSnackBar } from 'src/store/notifications'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

import { setDeviceSessionId, setOpenPay } from 'src/store/paymentMethods'

export default function DialogBilling({
  isOpen = false,
  onHandleEditCardClose = () => {},
  editItem = null,
  isFormEditing = false,
  paymentControl = {},
  getValues = {},
  paymentErrors = {},
  handleSubmit = () => {},
  onPaymentSubmit = () => {}
}) {
  // Get the current year
  const currentYear = new Date().getFullYear()

  // Generate an array of options for the next 10 years
  const options = Array.from({ length: 10 }, (_, i) => ({
    value: currentYear + i,
    label: `${currentYear + i}`.slice(-2)
  }))

  const dispatch = useDispatch()
  const { open, message, severity } = useSelector(state => state.notifications)
  const [isAmex, setIsAmex] = React.useState(false)
  const [retryCount1, setRetryCount1] = React.useState(0)
  const [retryCount2, setRetryCount2] = React.useState(null)
  const MAX_RETRY = 5
  const [dataReceivedScript1, setDataReceivedScript1] = React.useState(false) // Bandera para controlar si se recibió la data
  const [dataReceivedScript2, setDataReceivedScript2] = React.useState(false) // Bandera para controlar si se recibió la data
  const [maxRetriesReached1, setMaxRetriesReached1] = React.useState(false)
  const [maxRetriesReached2, setMaxRetriesReached2] = React.useState(false)

  const setOpenPayObject = openPay => {
    dispatch(setOpenPay(openPay))
  }

  const setDeviceData = deviceSessionId => {
    dispatch(setDeviceSessionId(deviceSessionId))
  }

  React.useEffect(() => {
    const timestampInSeconds = Math.floor(Date.now() / 1000)

    const loadOpenPayScript1 = () => {
      const script1 = document.createElement('script')
      script1.src = `https://resources.openpay.mx/lib/openpay-js/1.2.38/openpay.v1.min.js?timestamp=${timestampInSeconds}`
      script1.async = false

      const onLoadScript1 = () => {
        if (!dataReceivedScript1 || !maxRetriesReached1) {
          if (
            window.OpenPay &&
            typeof window.OpenPay === 'function' &&
            window.OpenPay.setId &&
            typeof window.OpenPay.setId === 'function' &&
            window.OpenPay.setApiKey &&
            typeof window.OpenPay.setApiKey === 'function'
          ) {
            setOpenPayObject(window.OpenPay)
            setDataReceivedScript1(true)
            setRetryCount2(0)
          } else {
            console.error('OpenPay object not found or invalid', window.OpenPay)
            if (!maxRetriesReached1 && retryCount1 < MAX_RETRY) {
              setTimeout(() => {
                setRetryCount1(retryCount1 + 1)
              }, 500)
            } else {
              console.error('Exceeded maximum retry attempts')
              setMaxRetriesReached1(true)
            }
          }
        }
      }

      script1.addEventListener('load', onLoadScript1)
      document.body.appendChild(script1)

      return () => {
        script1.removeEventListener('load', onLoadScript1)
        document.body.removeChild(script1)
      }
    }

    if (!dataReceivedScript1) {
      loadOpenPayScript1()
    }
  }, [retryCount1])

  React.useEffect(() => {
    const timestampInSeconds = Math.floor(Date.now() / 1000)

    const loadOpenPayScript2 = () => {
      const script2 = document.createElement('script')
      script2.src = `https://resources.openpay.mx/lib/openpay-data-js/1.2.38/openpay-data.v1.min.js?timestamp=${timestampInSeconds}`
      script2.async = false

      const onLoadScript2 = () => {
        if (!dataReceivedScript2 || maxRetriesReached2) {
          if (
            window.OpenPay &&
            window.OpenPay.deviceData &&
            window.OpenPay.deviceData.setup &&
            typeof window.OpenPay.deviceData.setup === 'function'
          ) {
            window.OpenPay.setSandboxMode(process.env.ENVIRONMENT !== 'production')
            window.OpenPay.setId(OPENPAY_ID)
            window.OpenPay.setApiKey(OPENPAY_KEY)
            const deviceSessionId = window.OpenPay.deviceData.setup()
            if (deviceSessionId && typeof deviceSessionId === 'string') {
              setDeviceData(deviceSessionId)
              setDataReceivedScript2(true)
            } else {
              console.error('Invalid device session ID:', deviceSessionId)
              if (!maxRetriesReached2 && retryCount2 < MAX_RETRY) {
                setTimeout(() => {
                  setRetryCount2(retryCount2 + 1)
                }, 500)
              } else {
                console.error('Exceeded maximum retry attempts')
                setMaxRetriesReached2(true)
                return
              }
            }
          } else {
            console.error('OpenPay object or setup function not found or invalid')
            if (!maxRetriesReached2 && retryCount2 < MAX_RETRY) {
              setTimeout(() => {
                setRetryCount2(retryCount2 + 1)
              }, 500)
            } else {
              console.error('Exceeded maximum retry attempts')
              setMaxRetriesReached2(true)
              return
            }
          }
        }
      }

      script2.addEventListener('load', onLoadScript2)
      document.body.appendChild(script2)

      return () => {
        script2.removeEventListener('load', onLoadScript2)
        document.body.removeChild(script2)
      }
    }

    if (dataReceivedScript1) {
      loadOpenPayScript2()
    }
  }, [retryCount2])

  React.useEffect(() => {
    if (maxRetriesReached2 || maxRetriesReached1)
      dispatch(
        openSnackBar({
          open: true,
          message: 'Estamos teniendo problemas con el sistema de pago, vuelve a iniciar sesión o inténtalo mas tarde',
          severity: 'error'
        })
      )
  }, [maxRetriesReached2, maxRetriesReached1])

  const generateToken = async () => {
    const { cardNumber, nameOnCard, month, year, cvc } = getValues()
    if (
      cardNumber &&
      nameOnCard &&
      month &&
      year &&
      cvc &&
      window.OpenPay &&
      window.OpenPay.deviceData &&
      window.OpenPay.deviceData.setup
    ) {
      window.OpenPay.setSandboxMode(true)
      const deviceSessionId = window.OpenPay.deviceData.setup()
      if (deviceSessionId) {
        window.OpenPay.setId(OPENPAY_ID)
        window.OpenPay.setApiKey(OPENPAY_KEY)
        const tokenBody = {
          card_number: cardNumber,
          holder_name: nameOnCard,
          expiration_year: String(year).slice(-2),
          expiration_month: month,
          cvv2: cvc
        }

        var openpayTokenId
        const tokenPromise = new Promise((resolve, reject) => {
          window.OpenPay.token.create(
            tokenBody,
            response => {
              openpayTokenId = response.data.id
              resolve(openpayTokenId)
            },
            onError => {
              console.log('error', onError)
              reject(onError)
            }
          )
        })
        try {
          await tokenPromise
          console.log('openpayTokenId', openpayTokenId)
          console.log('deviceSessionId', deviceSessionId)
          return
        } catch (error) {
          console.log('error', error)
          return
        }
      }
    } else {
      console.log('llena todos los campos')
    }
  }

  return (
    <Card>
      <Dialog
        open={isOpen}
        onClose={onHandleEditCardClose}
        aria-labelledby='user-view-billing-edit-card'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-view-billing-edit-card-description'
      >
        <DialogTitle id='user-view-billing-edit-card' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          {editItem && Object.keys(editItem).length ? 'Editar Método de Pago' : 'Nuevo Método de Pago'}{' '}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '5px' }}>
          <form onSubmit={handleSubmit(onPaymentSubmit)}>
            <Grid container spacing={5}>
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
                  <InputLabel
                    id='stepper-linear-payment-country'
                    error={Boolean(paymentErrors.country)}
                    htmlFor='stepper-linear-payment-country'
                  >
                    YY
                  </InputLabel>
                  <Controller
                    name='year'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='AA'
                        onChange={onChange}
                        placeholder='AA'
                        error={Boolean(paymentErrors['year'])}
                        aria-describedby='stepper-linear-payment-year'
                      >
                        {options.map((year, _) => {
                          return (
                            <MenuItem key={year} value={year.value}>
                              {year.label}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {paymentErrors['year'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-payment-year'>
                      {paymentErrors['year'] ? paymentErrors['year'].message : 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {isFormEditing ? null : (
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <Controller
                      name='cardNumber'
                      control={paymentControl}
                      rules={{ required: true, min: isAmex ? 15 : 16 }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Numero de la tarjeta'
                          onChange={e => {
                            setIsAmex(e.target.value[0] == '3')
                            onChange(e)
                          }}
                          placeholder='XXXX-XXXX-XXXX-XXXX'
                          error={Boolean(paymentErrors['cardNumber'])}
                          aria-describedby='stepper-linear-payment-cardNumber'
                          inputProps={{
                            maxLength: isAmex ? 15 : 16,
                            pattern: '[0-9]*'
                          }}
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
              )}

              {isFormEditing ? null : (
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <Controller
                      name='cvc'
                      control={paymentControl}
                      rules={{ required: true, min: isAmex ? 4 : 3 }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='CVV'
                          onChange={onChange}
                          placeholder={isAmex ? '0000' : '000'}
                          error={Boolean(paymentErrors['cvc'])}
                          aria-describedby='stepper-linear-payment-cvc'
                          inputProps={{
                            maxLength: isAmex ? 4 : 3
                          }}
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
              )}

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
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
              <Box>
                <Image
                  src='/images/logos/mastercard.png'
                  alt='mastercard Logo'
                  layout='fixed'
                  width={37.5}
                  height={22.5}
                />{' '}
                <Image src='/images/logos/visa.png' alt='visa Logo' layout='fixed' width={65} height={22.5} />{' '}
                <Image
                  src='/images/logos/american-express.png'
                  alt='american express Logo'
                  layout='fixed'
                  width={75}
                  height={22.5}
                />
                <FormHelperText>Tarjetas permitidas</FormHelperText>
              </Box>
              <Box>
                {process.env.ENVIRONMENT !== 'production' && (
                  <Button sx={{ mr: '10px' }} variant='outlined' color='primary' onClick={generateToken}>
                    Generar Token
                  </Button>
                )}
                <Button variant='contained' sx={{ mr: 1 }} type='submit'>
                  Agregar
                </Button>
                <Button variant='outlined' color='secondary' onClick={onHandleEditCardClose}>
                  Cancelar
                </Button>
              </Box>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Card>
  )
}
