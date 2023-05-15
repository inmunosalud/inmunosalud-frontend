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

export default function DialogBankInfo({
  isOpen = false,
  onHandleEditCardClose = () => {},
  bankInfoControl = {},
  bankInfoErrors = {},
  handleSubmit = () => {},
  onBankInfoSubmit = () => {}
}) {
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
