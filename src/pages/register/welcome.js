// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendVerificationCode, validateNewUser } from 'src/store/users'
import VerificationInput from 'react-verification-input'
import { closeSnackBar } from 'src/store/notifications'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Welcome = () => {
  const { email } = useSelector(state => state.users)
  const [verificationCode, setVerificationCode] = useState('')
  const { open, message, severity } = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = () => {
    if (email === '' || verificationCode === '' || verificationCode.length < 6) return
    const body = {
      email,
      code: verificationCode
    }
    const formData = JSON.stringify(email)
    sessionStorage.setItem('formData', formData)
    dispatch(validateNewUser(body))
  }

  const resendVerificationCode = () => {
    if (email === '') return
    dispatch(sendVerificationCode({ email }))
  }

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BoxWrapper>
          <Box sx={{ mb: 5.75, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
              Bienvenido a Inmunosalud
            </Typography>
            <Typography variant='body2'>Tu registro ha sido exitoso.</Typography>
            <Typography variant='body2'>Te enviamos un codigo a tu correo para verificar tu cuenta.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
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
                    handleSubmit()
                  }
                }}
                validChars='0-9'
                inputProps={{ inputMode: 'numeric' }}
              />
            </Box>
            <Box Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
              <Button type='submit' variant='contained' sx={{ ml: 2.5, pl: 5.5, pr: 5.5 }} onClick={handleSubmit}>
                Verificar
              </Button>
              <Button
                type='submit'
                variant='outlined'
                sx={{ ml: 2.5, pl: 5.5, pr: 5.5 }}
                onClick={resendVerificationCode}
              >
                Reenviar código
              </Button>
            </Box>
          </form>
        </BoxWrapper>
      </Box>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Box>
  )
}
Welcome.getLayout = page => <BlankLayout>{page}</BlankLayout>
Welcome.guestGuard = true

export default Welcome
