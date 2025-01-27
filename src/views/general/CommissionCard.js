// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled component for the image
const Img = styled('img')({
  right: 7,
  bottom: 0,
  height: 177,
  position: 'absolute'
})

const formatNumber = number => {
  return number.toLocaleString('es-MX')
}

const CommissionsCard = ({ data }) => {
  // ** Vars
  return (
    <Card sx={{ overflow: 'visible', position: 'relative', padding: 2 }}>
      <CardHeader title='Comisiones' />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant='subtitle1' color='textSecondary'>
                Número de Comisiones
              </Typography>
              <Typography variant='h5' fontWeight='bold'>
                {data.totals.count}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant='subtitle1' color='textSecondary'>
                Comisiones del mes
              </Typography>
              <Typography variant='h5' fontWeight='bold'>
                {data.currentCutoff.count}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant='subtitle1' color='textSecondary'>
                Monto total histórico
              </Typography>
              <Typography variant='h5' fontWeight='bold' color='primary'>
                $ {formatNumber(data.totals.amount)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant='subtitle1' color='textSecondary'>
                Monto del mes actual
              </Typography>
              <Typography variant='h5' fontWeight='bold' color='primary'>
                $ {formatNumber(data.currentCutoff.amount)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CommissionsCard

CommissionsCard.defaultProps = {
  trend: 'positive',
  chipColor: 'primary'
}
