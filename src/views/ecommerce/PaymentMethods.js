// ** React Imports
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
// ** Custom Components
import Image from 'next/image'
import { setPayment } from 'src/store/cart'

export const PaymentMethods = ({ onClose }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { paymentMethods } = useSelector(state => state.paymentMethods)
  const { selectedPayment } = useSelector(state => state.cart)

  const handleSelectPaymentMethod = item => {
    dispatch(setPayment(item))
    onClose()
  }

  const addInStorePaymentOption = () => [
    {
      id: 'store',
      alias: 'Pago en efectivo',
      stores: [
        { id: 'store1', image: '/images/logos/seven-eleven.png', name: '7-Eleven' },
        { id: 'store2', image: '/images/logos/kiosko.png', name: 'kiosko' },
        { id: 'store3', image: '/images/logos/walmart.jpg', name: 'Walmart' },
        { id: 'store4', image: '/images/logos/sams-club.png', name: 'sams' },
        { id: 'store5', image: '/images/logos/farmacias-del-ahorro.png', name: 'farmaciasAhorro' },
        { id: 'store6', image: '/images/logos/farmacias-guadalajara.svg', name: 'farmaciasGuadalajara' },
        { id: 'store7', image: '/images/logos/bodega-aurrera.png', name: 'bodegaAurrera' }
      ]
    },
    ...paymentMethods
  ]

  const extendedPaymentMethods =
    typeof window !== 'undefined' && window.location.pathname === '/ecommerce/cart/'
      ? addInStorePaymentOption()
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
                  <Box sx={{ height: '100px' }}>
                    <Typography sx={{ fontWeight: 500 }}>{item.alias}</Typography>
                    <Box sx={{ mt: 8, display: 'flex', gap: 2 }}>
                      {item.stores.map(store => (
                        <img key={store.id} height={50} width='auto' alt={store.name} src={store.image} />
                      ))}
                    </Box>
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
                {item.id !== 'store' && (
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
