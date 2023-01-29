import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { Badge } from '@mui/material'
import { Cart } from 'mdi-material-ui'

// ** Icons Imports
import IconButton from '@mui/material/IconButton'

const CartButton = props => {
  const router = useRouter()
  // ** Props

  // ** Selectors
  const { products } = useSelector(state => state.cart)

  const getQuantity = products.reduce((total, item) => {
    total += item.quantity
    return total
  }, 0)

  const handleGoToCart = () => {
    router.push('/ecommerce/cart')
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleGoToCart}>
      <Badge badgeContent={getQuantity} color='primary'>
        <Cart />
      </Badge>
    </IconButton>
  )
}

export default CartButton
