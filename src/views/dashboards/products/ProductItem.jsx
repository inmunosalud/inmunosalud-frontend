import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { DotsVertical } from 'mdi-material-ui'
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuBasic from 'src/views/components/menu/MenuBasic'
import { setEdit, deleteProduct, setProductId } from 'src/store/products'
import { setShowConfirmModal, setShowRedirectModal } from 'src/store/users'
import { updateCart } from 'src/store/cart'
import DialogForm from 'src/views/components/dialogs/DialogForm'
import RedirectModal from 'src/pages/components/modals/RedirectModal'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Tooltip from '@mui/material/Tooltip'
export const ProductItem = props => {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const { products } = useSelector(state => state.cart)
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const [authPassword, setAuthPassword] = React.useState('')
  const { user } = useSelector(state => state.session)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { showConfirmModal, showRedirectModal } = useSelector(state => state.users)
  const [showModalDelete, setShowModalDelete] = React.useState(false)

  const { productId } = useSelector(state => state.products)

  const [isAddToCart, setIsAddToCart] = React.useState(false)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleModalClose = () => {
    setShowModalDelete(false)
  }

  const handleCloseConfirmModal = () => {
    dispatch(setShowConfirmModal(false))
    handleModalClose()
  }

  const submitDelete = () => {
    dispatch(deleteProduct({ id: productId, headers: { password: authPassword } }))
    handleCloseConfirmModal()
    setAnchorEl(null)
  }

  const handleEdit = () => {
    dispatch(setEdit(props))
    router.push('/ecommerce/add-product')
  }

  const handleDelete = () => {
    dispatch(setProductId(props.id))
    setShowModalDelete(true)
  }

  const handleAddToCart = () => {
    if (!props.cartId) {
      dispatch(setShowRedirectModal(true))
      return
    }

    const updatedQuantity = (products.find(product => product.id === props.id)?.quantity || 0) + 1

    const body = {
      id: props.id,
      quantity: updatedQuantity
    }

    setIsAddToCart(true)
    setTimeout(() => setIsAddToCart(false), 800)
    dispatch(updateCart({ id: props.cartId, body }))
  }
  const handlePurchaseNow = () => {
    if (!props.cartId) {
      dispatch(setShowRedirectModal(true))
      return
    }

    const updatedQuantity = (products.find(product => product.id === props.id)?.quantity || 0) + 1

    const body = {
      id: props.id,
      quantity: updatedQuantity
    }

    dispatch(updateCart({ id: props.cartId, body }))
    router.push('/ecommerce/cart/')
  }

  const listMenuProps = {
    anchorEl,
    handleClose,
    handleEdit,
    handleDelete
  }

  return (
    <Card id={props.id}>
      <Grid container spacing={2}>
        {/* Título y menú */}
        <Grid item xs={12}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                  {props.product}
                </Typography>
                {props.isEdit && (
                  <IconButton onClick={handleClick}>
                    <DotsVertical />
                  </IconButton>
                )}
              </Box>
            }
          />

          <MenuBasic {...listMenuProps} />
        </Grid>

        {/* Contenido principal */}
        <Grid item xs={12} mb={6}>
          <CardContent>
            <Grid container spacing={2}>
              {/* Columna izquierda: Información del producto */}
              <Grid item xs={12} md={6}>
                {props.isEdit && (
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    <strong>{`Cantidad en almacén: ${props.stock}`}</strong>
                  </Typography>
                )}
                <Typography variant='subtitle1' sx={{ marginTop: 10 }}>
                  {props.content}
                </Typography>
                <Typography variant='subtitle1' sx={{ marginTop: 10 }}>
                  {`Ingredientes: ${props.ingredients}`}
                </Typography>

                <Box
                  style={{
                    marginTop: '100px',
                    display: 'flex',
                    justifyContent: mobile ? 'center' : undefined,
                    alignItems: mobile ? 'center' : undefined
                  }}
                >
                  <Link href={`/ecommerce/product/${props.id}`} passHref>
                    <Chip
                      label='Ver producto'
                      icon={<ChevronRightIcon style={{ fontSize: 16 }} />}
                      color='primary'
                      clickable
                      component='a'
                      style={{
                        color: theme.palette.text.primary,
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        marginBottom: '20px'
                      }}
                    />
                  </Link>
                </Box>
              </Grid>
              {/* Columna Derecha: Imagen */}
              <Grid item xs={12} md={6}>
                <Link href={`/ecommerce/product/${props.id}`} passHref>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img loading='lazy' src={props.urlImages} alt={props.product} width='60%' />
                  </Box>
                </Link>
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {user.profile === 'Afiliado' ? (
                    <>
                      <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant='h5'
                              color='text.secondary'
                              sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}
                            >
                              <span style={{ textDecoration: 'line-through' }}>${props?.price}</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}>
                              <ArrowRightAltIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant='h5'
                              color='primary'
                              sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}
                            >
                              ${props?.affiliatedPrice || props?.price}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          <Typography variant='body2' color='primary' sx={{ display: 'block', textAlign: 'center' }}>
                            Precio para afiliados
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant='h5'
                            color='text.primary'
                            sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}
                          >
                            ${props?.price}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}>
                            <ArrowRightAltIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant='h5'
                            color='primary'
                            sx={{ display: 'block', mb: 0.5, textAlign: 'center' }}
                          >
                            ${props?.affiliatedPrice || props?.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>

                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button
                    onClick={handlePurchaseNow}
                    variant='contained'
                    color='primary'
                    sx={{ marginBottom: 2, width: '50%' }}
                  >
                    Comprar Ahora
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant='outlined'
                    color='primary'
                    sx={{ marginBottom: 2, width: '50%' }}
                  >
                    {isAddToCart ? 'agregado' : 'Agregar al Carrito'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
      <Dialog
        open={showModalDelete}
        onClose={handleModalClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            ¿ Seguro de eliminar el producto seleccionado ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleModalClose}>Cancelar</Button>
          <Button
            onClick={() => {
              dispatch(setShowConfirmModal(true))
              handleModalClose()
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <DialogForm
        handleClose={handleCloseConfirmModal}
        open={showConfirmModal}
        onClick={submitDelete}
        setAuthPass={setAuthPassword}
      ></DialogForm>
      <RedirectModal
        open={showRedirectModal}
        handleClose={() => dispatch(setShowRedirectModal(false))}
        pageToRedirect={'/login'}
      ></RedirectModal>
    </Card>
  )
}
