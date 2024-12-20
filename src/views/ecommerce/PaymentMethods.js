import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import Image from 'next/image'
import { setPayment } from 'src/store/cart'
import Tooltip from '@mui/material/Tooltip'

export const PaymentMethods = ({ onClose }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { paymentMethods } = useSelector(state => state.paymentMethods)
  const { selectedPayment } = useSelector(state => state.cart)

  const handleSelectPaymentMethod = item => {
    dispatch(setPayment(item))
    onClose()
  }

  const addCustomPaymentOptions = () => [
    {
      id: 'store',
      alias: 'Pago en efectivo',
      stores: [
        { id: 'store1', image: '/images/logos/seven-eleven.png', name: '7-Eleven' },
        { id: 'store2', image: '/images/logos/kiosko.png', name: 'Kiosko' },
        { id: 'store3', image: '/images/logos/walmart.jpg', name: 'Walmart' },
        { id: 'store4', image: '/images/logos/sams-club.png', name: 'Sams' },
        { id: 'store5', image: '/images/logos/farmacias-del-ahorro.png', name: 'Farmacias del Ahorro' },
        { id: 'store6', image: '/images/logos/farmacias-guadalajara.svg', name: 'Farmacias Guadalajara' },
        { id: 'store7', image: '/images/logos/bodega-aurrera.png', name: 'Bodega Aurrera' }
      ]
    },
    {
      id: 'mercado-pago',
      alias: 'Mercado Pago',
      image: '/images/logos/mercado-pago.png',
      description: 'Paga con tu cuenta de Mercado Pago'
    },
    ...paymentMethods
  ]

  const extendedPaymentMethods =
    typeof window !== 'undefined' && window.location.pathname === '/ecommerce/cart/'
      ? addCustomPaymentOptions()
      : paymentMethods

  return (
    <Fragment>
      {extendedPaymentMethods?.map(item => (
        <Box
          key={item.id}
          sx={{
            p: 5,
            display: 'flex',
            borderRadius: 1,
            flexDirection: ['column', 'row'],
            justifyContent: ['space-between'],
            alignItems: ['flex-start', 'center'],
            mb: item.id === extendedPaymentMethods.length - 1 ? undefined : 4,
            border: theme =>
              selectedPayment === item || selectedPayment?.id === item.id
                ? `1px solid ${theme.palette.primary.main}`
                : `1px solid ${theme.palette.divider}`
          }}
        >
          <Grid container>
            <Grid xs={6} md={8} item>
              <Box>
                {item.id === 'store' ? (
                  <Box
                    sx={{
                      height: {
                        xs: '400px',
                        lg: '200px'
                      }
                    }}
                  >
                    <Typography sx={{ fontWeight: 500 }}>{item.alias}</Typography>
                    <Box sx={{ mt: 8, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {item.stores.map(store => (
                        <Tooltip key={store.id} title={store.name}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 70,
                              height: 70,
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 2,
                              padding: 1,
                              backgroundColor: {
                                dark: theme.palette.grey[800],
                                light: theme.palette.grey[100]
                              }[theme.palette.mode],
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            <img
                              height='auto'
                              width='80%'
                              alt={store.name}
                              src={store.image}
                              style={{ objectFit: 'contain', maxHeight: '70px' }}
                            />
                          </Box>
                        </Tooltip>
                      ))}
                    </Box>
                  </Box>
                ) : item.id === 'mercado-pago' ? (
                  <Box>
                    <Typography sx={{ mt: 2, fontWeight: 500 }}>{item.alias}</Typography>
                    <img
                      src={item.image}
                      alt={item.alias}
                      style={{
                        width: '100px',
                        objectFit: 'contain'
                      }}
                    />
                    <Typography variant='body2' sx={{ mt: 1 }}>
                      {item.description}
                    </Typography>
                  </Box>
                ) : (
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
                )}
              </Box>
            </Grid>
            <Grid xs={4} md={3} item>
              <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                <Button
                  variant={selectedPayment === item || selectedPayment?.id === item.id ? 'contained' : 'outlined'}
                  sx={{ mr: 3 }}
                  onClick={() => handleSelectPaymentMethod(item)}
                >
                  {selectedPayment === item || selectedPayment?.id === item.id ? 'Seleccionado' : 'Seleccionar'}
                </Button>
                {item.id !== 'store' && item.id !== 'mercado-pago' && (
                  <Typography variant='body2' sx={{ mt: 10, mr: '-15px' }}>
                    Expira el {item.expDate}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Fragment>
  )
}
