// ** React Imports
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { CircularProgress } from '@mui/material'

import { CloseCircle } from 'mdi-material-ui'

import { updateUser } from 'src/store/users'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

const PROFILES = [
  { label: 'Administrador General', value: 'admin' },
  { label: 'Socio', value: 'associatedUser' },
  { label: 'Consumidor', value: 'consumerUser' }
]

const isDisabled = profile => {
  if (profile !== 'Socio') return true
}

const AvailableOptions = item => {
  if (item.profile === 'consumerUser') {
    return PROFILES.map((profile, i) => (
      <MenuItem disabled={isDisabled(profile.label)} key={i} value={profile.value}>
        {profile.label}
      </MenuItem>
    ))
  }
  return PROFILES.map((profile, i) => (
    <MenuItem disabled key={i} value={profile.value}>
      {profile.label}
    </MenuItem>
  ))
}

const Modal = ({ label = '', open = false, handleModal = () => {}, item = {} }) => {
  console.log('item', item)
  const dispatch = useDispatch()

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      profile: '',
      recommenderId: ''
    }
  })

  const onSubmit = values => {
    const id = item?.id
    const form = {
      ...values,
      id
    }
    dispatch(updateUser(form))
  }

  React.useEffect(() => {
    if (item && Object.keys(item).length) {
      reset({
        firstName: item?.firstName,
        lastName: item?.lastName,
        phone: item?.phone,
        profile: item?.profile,
        recommenderId: item?.recommenderId
      })
    }
  }, [item])

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleModal} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          {label}
          <IconButton
            aria-label='close'
            onClick={handleModal}
            sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <CloseCircle icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} sx={{ margin: '7px auto' }}>
                <FormControl fullWidth>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextField
                          value={value}
                          label='Nombre'
                          onChange={onChange}
                          placeholder='Nombre..'
                          error={Boolean(errors.firstName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )
                    }}
                  />
                  {errors.firstName?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ margin: '7px auto' }}>
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Apellido'
                        onChange={onChange}
                        placeholder='Apellido..'
                        error={Boolean(errors.lastName)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.lastName?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ margin: '7px auto' }}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: true, maxLength: 10 }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='tel'
                        value={value}
                        label='Telefono'
                        onChange={onChange}
                        error={Boolean(errors.phone)}
                        placeholder='3321409021'
                        aria-describedby='validation-basic-phone'
                      />
                    )}
                  />
                  {errors.phone?.type === 'required' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-phone'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                  {errors.phone?.type === 'maxLength' && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      El telefono debe tener 10 caracteres
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ margin: '7px auto' }}>
                <FormControl fullWidth>
                  <InputLabel
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    htmlFor='validation-basic-select'
                  >
                    Perfil
                  </InputLabel>
                  <Controller
                    name='profile'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Perfil'
                        onChange={onChange}
                        error={Boolean(errors.profile)}
                        labelId='validation-basic-profile'
                        aria-describedby='validation-basic-profile'
                      >
                        {item ? AvailableOptions(item) : null}
                      </Select>
                    )}
                  />
                  {errors.select && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                      El campo es requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ margin: '7px auto' }}>
                <FormControl fullWidth>
                  <Controller
                    name='recommenderId'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Codigo de Recomendado'
                        onChange={onChange}
                        placeholder='32u4234-234234-234234-422'
                        aria-describedby='validation-basic-recommenderId'
                        disabled={item?.recommenderId ? true : false}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions className='dialog-actions-dense'>
              <Grid item xs={12} sx={{ margin: '7px auto' }}>
                <Button size='large' type='submit' variant='contained'>
                  Editar
                </Button>
              </Grid>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default Modal
