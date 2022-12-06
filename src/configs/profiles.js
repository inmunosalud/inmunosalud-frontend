export const PERMISSIONS = {
  home: 'home',
  dashboardUsers: 'dashboard/users',
  dashboardGeneral: 'dashboard/general',
  ecommerceProducts: 'ecommerce/products',
  adminUsersNewUser: 'admin/user/new-user'
}

export const PROFILES = {
  consumerUser: [PERMISSIONS.home, PERMISSIONS.dashboardUsers, PERMISSIONS.ecommerceProducts],
  associatedUser: [PERMISSIONS.home, PERMISSIONS.dashboardUsers, PERMISSIONS.ecommerceProducts],
  productsAdmin: [PERMISSIONS.home, PERMISSIONS.dashboardUsers, PERMISSIONS.ecommerceProducts],
  admin: [
    PERMISSIONS.home,
    PERMISSIONS.dashboardGeneral,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.adminUsersNewUser
  ],
  default: [PERMISSIONS.home, PERMISSIONS.ecommerceProducts]
}

export const ROUTES_PERMISSION = {
  ['/landing-page/home']: PERMISSIONS.home,
  ['/dashboards/general']: PERMISSIONS.dashboardGeneral,
  ['/dashboards/users']: PERMISSIONS.dashboardUsers,
  ['/ecommerce/products']: PERMISSIONS.ecommerceProducts,
  ['/admin/users/new-user']: PERMISSIONS.adminUsersNewUser
}

export const PROFILES_USER = {
  admin: 'admin',
  productsAdmin: 'productsAdmin',
  consumerUser: 'consumerUser',
  associatedUser: 'associatedUser'
}
