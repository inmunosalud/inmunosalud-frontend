// ** React Imports
import { useRef, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import BlancoIotipo from '/public/images/logos/Blanco-Isotipo.png'
import NegroIotipo from '/public/images/logos/Negro-Isotipo.png'
// ** Third Party Imports
import ReactToPdf from 'react-to-pdf'
import moment from 'moment'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { useSelector } from 'react-redux'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))

const getDate = () => {
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]

  const date = moment(new Date()).format('DD/MM/YYYY').split('/')

  const month = date[1].charAt(0) === 0 ? Number(date[1].charAt(1)) : Number(date[1])

  return `${date[0]} de ${months[month - 1]} de ${date[2]}`
}

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const getCurrentDate = () => {
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]

  const date = moment(new Date()).format('MM/DD/YYYY').split('/')
  const month = Number(date[0]) - 1

  return `${date[1]} de ${months[month]} del ${date[2]}`
}

const CheckoutCard = ({ data }) => {
  // ** Hook
  const theme = useTheme()
  const { user } = useSelector(state => state.session)
  const { total, products, selectedPayment, selectedAddress } = useSelector(state => state.cart)
  const { storeOrder } = useSelector(state => state.orders)
  // ** Selectors

  // ** Ref
  const PreviewRef = useRef(null)

  const formatPhoneNumber = str => {
    return
    let match = ''
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '')

    //Check if the input is of correct length
    if (str.slice(0, 2) == '33' || str.slice(0, 2) == '55' || str.slice(0, 2) == '81') {
      match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/)
    } else {
      match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    }

    if (match) {
      return '(' + match[1] + ') ' + match[2] + ' - ' + match[3]
    }

    return null
  }

  return (
    <Card>
      <Box ref={PreviewRef}>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <Image src={theme.palette.mode === 'dark' ? BlancoIotipo : NegroIotipo} alt='Isotipo' height={50} />
              </Box>
              <Image src='/images/logos/openpay.png' alt='OpenPay Logo' layout='fixed' height={50} width={200} />
            </Grid>
            {user && selectedPayment && selectedAddress ? (
              <>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='h6' sx={{ mb: 1 }}>
                      Dirección
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 1 }}>
                      {selectedAddress
                        ? `${selectedAddress.street ?? ''} ${selectedAddress.extNumber ?? ''} ${
                            selectedAddress.intNumber ? `- ${selectedAddress.intNumber}` : ''
                          }`
                        : null}
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 1 }}>
                      {selectedAddress
                        ? `${selectedAddress.colony ?? ''}, ${selectedAddress.zipCode ?? ''}, ${
                            selectedAddress.federalEntity ?? ''
                          }, ${selectedAddress.country ?? ''}`
                        : null}
                    </Typography>
                    <Typography variant='body2'>{user.phone ? formatPhoneNumber(user.phone) : null}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mb: { lg: 0, xs: 4 } }}>
                  <Typography variant='body1' sx={{ mb: 3.5, fontWeight: 600 }}>
                    Método de pago:
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    {selectedPayment?.id === 'store' ? 'Efectivo' : `Tarjeta: ${selectedPayment?.cardType}`}
                  </Typography>
                  {selectedPayment?.id === 'store' ? (
                    <>
                      <Box>
                        {[
                          { id: 'store1', image: '/images/logos/seven-eleven.png', name: '7-Eleven' },
                          { id: 'store2', image: '/images/logos/kiosko.png', name: 'kiosko' },
                          { id: 'store3', image: '/images/logos/walmart.jpg', name: 'Walmart' },
                          { id: 'store4', image: '/images/logos/sams-club.png', name: 'sams' }
                        ].map(store => (
                          <img key={store.id} height={50} width='auto' alt={store.name} src={store.image} />
                        ))}
                      </Box>
                      <Box>
                        {[
                          { id: 'store5', image: '/images/logos/farmacias-del-ahorro.png', name: 'farmaciasAhorro' },
                          {
                            id: 'store6',
                            image: '/images/logos/farmacias-guadalajara.svg',
                            name: 'farmaciasGuadalajara'
                          },
                          { id: 'store7', image: '/images/logos/bodega-aurrera.png', name: 'bodegaAurrera' }
                        ].map(store => (
                          <img key={store.id} height={50} width='auto' alt={store.name} src={store.image} />
                        ))}
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        Alias: {selectedPayment?.alias}
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        Nombre: {selectedPayment?.nameOnCard}
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        Numero: XXXXXX{selectedPayment?.cardNumber.slice(-4)}
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        Fecha: {selectedPayment?.expDate}
                      </Typography>
                    </>
                  )}
                </Grid>
              </>
            ) : null}
            <Grid item sm={4} xs={12}>
              <Table sx={{ maxWidth: '200px' }}>
                <TableBody>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='h6'>Checkout</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Fecha: {getCurrentDate()}</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        {/* {data.invoice.issuedDate} */}
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img width={30} height={40} alt='img' src={product.urlImage} />
                    </TableCell>
                    <TableCell>{product.product}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>${product.total}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
              <Typography variant='body2'>Gracias por su compra</Typography>
            </Grid>
            <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <CalcWrapper>
                <Typography variant='body2'>Subtotal:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.subtotal}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Monto de envío:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.shippingCost}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>IVA:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.iva}
                </Typography>
              </CalcWrapper>
              <Divider />
              <CalcWrapper>
                <Typography variant='body2'>Total:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  ${total.total}
                </Typography>
              </CalcWrapper>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  )
}

export default CheckoutCard
