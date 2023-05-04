import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Divider, Typography, Button, Tooltip, Dialog, DialogContent, DialogActions, DialogContentText, Box} from '@mui/material'
import { deleteOrder, getOrdersByUser } from 'src/store/orders'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline' 

const CardContentStyles = {
  margin: "10px 20px",
}
const InfoProductStyles = {
  display: "flex",
  margin: "0px 40px",
  flexDirection: "column"
}
const ProductContainer = {
  display: "flex",
  marginTop: "90px"
}
const AdreessContainer = {
  display: "flex",
  flexDirection: "column"
}
const ImageStyle = {
  width: "150px",
  heigth: "150px",
  margin: "5px"
}
const DeliveryInfoStyles = {
  display: "flex",
  justifyContent: "space-around",
  margin: "0px 15px",
  gap:"30px"
}
const ButtonActionStyles = {
  height: "50px",
  width: " 50px",
}
const ProductInfoRowStyles = {
  display: "flex",
  justifyContent: "space-between",
  gap: "100px",
  alignItems: "center",
}

const OrderSumaryStyles = {
  display: "flex",
  justifyContent: "space-between", 
  gap: "30px"
}


const Modal = ({
  open = false,
  onHandleOpenModal = () => { },
  onSubmitDelete = () => {}
}) => {
  
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>
          Estas seguro de cancelar tu pedido?
        </DialogContentText>
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
    <section style={DeliveryInfoStyles}>
      <div>
        <Typography><strong>Status del pedido </strong></Typography>
        <Typography>{allOrderInfo.deliveryStatus}</Typography>
      </div>
      <div>
        <Typography><strong>Metodo de pago</strong></Typography>
        <Typography ><span>{paymentMethod.cardType}</span> {" "} <span>{paymentMethod.cardNumber}</span></Typography>
        <Typography>{paymentMethod.expDate}</Typography>
      </div>
      <div style={{
        display: "flex",
        margin: "0 110px",
        justifyContent: "space-between",
        gap: "10px"
      }}>
        <div>
          <Typography><strong>Pedido realizado</strong></Typography>
          <Typography>{allOrderInfo.purchaseDate}</Typography>
        </div>
        <div>
          <Typography><strong>Entrega estimada</strong></Typography>
          <Typography>{allOrderInfo.deliveryEstimateDate}</Typography>
        </div>
        <section id='section-total-purchase' style={{margin: "0 16px"}}>
          <Typography><strong>Resumen del pedido</strong></Typography>
          <div style={OrderSumaryStyles}>
            <Typography>Productos</Typography>
            <Typography>${allOrderInfo.subtotal}</Typography>
          </div>
          <div style={OrderSumaryStyles}>
            <Typography>Envio</Typography>
            <Typography>${allOrderInfo.shippingCost}</Typography>
          </div>
          <div style={OrderSumaryStyles}>
            <Typography>IVA</Typography>
            <Typography>${allOrderInfo.iva}</Typography>
          </div>
          <div style={OrderSumaryStyles}>
            <Typography><strong>Total(IVA incluido)</strong></Typography>
            <Typography>${allOrderInfo.total}</Typography>
          </div>
        </section>
      </div>
    </section>
  )
}

const Address = ({address}) => {
  return (
    <section style={AdreessContainer}>
      <Typography variant='h3' style={{fontSize:'19px'}}>
        <strong>Direccion de envio</strong>
      </Typography>
      <Typography>
        {`${address.street} ${address.extNumber}`}
      </Typography>
      <Typography>
        {`${address.colony}`}
      </Typography>
      <Typography>
        {`${address.city}, ${address.federalEntity}, ${address.zipCode}`}
      </Typography>
    </section>
  )
}

const Product = ({ products }) => {
  return (
  <>
    {products?.map((p, i) => (
        <section key={i} style={ProductContainer}>
          <img style={ImageStyle} src={p.urlImage} />
          <section style={InfoProductStyles}> 
            <div style={{marginBottom: "10px"}}>
              <Typography><strong>{p.product}</strong></Typography>
            </div>
            <div style={ProductInfoRowStyles}>
              <Typography>{`Precio: $${p.price}`}</Typography>
              <Typography>{`${p.quantity} articulos`}</Typography>
              <Typography>{`Total: $${p.total}`}</Typography>
            </div>
          </section>
      </section>
      ))}
  </>
  )
}

const Actions = ({ onHandleModal = () => { } }) => {
  return (
    <Tooltip title="Cancelar pedido" arrow>
      <Button
        style={ButtonActionStyles}
        onClick={onHandleModal}
      >
        <TrashCanOutline/>
      </Button>
    </Tooltip>
    
  )
}

const Cards = (props) => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = React.useState(false)
  
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const submitDelete = () => {
    dispatch(deleteOrder(props?.id))
  }
  
  const products = props.products
  const address = props.address
  
  return (
    <>
    <Card sx={{margin: "45px 0px"}}>
      <CardContent style={CardContentStyles}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div id='header-info' style={{display: "flex", justifyContent: "space-between" , width: "100%"}}>
            <Address address={address} />
            <DeliveryInfo allOrderInfo={props} />
            <Actions onHandleModal={handleOpenModal} />
          </div>
          <Divider />
          <Product products={products}/>
        </div>
      </CardContent>
      </Card>
      <Modal open={openModal} onHandleOpenModal={handleOpenModal} onSubmitDelete={submitDelete} />
    </>
  )
}



const Orders = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.session)
  const { orders, isLoading, messageValid } = useSelector(state => state.orders)
  console.log({orders});
  React.useEffect(() => {
    dispatch(getOrdersByUser(user?.id))
  }, [])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex',justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
        <Typography>{`Cargando tus pedidos...`}</Typography>
      </Box>
    )
    
  }

  if (!orders.length) {
    return (
      <Box sx={{ display: 'flex',justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
        <Typography>{`Orden(es) no encontrada(s).`}</Typography>
      </Box>
    )
  }

  return (
    <React.Fragment>
      {orders.length && orders.map((order) => (
        <Cards
          key={order.id}
          {...order}
        />
      ))}
    </React.Fragment>
  )
}


export default Orders