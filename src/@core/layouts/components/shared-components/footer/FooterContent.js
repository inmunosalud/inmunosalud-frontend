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
      </Box>
      <Typography>Inmunosalud</Typography>
    </Box>
  )
}

export default FooterContent
