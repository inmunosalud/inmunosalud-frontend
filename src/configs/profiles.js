export const PERMISSIONS = {
  home: 'home',
  dashboardUsers: 'dashboard/users',
  dashboardComissions: 'dashboard/comissions',
  dashboardProfile: 'profile',
  dashboardGeneral: 'dashboard/general',
  ecommerceProducts: 'ecommerce/products',
  ecommerceCart: 'ecommerce/cart',
  ecommerceCheckout: 'ecommerce/checkout',
  adminUsersNewUser: 'admin/user/new-user',
  ecommerceAddProduct: 'ecommerce/products/add-product',
  ecommerceOrders: 'ecommerce/orders',
  ecommerceEditOrders: 'ecommerce/edit-order',
}

export const PROFILES = {
  Consumidor: [
    PERMISSIONS.home,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceAddProduct,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders,
  ],
  Socio: [
    PERMISSIONS.home,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceAddProduct,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders,
  ],
  'Administrador de Productos': [
    PERMISSIONS.home,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceAddProduct,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders
  ],
  'Administrador General': [
    PERMISSIONS.home,
    PERMISSIONS.dashboardGeneral,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.dashboardComissions,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.adminUsersNewUser,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceAddProduct,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders,
  ],
  default: [
    PERMISSIONS.home,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceAddProduct,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders
  ]
}

export const ROUTES_PERMISSION = {
  ['/landing-page/home']: PERMISSIONS.home,
  ['/dashboards/general']: PERMISSIONS.dashboardGeneral,
  ['/dashboards/users']: PERMISSIONS.dashboardUsers,
  ['/dashboards/comissions']: PERMISSIONS.dashboardComissions,
  ['/profile']: PERMISSIONS.dashboardProfile,
  ['/ecommerce/products']: PERMISSIONS.ecommerceProducts,
  ['/ecommerce/cart']: PERMISSIONS.ecommerceCart,
  ['/ecommerce/checkout']: PERMISSIONS.ecommerceCheckout,
  ['/admin/users/new-user']: PERMISSIONS.adminUsersNewUser,
  ['/ecommerce/products/add-product']: PERMISSIONS.ecommerceAddProduct,
  ['/ecommerce/orders']: PERMISSIONS.ecommerceOrders,
  ['/ecommerce/edit-order']: PERMISSIONS.ecommerceEditOrders,
}

export const PROFILES_USER = {
  admin: 'Administrador General',
  productsAdmin: 'Administrador de Productos',
  consumerUser: 'Consumidor',
  associatedUser: 'Socio'
}
