// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { setPayment } from 'src/store/cart'

export const PaymentMethods = () => {
  const dispatch = useDispatch()

  const { paymentMethods } = useSelector(state => state.paymentMethods)
  const { selectedPayment } = useSelector(state => state.cart)

  const handleSelectPaymentMethod = item => {
    dispatch(setPayment(item))
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
              border: '1px solid #D9D4D3',
              color: 'gray'
            }
          }}
        >
          <div>
            <img height='20' alt={item.imgAlt} src={item.imgSrc} />
            <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 500 }}>{item.nameOnCard}</Typography>
              {item.cardStatus ? (
                <CustomChip
                  skin='light'
                  size='small'
                  label={item.cardStatus}
                  color={item.badgeColor}
                  sx={{ height: 20, ml: 2, fontSize: '0.75rem', fontWeight: 600, borderRadius: '5px' }}
                />
              ) : null}
            </Box>
            <Typography variant='body2'>{item.cardNumber}</Typography>
          </div>

          <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
            <Button variant='outlined' sx={{ mr: 3 }} onClick={() => handleSelectPaymentMethod(item)}>
              {selectedPayment === item ? 'Seleccionado' : 'Seleccionar'}
            </Button>
            <Typography variant='body2' sx={{ mt: 5 }}>
              Expira el {item.expDate}
            </Typography>
          </Box>
        </Box>
      ))}
    </Fragment>
  )
}
