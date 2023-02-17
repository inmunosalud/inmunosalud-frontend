import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { DotsVertical } from 'mdi-material-ui';


// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Typography } from '@mui/material'
import MenuBasic from 'src/views/components/menu/MenuBasic'

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";

import { setEdit, deleteProduct } from 'src/store/products'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import {
  InfoProduct
} from './styles'

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

// Styled Card component
const BoxCustomized = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'light'
    ? '#D8DEDF'
    : '',
  width: '100px',
  height: '90px',
  borderRadius: '5px',
  padding: '5px',
  color: theme.palette.mode === 'light'
    ? '#000000'
    : '#F0F8FF',
}))

const BoxCustomizedInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'light'
    ? ''
    : '',
  width: '100px',
  height: 'auto',
  borderRadius: '5px',
  padding: '5px',
  border: '1px solid #D8DEDF',
  color: theme.palette.mode === 'light'
    ? '#000000'
    : '#F0F8FF',
}))

// carousel product
const CarouselProducts = () => {
  return (
    <>
      <Swiper
        spaceBetween={2}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        style={{
          width: '300px'
        }}
      >
        <SwiperSlide >
          <img width={100} height={136} style={{ margin: 'auto 100px' }} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' />
        </SwiperSlide>
        <SwiperSlide>
          <img width={100} height={136} style={{ margin: 'auto 100px' }} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export const ProductItem = (props) => {
  console.log({ props });
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  const handleModalClose = () => {
    setShowModalDelete(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    dispatch(setEdit(props));
    handleRedirectEdit()
  };

  const handleDelete = () => {
    setShowModalDelete(true)
  }

  const submitDelete = () => {
    dispatch(deleteProduct(props.id))
    handleModalClose()
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
      'Activación Fisica',
      'Sistema Nervioso',
      'Prevención',
      'Activación Mental',
      'Sistema Digestivo',
      'Activacion Mental',
      'Relajación',
      'Sistema Inmune'
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
    return props?.properties
      .filter(property => property.value)
      .map(property => property.value)
  }

  const series = [
    {
      name: 'Income',
      data: [] || propertiesByProduct()
    }
  ]

  const listMenuProps = {
    anchorEl,
    handleClose,
    handleEdit,
    handleDelete,
  }

  return (
    <>
      <Card >
        <CardHeader
          title={props.name}
          titleTypographyProps={{
            sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
          }}
          action={
            <IconButton>
              {props.isEdit ? <DotsVertical onClick={handleClick} /> : null}
            </IconButton>
          }
        />
        <MenuBasic {...listMenuProps} />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <StyledGrid item md={5} xs={12}>
              <CardContent sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>

                <CarouselProducts images={props.urlImages} />
                <Typography sx={{
                  fontSize: '15px',
                  padding: '30px',
                }}>
                  {`${props.description}`}
                </Typography>


              </CardContent>
            </StyledGrid>
            <InfoProduct >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <Typography variant='h5' sx={{ marginBottom: '60px' }}>
                  <strong>{`${props.product}`}</strong>
                </Typography>
                <Typography variant='h5' sx={{ marginBottom: '60px' }}>
                  <strong>{`$${props.price}`}</strong>
                </Typography>
              </div>

              <Typography sx={{
                fontSize: '13px',
                marginBottom: '7px'
              }}>
                <strong>INSTRUCCIONES: </strong>{`${props.instructions}`}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 15
              }}>
                <BoxCustomized>
                  <Typography sx={{
                    fontSize: '11px',
                  }}>
                    <strong>{`${props.capsuleActiveMg}`}</strong>{` Activos en Cápsula`}
                  </Typography>

                  <Typography sx={{
                    fontSize: '12px',
                  }}>
                    <strong>{`${props.capsuleQuantity}`}</strong>
                  </Typography>
                </BoxCustomized>
                <BoxCustomizedInfo>
                  <Typography sx={{
                    fontSize: '12px',
                  }}>
                    <strong>{`${props.capsuleConcentration}`}</strong>{` concentración de cápsulas`}
                  </Typography>
                  <Typography sx={{
                    fontSize: '12px',
                  }}>
                    {`${props.mainComponent}`}
                  </Typography>
                </BoxCustomizedInfo>
              </div>
            </InfoProduct>
            <ReactApexcharts type='radar' height={200} series={series} options={options} />

          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            <Button variant='contained'>Agregar al carrito</Button>
          </div>
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
          <Button onClick={submitDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
