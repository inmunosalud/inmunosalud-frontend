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
import { createFiscalInfo, updateFiscalInfo } from 'src/store/billing'
import { closeSnackBar } from 'src/store/notifications'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

const DialogTaxInfo = ({ open, handleClose, type, onSubmit, control, colonies, setColonies }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby='edit-tax-info-dialog' fullWidth maxWidth='lg'>
    <DialogTitle id='edit-tax-info-dialog'>
      {type === 'commission' ? 'Editar o Crear factura de comisiones' : 'Editar o Crear factura de ordenes'}
    </DialogTitle>
    <form onSubmit={onSubmit}>
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
                        onChange={e => onZipCodeChange(e.target.value, onChange, setColonies)}
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
                    name='street'
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
                    name='extNumber'
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
                    name='intNumber'
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
                    name='state'
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

            <Grid item xs={12} md={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleClose} variant='outlined' sx={{ mr: 2 }}>
                  Cancelar
                </Button>
                <Button type='submit' variant='contained'>
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  </Dialog>
)

export default DialogTaxInfo
