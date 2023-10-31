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
      <Typography>Inmunosalud</Typography>
      <Box display='flex'>
        <Whatsapp color='primary' />
        <Typography>
          <strong>+52 3334173934</strong>
        </Typography>
      </Box>

      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <a
            style={{ textDecoration: 'none', fontSize: '12px' }}
            target='_blank'
            rel='noreferrer'
            href='/docs/Privacy.pdf'
          >
            Aviso de privacidad
          </a>
          <Typography color={'grey'} fontSize={'12px'}>
            |
          </Typography>
          <a style={{ textDecoration: 'none', fontSize: '12px' }} target='_blank' rel='noreferrer' href='/docs/TyC.pdf'>
            Términos y condiciones
          </a>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
