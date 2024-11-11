import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
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
  Button,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material'
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), {
  ssr: false
})
import { useDispatch, useSelector } from 'react-redux'
import { getColonies, selectColony, cleanColonies } from 'src/store/address'
import { onZipCodeChange } from 'src/utils/functions'

const DialogAddress = ({
  openAddressCard = false,
  handleAddressClose = () => {},
  editItem = null,
  handleSubmit = () => {},
  onSubmit = () => {},
  setValue = () => {},
  addressControl = {},
  addressErrors = {}
}) => {
  const dispatch = useDispatch()
  const [colonies, setColonies] = useState([])

  useEffect(() => {
    if (colonies.length > 0) {
      setValue('city', colonies[0].city)
      setValue('federalEntity', colonies[0].federalEntity)
    } else {
      setValue('city', '')
      setValue('federalEntity', '')
    }
  }, [colonies, setValue])

  useEffect(() => {
    if (editItem && Object.keys(editItem).length) {
      onZipCodeChange(editItem.zipCode, setValue, setColonies)
    }
  }, [editItem])

  return (
    <Card>
      <Dialog
        open={openAddressCard}
        onClose={() => {
          handleAddressClose()
        }}
        aria-labelledby='user-view-billing-edit-card'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-view-billing-edit-card-description'
      >
        <DialogTitle id='user-view-billing-edit-card' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          {editItem && Object.keys(editItem).length ? 'Editar Dirección' : 'Nueva Dirección'}
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

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='zipCode'
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <TextField
                        error={!!error}
                        helperText={error ? error.message : ''}
                        label={'Código Postal*'}
                        value={value}
                        onChange={e => onZipCodeChange(e.target.value, onChange, setColonies)}
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
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <TextField
                        select
                        disabled={colonies.length === 0}
                        value={value}
                        label={'Colonias*'}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : ''}
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
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <TextField
                        error={!!error}
                        helperText={error ? error.message : ''}
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
                    control={addressControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <TextField
                        error={!!error}
                        helperText={error ? error.message : ''}
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
