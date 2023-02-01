// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import SendOutline from 'mdi-material-ui/SendOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

const CheckoutActions = ({}) => {
  return (
    <Card>
      <CardContent>
        <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<SendOutline />}>
          Confirmar
        </Button>
      </CardContent>
    </Card>
  )
}

export default CheckoutActions
