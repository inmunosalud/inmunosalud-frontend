// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useSelector } from 'react-redux'
import { PROFILES } from 'src/configs/profiles'
import { useMemo } from 'react'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  if (item.children) {
    return VerticalNavGroup
  }

  return VerticalNavLink
}

const resolvePermissions = (user, items = []) => {
  const userProfile = user?.profile ? PROFILES[user.profile] : PROFILES.default

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
  const { verticalNavItems } = props

  const filteredItems = useMemo(() => resolvePermissions(user, verticalNavItems), [user, verticalNavItems])

  // ** Props

  const RenderMenuItems = filteredItems.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
