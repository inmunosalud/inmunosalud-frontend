import React from 'react'
import { Modal, Box, Typography, Button, Stack } from '@mui/material'
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
      <Box sx={{ ...style, width: 400 }}>
        <Typography id='modal-tittle' variant='h6' component={'h2'}>
          Inicia sesión para continuar
        </Typography>
        <Typography id='modal-text' sx={{ mt: 2 }}>
          Al parecer no estás registrado o no haz iniciado sesión, por favor inicia sesión para continuar.
        </Typography>
        <Stack spacing={10} direction={'row'} justifyContent={'center'} sx={{ mt: 2 }}>
          <Button variant='outlined' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleRedirect}>
            Iniciar sesión
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default RedirectModal
