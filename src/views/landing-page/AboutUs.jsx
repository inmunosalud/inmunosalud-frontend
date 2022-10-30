// ** MUI Imports
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import { Button } from '@mui/material'

const AboutUs = () => {
  // ** Props
  return (
    <Box
      sx={{
        mb: 11,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Typography variant='h4'>Nosotros</Typography>
      <Box sx={{ my: 5.5 }}>
        <Typography variant='body2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim inventore praesentium placeat modi
          voluptatem officia. Dignissimos sit voluptates, sed consequatur ipsa laudantium amet qui nisi corporis
          ratione, repellendus animi.
        </Typography>
        <Typography variant='body2'>Choose the best plan to fit your needs.</Typography>
        <Box sx={{ mt: 5 }}>
          <Button variant='outlined'>Mas Sobre Nosotros</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AboutUs
