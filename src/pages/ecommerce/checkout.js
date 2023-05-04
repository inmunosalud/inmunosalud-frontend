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
  const { paymentMethods } = useSelector(state => state.paymentMethods)
  const { address } = useSelector(state => state.address)

  const data = {
    products,
    total,
    paymentMethods,
    address,
    userInfo
  }

  const handleConfirmOrder = () => {
    console.log('send order')
    // const body = {
    //   idAddress,
    //   idPaymentMethod,
    //   products,
    //   idUser: user?.id
    // }

    // dispatch(createOrder(body))
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
