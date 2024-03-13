const million = require('million/compiler')

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
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
