// React y Next
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Material-UI
import {
  CircularProgress,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  InputLabel,
  Card,
  CardHeader,
  CardContent,
  OutlinedInput,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  MenuItem
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// React Hook Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// React Redux
import { useDispatch, useSelector } from 'react-redux'

// React i18next
import { useTranslation } from 'react-i18next'

// Iconos
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// Componentes
import { closeSnackBar } from 'src/store/notifications'
import { useSettings } from 'src/@core/hooks/useSettings'

// Endpoints
import { createPartner } from 'src/store/users'
import { PROFILES_USER } from 'src/configs/profiles'

// Utils
import { onZipCodeChange } from 'src/utils/functions'
const FormJoinRegister = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('JoinRegister')
  const { query } = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const newAssociate = query.newAssociate === 'true'
  const { isLoadingRegister: isLoading, registerErrors: errors } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { user } = useSelector(state => state.session)
  const currentYear = new Date().getFullYear()
  const [colonies, setColonies] = useState([])

  const registerSchema = Yup.object().shape({
    rfc: Yup.string()
      .required(t('common:error.required_field'))
      .matches(/^([A-ZÑ&]{3,4})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([A-Z\d]{2})([A\d])$/, 'RFC inválido')
      .test('exact-length', 'RFC invalido', value => {
        return value?.length === 13
      }),
    curp: Yup.string()
      .required(t('common:error.required_field'))
      .matches(
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        'CURP inválido'
      )
      .test('exact-length', 'El CURP debe tener 18 caracteres', value => {
        return value?.length === 18
      }),
    zipCode: Yup.string().required(t('common:error.required_field')),
    calle: Yup.string().required(t('common:error.required_field')),
    numeroExt: Yup.string().required(t('common:error.required_field')),
    numeroInt: Yup.string(),
    neighborhood: Yup.string().required(t('common:error.required_field')),
    city: Yup.string().required(t('common:error.required_field')),
    federalEntity: Yup.string().required(t('common:error.required_field'))
  })

  const defaultValues = {
    rfc: '',
    curp: '',
    cp: '',
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado: ''
  }

  const {
    control: registerControl,
    handleSubmit,
    setValue
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(registerSchema)
  })

  const submitRegister = values => {
    console.log(user)
    const body = {
      curp: values.curp,
      rfc: values.rfc,
      taxAddress: {
        street: values.calle,
        extNumber: values.numeroExt,
        intNumber: values.numeroInt || '',
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.federalEntity,
        zipCode: values.zipCode
      }
    }
    dispatch(createPartner({ body, id: user.id }))
  }

  useEffect(() => {
    if (colonies.length > 0) {
      setValue('city', colonies[0].city)
      setValue('federalEntity', colonies[0].federalEntity)
    } else {
      setValue('city', '')
      setValue('federalEntity', '')
    }
  }, [colonies, setValue])

  return (
    <>
      <Box className='content-center' sx={{ maxWidth: { xs: '100%', md: '90%' } }} mx='auto'>
        <form onSubmit={handleSubmit(submitRegister)}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <Typography variant='h5' align='center' mb={2}>
                {'Conviértete en socio'}
              </Typography>
            </Grid>
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
                      control={registerControl}
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
                      control={registerControl}
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
                      control={registerControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                          error={!!error}
                          helperText={error ? error.message : ' '}
                          label={'Código Postal*'}
                          value={value}
                          onChange={e => onZipCodeChange(e, onChange, setColonies)}
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
                      name='calle'
                      control={registerControl}
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
                      name='numeroExt'
                      control={registerControl}
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
                      name='numeroInt'
                      control={registerControl}
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
                      control={registerControl}
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
                      control={registerControl}
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
                      name='federalEntity'
                      control={registerControl}
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
                  Estos datos se requieren para generar tu comprobante al momento de pagar las comisiones, asegúrate que
                  la información sea correcta
                </Typography>
              </Grid>
              <Grid item xs={0} md={3}></Grid>

              <Grid item xs={1.15} md={4}></Grid>
              <Grid item xs={10.85} md={4}>
                <Button type='submit' variant='contained' sx={{ width: '100%' }}>
                  Actualizar cuenta
                </Button>
              </Grid>
              <Grid item xs={0} md={4}></Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

export default FormJoinRegister
