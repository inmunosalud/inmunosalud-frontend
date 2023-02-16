// ** React Imports
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import UserProfileRight from 'src/views/profile/UserProfileRight'
import UserProfileLeft from 'src/views/profile/UserProfileLeft'

const Profile = () => {
  const { user } = useSelector(state => state.session)
  console.log(user)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserProfileLeft data={user} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserProfileRight />
      </Grid>
    </Grid>
  )
}

export default Profile
