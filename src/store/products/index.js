import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PROYECT_PRODUCTS, api_post, api_get, api_put, api_delete } from '../../services/api'


export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (thunkApi) => {
    try {
        const token = localStorage.getItem('im-user')
        const auth = { headers: { Authorization: `Bearer ${token}` } }
        const response = await api_get(`${PROYECT_PRODUCTS}/products`, auth)

      return response;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue('error')
    }
  } 
)

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (body, thunkApi) => {
    try {
        const token = localStorage.getItem('im-user')
        const auth = { headers: { Authorization: `Bearer ${token}` } }
        const response = await api_post(`${PROYECT_PRODUCTS}/products`, body, auth)

      return response;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue('error')
    }
  } 
)

const initialState = {
  isLoading: false,
  products: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getProducts.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.products = payload
    })
    builder.addCase(getProducts.rejected, (state, {payload}) => {
      state.isLoading = false;
    })
  }
})

export default productsSlice.reducer