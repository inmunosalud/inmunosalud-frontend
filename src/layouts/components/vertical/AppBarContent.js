// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
// ** Icons Imports
import MenuIcon from 'mdi-material-ui/Menu'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import CartButton from 'src/@core/layouts/components/shared-components/CartButton'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const { user } = useSelector(state => state.session)
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  const isActiveRoute = route => {
    return router.pathname === route
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <MenuIcon />
          </IconButton>
        ) : null}
      </Box>
      {!hidden && (
        <Box
          className='actions-left'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}
        >
          <Box sx={{ margin: { md: '0 auto' } }}>
            <Link href={'/ecommerce/products'} passHref>
              <Button size='small' variant={isActiveRoute('/ecommerce/products') ? 'contained' : 'text'}>
                Productos
              </Button>
            </Link>
          </Box>
          <Box sx={{ margin: { md: '0 auto' } }}>
            <Link href={user.profile === 'Afiliado' ? '/network' : '/landing-page/join'} passHref>
              <Button size='small' variant={isActiveRoute('/landing-page/join') ? 'contained' : 'text'}>
                {user.profile === 'Afiliado' ? 'Información de la Red' : 'Afíliate'}
              </Button>
            </Link>
          </Box>
        </Box>
      )}
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {user.profile != null ? <CartButton /> : null}
        {user.profile != null ? (
          <UserDropdown settings={settings} />
        ) : (
          <Button variant='text' onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
