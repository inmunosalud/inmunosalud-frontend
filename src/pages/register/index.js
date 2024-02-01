import * as React from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'

import Form from 'src/views/forms/forms-login-register/Form'
import FormRegister from 'src/views/forms/forms-login-register/FormRegister'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import GoBackButton from 'src/views/components/goback/GoBack'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import { isDataLoaded } from 'src/store/dashboard/generalSlice'

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.session)

  React.useEffect(() => {
    dispatch(isDataLoaded(false))
  }, [])

  // ** State

  return isLoading ? (
    <FallbackSpinner />
  ) : (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '170px 60px' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} display='flex' justifyContent='flex-end' style={{ marginBottom: '1rem' }}>
            <GoBackButton onChangePage={() => router.back()} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Form />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormRegister />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
