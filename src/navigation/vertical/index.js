import { useSelector } from 'react-redux'
// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
import AccountGroupIcon from 'mdi-material-ui/AccountGroup'
import OrderBoolDescending from 'mdi-material-ui/OrderBoolDescending'
import { PERMISSIONS, PROFILES_USER } from 'src/configs/profiles'

const navigation = () => {
  const { user } = useSelector(state => state.dashboard.general)

  const isAuthorized = permission => {
    // Check if the current user has the given permission
    return PROFILES_USER['admin'] === permission
  }

  const navItems = [
    {
      icon: HomeOutline,
      title: 'Inicio',
      path: '/landing-page/home',
      permission: PERMISSIONS.home,
      visible: true
    },
    {
      icon: AccountGroupIcon,
      title: user.profile === 'Afiliado' ? 'Información de la Red' : 'Afíliate',
      path: '/landing-page/join',
      permission: PERMISSIONS.join,
      visible: true
    },
    {
      title: 'Dashboard',
      icon: ViewDashboard,
      permission: 'dashboard',
      visible: true,
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
          title: 'Compra mensual',
          path: '/ecommerce/monthly-purchase/',
          permission: PERMISSIONS.ecommerceMonthlyPurchase
        },
        {
          title: 'Comisiones',
          path: '/dashboards/comissions',
          permission: PERMISSIONS.dashboardComissions
        },
        {
          title: 'Pedidos',
          path: '/orders/admin-orders',
          permission: PERMISSIONS.ordersAdmin
        },
        {
          title: 'Facturación',
          path: '/ecommerce/billing',
          permission: PERMISSIONS.ecommerceBilling
        },
        {
          title: 'Constantes',
          path: '/dashboards/constants',
          permission: PERMISSIONS.dashboardConstants
        }
      ]
    },
    {
      title: 'Ecommerce',
      icon: ShoppingOutline,
      permission: 'ecommerce',
      visible: true,
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
    }
    // {
    //   title: 'Pedidos',
    //   icon: OrderBoolDescending,
    //   permission: 'orders',
    //   visible: true,
    //   visible: isAuthorized(user?.profile),
    //   children: [
    //     {
    //       title: 'Pedidos',
    //       path: '/orders/admin-orders',
    //       permission: PERMISSIONS.ecommerceProducts
    //     }
    //   ]
    // }
  ]

  // Filter out items that the user doesn't have permission to see
  const visibleNavItems = navItems.filter(item => item.visible)

  return visibleNavItems
}

export default navigation
