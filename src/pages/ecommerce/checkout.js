// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import CheckoutCard from 'src/views/ecommerce/CheckoutCard'
import CheckoutActions from 'src/views/ecommerce/CheckoutActions'
import { createOrder } from 'src/store/orders'
import { loadInfo } from 'src/store/paymentMethods'
import { getUserInfo } from 'src/store/users'
import { loadSession } from 'src/store/dashboard/generalSlice'
import { updateCart } from 'src/store/cart'
import { getCart } from 'src/store/cart'

const InvoicePreview = ({}) => {
  const dispatch = useDispatch()
  // ** State
  const [error, setError] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const { total, products, id } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.dashboard.general)
  const { userInfo } = useSelector(state => state.users)
  const { selectedPaymentMethod } = useSelector(state => state.paymentMethods)
  const { selectedAddressInCard } = useSelector(state => state.address)

  const data = {
    products,
    total,
    selectedPaymentMethod,
    selectedAddressInCard,
    userInfo
  }

  const handleConfirmOrder = () => {
    const body = {
      idAddress: selectedAddressInCard.id,
      idUser: userInfo.id,
      idPaymentMethod: selectedPaymentMethod.id,
      products: products.map(product => {
        return { id: product.id, quantity: product.quantity }
      })
    }
    dispatch(createOrder(body)).then(res => {
      if (res.payload.message === 'Orden creada.') {
        dispatch(getCart(userInfo.id))
        //products.forEach(product => dispatch(updateCart({ id: userInfo.id, body: { id: product.id, quantity: 0 } })))
      }
    })
  }

  useEffect(() => {
    if (!user.id) dispatch(loadSession())
    dispatch(loadInfo(user.id))
    dispatch(getUserInfo(user.id))
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <CheckoutCard data={data} />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <CheckoutActions onHandleConfirmOrder={handleConfirmOrder} />
          {/* <PreviewActions
            id={id}
            toggleAddPaymentDrawer={toggleAddPaymentDrawer}
            toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
          /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default InvoicePreview
