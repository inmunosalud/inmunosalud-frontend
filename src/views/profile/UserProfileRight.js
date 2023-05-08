// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Demo Components Imports
import { Bank, CreditCard, Home } from 'mdi-material-ui'
import UserProfileBilling from './UserProfileBilling'
import UserProfileAddress from './UserProfileAddress'
import UserProfileBankInfo from './UserProfileBankInfo'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(3)
  }
}))

const UserProfileRight = ({ methods = [], addresses = [], bankInfo = {} }) => {
  // ** State
  const [value, setValue] = useState('address')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='address' label='Direcciones' icon={<Home />} />
        <Tab value='paymentMethods' label='Métodos de pago' icon={<CreditCard />} />
        <Tab value='bankInfo' label='Datos bancarios' icon={<Bank />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='address'>
          <UserProfileAddress addresses={addresses} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='paymentMethods'>
          <UserProfileBilling methods={methods} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='bankInfo'>
          <UserProfileBankInfo bankInfo={bankInfo} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default UserProfileRight
