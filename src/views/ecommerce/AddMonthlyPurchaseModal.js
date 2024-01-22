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
    // Comparar productos por id
    const updatedProductsCopy = updatedProducts.map(product => {
      const matchingAddProduct = addProducts.find(addProduct => addProduct.id === product.id)
      console.log('matchingaddProduct', matchingAddProduct, addProducts)
      // Si hay un producto coincidente, actualizar la cantidad
      if (matchingAddProduct) {
        console.log(
          product.product,
          'quantities',
          +product.quantity + +matchingAddProduct.quantity,
          'suma',
          +product.quantity,
          'actual',
          +matchingAddProduct.quantity,
          'nueva'
        )
        return {
          ...product,
          quantity: +product.quantity + +matchingAddProduct.quantity
        }
      }
      return product
    })

    // Agregar nuevos productos que no estén en updatedProducts
    addProducts.forEach(addProduct => {
      const productExists = updatedProductsCopy.some(product => product.id === addProduct.id)

      if (!productExists) {
        updatedProductsCopy.push(addProduct)
      }
    })

    // Actualizar el estado con el nuevo arreglo
    console.log('updatedProductscopy', updatedProductsCopy)
    console.log('addProducts', addProducts)
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
        <TextField
          label='Buscar productos'
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />
        <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <DialogContent dividers='paper'>{displayMapProducts()}</DialogContent>
        <DialogActions>
          <Button size='small' sx={{ mt: 2.5 }} variant='contained' onClick={() => handleUpdate()}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddMonthlyPurchaseModal
