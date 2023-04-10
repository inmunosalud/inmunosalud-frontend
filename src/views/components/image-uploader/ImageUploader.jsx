import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const newImages = [...images];
    for (const file of e.dataTransfer.files) {
      newImages.push(file);
    }
    setImages(newImages);
  }

  const handleRemove = (indexToRemove) => {
    const newImages = images.filter((image, index) => index !== indexToRemove);
    setImages(newImages);
  }

  const handleFileInputChange = (e) => {
    const newImages = [...images];
    for (const file of e.target.files) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
        newImages.push(file);
      }
    }
    setImages(newImages);
  }

  const handleUpload = () => {
    const promises = [];
    for (const image of images) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      promises.push(
        new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
        })
      );
    }
    Promise.all(promises).then((base64Strings) => {
      // Send base64Strings to API for upload
      console.log(base64Strings);
    });
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      style={{
        border: '2px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '0',
        width: '80%'
      }}
    >
      <h2>Sube tus imagenes arrastrando o subiendo a traves de aqui.</h2>
      <input
        type="file"
        accept=".jpg,.png,.webp"
        onChange={handleFileInputChange}
        multiple
      />
      {images.map((file, index) => (
        <div key={index} style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          overflow: 'hidden',
          margin: '0 auto',
          marginBottom: '50px'
        }}>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '5px', left: '5px', color: '#fff', fontWeight: 'bold' }}>
            {file.name}
            <button  onClick={() => handleRemove(index)}>Remove</button>
          </div>

        </div>
      ))}
      {images.length > 0 && (
        <button onClick={handleUpload}>Upload</button>
      )}
    </div>
  );
};