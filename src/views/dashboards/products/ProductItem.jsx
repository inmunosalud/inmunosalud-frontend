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
import { Share as ShareIcon } from '@mui/icons-material'
import EastIcon from '@mui/icons-material/East'
import { CardActions } from '@mui/material'

export const ProductItem = props => {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const { products, isLoading } = useSelector(state => state.cart)
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const [authPassword, setAuthPassword] = React.useState('')
  const { user } = useSelector(state => state.session)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { showConfirmModal, showRedirectModal } = useSelector(state => state.users)
  const [showModalDelete, setShowModalDelete] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  const { productId } = useSelector(state => state.products)

  const [isAddToCart, setIsAddToCart] = React.useState(false)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleShare = async () => {
    const productUrl =
      `${window.location.origin}/ecommerce/product/${props.id}/?id=${user?.id}` +
      `&fn=${btoa(unescape(encodeURIComponent(user?.firstName)))}` +
      `&ln=${btoa(unescape(encodeURIComponent(user?.lastName)))}`

    try {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 800)
      await navigator.clipboard.writeText(productUrl)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
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
    setIsAddToCart(true)
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
        {/* Contenido principal */}
        <Grid item xs={12} mb={6}>
          <Grid container spacing={2}>
            {/* Columna izquierda: Información del producto */}

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
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
                  subheader={
                    props.isEdit && (
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        <strong>{`Cantidad en almacén: ${props.stock}`}</strong>
                      </Typography>
                    )
                  }
                  action={
                    <Box>
                      <MenuBasic {...listMenuProps} />
                    </Box>
                  }
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    my: 0
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle1' sx={{ mt: { xs: 2, sm: 4 } }}>
                      {props.content}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ mt: { xs: 2, sm: 4 } }}>
                      {`Ingredientes: ${props.ingredients}`}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      mt: 'auto',
                      gap: 2,
                      alignItems: 'stretch',
                      width: '100%'
                    }}
                  >
                    <Button
                      endIcon={<EastIcon />}
                      variant='contained'
                      color='primary'
                      size='large'
                      component={Link}
                      href={`/ecommerce/product/${props.id}`}
                      underline='none'
                      sx={{
                        gap: 1,
                        width: mobile ? '100%' : '50%'
                      }}
                    >
                      Ver más del producto
                    </Button>
                    <Button
                      endIcon={<ShareIcon />}
                      color='primary'
                      size='large'
                      variant='outlined'
                      onClick={handleShare}
                      sx={{
                        gap: 1,
                        width: mobile ? '100%' : '50%'
                      }}
                    >
                      {isCopied ? 'Copiado' : 'Compartir producto'}
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Grid>

            {/* Columna Derecha: Imagen */}
            <Grid item xs={12} md={6}>
              <CardContent>
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
                    disabled={isLoading}
                    sx={{
                      marginBottom: 2,
                      width: mobile ? '100%' : '50%',
                      '&.Mui-disabled': {
                        backgroundColor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    Comprar Ahora
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant='outlined'
                    color='primary'
                    disabled={isLoading}
                    sx={{
                      marginBottom: 2,
                      width: mobile ? '100%' : '50%',
                      '&.Mui-disabled': {
                        borderColor: 'primary.main',
                        color: 'primary.main'
                      }
                    }}
                  >
                    {isLoading && !isAddToCart ? 'agregado' : 'Agregar al Carrito'}
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
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
