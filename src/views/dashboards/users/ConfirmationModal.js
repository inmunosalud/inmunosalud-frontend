import React from 'react'
import { Modal, Button, Box, Typography, Card, CardContent, CardActions, CardHeader } from '@mui/material'

const ConfirmationModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Card sx={{ maxWidth: 400 }}>
          <CardHeader title='Confirmación' />
          <CardContent>
            <Typography variant='body1' gutterBottom>
              ¿Estás seguro que quieres realizar esta acción?
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
            <Button variant='outlined' color={'secondary'} onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant='contained' onClick={handleConfirm}>
              Aceptar
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal
