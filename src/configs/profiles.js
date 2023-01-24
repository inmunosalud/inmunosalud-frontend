export const PERMISSIONS = {
  home: 'home',
  dashboardUsers: 'dashboard/users',
  dashboardGeneral: 'dashboard/general',
  ecommerceProducts: 'ecommerce/products',
  ecommerceCart: 'ecommerce/cart',
  adminUsersNewUser: 'admin/user/new-user',
  ecommerceAddProduct: 'ecommerce/products/add-product'
}

export const PROFILES = {
  Consumidor: [PERMISSIONS.home, PERMISSIONS.dashboardUsers, PERMISSIONS.ecommerceProducts, PERMISSIONS.ecommerceCart, PERMISSIONS.ecommerceAddProduct],
  Socio: [PERMISSIONS.home, PERMISSIONS.dashboardUsers, PERMISSIONS.ecommerceProducts, PERMISSIONS.ecommerceCart, PERMISSIONS.ecommerceAddProduct],
  'Administrador de Productos': [
    PERMISSIONS.home,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceAddProduct
  ],
  'Administrador General': [
    PERMISSIONS.home,
    PERMISSIONS.dashboardGeneral,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.adminUsersNewUser,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceAddProduct
  ],
  default: [PERMISSIONS.home, PERMISSIONS.ecommerceProducts, PERMISSIONS.ecommerceCart, PERMISSIONS.ecommerceAddProduct]
}

export const ROUTES_PERMISSION = {
  ['/landing-page/home']: PERMISSIONS.home,
  ['/dashboards/general']: PERMISSIONS.dashboardGeneral,
  ['/dashboards/users']: PERMISSIONS.dashboardUsers,
  ['/ecommerce/products']: PERMISSIONS.ecommerceProducts,
  ['/ecommerce/cart']: PERMISSIONS.ecommerceCart,
  ['/admin/users/new-user']: PERMISSIONS.adminUsersNewUser,
  ['/ecommerce/products/add-product']: PERMISSIONS.ecommerceAddProduct,
}

export const PROFILES_USER = {
  admin: 'Administrador General',
  productsAdmin: 'Administrador de Productos',
  consumerUser: 'Consumidor',
  associatedUser: 'Socio'
}
