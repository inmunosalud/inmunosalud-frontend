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
import cart from 'src/store/cart'

import products from 'src/store/products'

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
    dashboard: combineReducers({ general })
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})



