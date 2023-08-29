import * as React from 'react'
import { Controller } from 'react-hook-form'
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
  Button
} from '@mui/material'

export default function DialogBilling({
  isOpen = false,
  onHandleEditCardClose = () => {},
  editItem = null,
  isFormEditing = false,
  paymentControl = {},
  paymentErrors = {},
  handleSubmit = () => {},
  onPaymentSubmit = () => {}
}) {
  // Get the current year
  const currentYear = new Date().getFullYear()

  // Generate an array of options for the next 6 years
  const options = Array.from({ length: 6 }, (_, i) => ({
    value: currentYear + i,
    label: `${currentYear + i}`.slice(-2)
  }))

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
          {editItem && Object.keys(editItem).length ? 'Editar Método de Pago' : 'Nuevo Método de Pago'}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '5px' }}>
          <form onSubmit={handleSubmit(onPaymentSubmit)}>
            <Grid container spacing={5}>
              {isFormEditing ? null : (
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
              )}

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
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Numero de la tarjeta'
                          onChange={onChange}
                          placeholder='XXXX-XXXX-XXXX-XXXX'
                          error={Boolean(paymentErrors['cardNumber'])}
                          aria-describedby='stepper-linear-payment-cardNumber'
                          inputProps={{
                            maxLength: 16,
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
                      rules={{ required: true, min: 3, max: 4 }}
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button variant='contained' sx={{ mr: 1 }} type='submit'>
                Agregar
              </Button>
              <Button variant='outlined' color='secondary' onClick={onHandleEditCardClose}>
                Cancelar
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
