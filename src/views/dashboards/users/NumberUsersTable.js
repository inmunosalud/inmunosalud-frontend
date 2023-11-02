// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'

const NumberUsersTable = ({ title = '', user = {} }) => {
  const { network } = user

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h5' }}
        subheaderTypographyProps={{ variant: 'caption' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <Typography sx={{ mb: 2 }} variant='body1'>
          Usuarios totales: {network?.totalUsers ?? 0}
        </Typography>
        <Typography variant='body2'>Número de Usuarios en tu Red por nivel:</Typography>
        <Grid container spacing={3} textAlign={'center'} marginTop={'2px'}>
          <Grid item container flexDirection={'row'} justifyContent={'space-around'}>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              <Typography variant='caption'>
                <b>Activos</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='caption'>
                <b>Inactivos</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='caption'>
                <b>Total</b>
              </Typography>
            </Grid>
          </Grid>
          {network != undefined
            ? Object.keys(network).map((level, index) => {
                if (index < Object.keys(network).length - 1) {
                  return (
                    <Grid item container flexDirection={'row'} justifyContent={'space-around'}>
                      <Grid item xs={3}>
                        <Typography variant='body2'>
                          <b>Nivel {level}</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant='body2'>{network[level].valid ? network[level].valid : 0}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant='body2'>{network[level].invalid ? network[level].invalid : 0}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant='body2'>
                          {network[level].users ? network[level].users.length : 0}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                }
              })
            : null}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NumberUsersTable
