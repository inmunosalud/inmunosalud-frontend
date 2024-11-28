import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Router from 'next/router'
import { PRODUCTS, api_delete, api_get, api_patch, api_post, api_put } from '../../services/api'
import toast from 'react-hot-toast'

export const getProducts = createAsyncThunk('ProductsList', async thunkApi => {
  const token = localStorage.getItem('im-user')
  const auth = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  try {
    const response = await api_get(`${PRODUCTS}/products`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const getProductById = createAsyncThunk('currentProduct', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  try {
    const response = await api_get(`${PRODUCTS}/products/${id}`, auth)
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    Router.push('/ecommerce/products')
    return thunkApi.rejectWithValue('error')
  }
})

export const createProduct = createAsyncThunk('ProductsCreate', async ({ body, headers }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}`, Password: headers.password } }
  try {
    const response = await api_post(`${PRODUCTS}/products`, body, auth)
    toast.success(response.message)
    Router.push('/ecommerce/products')
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const updateProduct = createAsyncThunk('ProductsUpdate', async ({ body, headers }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}`, Password: headers.password } }
  try {
    const response = await api_patch(`${PRODUCTS}/products/${body.id}`, body, auth)
    toast.success(response.message)
    Router.push('/ecommerce/products')
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteProduct = createAsyncThunk('ProductsDelete', async ({ id, headers }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}`, Password: headers.password } }
  try {
    const response = await api_delete(`${PRODUCTS}/products/${id}`, {}, auth)
    toast.success(response.message)
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

import { Buffer } from 'buffer'

export const uploadProductImages = createAsyncThunk('ProductsPresignedUrl', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = `Bearer ${token}`
  const urlImage = []

  try {
    for (const image of body.images) {
      if (image.includes('http')) {
        urlImage.push(image)
      } else {
        // Convertir a WebP
        const webpBuffer = await convertToWebP(image)

        const filetype = 'image/webp'
        const presignedUrlHeaders = { headers: { Authorization: auth, filetype } }

        const presignedUrlResponse = await api_get(
          `${PRODUCTS}/products/s3Upload?folder=${body.productName}`,
          presignedUrlHeaders
        )
        const presignedUrl = presignedUrlResponse?.content?.url
        if (presignedUrl) {
          const headers = { 'Content-Type': filetype }

          await api_put(presignedUrl, webpBuffer, headers)
          urlImage.push(presignedUrl.split('?')[0])
        }
      }
    }
    return urlImage
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

// Función auxiliar para convertir imagen a WebP
async function convertToWebP(dataURI) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(
        blob => {
          if (blob) {
            const reader = new FileReader()
            reader.onloadend = () => {
              const arrayBuffer = reader.result
              resolve(Buffer.from(arrayBuffer))
            }
            reader.onerror = reject
            reader.readAsArrayBuffer(blob)
          } else {
            reject(new Error('Failed to create WebP blob'))
          }
        },
        'image/webp',
        0.9
      )
    }
    img.onerror = reject
    img.src = dataURI
  })
}

const initialState = {
  isLoading: false,
  isImagesUploading: false,
  products: [],
  productImagesUpload: [],
  editItem: null,
  benefits: [],
  studies: [],
  productId: '',
  currentProduct: null
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setEdit(state, { payload }) {
      state.editItem = payload
    },
    setRemoveEdit(state, { payload }) {
      state.editItem = null
    },
    setProductId: (state, { payload }) => {
      state.productId = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload.content
    })
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(getProductById.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.currentProduct = payload.content
    })
    builder.addCase(getProductById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload.content
    })
    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.products = payload.content
      state.isLoading = false
    })
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.products = payload.content
    })
    builder.addCase(uploadProductImages.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(uploadProductImages.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.productImagesUpload = payload
    })
    builder.addCase(uploadProductImages.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  }
})

export const { setEdit, setRemoveEdit, setProductId } = productsSlice.actions
export default productsSlice.reducer
