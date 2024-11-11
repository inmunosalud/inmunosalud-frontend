const million = require('million/compiler')

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    USERS: process.env.USERS,
    CART: process.env.CART,
    MONTHLY_PURCHASE: process.env.MONTHLY_PURCHASE,
    ADDRESS: process.env.ADDRESS,
    PAYMENT_METHODS: process.env.PAYMENT_METHODS,
    PRODUCTS: process.env.PRODUCTS,
    COMISSIONS: process.env.COMISSIONS,
    ORDERS: process.env.ORDERS,
    INVOICES: process.env.INVOICES,
    CONSTANTS: process.env.CONSTANTS,
    OPENPAY_ID: process.env.OPENPAY_ID,
    OPENPAY_KEY: process.env.OPENPAY_KEY,
    ENVIRONMENT: process.env.ENVIRONMENT
  },
  experimental: {
    esmExternals: false
  },
  transpilePackages: [
    '@fullcalendar/common',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/list',
    '@fullcalendar/timegrid'
  ],
  images: {
    domains: ['products-images-9fe5.s3.amazonaws.com', 'products-images-9fe5.s3.us-east-1.amazonaws.com']
  }
}

const millionConfig = {
  auto: { rsc: true }
}

module.exports = million.next(nextConfig, millionConfig)
