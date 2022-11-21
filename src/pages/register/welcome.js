// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Welcome = () => {
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    router.push('/ecommerce/products')
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
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TextField autoFocus size='small' type='email' placeholder='Introduce tu codigo' />
              <Button type='submit' variant='contained' sx={{ ml: 2.5, pl: 5.5, pr: 5.5 }}>
                Verificar
              </Button>
            </Box>
          </form>
        </BoxWrapper>
      </Box>
    </Box>
  )
}
Welcome.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Welcome
