import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import AddCard from 'src/views/ecommerce/AddCart'
import AddActions from 'src/views/apps/invoice/add/AddActions'
import AddNewCustomers from 'src/views/apps/invoice/add/AddNewCustomer'

// ** Third Party Styles Imports
import CartActions from 'src/views/ecommerce/CartAcctions'
import CardsModal from 'src/views/ecommerce/CardsModal'
import AddressModal from 'src/views/ecommerce/AddressModal'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { closeSnackBar } from 'src/store/notifications'
import AddMonthlyPurchase from 'src/views/ecommerce/AddMonthlyPurchase'

const MonthlyPurchase = () => {
  const dispatch = useDispatch()

  const { open, message, severity } = useSelector(state => state.notifications)
  // ** State
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState([])
  const [openCardModal, setOpenCardModal] = useState(false)
  const [openAddressModal, setOpenAddressModal] = useState(false)
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddMonthlyPurchase
            clients={clients}
            invoiceNumber={111111}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            toggleAddCustomerDrawer={toggleAddCustomerDrawer}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <CartActions onMethodClick={() => setOpenCardModal(true)} onAddressClick={() => setOpenAddressModal(true)} />
        </Grid>
      </Grid>
      <CardsModal open={openCardModal} onClose={() => setOpenCardModal(false)} />
      <AddressModal open={openAddressModal} onClose={() => setOpenAddressModal(false)} />
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default MonthlyPurchase
