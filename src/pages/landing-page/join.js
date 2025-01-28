// ** React Imports
import { useEffect } from 'react'
// ** MUI Imports
import { Grid } from '@mui/material'

// ** Components
import JoinInformation from 'src/views/join/JoinInformation'
import { useSelector, useDispatch } from 'react-redux'
// ** Third Party Imports
import { getConstants } from 'src/store/constants'

const Join = () => {
  // ** States
  const { user } = useSelector(state => state.session)
  const { constants } = useSelector(state => state.constants)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!constants) {
      dispatch(getConstants())
    }
  }, [])

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
