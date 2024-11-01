import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'

import { Modal, CircularProgress, Backdrop, useTheme, Box } from '@mui/material'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'
// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadSession, isDataLoaded, setIsMobile } from 'src/store/dashboard/generalSlice'
import { getCart } from 'src/store/cart'
import { getUserInfo } from 'src/store/users'
import { loadInfo } from 'src/store/paymentMethods'
import { addressList } from 'src/store/address'
import { setActiveStep } from 'src/store/register'

const LoadingModal = ({ open }) => {
  const theme = useTheme()
  return (
    <Modal
      open={open}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          height: '1000vh',
          width: '1000vh',
          display: 'flex',
          backgroundColor: theme.palette.background.paper,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <CircularProgress color='primary' />
      </Box>
    </Modal>
  )
}

const UserLayout = ({ children }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const { settings, saveSettings } = useSettings()
  const router = useRouter()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { user, dataLoaded } = useSelector(state => state.dashboard.general)
  const { userInfo } = useSelector(state => state.users)

  useEffect(() => {
    if (!localStorage.getItem('im-user')) {
      dispatch(isDataLoaded(true))
      return
    }
    if (localStorage.getItem('im-user') != '' && Object.keys(user).length === 0) {
      dispatch(loadSession())
    }
    if (user.id && !userInfo) {
      dispatch(getUserInfo(user.id))
    }
    if (userInfo) {
      if (userInfo.profile === 'Logistica') {
        router.push('/dashboards/logistics')
        dispatch(isDataLoaded(true))
      }
      if (userInfo.profile === 'Administrador General') {
        dispatch(isDataLoaded(true))
      }
      if (userInfo.profile === 'Consumidor' || (userInfo.profile === 'Afiliado' && !dataLoaded && userInfo)) {
        dispatch(getCart(user.id))
        dispatch(loadInfo(user.id))
        dispatch(addressList(user.id))
        dispatch(isDataLoaded(true))
      }
    }
  }, [userInfo, user.id, dataLoaded])

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
  }, [isMobile])

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <>
      <Layout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        {...(settings.layout === 'horizontal'
          ? {
              // ** Navigation Items
              horizontalNavItems: HorizontalNavItems(),

              // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
              // horizontalNavItems: ServerSideHorizontalNavItems(),
              // ** AppBar Content
              horizontalAppBarContent: () => (
                <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
              )
            }
          : {
              // ** Navigation Items
              verticalNavItems: VerticalNavItems(),

              // Uncomment the below line when using server-side menu in vertical layout and comment the above line
              // verticalNavItems: ServerSideVerticalNavItems(),
              // ** AppBar Content
              verticalAppBarContent: props => (
                <VerticalAppBarContent
                  hidden={hidden}
                  settings={settings}
                  saveSettings={saveSettings}
                  toggleNavVisibility={props.toggleNavVisibility}
                />
              )
            })}
      >
        {children}
      </Layout>
      <LoadingModal open={!dataLoaded} />
    </>
  )
}

export default UserLayout
