import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Router from 'next/router'
import { INVOICES, api_post, api_get, api_put, api_delete } from '../../services/api'

export const getInvoices = createAsyncThunk('billing/getAllInvoices', async thunkApi => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
        const response = await api_get(`${INVOICES}/billing/`, auth)
        console.log("response", response)
        return response
    } catch (error) {
        return thunkApi.rejectWithValue('error')
    }
})

export const getInvoicesByUser = createAsyncThunk('billing/getInvoices', async (id, thunkApi) => {
    const token = localStorage.getItem('im-user')
    const auth = { headers: { Authorization: `Bearer ${token}` } }
    try {
        const response = await api_get(`${INVOICES}/invoices/user/${id}`, auth)
        return response
    } catch (error) {
        return thunkApi.rejectWithValue('error')
    }
})

const initialState = {
    isLoading: false,
    messageValid: "",
    invoicesAll: [],
}


export const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        // setUpdateInvoice(state, { payload }) {
        //     state.itemUpdated = payload
        //     state.isUpdate = true
        // },
        // setModal(state, { payload }) {
        //     state.openModalEdit = payload
        // }
    },
    extraReducers: builder => {
        builder.addCase(getInvoicesByUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getInvoicesByUser.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.messageValid = payload.message
            state.invoices = payload.content
        })
        builder.addCase(getInvoicesByUser.rejected, (state, { payload }) => {
            state.isLoading = false
        })
        builder.addCase(getInvoices.pending, (state, action) => {
            state.isLoading = true
            console.log("pending", action)

        })
        builder.addCase(getInvoices.fulfilled, (state, { payload }) => {
            console.log("fulfilled", payload)
            state.isLoading = false
            state.invoicesAll = payload
        })
        builder.addCase(getInvoices.rejected, (state, { payload }) => {
            state.isLoading = false
            console.log("rejected", payload)

        })
        // builder.addCase(updateInvoice.fulfilled, (state, { payload }) => {
        //     state.invoices = payload
        // })
        // builder.addCase(createInvoice.fulfilled, (state, { payload }) => {
        //     state.invoices = payload
        // })
        // builder.addCase(deleteInvoice.fulfilled, (state, { payload }) => {
        //     state.invoices = payload
        // })
    }
})
export const { setUpdateInvoice, setModal } = invoicesSlice.actions
export default invoicesSlice.reducer