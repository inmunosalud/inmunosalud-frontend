// ** React Imports
import { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountTie from 'mdi-material-ui/AccountTie'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

import { updateUser } from 'src/store/users'

const UserDropdown = props => {
  const dispatch = useDispatch()
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useSelector(state => state.session)
  // ** Hooks
  const router = useRouter()

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

  const handleLogout = () => {
    router.push('/register')
    handleDropdownClose()
  }

  const handleConvertProfile = () => {
    const body = {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
      profile: 'associatedUser',
      recommenderId: ''
    }
    dispatch(updateUser(body))
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar alt='joe doe' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} src='/images/avatars/1.png' />
      </Badge>
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
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{user?.firstName}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {user?.profile?.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <MenuItem sx={{ py: 2 }} onClick={handleConvertProfile}>
          <AccountTie sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Convertirme en Socio
        </MenuItem>
        <Divider />
        {user?.id ? (
          <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
            <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
            Cerrar Sesión
          </MenuItem>
        ) : (
          <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
            <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
            Iniciar Sesión
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
