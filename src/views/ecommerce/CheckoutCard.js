// ** React Imports
import { useRef } from 'react'

// ** Next Import
import Link from 'next/link'

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

// ** Third Party Imports
import ReactToPdf from 'react-to-pdf'
import moment from 'moment'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { useSelector } from 'react-redux'
import Image from 'next/image'

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
  ];

  const date = moment(new Date()).format('MM/DD/YYYY').split('/');
  const month = Number(date[0]) - 1;

  return `${date[1]} de ${months[month]} del ${date[2]}`;
};


const CheckoutCard = ({ data }) => {
  // ** Hook
  const theme = useTheme()

  // ** Selectors
  const { total, products, selectedPaymentMethod, selectedAddressInCard, userInfo } = data

  console.log(products)

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
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <svg
                    width={30}
                    height={25}
                    version='1.1'
                    viewBox='0 0 30 23'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                  >
                    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                      <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                        <g id='logo' transform='translate(95.000000, 50.000000)'>
                          <path
                            id='Combined-Shape'
                            fill={theme.palette.primary.main}
                            d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                            transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                            transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.15'
                            fill={theme.palette.common.white}
                            d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.35'
                            fill={theme.palette.common.white}
                            transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                            d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <Typography
                    variant='h6'
                    sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                  >
                    {themeConfig.templateName}
                  </Typography>
                </Box>

                {userInfo && selectedPaymentMethod && selectedAddressInCard ? (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant='h6' sx={{ mb: 1 }}>
                        Dirección
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 1 }}>
                        {selectedAddressInCard
                          ? `${selectedAddressInCard.street ?? ''} ${selectedAddressInCard.extNumber ?? ''} ${
                              selectedAddressInCard.intNumber ? `- ${selectedAddressInCard.intNumber}` : ''
                            }`
                          : null}
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 1 }}>
                        {selectedAddressInCard
                          ? `${selectedAddressInCard.colony ?? ''}, ${selectedAddressInCard.zipCode ?? ''}, ${
                              selectedAddressInCard.federalEntity ?? ''
                            }, ${selectedAddressInCard.country ?? ''}`
                          : null}
                      </Typography>
                      <Typography variant='body2'>
                        {userInfo.phone ? formatPhoneNumber(userInfo.phone) : null}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='h6' sx={{ mb: 1 }}>
                        Método de pago
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 1 }}>
                        {selectedPaymentMethod
                          ? `${selectedPaymentMethod.cardType} - ${selectedPaymentMethod.cardNumber.slice(-4)}`
                          : null}
                      </Typography>
                    </Box>
                  </>
                ) : null}
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
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
              </Box>
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
                      <img width={30} height={40} alt='Apple iPhone 11 Pro' src={product.urlImage} />
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

        <Divider />

        <CardContent>
          <Typography variant='body2'>
            <strong>Nota:</strong>
          </Typography>
        </CardContent>
      </Box>
      <CardContent>
        <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'flex-end' }}></Box>
      </CardContent>
    </Card>
  )
}

export default CheckoutCard
