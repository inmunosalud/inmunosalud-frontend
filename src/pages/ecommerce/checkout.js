// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import CheckoutCard from 'src/views/ecommerce/CheckoutCard'
import CheckoutActions from 'src/views/ecommerce/CheckoutActions'
import { createOrder } from 'src/store/orders'
import { getUserInfo } from 'src/store/users'
import { loadSession } from 'src/store/session'
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
  const { user } = useSelector(state => state.session)
  const { userInfo } = useSelector(state => state.users)
  const { selectedPayment, selectedAddress } = useSelector(state => state.cart)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { isLoading, cvv } = useSelector(state => state.orders)
  const [retryCount1, setRetryCount1] = React.useState(0)
  const [retryCount2, setRetryCount2] = React.useState(null)
  const MAX_RETRY = 5
  const [dataReceivedScript1, setDataReceivedScript1] = React.useState(false) // Bandera para controlar si se recibió la data
  const [dataReceivedScript2, setDataReceivedScript2] = React.useState(false) // Bandera para controlar si se recibió la data
  const [maxRetriesReached1, setMaxRetriesReached1] = React.useState(false)
  const [maxRetriesReached2, setMaxRetriesReached2] = React.useState(false)

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

  useEffect(() => {
    const timestampInSeconds = Math.floor(Date.now() / 1000)

    const loadOpenPayScript1 = () => {
      const script1 = document.createElement('script')
      script1.src = `https://resources.openpay.mx/lib/openpay-js/1.2.38/openpay.v1.min.js?timestamp=${timestampInSeconds}`
      script1.async = false

      const onLoadScript1 = () => {
        if (!dataReceivedScript1 || !maxRetriesReached1) {
          if (
            window.OpenPay &&
            typeof window.OpenPay === 'function' &&
            window.OpenPay.setId &&
            typeof window.OpenPay.setId === 'function' &&
            window.OpenPay.setApiKey &&
            typeof window.OpenPay.setApiKey === 'function'
          ) {
            setOpenPayObject(window.OpenPay)
            setDataReceivedScript1(true)
            setRetryCount2(0)
          } else {
            console.error('OpenPay object not found or invalid', window.OpenPay)
            if (!maxRetriesReached1 && retryCount1 < MAX_RETRY) {
              setTimeout(() => {
                setRetryCount1(retryCount1 + 1)
              }, 500)
            } else {
              console.error('Exceeded maximum retry attempts')
              setMaxRetriesReached1(true)
            }
          }
        }
      }

      script1.addEventListener('load', onLoadScript1)
      document.body.appendChild(script1)

      return () => {
        script1.removeEventListener('load', onLoadScript1)
        document.body.removeChild(script1)
      }
    }

    if (!dataReceivedScript1) {
      loadOpenPayScript1()
    }
  }, [retryCount1])

  useEffect(() => {
    const timestampInSeconds = Math.floor(Date.now() / 1000)

    const loadOpenPayScript2 = () => {
      const script2 = document.createElement('script')
      script2.src = `https://resources.openpay.mx/lib/openpay-data-js/1.2.38/openpay-data.v1.min.js?timestamp=${timestampInSeconds}`
      script2.async = false

      const onLoadScript2 = () => {
        if (!dataReceivedScript2 || maxRetriesReached2) {
          if (
            window.OpenPay &&
            window.OpenPay.deviceData &&
            window.OpenPay.deviceData.setup &&
            typeof window.OpenPay.deviceData.setup === 'function'
          ) {
            window.OpenPay.setSandboxMode(process.env.NODE_ENV !== 'production')
            window.OpenPay.setId(OPENPAY_ID)
            window.OpenPay.setApiKey(OPENPAY_KEY)
            const deviceSessionId = window.OpenPay.deviceData.setup()
            if (deviceSessionId && typeof deviceSessionId === 'string') {
              setDeviceData(deviceSessionId)
              setDataReceivedScript2(true)
            } else {
              console.error('Invalid device session ID:', deviceSessionId)
              if (!maxRetriesReached2 && retryCount2 < MAX_RETRY) {
                setTimeout(() => {
                  setRetryCount2(retryCount2 + 1)
                }, 500)
              } else {
                console.error('Exceeded maximum retry attempts')
                setMaxRetriesReached2(true)
                return
              }
            }
          } else {
            console.error('OpenPay object or setup function not found or invalid')
            if (!maxRetriesReached2 && retryCount2 < MAX_RETRY) {
              setTimeout(() => {
                setRetryCount2(retryCount2 + 1)
              }, 500)
            } else {
              console.error('Exceeded maximum retry attempts')
              setMaxRetriesReached2(true)
              return
            }
          }
        }
      }

      script2.addEventListener('load', onLoadScript2)
      document.body.appendChild(script2)

      return () => {
        script2.removeEventListener('load', onLoadScript2)
        document.body.removeChild(script2)
      }
    }

    if (dataReceivedScript1) {
      loadOpenPayScript2()
    }
  }, [retryCount2])

  useEffect(() => {
    if (maxRetriesReached2 || maxRetriesReached1)
      dispatch(
        openSnackBar({
          open: true,
          message: 'Estamos teniendo problemas con el sistema de pago, vuelve a iniciar sesión o inténtalo mas tarde',
          severity: 'error'
        })
      )
  }, [maxRetriesReached2, maxRetriesReached1])

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
