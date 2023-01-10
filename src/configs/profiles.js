export const PERMISSIONS = {
  home: 'home',
  dashboardUsers: 'dashboard/users',
  dashboardGeneral: 'dashboard/general',
  ecommerceProducts: 'ecommerce/products',
  ecommerceCart: 'ecommerce/cart',
  adminUsersNewUser: 'admin/user/new-user'
}

export const PROFILES = {
  consumerUser: [
    PERMISSIONS.home,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart
  ],
  associatedUser: [
    PERMISSIONS.home,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart
  ],
  productsAdmin: [
    PERMISSIONS.home,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart
  ],
  admin: [
    PERMISSIONS.home,
    PERMISSIONS.dashboardGeneral,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.adminUsersNewUser,
    PERMISSIONS.ecommerceCart
  ],
  default: [PERMISSIONS.home, PERMISSIONS.ecommerceProducts, PERMISSIONS.ecommerceCart]
}

export const ROUTES_PERMISSION = {
  ['/landing-page/home']: PERMISSIONS.home,
  ['/dashboards/general']: PERMISSIONS.dashboardGeneral,
  ['/dashboards/users']: PERMISSIONS.dashboardUsers,
  ['/ecommerce/products']: PERMISSIONS.ecommerceProducts,
  ['/ecommerce/cart']: PERMISSIONS.ecommerceCart,
  ['/admin/users/new-user']: PERMISSIONS.adminUsersNewUser
}

export const PROFILES_USER = {
  admin: 'admin',
  productsAdmin: 'productsAdmin',
  consumerUser: 'consumerUser',
  associatedUser: 'associatedUser'
}
