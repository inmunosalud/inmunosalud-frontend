// ** React Imports
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Close from 'mdi-material-ui/Close'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { getProducts } from 'src/store/products'
import { setModal, setUpdatedProducts, setChanges, setAddProducts } from 'src/store/monthlypurchase'

import { MonthlyProductItem } from '../dashboards/products/MonthlyProductItem'

const AddMonthlyPurchaseModal = ({ open = false, onClose = () => {} }) => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  const { products, isLoading } = useSelector(state => state.products)
  const { addProducts, updatedProducts } = useSelector(state => state.monthlyPurchase)

  const filteredProducts = products.content?.filter(product =>
    product.product.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (open && products.length === 0) dispatch(getProducts())
  }, [open])

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  const handleUpdate = () => {
    const updatedProductsCopy = updatedProducts.map(product => {
      const matchingAddProduct = addProducts.find(addProduct => addProduct.id === product.id)

      if (matchingAddProduct) {
        return {
          ...product,
          quantity: +product.quantity + +matchingAddProduct.quantity
        }
      }

      return product
    })

    addProducts.forEach(addProduct => {
      const productExists = updatedProductsCopy.some(product => product.id === addProduct.id)

      if (!productExists) {
        const matchingProductFromContent = products.content.find(product => product.id === addProduct.id)

        if (matchingProductFromContent) {
          const urlImage =
            Array.isArray(matchingProductFromContent.urlImages) && matchingProductFromContent.urlImages.length > 0
              ? matchingProductFromContent.urlImages[0]
              : null

          updatedProductsCopy.push({
            ...matchingProductFromContent,
            quantity: +addProduct.quantity,
            urlImage: urlImage
          })
        }
      }
    })

    dispatch(setChanges(true))
    dispatch(setModal(false))
    dispatch(setUpdatedProducts(updatedProductsCopy))
    dispatch(setAddProducts([]))
  }

  const displayMapProducts = () => {
    const { content } = products

    return isLoading ? (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px',
          width: '250px'
        }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <>
        {filteredProducts?.map((product, i) => (
          <div key={i} style={{ marginTop: '25px' }}>
            <MonthlyProductItem isEdit={false} {...product} index={i} />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className='demo-space-x'>
      <Dialog
        open={open}
        scroll='paper'
        maxWidth='md'
        onClose={onClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Productos</DialogTitle>
        <Grid container>
          <Grid xl={4} xs={12} item>
            <TextField
              label='Buscar'
              size='small'
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: '20px', ml: '20px' }}
            />
          </Grid>
        </Grid>
        <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <DialogContent dividers='paper'>{displayMapProducts()}</DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xl={10} xs={0}></Grid>
            <Grid item xl={1} xs={12}>
              <Button sx={{ mt: '20px' }} variant='contained' onClick={() => handleUpdate()}>
                Agregar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddMonthlyPurchaseModal
