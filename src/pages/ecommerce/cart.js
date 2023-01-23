import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import AddCard from 'src/views/ecommerce/AddCart'
import AddActions from 'src/views/apps/invoice/add/AddActions'
import AddNewCustomers from 'src/views/apps/invoice/add/AddNewCustomer'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import CartActions from 'src/views/ecommerce/CartAcctions'
import CardsModal from 'src/views/ecommerce/CardsModal'
import { useDispatch } from 'react-redux'
import { getPackages } from 'src/store/cart'

const Cart = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  // ** State
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState([])
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  // useEffect(() => {
  //   if (router.query.type === 'associated') {
  //     dispatch(getPackages())
  //   }
  // }, [router])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard
            clients={clients}
            invoiceNumber={111111}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            toggleAddCustomerDrawer={toggleAddCustomerDrawer}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <CartActions />
        </Grid>
      </Grid>
      {/* <CardsModal /> */}
    </>
  )
}

export default Cart
