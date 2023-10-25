// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import CheckoutCard from 'src/views/ecommerce/CheckoutCard'
import CheckoutActions from 'src/views/ecommerce/CheckoutActions'
import { createOrder } from 'src/store/orders'
import { getUserInfo } from 'src/store/users'
import { loadSession } from 'src/store/dashboard/generalSlice'
import { updateCart } from 'src/store/cart'
import { getCart } from 'src/store/cart'
import { closeSnackBar } from 'src/store/notifications'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import BackDropLoader from 'src/views/components/loaders/BackDropLoader'

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
  const { selectedPayment, selectedAddress } = useSelector(state => state.cart)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { isLoading } = useSelector(state => state.orders)

  const data = {
    products,
    total,
    selectedPayment,
    selectedAddress,
    selectedPayment,
    selectedAddress,
    selectedPayment,
    selectedAddress,
    selectedPayment,
    selectedAddress,
    userInfo
  }

  const handleConfirmOrder = () => {
    const body = {
      idAddress: selectedAddress.id,
      idPaymentMethod: selectedPayment.id,
      products: products.map(product => {
        return { id: product.id, quantity: product.quantity }
      })
    }
    dispatch(createOrder({ idUser: userInfo.id, body }))
  }

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

      <BackDropLoader isLoading={isLoading} />
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default InvoicePreview
