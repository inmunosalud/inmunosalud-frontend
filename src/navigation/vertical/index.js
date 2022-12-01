// ** Icon imports
import Table from 'mdi-material-ui/Table'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import FormSelect from 'mdi-material-ui/FormSelect'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'
import { IconAdminPanelSettings } from '@aws-amplify/ui-react'
import AccountSupervisor from 'mdi-material-ui/AccountSupervisor'
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
        }
      ]
    }
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
