import { Modal, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
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

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { recoverPassword, setShowConfirmModal, setRecoveryCode, updatePassword } from 'src/store/users'
import { CircularProgress } from '@mui/material'

const modalContentStyle = {
  display: 'inline-block',
  padding: '1.2rem 2.6rem',
  borderRadius: '9px',
  boxShadow: '0.8rem 1.2rem 3.2rem rgba(0, 0, 0, 0.3)',
  backgroundColor: '#0d1625',
  color: 'rgb(239, 239, 239)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const passwordModalStyle = {
  display: 'inline-block',
  padding: '1.2rem 2.6rem',
  borderRadius: '9px',
  color: 'rgb(239, 239, 239)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const inputStyle = {
  size: '1',
  border: 'none',
  backgroundColor: '#eee',
  textAlign: 'center',
  borderRadius: '11px',
  padding: '12px',
  caretColor: 'transparent !important'
}

const formStyle = {
  display: 'flex',
  alignItems: 'stretch',
  gap: '0.8rem'
}

const buttonStyle = {
  padding: ' 12px',
  backgroundColor: '#0070f0',
  borderRadius: '11px',
  color: 'white',
  transition: 'all 0.3s',
  border: 'none',
  cursor: 'pointer'
}

const VerifyCodeModal = ({ open, handleClose, userData }) => {
  const code = new Array(5).fill(0)
  const dispatch = useDispatch()

  const { recoveryCode } = useSelector(state => state.users)
  const [showInputs, setShowInputs] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [passwords, setPasswords] = useState({
    password: '',
    reWritedPassword: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const body = {
      email: userData.email
    }

    dispatch(recoverPassword(body)).then(response => {
      if (response.payload === 'error') dispatch(setShowConfirmModal(false))

      setShowInputs(true)
    })
  }, [])

  const handleVerifyCode = () => {
    dispatch(setRecoveryCode(Number(code.join(''))))

    setShowInputs(false)
    setShowForm(true)
  }

  const handleForm = e => {
    code[e.target.dataset.index] = e.target.value
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

    debugger
    const body = {
      email: userData.email,
      code: recoveryCode,
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
        <Card>
          <CardHeader title='Actualizar Contraseña' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
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
              <Button variant='contained' onClick={handleUpdatePassword}>
                Actualizar Contraseña
              </Button>
            </Stack>
            {error && (
              <Alert variant='outlined' sx={{ mt: 3 }} severity='error'>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>
      </>
    )
  }

  const renderVerifyCodeForm = () => {
    return !showInputs ? (
      <CircularProgress />
    ) : (
      <div className='inputs--container'>
        <h2 class='heading-secondary margin-bottom-m'>Ingresar Codigo</h2>
        <p class='margin-bottom-s'>Ingresa el codigo que se envio a su correo para recuperar tu contraseña </p>
        <form class='form--verifiy-code' style={formStyle}>
          <input
            autoFocus={true}
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={0}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={1}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={2}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={3}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={4}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={5}
          />
          <Button style={buttonStyle} onClick={handleVerifyCode}>
            &rarr;
          </Button>
        </form>
      </div>
    )
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div class='modal-content' style={!showForm ? modalContentStyle : passwordModalStyle}>
        {!showForm && renderVerifyCodeForm()}

        {showForm && renderPasswordInputs()}
      </div>
    </Modal>
  )
}

export default VerifyCodeModal
