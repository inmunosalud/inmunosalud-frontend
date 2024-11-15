// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Styles Import

import { setPayment } from 'src/store/cart'

import Image from 'next/image'

export const PaymentMethods = ({ onClose }) => {
  const dispatch = useDispatch()

  const { paymentMethods } = useSelector(state => state.paymentMethods)
  const { selectedPayment } = useSelector(state => state.cart)

  const handleSelectPaymentMethod = item => {
    dispatch(setPayment(item))
    onClose()
  }

  return (
    <Fragment>
      {paymentMethods?.map(item => (
        <Box
          key={item.id}
          sx={{
            p: 5,
            display: 'flex',
            borderRadius: 1,
            flexDirection: ['column', 'row'],
            justifyContent: ['space-between'],
            alignItems: ['flex-start', 'center'],
            mb: item.id === paymentMethods.length - 1 ? undefined : 4,
            border: theme => (selectedPayment === item ? `1px solid white` : `1px solid ${theme.palette.divider}`),
            '&:hover': {
              border: '1px solid orange',
              color: 'gray'
            }
          }}
        >
          <Grid container>
            <Grid xs={6} md={8} s item>
              <Box>
                <Image
                  width={item.cardType === 'mastercard' ? '32.5' : item.cardType === 'visa' ? '60' : '60'}
                  height={item.cardType === 'mastercard' ? '20' : item.cardType === 'visa' ? '20' : '20'}
                  alt={item.cardType}
                  src={
                    item.cardType === 'mastercard'
                      ? '/images/logos/mastercard.png'
                      : item.cardType === 'visa'
                        ? '/images/logos/visa.png'
                        : '/images/logos/american-express.png'
                  }
                />
                <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 500 }}>{item.alias}</Typography>
                </Box>
                <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                  <Typography>{item.nameOnCard}</Typography>
                </Box>
                <Typography variant='body2'>{item.cardNumber}</Typography>
              </Box>
            </Grid>
            <Grid xs={4} md={3} item>
              <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                <Button variant='outlined' sx={{ mr: 3 }} onClick={() => handleSelectPaymentMethod(item)}>
                  {selectedPayment === item ? 'Seleccionado' : 'Seleccionar'}
                </Button>
                <Typography variant='body2' sx={{ mt: 10, mr: '-15px' }}>
                  Expira el {item.expDate}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Fragment>
  )
}
