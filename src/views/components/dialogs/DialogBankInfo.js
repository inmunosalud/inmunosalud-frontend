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
import { setBanco } from 'src/store/paymentMethods'

const BANCOS = [
  'ABC Capital',
  'American Express Bank (México)',
  'Banca Afirme',
  'Banca Mifel',
  'Banco Actinver',
  'Banco Autofin México',
  'Banco Azteca',
  'Banco Bancrea',
  'Banco Base',
  'Banco Covalto',
  'Banco Compartamos',
  'Banco Credit Suisse (México)',
  'Banco de Inversión Afirme',
  'Banco del Bajío',
  'Banco Forjadores',
  'Banco Inbursa',
  'Banco Inmobiliario Mexicano',
  'Banco Invex',
  'Banco JP Morgan',
  'Banco KEB Hana México',
  'Banco Monex',
  'Banco Multiva',
  'Banco PagaTodo',
  'Banco Regional de Monterrey',
  'Banco S3 Caceis México',
  'Banco Sabadell',
  'Banco Santander',
  'Banco Shinhan de México',
  'Banco Ve por Más',
  'BanCoppel',
  'Bank of America Mexico',
  'Bank of China Mexico',
  'Bankaool',
  'Banorte',
  'Bansí',
  'Barclays Bank México',
  'BBVA México',
  'BNP Paribas',
  'Citibanamex',
  'CIBanco',
  'Consubanco',
  'Deutsche Bank México',
  'Fundación Dondé Banco',
  'HSBC México',
  'Industrial and Commercial Bank of China',
  'Intercam Banco',
  'Mizuho Bank',
  'MUFG Bank Mexico',
  'Nu',
  'Scotiabank'
]

export default function DialogBankInfo({
  isOpen = false,
  onHandleEditCardClose = () => {},
  bankInfoControl = {},
  bankInfoErrors = {},
  handleSubmit = () => {},
  onBankInfoSubmit = () => {}
}) {
  const dispatch = useDispatch()
  const handleBankSelected = value => {
    dispatch(setBanco(value))
  }
  const { banco } = useSelector(state => state.paymentMethods)
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
                  <InputLabel id='product-label'>Banco *</InputLabel>
                  <Select
                    labelId='product-label'
                    label='Banco'
                    value={banco}
                    required={true}
                    onChange={e => handleBankSelected(e.target.value)}
                  >
                    {BANCOS.map(item => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                  {banco === '' && <FormHelperText sx={{ color: 'red' }}>Elige un banco</FormHelperText>}
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
