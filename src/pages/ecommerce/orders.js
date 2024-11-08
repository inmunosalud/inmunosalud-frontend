import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogActions, DialogContentText, Link } from '@mui/material'
import { cancelOrder, getOrdersByUser } from 'src/store/orders'
import { loadSession } from 'src/store/dashboard/generalSlice'
import { parseDate } from '../../utils/functions'

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

import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'

import CardContent from '@mui/material/CardContent'

import Image from 'next/image'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { closeSnackBar } from 'src/store/notifications'
import { Flag } from 'mdi-material-ui'
import ProblemFormModal from 'src/views/ecommerce/ProblemFormModal'

import { setModal } from 'src/store/contactus'
import { getUserInfo } from 'src/store/users'

const CardContentStyles = {
  margin: '10px 20px'
}
const InfoProductStyles = {
  display: 'flex',
  margin: '0px 40px',
  flexDirection: 'column'
}
const ProductContainer = {
  display: 'flex',
  marginTop: '90px'
}
const AdreessContainer = {
  display: 'flex',
  flexDirection: 'column'
}
const ImageStyle = {
  width: 40,
  heigth: 50,
  margin: '5px'
}
const DeliveryInfoStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  margin: '0px 15px',
  gap: '30px'
}
const ButtonActionStyles = {
  height: '50px',
  width: ' 50px'
}
const ProductInfoRowStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '100px',
  alignItems: 'center'
}
const OrderSumaryStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '30px'
}

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

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
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

const DeliveryInfo = ({ allOrderInfo }) => {
  const paymentMethod = allOrderInfo.paymentMethod

  return (
    <Grid container style={DeliveryInfoStyles} xs={12} sm={9}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Typography>
            <strong>Estatus del pedido</strong>
          </Typography>
          <Typography>{allOrderInfo.deliveryStatus}</Typography>
        </div>
        <div style={{ marginRight: '20px' }}>
          <Typography>
            <strong>Pedido realizado</strong>
          </Typography>
          <Typography>{allOrderInfo.purchaseDate}</Typography>
        </div>
      </div>
      <div>
        <Typography>
          <strong>Método de pago</strong>
        </Typography>
        <Typography>
          <span>{paymentMethod.cardType}</span> <span>{paymentMethod.cardNumber}</span>
        </Typography>
        <Typography>{paymentMethod.expDate}</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {allOrderInfo.deliveryStatus === 'Está en camino' || allOrderInfo.deliveryStatus === 'Entregado' ? (
          <div>
            <Typography>
              <strong>Envío:</strong>
            </Typography>
            <Typography>Compañia: {allOrderInfo.shipment.company}</Typography>
            <Typography>
              Guía de envío: <Link href={allOrderInfo.shipment.trackingUrl}>{allOrderInfo.shipment.id}</Link>
            </Typography>
          </div>
        ) : null}
        <div>
          <Typography>
            <strong>{allOrderInfo.deliveryStatus === 'Entregado' ? 'Entregado' : 'Entrega estimada'}</strong>
          </Typography>
          <Typography>
            {allOrderInfo.deliveryStatus === 'Entregado'
              ? allOrderInfo.deliveryDate
              : allOrderInfo.deliveryEstimateDate}
          </Typography>
        </div>
      </div>
      <section id='section-total-purchase'>
        <Typography>
          <strong>Resumen del pedido</strong>
        </Typography>
        <div style={OrderSumaryStyles}>
          <Typography>Productos</Typography>
          <Typography>${allOrderInfo.subtotal}</Typography>
        </div>
        <div style={OrderSumaryStyles}>
          <Typography>Envío</Typography>
          <Typography>${allOrderInfo.shippingCost}</Typography>
        </div>
        <div style={OrderSumaryStyles}>
          <Typography>IVA</Typography>
          <Typography>${allOrderInfo.iva}</Typography>
        </div>
        <div style={OrderSumaryStyles}>
          <Typography>
            <strong>Total (IVA incluido)</strong>
          </Typography>
          <Typography>${allOrderInfo.total}</Typography>
        </div>
      </section>
    </Grid>
  )
}

const Address = ({ address }) => {
  return (
    <Grid style={AdreessContainer} xs={12} sm={2} textAlign={{ xs: 'center', sm: 'initial' }}>
      <Typography variant='h3' style={{ fontSize: '19px', marginBottom: '10px' }}>
        <strong>Dirección de envío</strong>
      </Typography>
      <Typography style={{ marginBottom: '5px' }}>{`${address.street} ${address.extNumber}`}</Typography>
      <Typography style={{ marginBottom: '5px' }}>{`${address.colony}`}</Typography>
      <Typography style={{ marginBottom: '5px' }}>
        {`${address.city}, ${address.federalEntity}, ${address.zipCode}`}
      </Typography>
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
                <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                  <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                    <Typography variant='body2' className='col-title' sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}>
                      Articulo
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Image width={40} height={50} src={p.urlImage} />
                      <Typography sx={{ ml: 2 }}>{p.product}</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                    <Typography variant='body2' className='col-title' sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}>
                      Precio
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ ml: 2 }}>${p.price}</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                    <Typography variant='body2' className='col-title' sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}>
                      Cantidad
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ ml: 3 }}>{p.quantity}</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                    <Typography variant='body2' className='col-title' sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}>
                      Total
                    </Typography>
                    <Typography>${p.total}</Typography>
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

const Actions = ({ onHandleModal = () => {}, status = '', purchaseDate = '' }) => {
  const currentDate = new Date()
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000 // 1 día en milisegundos

  // Convierte la cadena de fecha en un objeto Date
  const parsedDate = parseDate(purchaseDate)

  // Verifica si la fecha actual + 1 día es posterior a la fecha del pedido
  const isCancelable = parsedDate.getTime() + oneDayInMilliseconds > currentDate.getTime()

  if (status === 'Está en camino' || status === 'Cancelado' || status === 'Entregado' || !isCancelable) {
    return <div style={ButtonActionStyles} />
  }

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
  const { user } = useSelector(state => state.dashboard.general)

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const submitDelete = () => {
    dispatch(cancelOrder(props?.id))
    dispatch(getUserInfo(user?.id))
    setOpenModal(false)
  }

  const products = props.products
  const address = props.address

  return (
    <>
      <Card sx={{ margin: '45px 0px' }}>
        <CardContent style={CardContentStyles}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Grid
              container
              id='header-info'
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <Address address={address} />
              <DeliveryInfo allOrderInfo={props} />
              <Actions
                onHandleModal={handleOpenModal}
                status={props.deliveryStatus}
                purchaseDate={props.purchaseDate}
              />
            </Grid>
            <Divider />
            <RepeaterWrapper>
              <Product products={products} />
            </RepeaterWrapper>
          </div>
        </CardContent>
      </Card>
      <Modal open={openModal} onHandleOpenModal={handleOpenModal} onSubmitDelete={submitDelete} />
    </>
  )
}

const Orders = () => {
  const dispatch = useDispatch()
  const { user, isLoadingSession } = useSelector(state => state.dashboard.general)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { orders, isLoading } = useSelector(state => state.orders)

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

  if (isLoading || isLoadingSession) {
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

      {/* <ProblemFormModal  /> */}
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </React.Fragment>
  )
}

export default Orders
