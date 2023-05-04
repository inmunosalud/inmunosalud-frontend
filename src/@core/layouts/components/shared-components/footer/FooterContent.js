// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>Inmunosalud</Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <a
            style={{ textDecoration: 'none', fontSize: '12px', color: 'lightgrey' }}
            target='_blank'
            rel='noreferrer'
            href='https://www.vainilladev.com'
          >
            Aviso de privacidad
          </a>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
