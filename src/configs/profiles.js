export const PERMISSIONS = {
  home: 'home',
  join: 'join',
  joinRegister: 'join/register',
  network: 'network',
  dashboardUsers: 'dashboard/users',
  dashboardComissions: 'dashboard/comissions',
  dashboardLogistics: 'dashboard/logistics',
  dashboardProfile: 'profile',
  dashboardGeneral: 'dashboard/general',
  dashboardConstants: 'dashboard/constants',
  ecommerceProducts: 'ecommerce/products',
  ecommerceCart: 'ecommerce/cart',
  ecommerceCheckout: 'ecommerce/checkout',
  adminUsersNewUser: 'admin/user/new-user',
  ecommerceAddProduct: 'ecommerce/products/add-product',
  ecommerceOrders: 'ecommerce/orders',
  ecommerceEditOrders: 'ecommerce/edit-order',
  ecommerceMonthlyPurchase: 'ecommerce/monthly-purchase',
  ecommerceBilling: 'ecommerce/billing',
  ordersAdmin: '/orders/admin-orders'
}

export const PROFILES = {
  Consumidor: [
    PERMISSIONS.home,
    PERMISSIONS.join,
    PERMISSIONS.joinRegister,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders
  ],
  Afiliado: [
    PERMISSIONS.home,
    PERMISSIONS.join,
    PERMISSIONS.network,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders,
    PERMISSIONS.ecommerceMonthlyPurchase,
    PERMISSIONS.ecommerceBilling
  ],
  'Afiliado sin compras': [
    PERMISSIONS.home,
    PERMISSIONS.join,
    PERMISSIONS.network,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders,
    PERMISSIONS.ecommerceMonthlyPurchase,
    PERMISSIONS.ecommerceBilling
  ],

  'Administrador de Productos': [
    PERMISSIONS.home,
    PERMISSIONS.join,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceAddProduct
  ],
  'Supervisor de Usuarios': [
    PERMISSIONS.home,
    PERMISSIONS.join,
    PERMISSIONS.network,
    PERMISSIONS.dashboardUsers,
    PERMISSIONS.dashboardProfile,
    PERMISSIONS.ecommerceProducts,
    PERMISSIONS.ecommerceCart,
    PERMISSIONS.ecommerceCheckout,
    PERMISSIONS.ecommerceOrders,
    PERMISSIONS.ecommerceEditOrders,
    PERMISSIONS.ecommerceMonthlyPurchase,
    PERMISSIONS.ecommerceBilling
  ],
  Logística: [PERMISSIONS.home, PERMISSIONS.join, PERMISSIONS.ecommerceProducts, PERMISSIONS.dashboardLogistics],
  'Administrador General': Object.values(PERMISSIONS),
  default: [PERMISSIONS.home, PERMISSIONS.join, PERMISSIONS.ecommerceProducts]
}

export const ROUTES_PERMISSION = {
  ['/landing-page/home']: PERMISSIONS.home,
  ['/landing-page/join']: PERMISSIONS.join,
  ['/join/register']: PERMISSIONS.joinRegister,
  ['/dashboards/general']: PERMISSIONS.dashboardGeneral,
  ['/dashboards/users']: PERMISSIONS.dashboardUsers,
  ['/dashboards/comissions']: PERMISSIONS.dashboardComissions,
  ['/dashboards/logistics']: PERMISSIONS.dashboardLogistics,
  ['/ecommerce/edit-order-logistic']: PERMISSIONS.dashboardLogistics,
  ['/dashboards/constants']: PERMISSIONS.dashboardConstants,
  ['/profile']: PERMISSIONS.dashboardProfile,
  ['/network']: PERMISSIONS.network,
  ['/ecommerce/products']: PERMISSIONS.ecommerceProducts,
  ['/ecommerce/product/[id]']: PERMISSIONS.ecommerceProducts,
  ['/ecommerce/cart']: PERMISSIONS.ecommerceCart,
  ['/ecommerce/checkout']: PERMISSIONS.ecommerceCheckout,
  ['/admin/users/new-user']: PERMISSIONS.adminUsersNewUser,
  ['/ecommerce/add-product']: PERMISSIONS.ecommerceAddProduct,
  ['/ecommerce/orders']: PERMISSIONS.ecommerceOrders,
  ['/ecommerce/edit-order']: PERMISSIONS.ecommerceEditOrders,
  ['/orders/admin-orders']: PERMISSIONS.ordersAdmin,
  ['/ecommerce/monthly-purchase']: PERMISSIONS.ecommerceMonthlyPurchase,
  ['/ecommerce/billing']: PERMISSIONS.ecommerceBilling
}

export const PROFILES_USER = {
  admin: 'Administrador General',
  productsAdmin: 'Administrador de Productos',
  consumerUser: 'Consumidor',
  affiliatedUser: 'Afiliado',
  logisticsAdmin: 'Logística',
  usersManager: 'Supervisor de Usuarios'
}
