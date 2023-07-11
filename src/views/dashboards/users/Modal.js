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

import { CloseCircle } from 'mdi-material-ui'

import { updateUser } from 'src/store/users'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

const PROFILES = [
  { label: 'Administrador General', value: 'Administrador General' },
  { label: 'Administrador de Productos', value: 'Administrador de Productos' },
  { label: 'Afiliado', value: 'Afiliado' },
  { label: 'Consumidor', value: 'Consumidor' }
]

const AvailableOptions = () => {
  return PROFILES.map((profile, i) => (
    <MenuItem disabled key={i} value={profile.value}>
      {profile.label}
    </MenuItem>
  ))
}
//New param showOnlyName to show only name and lastname at user name edition
const Modal = ({ label = '', open = false, handleModal = () => {}, item = {}, showOnlyName = false }) => {
  const dispatch = useDispatch()
  //Check showOnlyName, if true only define names, if false define entire user info
  const defaultValues = showOnlyName
    ? {
        firstName: '',
        lastName: ''
      }
    : {
        firstName: '',
        lastName: '',
        phone: '',
        profile: '',
        recommenderId: ''
      }

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues
  })

  const onSubmit = values => {
    const uuid = item?.id
    const form = {
      body: values,
      uuid: uuid,
      loadUserData: true
    }
    dispatch(updateUser(form))
  }

  React.useEffect(() => {
    if (item && Object.keys(item).length) {
      //Check showOnlyName, if true only define names, if false define entire user info
      const resetValues = showOnlyName
        ? {
            firstName: item?.firstName,
            lastName: item?.lastName
          }
        : {
            firstName: item?.firstName,
            lastName: item?.lastName,
            phone: item?.phone,
            profile: item?.profile,
            recommenderId: item?.recommenderId
          }
      reset(resetValues)
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
                    rules={{ required: true, maxLength: 60 }}
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
              {/* Check showOnlyName value, if true hide unnecessary inputs, if false show all inputs*/}
              {!showOnlyName && (
                <>
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
                        disabled
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
                            disabled={() => (item && item.profile !== 'Consumidor' ? true : false)}
                          >
                            {item && Object.keys(item).length ? AvailableOptions() : null}
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
                </>
              )}
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
