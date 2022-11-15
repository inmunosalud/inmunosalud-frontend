import * as React from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'

import Form from 'src/views/forms/forms-login-register/Form'
import FormRegister from 'src/views/forms/forms-login-register/FormRegister'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Register = () => {
  // ** State

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '170px 60px' }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Form />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormRegister />
        </Grid>
      </Grid>
    </div>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register
