import React from 'react'
import { Controller } from 'react-hook-form'
import {
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  TextField,
  FormHelperText,
  Button
} from '@mui/material'

const DialogAddress = ({
  openAddressCard = false,
  handleAddressClose = () => {},
  editItem = null,
  handleSubmit = () => {},
  onSubmit = () => {},
  addressControl = {},
  addressErrors = {}
}) => {
  return (
    <Card>
      <Dialog
        open={openAddressCard}
        onClose={handleAddressClose}
        aria-labelledby='user-view-billing-edit-card'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-view-billing-edit-card-description'
      >
        <DialogTitle id='user-view-billing-edit-card' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          {editItem && Object.keys(editItem).length ? 'Editar Dirección' : 'Nuevo Dirección'}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '5px' }}>
          <form key={0} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='street'
                    control={addressControl}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Calle'
                        onChange={onChange}
                        placeholder='Calle'
                        error={Boolean(addressErrors.street)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {addressErrors.street?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='extNumber'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número Exterior'
                        onChange={onChange}
                        placeholder='No. Ext'
                        error={Boolean(addressErrors.extNumber)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {addressErrors.extNumber?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3}>
                <FormControl fullWidth>
                  <Controller
                    name='intNumber'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Número Interior'
                        onChange={onChange}
                        placeholder='No. Int'
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='colony'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Colonia'
                        onChange={onChange}
                        error={Boolean(addressErrors.colony)}
                        placeholder='Colonia'
                        aria-describedby='validation-basic-colony'
                      />
                    )}
                  />
                  {addressErrors.colony && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-colony'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='city'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='tel'
                        value={value}
                        label='Ciudad'
                        onChange={onChange}
                        error={Boolean(addressErrors.city)}
                        placeholder='Ciudad'
                        aria-describedby='validation-basic-city'
                      />
                    )}
                  />
                  {addressErrors.city?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-city'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='federalEntity'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Estado'
                        onChange={onChange}
                        error={Boolean(addressErrors.federalEntity)}
                        placeholder='Entidad Federativa'
                        aria-describedby='validation-basic-state'
                      />
                    )}
                  />
                  {addressErrors.federalEntity?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-state'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='zipCode'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código Postal'
                        onChange={onChange}
                        error={Boolean(addressErrors.zipCode)}
                        placeholder='Código Postal'
                        aria-describedby='validation-basic-zipCode'
                      />
                    )}
                  />
                  {addressErrors.zipCode?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-zipCode'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Controller
                    name='country'
                    control={addressControl}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='País'
                        onChange={onChange}
                        error={Boolean(addressErrors.country)}
                        placeholder='País'
                        aria-describedby='validation-basic-country'
                      />
                    )}
                  />
                  {addressErrors.country?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-country'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='refer'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Referencia'
                        onChange={onChange}
                        placeholder='Referencia. Ejemplo: "Fachada blanca, herrería negra"'
                        aria-describedby='validation-basic-reference'
                      />
                    )}
                  />
                  {addressErrors.refer?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-refer'>
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
              <Button variant='outlined' color='secondary' onClick={handleAddressClose}>
                Cancelar
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogAddress
