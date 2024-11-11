// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import PolicyIcon from '@mui/icons-material/Policy'
import ArticleIcon from '@mui/icons-material/Article'

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountTie from 'mdi-material-ui/AccountTie'
import { Flag } from 'mdi-material-ui'
import { setModal } from 'src/store/contactus'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))
import { Account, Router, AccountCog, AccountCircle } from 'mdi-material-ui'
import { PROFILES_USER } from 'src/configs/profiles'
import { stripeRegister } from 'src/store/users'
import ProblemFormModal from 'src/views/ecommerce/ProblemFormModal'
import { Link } from '@mui/material'

const UserDropdown = props => {
  const dispatch = useDispatch()
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useSelector(state => state.session)
  const { stripeLink } = useSelector(state => state.users)
  // ** Hooks
  const router = useRouter()
  const theme = useTheme()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleGoTo = path => {
    router.push(path)
    handleDropdownClose()
  }
  const handleLogout = () => {
    localStorage.removeItem('im-user')
    location.reload()
    handleDropdownClose()
  }

  const handleLogin = () => {
    router.push('/login')
    handleDropdownClose()
  }

  const handleConvertProfile = () => {
    router.push({ pathname: '/landing-page/join' })
    handleDropdownClose()
  }

  const handleRegister = () => {
    const id = user.id
    dispatch(stripeRegister(id))
  }

  return (
    <Fragment>
      <IconButton onClick={handleDropdownOpen} color='inherit' size='medium'>
        <Account sx={{ fontSize: '2rem' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Account color='inherit' sx={{ fontSize: '2rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{user?.firstName}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {user?.profile?.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
        {user?.id ? (
          <MenuItem sx={{ py: 2 }} onClick={() => handleGoTo('/profile')}>
            <AccountCog sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
            Perfil
          </MenuItem>
        ) : null}
        {user?.profile === PROFILES_USER.consumerUser && hidden ? (
          <MenuItem sx={{ py: 2 }} onClick={handleConvertProfile}>
            <AccountTie sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
            Convertirme en Afiliado
          </MenuItem>
        ) : null}

        {/*
         Sustituir boton con Mercadopago
        {user?.profile != null && (
          <MenuItem sx={{ py: 2 }} onClick={handleRegister}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 30 30'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-6 h-6'
              width={'24px'}
              style={{
                marginRight: '8px',
                alignSelf: 'center'
              }}
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
              />
            </svg>
            Registrarme en Stripe
          </MenuItem>
        )} */}
        <MenuItem sx={{ py: 2 }} onClick={() => dispatch(setModal(true))}>
          <Flag sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Tengo un problema
        </MenuItem>

        <Divider />
        {user?.id ? (
          <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
            <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
            Cerrar Sesión
          </MenuItem>
        ) : (
          <MenuItem sx={{ py: 2 }} onClick={handleLogin}>
            <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
            Iniciar Sesión
          </MenuItem>
        )}
      </Menu>
      <ProblemFormModal />
    </Fragment>
  )
}

export default UserDropdown
