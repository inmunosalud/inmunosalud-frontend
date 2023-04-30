import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

//TODO: Separate the URLS from Files array maybe handling two arrays on images object (urlImages, fileImages)

const ImageUploader = ({
  base64Images = [],
  handleImages
}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (base64Images.length > 0) {
      setImages(base64Images)
    }
  }, [])

  useEffect(() => {
    convertImagesToBase64()
  }, [images])

  const convertImagesToBase64 = () => {
    Promise.all(
      images.map(
        (image) =>
          new Promise((resolve, reject) => {
            if (typeof(image) != 'string') {
              const fileReader = new FileReader();
              fileReader.onload = (_) => {
                resolve(fileReader.result);
              };
              fileReader.onerror = (error) => reject(error);
              fileReader.readAsDataURL(image);
            } else {
              resolve(image)
            }
          })
      )
    ).then((base64Images) => {
      // Send base64Images to server
      handleImages(base64Images)
    });
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const newImages = [...images];
    for (const file of e.dataTransfer.files) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
        newImages.push(file);
      }
    }
    setImages(newImages);
  }

  const handleRemove = (indexToRemove) => {
    const newImages = images.filter((image, index) => index !== indexToRemove);
    setImages(newImages);
  }

  const handleFileInputChange = (e) => {
    e.preventDefault()
    const newImages = [...images];
    for (const file of e.target.files) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
        newImages.push(file);
      }
    }
    setImages(newImages);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        margin: '0',
        width: '100%'
      }}
    >
      <Typography variant='body1'>Arrastra las imágenes que quieras subir o a través del botón</Typography>
      <input
        type="file"
        accept=".jpg,.png,.webp"
        onChange={handleFileInputChange}
        multiple
        style={{
          fontSize: '14px'
        }}
      />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {images.map((file, index) => (
        <div key={index} style={{
          position: 'relative',
          width: '150px',
          height: '150px',
          overflow: 'hidden',
          margin: '10px 5px'
        }}>
          <img
            src={typeof(file) === 'string' ? file : URL.createObjectURL(file)}
            alt={file.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '5px', right: '5px', color: '#fff', fontWeight: 'bold' }}>
            <button style={{
              backgroundColor: '#000',
              border: '1px solid #ccc',
              borderRadius: '15px',
              height: '30px',
              width: '30px'
            }}
            onClick={(e) => {
              e.preventDefault()
              handleRemove(index)
            }}
            ><Typography variant='body2' color={'#eee'}><strong>X</strong></Typography></button>
          </div>

        </div>
      ))}
      </div>
    </div>
  );
};

export default ImageUploader