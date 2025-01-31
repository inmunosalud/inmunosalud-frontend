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
  Card,
  Button,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setBank } from 'src/store/paymentMethods'
import { BANKS } from 'src/configs/banks'

export default function DialogBankInfo({
  isOpen = false,
  onHandleEditCardClose = () => {},
  bankInfoControl = {},
  bankInfoErrors = {},
  handleSubmit = () => {},
  onBankInfoSubmit = () => {}
}) {
  const { bank } = useSelector(state => state.paymentMethods)
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
          {'Editar datos bancarios'}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '5px' }}>
          <form onSubmit={handleSubmit(onBankInfoSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='beneficiary'
                    control={bankInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Beneficiario'
                        onChange={onChange}
                        placeholder='Juan Lopez'
                        error={Boolean(bankInfoErrors['beneficiary'])}
                        aria-describedby='stepper-linear-bankInfo-beneficiary'
                      />
                    )}
                  />
                  {bankInfoErrors['beneficiary'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-bankInfo-clabe'>
                      {bankInfoErrors['beneficiary'].message ?? 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='clabe'
                    control={bankInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='CLABE Interbancaria'
                        onChange={onChange}
                        placeholder='XXXXXXXXXXXXXXXXXX'
                        error={Boolean(bankInfoErrors['clabe'])}
                        aria-describedby='stepper-linear-bankInfo-clabe'
                        inputProps={{
                          maxLength: 18
                        }}
                      />
                    )}
                  />
                  {bankInfoErrors['clabe'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-bankInfo-clabe'>
                      {bankInfoErrors['clabe'].message ?? 'El campo es requerido'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='bank'
                    control={bankInfoControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <React.Fragment>
                        <InputLabel id='product-label'>Banco *</InputLabel>
                        <Select labelId='product-label' label='Banco' value={value} required={true} onChange={onChange}>
                          {BANKS.map(item => (
                            <MenuItem value={item}>{item}</MenuItem>
                          ))}
                        </Select>
                      </React.Fragment>
                    )}
                  />
                  {bank === '' && <FormHelperText sx={{ color: 'red' }}>Elige un banco</FormHelperText>}
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
