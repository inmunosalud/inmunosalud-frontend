import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogActions, DialogContentText, Link } from '@mui/material'
import { cancelOrder, getOrdersByUser } from 'src/store/orders'
import { loadSession } from 'src/store/session'
import { parseDate } from '../../utils/functions'
import moment from 'moment'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Badge from '@mui/material/Badge'
import Image from 'next/image'
import { closeSnackBar } from 'src/store/notifications'
import { Flag } from 'mdi-material-ui'
import ProblemFormModal from 'src/views/ecommerce/ProblemFormModal'

import { setModal } from 'src/store/contactus'
import { getUserInfo } from 'src/store/users'

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const Modal = ({ open = false, onHandleOpenModal = () => {}, onSubmitDelete = () => {} }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>¿Estas seguro de cancelar tu pedido?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHandleOpenModal}>Regresar</Button>
        <Button onClick={onSubmitDelete}>Cancelar Pedido</Button>
      </DialogActions>
    </Dialog>
  )
}

const DeliveryInfo = ({ allOrderInfo, address }) => {
  return (
    <Grid container>
      <Grid xs={12} md={3} sx={{ mb: { md: '0px', xs: '15px' } }}>
        <Box>
          <Typography>
            <strong>Dirección de envío</strong>
          </Typography>
          <Typography>{`${address.street} ${address.extNumber}`}</Typography>
          <Typography>{`${address.neighborhood}`}</Typography>
          <Typography>{`${address.city}, ${address.federalEntity}, ${address.zipCode}`}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3} sx={{ mb: { lg: 0, xs: 4 } }}>
        <Typography variant='body1' sx={{ mb: 3.5, fontWeight: 600 }}>
          Método de pago:
        </Typography>
        <Typography variant='body2' sx={{ mb: 2 }}>
          {allOrderInfo?.type === 'store' ? 'Efectivo' : `Tarjeta: `}
        </Typography>
        {allOrderInfo?.type === 'store' ? (
          <>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              {[
                { id: 'store1', image: '/images/logos/seven-eleven.png', name: '7-Eleven' },
                { id: 'store2', image: '/images/logos/kiosko.png', name: 'kiosko' },
                { id: 'store3', image: '/images/logos/walmart.jpg', name: 'Walmart' },
                { id: 'store4', image: '/images/logos/sams-club.png', name: 'sams' },
                { id: 'store5', image: '/images/logos/farmacias-del-ahorro.png', name: 'farmaciasAhorro' },
                { id: 'store6', image: '/images/logos/farmacias-guadalajara.svg', name: 'farmaciasGuadalajara' },
                { id: 'store7', image: '/images/logos/bodega-aurrera.png', name: 'bodegaAurrera' }
              ].map(store => (
                <img key={store.id} height={50} width='auto' alt={store.name} src={store.image} />
              ))}
            </Box>
          </>
        ) : (
          <>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {allOrderInfo?.paymentMethod}
            </Typography>
          </>
        )}
      </Grid>
      <Grid item xs={12} md={3} sx={{ mb: { md: '0px', xs: '15px' } }}>
        <Box>
          {(allOrderInfo.deliveryStatus === 'Está en camino' || allOrderInfo.deliveryStatus === 'Entregado') && (
            <Box sx={{ width: '100%' }}>
              <Typography>
                <strong>Envío:</strong>
              </Typography>
              <Typography>Compañia: {allOrderInfo.shipment.company}</Typography>
              <Typography>
                Guía de envío: <Link href={allOrderInfo.shipment.trackingUrl}>{allOrderInfo.shipment.id}</Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <section id='section-total-purchase'>
          <Typography>
            <strong>Resumen del pedido</strong>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '60px' }}>
            <Typography>Productos</Typography>
            <Typography>${allOrderInfo.subtotal}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '60px' }}>
            <Typography>Envío</Typography>
            <Typography>${allOrderInfo.shippingCost}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '60px' }}>
            <Typography>IVA</Typography>
            <Typography>${allOrderInfo.iva}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '60px' }}>
            <Typography>
              <strong>Total (IVA incluido)</strong>
            </Typography>
            <Typography>${allOrderInfo.total}</Typography>
          </Box>
        </section>
      </Grid>
    </Grid>
  )
}

const Product = ({ products }) => {
  return (
    <>
      {products?.map((p, i) => {
        const Tag = i === 0 ? Box : Collapse

        return (
          <Tag key={p.id} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
            <Grid container>
              <RepeatingContent item xs={12}>
                <Grid container sx={{ py: 4, px: 4, textAlign: { xs: 'center', md: 'left' } }}>
                  <Grid item md={0.8} xs={12}>
                    <Box sx={{ ml: 3, mr: 3, mt: 0.5 }}>
                      <Badge
                        key={1}
                        badgeContent={p.quantity === 1 ? 0 : p.quantity}
                        color='primary'
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right'
                        }}
                      >
                        <Image width={40} height={50} alt='img' src={p.urlImage} />
                      </Badge>
                    </Box>
                  </Grid>
                  <Grid item md={10.2} xs={12} sx={{ py: 4 }}>
                    <Typography sx={{ ml: 3, mt: 0.5 }}>
                      <strong>{p.product}</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={1} xs={12}>
                    <Box sx={{ display: 'flex-end', alignItems: 'right', width: '100%', textAlign: 'right' }}>
                      <Typography variant='h5' sx={{ ml: 3, mt: 3.5 }}>
                        <strong>${p.total}</strong>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </RepeatingContent>
            </Grid>
          </Tag>
        )
      })}
    </>
  )
}

const Actions = ({ onHandleModal = () => {} }) => {
  return (
    <Tooltip title='Cancelar pedido' arrow>
      <Button variant='contained' onClick={onHandleModal}>
        Cancelar Pedido
      </Button>
    </Tooltip>
  )
}

const Cards = props => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = React.useState(false)
  const { user } = useSelector(state => state.session)
  const currentDate = new Date()
  const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000

  const parsedDate = parseDate(props.purchaseDate)

  const isCancelable = parsedDate.getTime() + twelveHoursInMilliseconds > currentDate.getTime()

  const products = props.products
  const address = props.address
  const totalQuantity = products.reduce((accumulator, product) => {
    if (typeof product.quantity === 'number') {
      return accumulator + product.quantity
    } else {
      return accumulator
    }
  }, 0)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const openpayId = urlParams.get('id')
    if (openpayId && props.openpay?.id === openpayId) {
      props.setExpandedIndex(props.index)
    }
  }, [])

  const handleChange = index => {
    props.setExpandedIndex(prevIndex => (prevIndex === index ? null : index))
  }

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const submitDelete = () => {
    dispatch(cancelOrder(props?.id))
    dispatch(getUserInfo(user?.id))
    setOpenModal(false)
  }

  return (
    <>
      <Card sx={{ margin: '20px 0px' }}>
        <Accordion
          expanded={props.index === props.expandedIndex}
          onChange={() => handleChange(props.index)}
          slotProps={{ transition: { unmountOnExit: true } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${props.index + 1}-content`}
            id={`panel${props.index + 1}-header`}
          >
            <Grid container spacing={4}>
              <Grid item xs={5} md={4}>
                <Box sx={{ flexShrink: 0 }}>
                  <Typography sx={{ fontSize: { md: '16px', xs: '15px' } }}>
                    <strong>Pedido realizado</strong>
                  </Typography>
                  <Typography sx={{ fontSize: { md: '14px', xs: '13px' } }}>{props.purchaseDate}</Typography>
                </Box>
              </Grid>
              <Grid item xs={7} md={8}>
                <Grid container>
                  {props.deliveryStatus !== 'Entregado' && (
                    <Grid item xs={12} md={6}>
                      <Box sx={{ flexShrink: 0 }}>
                        <Typography sx={{ fontSize: { md: '16px', xs: '15px' } }}>
                          <strong>Estatus del pedido</strong>
                        </Typography>
                        <Typography sx={{ fontSize: { md: '14px', xs: '13px' } }}>{props.deliveryStatus}</Typography>
                      </Box>
                    </Grid>
                  )}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography sx={{ fontSize: { md: '16px', xs: '15px' } }}>
                        <strong>{props.deliveryStatus === 'Entregado' ? 'Entregado' : 'Entrega estimada'}</strong>
                      </Typography>
                      <Typography sx={{ fontSize: { md: '14px', xs: '13px' } }}>
                        {props.deliveryStatus === 'Entregado' ? props.deliveryDate : props.deliveryEstimateDate}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <CardContent>
              <Box>
                <DeliveryInfo allOrderInfo={props} address={address} />

                <Divider />
                <Box sx={{ width: '100%' }}>
                  <RepeaterWrapper>
                    <Product products={products} />
                  </RepeaterWrapper>
                </Box>
              </Box>
            </CardContent>
          </AccordionDetails>
          {
            //cancelable
          }
          {props.deliveryStatus === 'Confirmando el Pago' && isCancelable && (
            <AccordionActions>
              <CardActions sx={{ mx: { xs: 'auto', md: '0' } }}>
                <Actions onHandleModal={handleOpenModal} />
              </CardActions>
            </AccordionActions>
          )}
        </Accordion>
      </Card>

      <Modal open={openModal} onHandleOpenModal={handleOpenModal} onSubmitDelete={submitDelete} />
    </>
  )
}

const Orders = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.session)
  const { orders, isLoading } = useSelector(state => state.orders)

  const [expandedIndex, setExpandedIndex] = React.useState(null)

  React.useEffect(() => {
    if (!user) {
      dispatch(loadSession())
    }
  }, [])

  React.useEffect(() => {
    if (!user) {
      dispatch(loadSession())
    }
  }, [])

  React.useEffect(() => {
    if (user?.id) {
      dispatch(getOrdersByUser(user.id))
    }
  }, [user])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
        <Typography>{`Cargando tus pedidos...`}</Typography>
      </Box>
    )
  }

  if (!orders.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
        <Typography>{`Orden(es) no encontrada(s).`}</Typography>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          onClick={() => {
            dispatch(setModal(true))
          }}
        >
          <Flag sx={{ mr: 2, fontSize: '1.125rem' }} />
          Tengo un problema
        </Button>
      </Box>
      {orders.length &&
        orders.map((order, index) => (
          <Cards
            key={order.id}
            index={index}
            expandedIndex={expandedIndex}
            setExpandedIndex={setExpandedIndex}
            {...order}
          />
        ))}
      {/* <ProblemFormModal  /> */}
    </React.Fragment>
  )
}

export default Orders
