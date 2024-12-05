import React from 'react'
import { Grid, Typography, Box } from '@mui/material'

const SimpleHeader = ({ headers }) => (
  <Grid container spacing={2} sx={{ ml: '10px', pr: '60px' }}>
    {headers.map((header, index) => (
      <Grid item xs={header.xs || header.lg} lg={header.lg || header.xs} key={index}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{header.name}</Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
)

export default SimpleHeader
