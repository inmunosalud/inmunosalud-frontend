// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Script from 'next/script'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import UserProfileRight from 'src/views/profile/UserProfileRight'
import UserProfileLeft from 'src/views/profile/UserProfileLeft'
import { loadInfo } from 'src/store/paymentMethods'
import address from 'src/store/address'
import { setOpenPay } from 'src/store/paymentMethods'

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.dashboard.general)

  const setOpenPayObject = openPay => {
    dispatch(setOpenPay(openPay))
  }

  return user.id ? (
    <Grid container spacing={6}>
      <Script
        src='https://resources.openpay.mx/lib/openpay-js/1.2.38/openpay.v1.min.js'
        onLoad={() => {
          setOpenPayObject(OpenPay)
        }}
      />
      <Script src='https://resources.openpay.mx/lib/openpay-data-js/1.2.38/openpay-data.v1.min.js' />
      <Grid item xs={12} md={5} lg={4}>
        <UserProfileLeft data={user} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserProfileRight />
      </Grid>
    </Grid>
  ) : null
}

export default Profile
