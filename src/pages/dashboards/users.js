import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import PageHeader from 'src/@core/components/page-header'

import TableUsers from 'src/views/dashboards/users/TableUsers'

const Users = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>Usuarios</Typography>} />

      <Grid item xs={12}>
        <TableUsers />
      </Grid>
    </Grid>
  )
}

export default Users
