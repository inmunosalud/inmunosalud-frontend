import { useState } from 'react'
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css/bundle'
import { useRouter } from 'next/router'
// Import Swipebundler core and Navigation module
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Autoplay, Parallax, Zoom, Pagination } from 'swiper/modules'
SwiperCore.use([Autoplay, Navigation, Pagination])
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const Carousel = ({ products }) => {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const theme = useTheme()
  const router = useRouter()

  return (
    <div class='swiper'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={2000}
        loop={true}
        style={{
          width: '100%',
          margin: '0 auto',
          '--swiper-navigation-color': theme.palette.primary.main,
          '--swiper-pagination-color': theme.palette.primary.main
        }}
      >
        {products?.map(product => (
          <SwiperSlide
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => router.push(`/ecommerce/product/${product.id}`)}
          >
            <Image
              src={product.urlImages}
              width={mobile ? 350 : 450}
              height={mobile ? 350 : 450}
              alt='product'
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
