import React from 'react'
import { Modal, Box, Typography, Button, Stack } from '@mui/material'
import Router from 'next/router'

const RedirectModal = ({ open, handleClose, pageToRedirect }) => {
  const handleRedirect = () => {
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
          Inicia sesion para continuar
        </Typography>
        <Typography id='modal-text' sx={{ mt: 2 }}>
          Al parecer no estas registrado o no haz iniciado sesion, porfavor inicia sesion para continuar
        </Typography>
        <Stack spacing={10} direction={'row'}>
          <Button variant='contained' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleRedirect}>
            Register | Login
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='icon'
              style={{
                width: '24px'
              }}
            >
              <path stroke-linecap='round' stroke-linejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
            </svg>
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default RedirectModal
