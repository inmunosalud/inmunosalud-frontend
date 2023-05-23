import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { DotsVertical } from 'mdi-material-ui'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Typography } from '@mui/material'
import MenuBasic from 'src/views/components/menu/MenuBasic'

import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Navigation } from 'swiper'

import { setEdit, deleteProduct } from 'src/store/products'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import { InfoProduct } from './styles'
import DialogForm from 'src/views/components/dialogs/DialogForm'
import { setShowConfirmModal, setShowRedirectModal } from 'src/store/users'
import { updateCart } from 'src/store/cart'
import RedirectModal from 'src/pages/components/modals/RedirectModal'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const ComplementaryGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const BoxCustomizedInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'light' ? '' : '',
  width: '150px',
  height: 'auto',
  borderRadius: '5px',
  padding: '5px',
  border: '1px solid #D8DEDF',
  color: theme.palette.mode === 'light' ? '#000000' : '#F0F8FF'
}))

// carousel product
const CarouselProducts = ({ images }) => {
  // const [url1, url2] = images ?? []
  if (images) {
    return (
      <Swiper
        spaceBetween={2}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        style={{
          width: '450px'
        }}
      >
        {images.map(image => (
          <SwiperSlide>
            <img width={250} height={350} style={{ margin: 'auto 100px' }} alt='imagen' src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }
  return null
}

export const ProductItem = props => {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [showModalDelete, setShowModalDelete] = React.useState(false)
  const { showConfirmModal, showRedirectModal } = useSelector(state => state.users)
  const [authPassword, setAuthPassword] = React.useState('')


  const handleModalClose = () => {
    showModalDelete
    setShowModalDelete(false)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleEdit = () => {
    dispatch(setEdit(props))
    handleRedirectEdit()
  }

  const handleDelete = () => {
    setShowModalDelete(true)
  }

  const handleCloseConfirmModal = () => {
    dispatch(setShowConfirmModal(false))
    handleModalClose()
  }

  const submitDelete = () => {
    dispatch(deleteProduct({ id: props.id, headers: { password: authPassword } }))
    handleCloseConfirmModal()
    setAnchorEl(null)
  }

  const handleRedirectEdit = () => {
    router.push('/ecommerce/add-product')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: [theme.palette.primary.main, theme.palette.info.main],
    plotOptions: {
      radar: {
        size: 50,
        polygons: {
          strokeColors: ['#ebe9f1', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent']
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [theme.palette.primary.main, theme.palette.info.main],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    labels: [
      'Sistema Inmune',
      'Circulación Arterial',
      'Digestión',
      'Sistema Óseo',
      'Vías Respiratorias',
      'Activación Mental',
      'Regeneración Muscular',
      'Salud Hormonal',
      'Piel, Cabello y Uñas',
      'Relajación'
    ],
    markers: {
      size: 0
    },
    xaxis: {
      labels: { show: true, style: { fontSize: '10px' } }
    },
    yaxis: { show: false },
    grid: { show: false }
  }

  const propertiesByProduct = () => {
    return props?.properties.filter(property => property.value).map(property => property.value)
  }

  const series = [
    {
      name: 'Income',
      data: propertiesByProduct()
    }
  ]


  const listMenuProps = {
    anchorEl,
    handleClose,
    handleEdit,
    handleDelete
  }

  const checkIfNotRegistred = (id) => {
    if(!id) {
      dispatch(setShowRedirectModal(true))
      return true
    }

    return false
  }

  const handleAddToCart = () => {

    if(checkIfNotRegistred(props.cartId)) return

    const body = {
      id: props.id,
      quantity: 1
    }

    dispatch(updateCart({ id: props.cartId, body }))
  }

  return (
    <>
      <Card>
        <CardHeader
          title={props.name}
          titleTypographyProps={{
            sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
          }}
          action={<IconButton>{props.isEdit ? <DotsVertical onClick={handleClick} /> : null}</IconButton>}
        />
        <MenuBasic {...listMenuProps} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <CarouselProducts images={props.urlImages} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <Box>
                  <Typography variant='h5' sx={{ marginBottom: '20px' }}>
                    <strong>{`${props.product}`}</strong>
                  </Typography>
                  <Typography variant='h5'>
                    <strong>{`$${props.price}`}</strong>
                  </Typography>
                </Box>
                <Box sx={{ marginLeft: '20px' }}>
                  <BoxCustomizedInfo>
                    <Typography sx={{ fontSize: '12px' }}>
                      <strong>{`${props.capsuleConcentration}`}</strong>
                    </Typography>
                    <Typography sx={{ fontSize: '12px', margin: '10px 0px' }}>
                      {`Contiene ${props.capsuleQuantity} cápsulas por envase`}
                    </Typography>
                  </BoxCustomizedInfo>
                </Box>
                {props.isEdit ? (
                  <Box sx={{ marginLeft: '20px' }}>
                    <Typography variant='h8' sx={{ marginBottom: '20px' }}>
                      <strong>{`Cantidad en almacen: ${props.quantity}`}</strong>
                    </Typography>
                  </Box>
                ) : null}
              </Box>
              <Typography variant='body2' sx={{ marginBottom: '20px' }}>
                <strong>DESCRIPCION: </strong>
                {`${props.description}`}
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: '20px' }}>
                <strong>INSTRUCCIONES: </strong>
                {`${props.instructions}`}
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: '20px' }}>
                <strong>INGREDIENTES: </strong>
                {`${props.ingredients}`}
              </Typography>
              <Typography variant='body2'>
                <strong>COMPONENTES: </strong>
              </Typography>
              <ul>
                {props.mainComponents.map((ingredient, index) => (
                  <li key={index}>
                    <Typography variant='body2' sx={{ marginBottom: '2px' }}>
                      {`${ingredient.property} - ${ingredient.value}`}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant='contained' onClick={handleAddToCart}>
              Agregar al carrito
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={showModalDelete}
        onClose={handleModalClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Seguro de eliminar el producto seleccionado ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleModalClose}>Cancelar</Button>
          <Button onClick={() => dispatch(setShowConfirmModal(true))}>Eliminar</Button>
        </DialogActions>
      </Dialog>
      <DialogForm handleClose={handleCloseConfirmModal} open={showConfirmModal} onClick={submitDelete} setAuthPass={setAuthPassword}></DialogForm>
      <RedirectModal open={showRedirectModal} handleClose={() => dispatch(setShowRedirectModal(false))} pageToRedirect={"/register"}></RedirectModal>
    </>
  )
}
