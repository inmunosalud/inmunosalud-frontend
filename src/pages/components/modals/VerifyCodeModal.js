import { Modal, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert'
import VerificationInput from 'react-verification-input'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import {
  recoverPassword,
  setShowConfirmModal,
  setRecoveryCode,
  updatePassword,
  validatePasswordRecoveryCode
} from 'src/store/users'
import { CircularProgress } from '@mui/material'

const VerifyCodeModal = ({ open, handleClose, userData }) => {
  const array = new Array(6).fill('')
  const dispatch = useDispatch()
  const [verificationCode, setVerificationCode] = useState('')

  const { recoveryCode } = useSelector(state => state.users)
  const [code, setCode] = useState(array)
  const [showInputs, setShowInputs] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [passwords, setPasswords] = useState({
    password: '',
    reWritedPassword: ''
  })
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])

  useEffect(() => {
    const body = {
      email: userData.email
    }

    setShowInputs(true)
    dispatch(recoverPassword(body)).then(response => {
      if (response.payload === 'error') dispatch(setShowConfirmModal(false))
    })
  }, [])

  const validateCodeEmail = () => {
    const body = {
      email: userData.email
    }

    setShowInputs(true)
    dispatch(recoverPassword(body)).then(response => {
      if (response.payload === 'error') dispatch(setShowConfirmModal(false))
    })
  }

  const handleVerifyCode = value => {
    const body = {
      email: userData.email,
      code: value
    }

    dispatch(validatePasswordRecoveryCode(body)).then(response => {
      if (response.payload === 'error') {
        return
      } else {
        setVerificationCode(value)
        setShowForm(true)
        setShowInputs(true)
      }
    })
  }

  const verifyPasswords = () => {
    if (passwords.password === '' || passwords.reWritedPassword === '') {
      setError('los campos no pueden estar vacios')
      return false
    }

    if (passwords.password != passwords.reWritedPassword) {
      setError('Las Contraseñas no coinciden')
      return false
    }

    setError('')
    return true
  }

  const handleUpdatePassword = () => {
    if (!verifyPasswords()) return

    const body = {
      email: userData.email,
      code: verificationCode,
      password: passwords.password
    }

    dispatch(updatePassword(body))
    dispatch(setShowConfirmModal(false))
  }

  const handlePasswordInput = e => {
    if (e.target.id === 'password') setPasswords({ ...passwords, password: e.target.value })
    if (e.target.id === 'reWritedPassword') setPasswords({ ...passwords, reWritedPassword: e.target.value })
  }

  const renderPasswordInputs = () => {
    return (
      <>
        <CardHeader title='Actualizar Contraseña' />
        <Stack spacing={2}>
          <InputLabel htmlFor='password'>Ingresa tu nueva contraseña</InputLabel>
          <TextField
            id='password'
            label='Contraseña'
            variant='outlined'
            onChange={e => handlePasswordInput(e)}
            type='password'
            required
          />
          <InputLabel htmlFor='reWritedPassword'>Ingresa nuevamente tu contraseña</InputLabel>
          <TextField
            id='reWritedPassword'
            label='Contraseña'
            variant='outlined'
            onChange={e => handlePasswordInput(e)}
            type='password'
            required
          />
          <CardActions>
            <Button variant='contained' onClick={handleUpdatePassword}>
              Actualizar Contraseña
            </Button>
          </CardActions>
        </Stack>
        {error && (
          <Alert variant='outlined' sx={{ mt: 3 }} severity='error'>
            {error}
          </Alert>
        )}
      </>
    )
  }

  const renderVerifyCodeForm = () => {
    return !showInputs ? (
      <CircularProgress />
    ) : (
      <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
        <CardHeader title='Se ha enviado un código de recuperación a su correo electrónico' />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <VerificationInput
            classNames={{
              container: 'container',
              character: 'character',
              characterInactive: 'character--inactive',
              characterSelected: 'character--selected'
            }}
            onChange={value => {
              setVerificationCode(value)
              if (value.length === 6) {
                handleVerifyCode(value)
              }
            }}
            validChars='0-9'
            inputProps={{ inputMode: 'numeric' }}
          />
          <Button
            sx={{ ml: '20px' }}
            variant='contained'
            size='large'
            onClick={verificationCode.lenght === 6 ? handleVerifyCode : null}
          >
            Validar
          </Button>
          <Button sx={{ ml: '20px' }} variant='outlined' size='large' onClick={validateCodeEmail}>
            Reenviar Código
          </Button>
        </Box>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: '-20px' }}
        ></CardActions>
      </form>
    )
  }

  return (
    <Modal
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Card>
          <CardContent>
            {!showForm && renderVerifyCodeForm()}

            {showForm && renderPasswordInputs()}
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default VerifyCodeModal
