import * as React from 'react'
import Link from 'next/link'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import FormJoinRegister from 'src/views/forms/forms-login-register/FormJoinRegister'
// ** Layout Import
import { useDispatch, useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import { isDataLoaded } from 'src/store/dashboard/generalSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'
const JoinRegister = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.users)

  React.useEffect(() => {
    dispatch(isDataLoaded(false))
  }, [])

  // ** State

  return isLoading ? (
    <FallbackSpinner />
  ) : (
    <>
      <Grid container spacing={5} sx={{ overflow: 'hidden' }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px', mr: '20px' }}>
            <IconButton sx={{ ml: '20px' }} color='inherit'>
              <Link href={'/landing-page/join'} passHref>
                <ArrowBackIcon />
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ mt: { xs: '0px', lg: '-80px' }, mb: { xs: '20px', lg: '0px' } }}>
            <FormJoinRegister />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
JoinRegister.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default JoinRegister
