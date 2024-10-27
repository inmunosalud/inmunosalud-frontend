// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Whatsapp } from 'mdi-material-ui'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' alignItems='center'>
          <Whatsapp color='primary' />
          <Typography fontSize={'12px'}>
            <strong>+52 3334173934</strong>
          </Typography>
        </Box>
        <Typography fontSize={'12px'}>
          <strong>Dirección:</strong> Iztaccihuatl 1915, Tlajomulco, Jalisco.
        </Typography>
        <Typography fontSize={'12px'}>
          <strong>Correo:</strong>{' '}
          <Link style={{ textDecoration: 'none', fontSize: '12px' }} href='mailto:atencion@inmunosalud.mx'>
            atencion@inmunosalud.mx
          </Link>
        </Typography>
      </Box>
      <Typography>Inmunosalud</Typography>

      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link
            style={{ textDecoration: 'none', fontSize: '12px' }}
            target='_blank'
            rel='noreferrer'
            href='/docs/Privacy.pdf'
          >
            Aviso de privacidad
          </Link>
          <Typography color={'grey'} fontSize={'12px'}>
            |
          </Typography>
          <Link style={{ textDecoration: 'none', fontSize: '12px' }} target='_blank' rel='noreferrer' href='/docs/TyC.pdf'>
            Términos y condiciones
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
