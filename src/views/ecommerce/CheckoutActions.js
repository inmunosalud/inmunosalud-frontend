// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import SendOutline from 'mdi-material-ui/SendOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import { useDispatch, useSelector } from 'react-redux'

const CheckoutActions = ({ onHandleConfirmOrder = () => {} }) => {
  const { storeOrder } = useSelector(state => state.orders)

  return (
    <Card>
      <CardContent>
        {storeOrder ? (
          <>
            <Button
              fullWidth
              sx={{ mb: 3.5 }}
              variant='contained'
              startIcon={<CurrencyUsd />}
              href={storeOrder.paymentMethod}
              download
            >
              Descargar ficha de pago
            </Button>
            <Link href='/landing-page/home/'>
              <Button fullWidth variant='outlined'>
                Volver
              </Button>
            </Link>
          </>
        ) : (
          <Button
            fullWidth
            sx={{ mb: 3.5 }}
            variant='contained'
            startIcon={<SendOutline />}
            onClick={onHandleConfirmOrder}
          >
            Confirmar
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default CheckoutActions
