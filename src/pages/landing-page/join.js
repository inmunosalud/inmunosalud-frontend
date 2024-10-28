// ** React Imports

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Components
import JoinInformation from 'src/views/join/JoinInformation'

// ** Third Party Imports

const Join = () => {
  // ** States

  return (
    <>
      <Grid container spacing={25} sx={{ overflow: 'hidden' }}>
        <Grid item xs={12}>
          <JoinInformation />
        </Grid>
      </Grid>
    </>
  )
}

export default Join
