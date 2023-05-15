// ** Toolkit imports
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
//inmunosalud reducers
import session from 'src/store/session'
import users from 'src/store/users'
import notifications from 'src/store/notifications'
import general from 'src/store/dashboard/generalSlice'
import address from 'src/store/address'
import paymentMethods from 'src/store/paymentMethods'
import register from 'src/store/register'
import cart from 'src/store/cart'
import monthlyPurchase from 'src/store/monthlypurchase'

import products from 'src/store/products'
import comissions from 'src/store/comissions'
import orders from 'src/store/orders'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    cart,
    //new reducers
    session,
    users,
    notifications,
    products,
    comissions,
    orders,
    paymentMethods,
    address,
    register,
    dashboard: combineReducers({ general }),
    monthlyPurchase
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
