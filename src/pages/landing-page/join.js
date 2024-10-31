// ** React Imports

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Components
import JoinInformation from 'src/views/join/JoinInformation'
import { useSelector } from 'react-redux'
// ** Third Party Imports

const Join = () => {
  // ** States
  const { user } = useSelector(state => state.dashboard.general)

  return (
    <>
      <Grid container spacing={25} sx={{ overflow: 'hidden' }}>
        <Grid item xs={12}>
          <JoinInformation profile={user?.profile} />
        </Grid>
      </Grid>
    </>
  )
}
Join.guestGuard = true

export default Join
