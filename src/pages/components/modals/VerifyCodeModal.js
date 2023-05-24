import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setShowConfirmModal, setShowRedirectModal } from 'src/store/users'

const modalContentStyle = {
  display: 'inline-block',
  padding: '1.2rem 2.6rem',
  borderRadius: '9px',
  boxShadow: '0.8rem 1.2rem 3.2rem rgba(0, 0, 0, 0.3)',
  backgroundColor: '#0d1625',
  color: 'rgb(239, 239, 239)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const inputStyle = {
  size: '1',
  border: 'none',
  backgroundColor: '#eee',
  textAlign: 'center',
  borderRadius: '11px',
  padding: '12px'
}

const formStyle = {
  display: 'flex',
  alignItems: 'stretch',
  gap: '0.8rem'
}

const buttonStyle = {
  padding: ' 12px',
  backgroundColor: '#0070f0',
  borderRadius: '11px',
  color: 'white',
  transition: 'all 0.3s',
  border: 'none',
  cursor: 'pointer'
}

const VerifyCodeModal = ({ open, handleClose }) => {
  const verifyCode = new Array(5).fill(0)
  const dispatch = useDispatch()

  const handleVerifyCode = () => {
    console.log(Number(verifyCode.join('')))

    dispatch(setShowConfirmModal(false))
  }

  const handleForm = e => {
    verifyCode[e.target.dataset.index] = e.target.value
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div class='modal-content' style={modalContentStyle}>
        <h2 class='heading-secondary margin-bottom-m'>Ingresar Codigo</h2>
        <p class='margin-bottom-s'>Ingresa el codigo para recuperar tu contraseña</p>
        <form class='form--verifiy-code' style={formStyle}>
          <input
            autoFocus={true}
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={0}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={1}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={2}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={3}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={4}
          />
          <input
            class='input input--single-char'
            placeholder='0'
            size='1'
            maxlength='1'
            style={inputStyle}
            onChange={handleForm}
            data-index={5}
          />
          <Button style={buttonStyle} onClick={handleVerifyCode}>
            &rarr;
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default VerifyCodeModal
