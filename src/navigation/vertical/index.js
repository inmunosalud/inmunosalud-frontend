// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
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
      icon: HomeOutline,
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
        }
      ]
    },
    {
      title: 'Ecommerce',
      icon: HomeOutline,
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
    // {
    //   title: 'Admin',
    //   icon: AccountSupervisor,
    //   permission: "home",
    //   children: [
    //     {
    //       title: 'Usuarios',
    //       path: '/admin/users'
    //     }
    //   ]
    // }
  ]
}

export default navigation
