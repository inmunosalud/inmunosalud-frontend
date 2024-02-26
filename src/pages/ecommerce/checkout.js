// ** React Imports
import { useState, useEffect } from 'react'
import Script from 'next/script'
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
import { setDeviceSessionId, setOpenPay } from 'src/store/paymentMethods'
import { OPENPAY_ID, OPENPAY_KEY } from 'src/services/api'
import { openSnackBar } from 'src/store/notifications'

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
  const { isLoading, cvv } = useSelector(state => state.orders)
  const timestampInSeconds = Math.floor(Date.now() / 1000)

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

  const setOpenPayObject = openPay => {
    dispatch(setOpenPay(openPay))
  }

  const setDeviceData = deviceSessionId => {
    dispatch(setDeviceSessionId(deviceSessionId))
  }
  const handleConfirmOrder = () => {
    const body = {
      idAddress: selectedAddress.id,
      idPaymentMethod: selectedPayment.id,
      products: products.map(product => {
        return { id: product.id, quantity: product.quantity }
      })
    }
    dispatch(createOrder({ idUser: userInfo.id, body, cvv }))
  }

  return (
    <>
      <Script
        src={`https://resources.openpay.mx/lib/openpay-js/1.2.38/openpay.v1.min.js?timestamp=${timestampInSeconds}`}
        onLoad={() => {
          setOpenPayObject(OpenPay)
        }}
        strategy={'beforeInteractive'}
        onError={e => {
          console.error('Script failed to load', e)
          openSnackBar({
            open: true,
            message: 'Error en el sistema de pagos intenta iniciando sesión nuevamente',
            severity: 'error'
          })
        }}
      />
      <Script
        src={`https://resources.openpay.mx/lib/openpay-data-js/1.2.38/openpay-data.v1.min.js?timestamp=${timestampInSeconds}`}
        onLoad={() => {
          OpenPay.setId(OPENPAY_ID)
          OpenPay.setApiKey(OPENPAY_KEY)
          const deviceSessionId = OpenPay.deviceData.setup()
          setDeviceData(deviceSessionId)
        }}
        strategy={'beforeInteractive'}
        onError={e => {
          console.error('Script failed to load', e)
          openSnackBar({
            open: true,
            message: 'Error en el sistema de pagos intenta iniciando sesión nuevamente',
            severity: 'error'
          })
        }}
      />
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
