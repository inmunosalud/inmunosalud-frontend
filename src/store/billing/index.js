import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { INVOICES, api_get, api_patch, api_put } from '../../services/api'
import { openSnackBar } from '../notifications'

export const getInvoices = createAsyncThunk('billing/getAllInvoices', async thunkApi => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${INVOICES}/billing/`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const getInvoicesByUser = createAsyncThunk('billing/getInvoices', async (id, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${INVOICES}/billing/user/${id}`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const updateStatus = createAsyncThunk('billing/editStatus', async ({ status, invoiceId }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${INVOICES}/billing/status/${invoiceId}`, { status }, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    thunkApi.dispatch(getInvoices())
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const getTaxInfo = createAsyncThunk('billing/getTaxInfo', async thunkApi => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_get(`${INVOICES}/billing/`, auth)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const createTaxInfo = createAsyncThunk('billing/createTax', async ({ status, invoiceId }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${INVOICES}/billing/status/${invoiceId}`, { status }, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    thunkApi.dispatch(getInvoices())
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const updateTaxInfo = createAsyncThunk('billing/updateTax', async ({ status, invoiceId }, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await api_patch(`${INVOICES}/billing/status/${invoiceId}`, { status }, auth)
    thunkApi.dispatch(openSnackBar({ open: true, message: response.message, severity: 'success' }))
    thunkApi.dispatch(getInvoices())
    return response
  } catch (error) {
    return thunkApi.rejectWithValue('error')
  }
})

export const uploadFiles = createAsyncThunk('billing/uploadFiles', async (files, thunkApi) => {
  const token = localStorage.getItem('im-user')
  const auth = `Bearer ${token}`

  try {
    const filetype = files.pdf.split(';')[0].split('/')[1]
    const presignedUrlPdfHeaders = { headers: { Authorization: auth, filetype } }
    const presignedUrlPdfResponse = await api_get(
      `${INVOICES}/billing/s3Upload/${files.idUser}`,
      presignedUrlPdfHeaders
    )

    const presignedUrlPdf = presignedUrlPdfResponse?.content?.url

    if (presignedUrlPdf) {
      const bufferPdf = Buffer.from(files.pdf.replace(/^data:application\/pdf;base64,/, ''), 'base64')
      const headersPdf = { 'Content-Type': 'application/pdf', 'Content-Encoding': 'base64' }
      await api_put(presignedUrlPdf, bufferPdf, headersPdf)
    }

    const filetype2 = files.xml.split(';')[0].split('/')[1]
    const presignedUrlXmlHeaders = { headers: { Authorization: auth, filetype: filetype2 } }
    const presignedUrlXmlResponse = await api_get(
      `${INVOICES}/billing/s3Upload/${files.idUser}`,
      presignedUrlXmlHeaders
    )

    const presignedUrlXml = presignedUrlXmlResponse?.content?.url

    if (presignedUrlXml) {
      const bufferXml = Buffer.from(files.xml.replace(/^data:text\/xml;base64,/, ''), 'base64')
      const headersXml = { 'Content-Type': 'text/xml', 'Content-Encoding': 'base64' }
      await api_put(presignedUrlXml, bufferXml, headersXml)
    }

    const header = { headers: { Authorization: `Bearer ${token}` } }
    const body = {
      pdf: presignedUrlPdf.split('?')[0],
      xml: presignedUrlXml.split('?')[0],
      satScheme: files.satScheme
    }
    await api_patch(`${INVOICES}/billing/${files.idInvoice}`, body, header)
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Error al subir los archivos'
    thunkApi.dispatch(openSnackBar({ open: true, message: errorMessage, severity: 'error' }))
    return thunkApi.rejectWithValue(errorMessage)
  }
})

const initialState = {
  invoicesAll: [],
  invoices: [],
  commissionInvoice: null,
  orderInvoice: null,
  loading: false
}

export const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getInvoicesByUser.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(getInvoicesByUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.invoices = payload.content
    })

    builder.addCase(getInvoicesByUser.rejected, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(getTaxInfo.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(getTaxInfo.fulfilled, (state, { payload }) => {
      state.loading = false
      state.commissionInvoice = payload.commissionInvoice
      state.orderInvoice = payload.orderInvoice
    })

    builder.addCase(getTaxInfo.rejected, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(createTaxInfo.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(createTaxInfo.fulfilled, (state, { payload }) => {
      state.loading = false
      state.commissionInvoice = payload.commissionInvoice
      state.orderInvoice = payload.orderInvoice
    })

    builder.addCase(createTaxInfo.rejected, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(updateTaxInfo.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(updateTaxInfo.fulfilled, (state, { payload }) => {
      state.loading = false
      state.commissionInvoice = payload.commissionInvoice
      state.orderInvoice = payload.orderInvoice
    })

    builder.addCase(updateTaxInfo.rejected, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(getInvoices.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getInvoices.fulfilled, (state, { payload }) => {
      state.loading = false
      state.invoicesAll = payload.content
    })
    builder.addCase(getInvoices.rejected, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(updateStatus.fulfilled, (state, { payload }) => {})
    builder.addCase(uploadFiles.fulfilled, (state, { payload }) => {})
    // builder.addCase(deleteInvoice.fulfilled, (state, { payload }) => {
    //     state.invoices = payload
    // })
  }
})
export const { setUpdateInvoice, setModal } = billingSlice.actions
export default billingSlice.reducer
