// ** MUI Imports
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import { Grid } from '@mui/material'

const Footer = props => {
  // ** Props
  const { plan, handleChange } = props

  return (
    <Box sx={{ mb: 11, textAlign: 'center' }}>
      <Typography variant='h4'>Pricing Plans</Typography>
      <Grid container spacing={3}>
        <Grid xs={12}></Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <InputLabel
          htmlFor='pricing-switch'
          sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
        >
          Monthly
        </InputLabel>
        <Switch id='pricing-switch' onChange={handleChange} checked={plan === 'annually'} />
        <InputLabel
          htmlFor='pricing-switch'
          sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
        >
          Annually
        </InputLabel>
      </Box>
    </Box>
  )
}

export default Footer
