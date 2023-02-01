// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import PreviewCard from 'src/views/apps/invoice/preview/PreviewCard'
import PreviewActions from 'src/views/apps/invoice/preview/PreviewActions'

import CheckoutCard from 'src/views/ecommerce/CheckoutCard'
import CheckoutActions from 'src/views/ecommerce/CheckoutActions'

const InvoicePreview = ({}) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <CheckoutCard data={data} />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <CheckoutActions />
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
