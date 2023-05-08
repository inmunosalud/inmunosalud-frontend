import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
import { PROYECT_PRODUCTS, api_post, api_get, api_put, api_delete } from '../../services/api'
import { openSnackBar } from '../notifications'

export const getProducts = createAsyncThunk('product/getProducts', async thunkApi => {
  try {
    const response = await api_get(`${PROYECT_PRODUCTS}/products`)
    return response
  } catch (error) {
    console.log(error)
    return thunkApi.rejectWithValue('error')
  }
})

export const createProduct = createAsyncThunk('product/createProduct', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_post(`${PROYECT_PRODUCTS}/products`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    Router.push('/ecommerce/products')
    return response
  } catch (error) {
    console.log(error)
    return thunkApi.rejectWithValue('error')
  }
})

export const updateProduct = createAsyncThunk('product/updateProduct', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_put(`${PROYECT_PRODUCTS}/products/${body.id}`, body, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    Router.push('/ecommerce/products')
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_delete(`${PROYECT_PRODUCTS}/products/${id}`, {}, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    return response
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

export const uploadProductImages = createAsyncThunk('product/uploadProductImages', async (body, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = `Bearer ${token}`
  const urlImages = []

  try {
    for (const image of body.images) {
      if (image.includes('http')) {
        urlImages.push(image)
      } else {
        const filetype = image.split(';')[0].split('/')[1]
        const presignedUrlHeaders = { headers: { Authorization: auth, filetype } }

        const presignedUrlResponse = await api_get(
          `${PROYECT_PRODUCTS}/products/s3Upload/${body.productName}`,
          presignedUrlHeaders
        )
        const presignedUrl = presignedUrlResponse?.content?.presignedUrl

        if (presignedUrl) {
          const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
          const headers = { 'Content-Type': `image/${filetype}`, 'Content-Encoding': 'base64' }

          await api_put(presignedUrl, buffer, headers)
          urlImages.push(presignedUrl.split('?')[0])
        }
      }
    }

    return urlImages
  } catch (error) {
    const errMessage = error?.response?.data?.message
    thunkApi.dispatch(openSnackBar({ open: true, message: errMessage, severity: 'error' }))
    return thunkApi.rejectWithValue('error')
  }
})

const initialState = {
  isLoading: false,
  isImagesUploading: false,
  products: [],
  productImages: [],
  editItem: null,
  mainComponents: []
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
    }
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload
    })
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload
    })
    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.products = payload
    })
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.products = payload
    })
    builder.addCase(uploadProductImages.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(uploadProductImages.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.productImages = payload
    })
    builder.addCase(uploadProductImages.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  }
})

export const { setEdit, setRemoveEdit } = productsSlice.actions
export default productsSlice.reducer
