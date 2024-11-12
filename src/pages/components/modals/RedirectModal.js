import React from 'react'
import { Modal, Box, Typography, Button, Stack, Card, CardContent, CardHeader, CardActions } from '@mui/material'
import Router from 'next/router'

const RedirectModal = ({ open, handleClose, pageToRedirect }) => {
  const handleRedirect = () => {
    handleClose()
    Router.push(pageToRedirect)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal open={open} handleClose={handleClose}>
      <Card sx={{ width: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <CardHeader title='Inicia sesión para continuar' />
        <CardContent>
          <Typography id='modal-text' sx={{ mt: 2 }}>
            Si no estas registrado acércate con alguno de nuestros socios distribuidores para conocer más sobre nuestros
            productos
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={10} direction={'row'} justifyContent={'center'} sx={{ mt: 2 }}>
            <Button variant='outlined' onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant='contained' onClick={handleRedirect}>
              Iniciar sesión
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Modal>
  )
}

export default RedirectModal
