import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, useTheme, FormHelperText } from '@mui/material'

const ImageUploader = ({ field, fieldState: { error }, base64Images }) => {
  const theme = useTheme()
  const [images, setImages] = useState([])

  useEffect(() => {
    if (base64Images && base64Images.length > 0) {
      const formattedImages = base64Images.map(url => ({ url, isExisting: true }))
      setImages(formattedImages)
    }
  }, [base64Images])

  useEffect(() => {
    return () => {
      setImages([])
    }
  }, [])

  useEffect(() => {
    convertImagesToBase64()
  }, [images])

  const convertImagesToBase64 = () => {
    Promise.all(
      images.map(
        image =>
          new Promise((resolve, reject) => {
            if (image.isExisting) {
              resolve(image.url)
            } else if (image instanceof File) {
              const fileReader = new FileReader()
              fileReader.onload = () => resolve(fileReader.result)
              fileReader.onerror = error => reject(error)
              fileReader.readAsDataURL(image)
            } else {
              resolve(image)
            }
          })
      )
    ).then(base64Images => {
      field.onChange(base64Images)
    })
  }

  const handleDrop = e => {
    e.preventDefault()
    const newImages = [...images]
    for (const file of e.dataTransfer.files) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
        newImages.push(file)
      }
    }
    setImages(newImages)
  }

  const handleRemove = indexToRemove => {
    setImages(images.filter((_, index) => index !== indexToRemove))
  }

  const handleFileInputChange = e => {
    e.preventDefault()
    const newImages = [
      ...images,
      ...Array.from(e.target.files).filter(
        file => file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
      )
    ]
    setImages(newImages)
  }

  return (
    <Box
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${error ? theme.palette.error.main : theme.palette.text.disabled}`,
        borderRadius: '10px',
        overflow: 'hidden',
        height: '470px',
        maxHeight: '470px'
      }}
    >
      {/* Sección superior para imágenes */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start'
        }}
      >
        {images.map((file, index) => {
          const imgSrc = file.isExisting ? file.url : file instanceof File ? URL.createObjectURL(file) : file
          return (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '150px',
                height: '150px',
                overflow: 'hidden',
                margin: '10px 5px'
              }}
            >
              <img
                src={imgSrc}
                alt={`Image ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  console.error('Image load error:', e)
                  e.target.src = 'path/to/fallback/image.jpg'
                }}
              />
              <Button
                onClick={() => handleRemove(index)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  minWidth: '30px',
                  width: '30px',
                  height: '30px',
                  padding: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff'
                }}
              >
                X
              </Button>
            </div>
          )
        })}
      </div>

      {/* Sección inferior para texto y botón */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: theme.palette.background.default
        }}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Typography
          variant='body1'
          align='center'
          sx={{ color: error ? theme.palette.error.main : theme.palette.text.secondary, mb: 2 }}
        >
          Para subir imágenes arrastralas aquí o agregalas a través del botón
        </Typography>
        <Button variant='contained' component='label'>
          Agregar Imagen
          <input type='file' accept='.jpg,.png,.webp' onChange={handleFileInputChange} multiple hidden />
        </Button>
      </Box>
    </Box>
  )
}

export default ImageUploader
