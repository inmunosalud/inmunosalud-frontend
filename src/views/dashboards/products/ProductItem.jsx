import React from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Typography } from '@mui/material'

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";

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

// carousel product
const CarouselProducts = ({ images = [] }) => {
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
  const theme = useTheme()

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
    return props.properties.map(property => property.value)
  }

  const series = [
    {
      name: 'Income',
      data: propertiesByProduct()
    }
  ]

  return (
    <Card >
      <CardHeader
        title={props.name}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
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
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#D8DEDF',
                width: '100px',
                height: '90px',
                borderRadius: 1,
                padding: '5px'
              }}>

                <Typography sx={{
                  fontSize: '12px',
                }}>
                  <strong>{`${props.dailyDose}`}</strong> {` dosis diaria`}
                </Typography>
                <Typography sx={{
                  fontSize: '11px',
                }}>
                  <strong>{`${props.capsuleActiveMg}`}</strong>{` Activos en Cápsula`}
                </Typography>

                <Typography sx={{
                  fontSize: '12px',
                }}>
                  <strong>{`${props.capsuleQuantity}`}</strong>{` cápsulas`}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                width: '100px',
                height: 'auto',
                borderRadius: 1,
                padding: '5px',
                border: '1px solid #D8DEDF'
              }}>
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
              </Box>
            </div>


          </InfoProduct>
          <ReactApexcharts type='radar' height={200} series={series} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}
