// ** Next Import
import Link from 'next/link'
import Image from 'next/image';

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons
import Close from 'mdi-material-ui/Close'
import CircleOutline from 'mdi-material-ui/CircleOutline'
import RecordCircleOutline from 'mdi-material-ui/RecordCircleOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Images
import BlancoIotipo from '/public/images/logos/Blanco-Isotipo.png';
import BlancoLogotipo from 'public/images/logos/Blanco-Logotipo.png';
import NegroIotipo from '/public/images/logos/Negro-Isotipo.png';
import NegroLogotipo from 'public/images/logos/Negro-Logotipo.png';


// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const {
    navHover,
    settings,
    menuLockedIcon: userMenuLockedIcon,
    menuUnlockedIcon: userMenuUnlockedIcon,
    verticalNavMenuBranding: userVerticalNavMenuBranding
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const { navCollapsed } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userVerticalNavMenuBranding) {
        return 0
      } else {
        return
      }
    } else {
      return 6
    }
  }

  const MenuLockedIcon = () =>
    userMenuLockedIcon || (
      <RecordCircleOutline
        sx={{
          fontSize: '1.25rem',
          pointerEvents: 'none',
          ...menuCollapsedStyles,
          transition: 'opacity .25s ease-in-out'
        }}
      />
    )

  const MenuUnlockedIcon = () =>
    userMenuUnlockedIcon || (
      <CircleOutline
        sx={{
          fontSize: '1.25rem',
          pointerEvents: 'none',
          ...menuCollapsedStyles,
          transition: 'opacity .25s ease-in-out'
        }}
      />
    )

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <>
          <Link href='/' passHref style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...menuCollapsedStyles }}>
              <StyledLink sx={{ margin: '10px' }}>
                <Image src={theme.palette.mode === 'dark' ? BlancoLogotipo : NegroLogotipo} alt='Logo' width={180} height={25} />
              </StyledLink>
            </Box>
          </Link>
      <Link href='/' passHref style={{ textDecoration: 'none' }}>
        <IconButton
          disableRipple
          disableFocusRipple
          sx={{ p: 0, color: 'text.primary', backgroundColor: 'transparent !important' }}
        >
          <Image src={theme.palette.mode === 'dark' ? BlancoIotipo : NegroIotipo} alt='Isotipo' width={30} height={30} />
        </IconButton>
      </Link>
        </>
      )}


    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
