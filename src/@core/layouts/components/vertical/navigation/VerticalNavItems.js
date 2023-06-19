// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useDispatch, useSelector } from 'react-redux'
import { PROFILES } from 'src/configs/profiles'
import { useEffect, useMemo } from 'react'
import { getUserInfo } from 'src/store/users'
import { loadSession } from 'src/store/dashboard/generalSlice'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  if (item.children) {
    return VerticalNavGroup
  }

  return VerticalNavLink
}

const resolvePermissions = (user, items = []) => {
  const userProfile =
    user?.profile === 'Afiliado' && user?.numberOfPurchases === 0
      ? PROFILES['Afiliado sin compras']
      : user?.profile
      ? PROFILES[user.profile]
      : PROFILES.default
  const newItems = items.map(item => {
    if (item.children) {
      return { ...item, children: resolvePermissions(user, item.children) }
    }
    return item
  })

  return newItems.filter(item => {
    if (item.children && item.children.length) {
      return true
    }
    return userProfile.includes(item.permission)
  })
}

const VerticalNavItems = props => {
  const { user } = useSelector(state => state.dashboard.general)
  const { userInfo } = useSelector(state => state.users)
  const { verticalNavItems } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSession())
    dispatch(getUserInfo(user.id))
  }, [])

  const filteredItems = useMemo(() => resolvePermissions(user, verticalNavItems), [user, verticalNavItems])

  // ** Props

  const RenderMenuItems = filteredItems.map((item, index) => {
    if (item.title === 'Dashboard' && userInfo?.profile === 'Afiliado' && userInfo?.numberOfPurchases === 0) {
      return null
    }
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
