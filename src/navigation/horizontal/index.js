import { IconAdminPanelSettings } from '@aws-amplify/ui-react'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import HomeOutline from 'mdi-material-ui/HomeOutline'

const navigation = () => {
  return [
    {
      icon: HomeOutline,
      title: 'Home',
      path: '/landig-page/home'
    },
    {
      icon: HomeOutline,
      title: 'Clientes',
      children: [
        {
          icon: ChartDonut,
          title: 'General',
          path: '/dashboards/general'
        },
        {
          icon: ChartDonut,
          title: 'Usuarios',
          path: '/dashboards/users'
        },
        {
          icon: ChartDonut,
          title: 'Productos',
          path: '/dashboards/products'
        }
      ]
    },
    {
      icon: HomeOutline,
      title: 'Ecommerce',
      children: []
    },
    {
      icon: IconAdminPanelSettings,
      title: 'Admin',
      children: [
        {
          icon: ChartDonut,
          title: 'General',
          path: '/dashboards/general'
        },
        {
          icon: ChartDonut,
          title: 'Usuarios',
          path: '/dashboards/users'
        },
        {
          icon: ChartDonut,
          title: 'Productos',
          path: '/dashboards/products'
        }
      ]
    }
  ]
}

export default navigation
