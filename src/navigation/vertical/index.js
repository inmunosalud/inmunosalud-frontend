// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
import OrderBoolDescending from 'mdi-material-ui/OrderBoolDescending'
import { PERMISSIONS } from 'src/configs/profiles'

const navigation = () => {
  return [
    {
      icon: HomeOutline,
      title: 'Home',
      path: '/landing-page/home',
      permission: PERMISSIONS.home
    },
    {
      title: 'Dashboard',
      icon: ViewDashboard,
      permission: 'dashboard',
      children: [
        {
          title: 'General',
          path: '/dashboards/general',
          permission: PERMISSIONS.dashboardGeneral
        },
        {
          title: 'Usuarios',
          path: '/dashboards/users',
          permission: PERMISSIONS.dashboardUsers
        },
        {
          title: 'Comisiones',
          path: '/dashboards/comissions',
          permission: PERMISSIONS.dashboardComissions
        }
      ]
    },
    {
      title: 'Ecommerce',
      icon: ShoppingOutline,
      permission: 'ecommerce',
      children: [
        {
          title: 'Productos',
          path: '/ecommerce/products',
          permission: PERMISSIONS.ecommerceProducts
        },
        {
          title: 'Pedidos',
          path: '/ecommerce/orders',
          permission: PERMISSIONS.ecommerceOrders
        }
      ]
    },
    {
      title: 'Pedidos',
      icon: OrderBoolDescending,
      permission: 'orders',
      children: [
        {
          title: 'Pedidos',
          path: '/orders/admin-orders',
          permission: PERMISSIONS.ecommerceProducts
        },
      ]
    },
  ]
}

export default navigation
