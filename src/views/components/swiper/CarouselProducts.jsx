import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import ReactImageMagnify from 'react-image-magnify'
import Dialog from '@mui/material/Dialog'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { useTheme } from '@mui/material/styles'

const CarouselProducts = ({ images }) => {
  const [fullscreenImage, setFullscreenImage] = React.useState(null)
  const theme = useTheme()

  const openFullscreen = image => {
    setFullscreenImage(image)
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  return (
    <div className='swiper'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        modules={[Navigation]}
        style={{
          width: '100%',
          margin: '0 auto'
        }}
      >
        {images?.map(image => (
          <SwiperSlide
            key={image}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div style={{ zIndex: 9999, cursor: 'pointer' }} onClick={() => openFullscreen(image)}>
              <ReactImageMagnify
                style={{ marginBottom: '20px' }}
                largeImage={{
                  src: image,
                  width: 800,
                  height: 800
                }}
                enlargedImageStyle={{ zIndex: 9999, top: 0 }}
                enlargedImagePosition='over'
                isHintEnabled={true}
                hintTextMouse='Haz zoom con el mouse'
                smallImage={{
                  alt: 'Descripción de la imagen',
                  src: image,
                  width: 370,
                  height: 370
                }}
              />
            </div>{' '}
          </SwiperSlide>
        ))}
        <div className='swiper-button-next' style={{ color: theme.palette.primary.main }} />
        <div className='swiper-button-prev' style={{ color: theme.palette.primary.main }} />
      </Swiper>
      <Dialog open={!!fullscreenImage} onClose={closeFullscreen}>
        <img
          src={fullscreenImage}
          alt='Imagen en pantalla completa'
          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
          onClick={closeFullscreen}
        />
      </Dialog>
    </div>
  )
}

export default CarouselProducts
