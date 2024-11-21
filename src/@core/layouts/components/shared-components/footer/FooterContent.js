// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { WhatsApp, Facebook, Instagram } from '@mui/icons-material'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2
      }}
    >
      <Box display='flex' flexDirection='column'>
        <Box display='flex' alignItems='center' gap={1}>
          <IconButton
            color='primary'
            href='https://www.facebook.com/inmunosaludgdl'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Facebook />
          </IconButton>
          <IconButton
            color='primary'
            href='https://www.instagram.com/inmunosaludgdl'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Instagram />
          </IconButton>
          <IconButton color='primary' href='https://wa.me/523334173934' target='_blank' rel='noopener noreferrer'>
            <WhatsApp />
            <Typography sx={{ ml: 1 }} fontSize='12px' fontWeight='bold'>
              {'+52 33 3417 3934'}
            </Typography>
          </IconButton>
        </Box>
      </Box>
      <Typography fontSize='14px' fontWeight='bold'>
        Inmunosalud
      </Typography>
      <Box display='flex' gap={1}></Box>
    </Box>
  )
}

export default FooterContent
