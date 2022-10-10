import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

export const AddProduct = () => {
  return (
    <Card
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        handleClickOpen()
        setDialogTitle('Add')
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={5}>
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <img width={65} height={130} alt='add-role' src='/images/cards/pose_m1.png' />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <CardContent>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant='contained'
                sx={{ mb: 3, whiteSpace: 'nowrap' }}
                onClick={() => {
                  handleClickOpen()
                  setDialogTitle('Add')
                }}
              >
                Add Role
              </Button>
              <Typography>Add role, if it doesn't exist.</Typography>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
