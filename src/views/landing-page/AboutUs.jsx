// ** MUI Imports
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import { Button } from '@mui/material'
import Link from 'next/link';

const AboutUs = () => {
  // ** Props
  return (
    <Box>
      <Typography variant='h4' style={{ textAlign: 'center' }}>
        Acerca de Inmunosalud
      </Typography>
      <Box sx={{ my: 5.5 }}>
        <Typography variant='body2' style={{ textAlign: 'justify' }}>
          Somos un equipo especializado en el desarrollo de suplementos alimenticios diseñados para satisfacer las
          necesidades de tu mente y cuerpo. Nuestra atención se centra en la salud cardiovascular, muscular y cerebral,
          así como en fortalecer el sistema inmunológico y la salud integral en general. Nuestro compromiso es poner a
          tu alcance las mejores formulaciones científicas para que disfrutes de tu día a día y goces de una vida plena
          y digna. En Inmunosalud, creemos que cada persona merece llevar una vida digna y saludable. Por eso, nuestro
          objetivo es ayudar a miles de individuos a mejorar su calidad de vida. Inmunosalud es el camino hacia tu mejor
          salud.
        </Typography>
        <Box sx={{ mt: 5 }} style={{ textAlign: 'center' }}>
          <Link href='/landing-page/join' passHref>
            <Button variant='outlined'>AFÍLIATE A NOSOTROS</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default AboutUs
